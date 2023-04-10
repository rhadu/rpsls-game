import { Server, Socket } from "socket.io"
import { Choice, Lobby, Results } from "./types/game"
import { SINGLE_PLAYER_PREFIX } from "./config/constants"
import EVENTS from "./config/events"
import { determineWinner } from "./utils/game"
import { choices, gameDefaults } from "./config/data"

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
          character,
        }: {
          uid: string
          name: string
          roomId: string
          character: string
        }) => {
          this.joinLobby({ socket, uid, name, roomId, character })
        },
      )

      socket.on(
        EVENTS.CLIENT.PLAYER_CHOICE,
        ({ choiceId }: { choiceId: number }) => {
          this.playerMakesChoice(socket, choiceId)
        },
      )

      socket.on(EVENTS.CLIENT.CLEAN_ROOM, () => {
        this.cleanRoom(socket.id)
      })

      socket.on(EVENTS.disconnect, () => {
        this.playerDisconnects(socket.id)
      })
    })
  }

  joinLobby({
    socket,
    uid,
    name,
    roomId,
    character,
  }: {
    socket: Socket
    uid: string
    name: string
    roomId: string
    character: string
  }) {
    this.resetJoinedRoom(socket.id)

    if (!this.lobbies[roomId]) {
      this.lobbies[roomId] = createLobby()
    }

    if (this.isRoomFull(this.lobbies[roomId])) {
      this.roomJoinError(socket)
      return
    }

    this.addPlayerToLobby(socket, uid, name, roomId, character)

    if (isSinglePlayerGame(roomId)) {
      this.startSinglePlayerGame(socket, roomId)
    } else if (this.areBothPlayersPresent(roomId)) {
      this.startMultiPlayerGame(roomId)
    }
  }

  private isRoomFull(lobby: Lobby): boolean {
    return lobby.playerA !== null && lobby.playerB !== null
  }

  private addPlayerToLobby(
    socket: Socket,
    uid: string,
    name: string,
    roomId: string,
    character: string,
  ) {
    const lobby = this.lobbies[roomId]
    const player = { socketId: socket.id, uid, name, character }

    if (isSinglePlayerGame(roomId)) {
      lobby.playerA = player
      lobby.playerB = {
        socketId: "computer",
        name: "Sheldon",
        uid: "computer",
        character: "Sheldon",
      }
      this.roomJoined(socket, "playerA")
    } else {
      if (!lobby.playerA) {
        lobby.playerA = player
        socket.join(roomId)
        this.roomJoined(socket, "playerA")
      } else if (!lobby.playerB && lobby.playerA.socketId !== socket.id) {
        lobby.playerB = player
        socket.join(roomId)
        this.roomJoined(socket, "playerB")
      } else {
        this.roomJoinError(socket)
        socket.emit(EVENTS.SERVER.ROOM_JOINED_ERROR, "Room is full.")
      }
    }

    // Add or update the mapping of the player's socketId to the roomId
    this.playerRoomMap[socket.id] = roomId
  }

  private roomJoinError(socket: Socket) {
    socket.emit(EVENTS.SERVER.ROOM_JOINED_ERROR, "Room is full.")
  }

  private roomJoined(socket: Socket, tag: "playerA" | "playerB") {
    console.log(`ROOM_JOINED > ${tag}`)
    socket.emit(EVENTS.SERVER.ROOM_JOINED, { tag, startGame: true })
  }

  private startSinglePlayerGame(socket: Socket, roomId: string) {
    const players = this.getRoomPlayers(roomId)
    console.log(`START GAME -> ${roomId}`)
    socket.emit(EVENTS.SERVER.START_GAME, { choices, players })
  }

  private startMultiPlayerGame(roomId: string) {
    const players = this.getRoomPlayers(roomId)
    console.log(`START GAME -> ${roomId}`)

    this.io.to(roomId).emit(EVENTS.SERVER.START_GAME, { choices, players })
  }

  private getRoomPlayers(roomId: string) {
    const lobby = this.lobbies[roomId]
    return {
      playerA: lobby.playerA,
      playerB: lobby.playerB,
    }
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
        lobby.choices.playerA !== null &&
        lobby.choices.playerB !== null &&
        lobby.playerA &&
        lobby.playerB
      ) {
        const winner = determineWinner(
          lobby.choices.playerA,
          lobby.choices.playerB,
        )

        if (winner !== "draw") {
          lobby.scores[winner]++
        }

        lobby.round++

        const roundResult: Results = {
          winner: winner,
          playerA: {
            uid: lobby.playerA.uid,
            choice: lobby.choices.playerA,
            score: lobby.scores.playerA,
          },
          playerB: {
            uid: lobby.playerB.uid,
            choice: lobby.choices.playerB,
            score: lobby.scores.playerB,
          },
          round: lobby.round,
        }

        if (isSinglePlayerGame(roomId)) {
          socket.emit(EVENTS.SERVER.ROUND_RESULT, roundResult)
        } else {
          this.io.to(roomId).emit(EVENTS.SERVER.ROUND_RESULT, roundResult)
        }

        lobby.choices.playerA = null
        lobby.choices.playerB = null

        this.checkWinner(socket, roomId)
      }
    }
  }

  checkWinner(socket: Socket, roomId: string) {
    const lobby = this.lobbies[roomId]

    if (
      lobby.scores.playerA === gameDefaults.gameRounds ||
      lobby.scores.playerB === gameDefaults.gameRounds
    ) {
      const winner =
        lobby.scores.playerA === gameDefaults.gameRounds ? "playerA" : "playerB"

      if (isSinglePlayerGame(roomId)) {
        socket.emit(EVENTS.SERVER.GAME_END, winner)
      } else {
        this.io.to(roomId).emit(EVENTS.SERVER.GAME_END, winner)
      }
    }
  }

  playerDisconnects(socketId: string) {
    const roomId = this.playerRoomMap[socketId]

    if (!roomId) {
      console.log("User disconnected with no assigned room:", socketId)
      return
    }

    this.io.to(roomId).emit(EVENTS.SERVER.PLAYER_DISCONNECTED)

    this.resetJoinedRoom(socketId)

    console.log("User disconnected:", socketId)
  }

  cleanRoom(socketId: string) {
    const roomId = this.playerRoomMap[socketId]

    const lobby = this.lobbies[roomId]

    if (lobby) {
      if (lobby.playerA !== null && lobby.playerB === null) {
        return
      } else {
        if (lobby.playerA?.socketId)
          delete this.playerRoomMap[lobby.playerA?.socketId]
        if (lobby.playerB?.socketId)
          delete this.playerRoomMap[lobby.playerB?.socketId]
        delete this.lobbies[roomId]
      }
    }
  }

  resetJoinedRoom(socketId: string) {
    const roomId = this.playerRoomMap[socketId]

    if (!roomId) {
      console.log("User has no assigned room:", socketId)
      return
    }
    const lobby = this.lobbies[roomId]

    if (
      lobby &&
      (lobby.playerA?.socketId === socketId ||
        lobby.playerB?.socketId === socketId)
    ) {
      delete this.lobbies[roomId]
    }
    delete this.playerRoomMap[socketId]
  }

  getAllLobies() {
    return this.lobbies
  }

  getAllPlayers() {
    return this.playerRoomMap
  }
}
