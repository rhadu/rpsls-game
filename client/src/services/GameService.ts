import { Socket } from "socket.io-client"

import { useSocket } from "@/contexts/SocketContext"
import useGameState from "@/store/game"
import { useOpponentState, usePlayerState } from "@/store/player"
import EVENTS from "@/config/events"
import {
  GameState,
  IChoice,
  Results,
  PlayerTag,
  GamePlayers,
} from "@/types/game"
import { SINGLE_PLAYER_PREFIX } from "@/config/constants"

export default class GameService {
  private _socket: Socket
  private _gameStore = useGameState
  private _playerStore = usePlayerState
  private _opponentStore = useOpponentState

  constructor(webSocketContext: ReturnType<typeof useSocket>) {
    this._socket = webSocketContext.socket
    this.onStartGame = this.onStartGame.bind(this)
    this.onRoundResult = this.onRoundResult.bind(this)
    this.onPlayerDisconnected = this.onPlayerDisconnected.bind(this)
    this.onError = this.onError.bind(this)
    this.onRoomJoinError = this.onRoomJoinError.bind(this)
    this.onRoomJoined = this.onRoomJoined.bind(this)
    this.initializeSocketEvents()
  }

  initializeSocketEvents() {
    this._socket.on(EVENTS.SERVER.START_GAME, this.onStartGame)
    this._socket.on(EVENTS.SERVER.ROUND_RESULT, this.onRoundResult)
    this._socket.on(
      EVENTS.SERVER.PLAYER_DISCONNECTED,
      this.onPlayerDisconnected,
    )
    this._socket.on(EVENTS.SERVER.ERROR, this.onError)
    this._socket.on(EVENTS.SERVER.ROOM_JOINED_ERROR, this.onRoomJoinError)
    this._socket.on(EVENTS.SERVER.ROOM_JOINED, this.onRoomJoined)
  }

  private onStartGame({
    choices,
    players,
  }: {
    choices: IChoice[]
    players: GamePlayers
  }) {
    this.resetGameAndPlayerState()
    const { opponentTag } = this._opponentStore.getState()

    this._opponentStore.setState({
      opponentCharacter: players[opponentTag].character,
    })

    this._gameStore.setState({ gameState: GameState.MATCHUP_INTRO })
    this._gameStore.setState({ choices })
  }

  private onRoundResult(results: Results) {
    const { choices } = this._gameStore.getState()
    const { opponentTag } = this._opponentStore.getState()
    const { playerTag } = this._playerStore.getState()
    const opponent = results[opponentTag]
    const player = results[playerTag]

    this._opponentStore.setState({
      opponentChoice: choices.find((c) => c.id === opponent.choice),
    })
    this._opponentStore.setState({ opponentScore: opponent.score })
    this._playerStore.setState({ playerScore: player.score })
    this._gameStore.setState({ roundWinner: results.winner })
  }

  private onPlayerDisconnected(status: GameState) {
    //TODO handle disconnect
    alert("opponent disconnected")
  }

  private onError(errorMessage: string) {
    //TODO handle onError
    alert(errorMessage)
  }

  private onRoomJoinError(errorMessage: string) {
    //TODO handle onError
    alert(errorMessage)
  }

  // rename to Player_Joined
  private onRoomJoined({
    tag,
    startGame,
  }: {
    tag: PlayerTag
    startGame: boolean
  }) {
    const opponentTag: PlayerTag = tag === "playerA" ? "playerB" : "playerA"
    this._playerStore.setState({ playerTag: tag })
    this._opponentStore.setState({ opponentTag })
    this._gameStore.setState({ gameStarted: true })
    this._gameStore.setState({ gameState: GameState.WAITING_PLAYERS })
  }

  emitJoinRoom() {
    const uid = this._playerStore.getState().id
    const name = "player"
    const roomId = `multi-1234`
    const character = this._playerStore.getState().character
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM, { uid, name, roomId, character })
  }

  emitJoinRoomSingleplayer() {
    const uid = this._playerStore.getState().id
    const name = "player"
    const roomId = `${SINGLE_PLAYER_PREFIX}-${uid}`
    const character = this._playerStore.getState().character

    this._gameStore.setState({ gameState: GameState.MATCHUP_INTRO })
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM, { uid, name, roomId, character })
  }

  emitPlayerChoice(choiceId: number) {
    this._socket.emit(EVENTS.CLIENT.PLAYER_CHOICE, { choiceId })
  }

  goToNextRound() {
    this.resetRound()
    this._gameStore.setState({ gameState: GameState.CHOICE_SELECTION })
  }

  resetGameAndPlayerState() {
    this.resetRound()
    this._playerStore.setState({ playerScore: 0 })
    this._opponentStore.setState({ opponentScore: 0 })
  }

  resetRound() {
    this._gameStore.setState({ roundWinner: "" })
    this._opponentStore.setState({ opponentChoice: null })
  }
}
