import { Socket } from "socket.io-client"

import { useSocket } from "@/contexts/SocketContext"
import useGameState from "@/store/game"
import { useOpponentState, usePlayerState } from "@/store/player"
import EVENTS from "@/config/events"
import { GameState, IChoice, Results, PlayerTag } from "@/types/game"
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
    this.onPlayerTag = this.onPlayerTag.bind(this)
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
    this._socket.on(EVENTS.SERVER.PLAYER_TAG, this.onPlayerTag)
  }

  private onStartGame({ choices }: { choices: IChoice[] }) {
    this.resetGameAndPlayerState()
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

  private onPlayerTag({ tag }: { tag: PlayerTag }) {
    const opponentTag: PlayerTag = tag === "playerA" ? "playerB" : "playerA"
    this._playerStore.setState({ playerTag: tag })
    this._opponentStore.setState({ opponentTag })
  }

  emitJoinRoom() {
    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM)
  }

  emitJoinRoomSingleplayer() {
    const uid = this._playerStore.getState().id
    const name = "Leonard"
    const roomId = `${SINGLE_PLAYER_PREFIX}-${uid}`

    this._socket.emit(EVENTS.CLIENT.JOIN_ROOM, { uid, name, roomId }, () => {})
  }

  emitPlayerChoice(choiceId: number) {
    this._socket.emit(EVENTS.CLIENT.PLAYER_CHOICE, { choiceId })
  }

  resetGameAndPlayerState() {
    this.resetRound()
    this._playerStore.setState({ playerScore: 0 })
    this._opponentStore.setState({ opponentScore: 0 })
    this._gameStore.setState({ gameState: GameState.MATCHUP_INTRO })
  }

  resetRound() {
    this._gameStore.setState({ roundWinner: "" })
  }
}
