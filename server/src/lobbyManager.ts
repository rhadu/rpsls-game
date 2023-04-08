import { Server, Socket } from "socket.io"
import { Choice, Lobby, Results } from "./types/game"
import { SINGLE_PLAYER_PREFIX } from "./config/constants"
import EVENTS from "./config/events"
import { determineWinner } from "./utils/game"

const choices: Choice[] = [
  { id: 1, name: "rock" },
  { id: 2, name: "paper" },
  { id: 3, name: "scissors" },
  { id: 4, name: "lizard" },
  { id: 5, name: "spock" },
]

const createLobby = (): Lobby => ({
  playerA: null,
  playerB: null,
  choices: { playerA: null, playerB: null },
  round: 0,
  scores: { playerA: 0, playerB: 0 },
})

const isSinglePlayerGame = (roomId: string): boolean => {
  return roomId.startsWith(SINGLE_PLAYER_PREFIX)
}
export class LobbyManager {
  private lobbies: Record<string, Lobby> = {}
  private playerRoomMap: Record<string, string> = {}

  constructor(private io: Server) {
    this.setupListeners()
  }

  private setupListeners() {
    this.io.on(EVENTS.connection, (socket) => {
      console.log("User connected:", socket.id)

      socket.on(
        EVENTS.CLIENT.JOIN_ROOM,
        ({
          uid,
          name,
          roomId,
        }: {
          uid: string
          name: string
          roomId: string
        }) => {
          this.joinLobby(socket, uid, name, roomId)
        },
      )

      socket.on(
        EVENTS.CLIENT.PLAYER_CHOICE,
        ({ choiceId }: { choiceId: number }) => {
          this.playerMakesChoice(socket, choiceId)
        },
      )

      socket.on(EVENTS.disconnect, () => {
        this.playerDisconnects(socket.id)
      })
    })
  }

  joinLobby(socket: Socket, uid: string, name: string, roomId: string) {
    if (!this.lobbies[roomId]) {
      this.lobbies[roomId] = createLobby()
    }

    this.addPlayerToLobby(socket, uid, name, roomId)

    if (isSinglePlayerGame(roomId)) {
      this.startSinglePlayerGame(socket, roomId)
    } else if (this.areBothPlayersPresent(roomId)) {
      this.startMultiPlayerGame(roomId)
    }
  }

  private addPlayerToLobby(
    socket: Socket,
    uid: string,
    name: string,
    roomId: string,
  ) {
    const lobby = this.lobbies[roomId]
    const player = { socketId: socket.id, uid, name }

    if (isSinglePlayerGame(roomId)) {
      lobby.playerA = player
      lobby.playerB = {
        socketId: "computer",
        name: "Computer",
        uid: "computer",
      }
    } else {
      if (!lobby.playerA) {
        lobby.playerA = player
        socket.join(roomId)
      } else if (!lobby.playerB && lobby.playerA.socketId !== socket.id) {
        lobby.playerB = player
        socket.join(roomId)
      } else {
        socket.emit(EVENTS.SERVER.ERROR, "Room is full.")
      }
    }
    // Add or update the mapping of the player's socketId to the roomId
    this.playerRoomMap[socket.id] = roomId
  }

  private startSinglePlayerGame(socket: Socket, roomId: string) {
    socket.emit(EVENTS.SERVER.START_GAME, { choices })
  }

  private startMultiPlayerGame(roomId: string) {
    this.io.to(roomId).emit(EVENTS.SERVER.START_GAME, { choices })
  }

  private areBothPlayersPresent(roomId: string): boolean {
    const lobby = this.lobbies[roomId]
    return lobby.playerA !== null && lobby.playerB !== null
  }

  playerMakesChoice(socket: Socket, choiceId: number) {
    const roomId = this.playerRoomMap[socket.id]
    const lobby = this.lobbies[roomId]

    if (!lobby) {
      return
    }

    const playerA = lobby.playerA
    const playerB = lobby.playerB

    if (playerA && playerB) {
      if (socket.id === playerA.socketId) {
        lobby.choices.playerA = choiceId
      } else if (socket.id === playerB.socketId) {
        lobby.choices.playerB = choiceId
      }

      if (
        lobby.choices.playerA &&
        !lobby.choices.playerB &&
        playerB.socketId === "computer"
      ) {
        // Generate computer move
        lobby.choices.playerB = Math.floor(Math.random() * choices.length) + 1
      }

      if (
        lobby.choices.playerA &&
        lobby.choices.playerB &&
        lobby.playerA &&
        lobby.playerB
      ) {
        const result = determineWinner(
          lobby.choices.playerA,
          lobby.choices.playerB,
        )
        const winnerId =
          result === "draw"
            ? "draw"
            : result === "playerA"
            ? playerA.uid
            : playerB.uid

        if (result !== "draw") {
          lobby.scores[result]++
        }

        lobby.round++

        const roundResult: Results = {
          winner: winnerId,
          playerA: { uid: lobby.playerA.uid, choice: lobby.choices.playerA },
          playerB: { uid: lobby.playerB.uid, choice: lobby.choices.playerB },
          round: lobby.round,
        }

        if (isSinglePlayerGame(roomId)) {
          socket.emit(EVENTS.SERVER.ROUND_RESULT, roundResult)
        } else {
          this.io.to(roomId).emit(EVENTS.SERVER.ROUND_RESULT, roundResult)
        }

        lobby.choices.playerA = null
        lobby.choices.playerB = null
      }
    }
  }

  playerDisconnects(socketId: string) {
    const roomId = this.playerRoomMap[socketId]

    if (!roomId) {
      console.log("User disconnected with no assigned room:", socketId)
      return
    }

    const lobby = this.lobbies[roomId]
    this.io.to(roomId).emit(EVENTS.SERVER.PLAYER_DISCONNECTED)

    if (
      lobby &&
      (lobby.playerA?.socketId === socketId ||
        lobby.playerB?.socketId === socketId)
    ) {
      delete this.playerRoomMap[socketId]
      delete this.lobbies[roomId]
    }

    console.log("User disconnected:", socketId)
  }
}
