import { Socket } from 'socket.io-client';

import { useSocket } from '@/contexts/SocketContext';
import useGameState from '@/store/game';
import { GameState } from '@/types/game';

export default class GameService {
  private _socket: Socket;
  private _gameStore = useGameState;

  constructor(webSocketContext: ReturnType<typeof useSocket>) {
    this._socket = webSocketContext.socket;

    this.initializeSocketEvents();
  }

  initializeSocketEvents() {
    this._socket.on('gameStatusUpdate', this.onGameStatusUpdate);
  }

  onGameStatusUpdate(status: GameState) {
    this._gameStore.getState().setGameState(status)
  }

  emitHandshake() {
    this._socket.emit("join-room", 123)
  }
}
