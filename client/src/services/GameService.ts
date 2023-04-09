import { Socket } from "socket.io-client"

import { useSocket } from "@/contexts/SocketContext"
import useGameState from "@/store/game"
import { useOpponentState, usePlayerState } from "@/store/player"
import EVENTS from "@/config/events"
import { GameState, IChoice, Results } from "@/types/game"
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
    this._gameStore.setState({ choices })
    this._gameStore.setState({ gameState: GameState.MATCHUP_INTRO })
  }

  private onRoundResult(results: Results) {
    const { choices } = this._gameStore.getState()
    const { id: curentPlayerId } = this._playerStore.getState()

    const opponentChoiceId =
      results.playerA.uid === curentPlayerId
        ? results.playerB.choice
        : results.playerA.choice

    const opponentChoice = choices.find((c) => c.id === opponentChoiceId)!
    this._opponentStore.setState({ opponentChoice })
  }

  private onPlayerDisconnected(status: GameState) {
    //TODO handle disconnect
    alert("player disconnected")
  }

  private onError(errorMessage: string) {
    //TODO handle onError
    alert(errorMessage)
  }

  emitJoinRoom() {
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM)
  }

  emitJoinRoomSingleplayer() {
    const uid = this._playerStore.getState().id
    const name = "Leonard"
    const roomId = `${SINGLE_PLAYER_PREFIX}-${uid}`

    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM, { uid, name, roomId }, ()=>{})
  }

  emitPlayerChoice(choiceId: number) {
    this._socket.emit(EVENTS.CLIENT.PLAYER_CHOICE, { choiceId })
  }
}
