import { Socket } from "socket.io-client"

import { useSocket } from "@/contexts/SocketContext"
import useGameState from "@/store/game"
import { usePlayerState } from "@/store/player"
import EVENTS from "@/config/events"
import { GameState, IChoice } from "@/types/game"
import { SINGLE_PLAYER_PREFIX } from "@/config/constants"

export default class GameService {
  private _socket: Socket
  private _gameStore = useGameState
  private _playerStore = usePlayerState

  constructor(webSocketContext: ReturnType<typeof useSocket>) {
    this._socket = webSocketContext.socket
    this.onStartGame = this.onStartGame.bind(this)
    this.onRoundResult = this.onRoundResult.bind(this)
    this.onPlayerDisconnected = this.onPlayerDisconnected.bind(this)
    this.onError = this.onError.bind(this)
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
  }

  private onStartGame({ choices }: { choices: IChoice[] }) {
    this._gameStore.getState().setChoices(choices)
    this._gameStore.getState().setGameState(GameState.MATCHUP_INTRO)
  }

  private onRoundResult(status: GameState) {
    this._gameStore.getState().setGameState(status)
  }

  private onPlayerDisconnected(status: GameState) {
    this._gameStore.getState().setGameState(status)
  }

  private onError(status: GameState) {
    this._gameStore.getState().setGameState(status)
  }

  emitJoinRoom() {
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM)
  }

  emitJoinRoomSingleplayer() {
    const uid = this._playerStore.getState().id
    const name = "Leonard"
    const roomId = `${SINGLE_PLAYER_PREFIX}-${uid}`

    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM, { uid, name, roomId })
  }

  emitPlayerChoice() {
    this._socket.emit(EVENTS.CLIENT.PLAYER_CHOICE)
  }
}
