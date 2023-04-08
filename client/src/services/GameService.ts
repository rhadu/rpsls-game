import { Socket } from "socket.io-client"

import { useSocket } from "@/contexts/SocketContext"
import useGameState from "@/store/game"
import { GameState } from "@/types/game"
import EVENTS from "@/config/events"

export default class GameService {
  private _socket: Socket
  private _gameStore = useGameState

  constructor(webSocketContext: ReturnType<typeof useSocket>) {
    this._socket = webSocketContext.socket

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

  private onStartGame(status: GameState) {
    this._gameStore.getState().setGameState(status)
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
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM )
  }

  emitPlayerChoice() {
    this._socket.emit(EVENTS.CLIENT.PLAYER_CHOICE )
  }
}
