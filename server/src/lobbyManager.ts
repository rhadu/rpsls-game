import { Server, Socket } from 'socket.io';
import { Choice, determineWinner, Lobby, Player, Results } from './types/game';

const choices: Choice[] = [
  { id: 1, name: 'rock' },
  { id: 2, name: 'paper' },
  { id: 3, name: 'scissors' },
];

const createLobby = (): Lobby => ({
  playerA: null,
  playerB: null,
  choices: { playerA: null, playerB: null },
  round: 0,
  scores: { playerA: 0, playerB: 0 },
});

export class LobbyManager {
  private lobbies: Record<string, Lobby> = {};

  constructor(private io: Server) {
    io.on('connection', (socket: Socket) => {
      console.log('User connecteds:', socket.id);

      socket.on('join-room', ({ name, roomId }) => {
        this.joinLobby(socket, name, roomId);
      });

      socket.on('player-choice', ({ id, roomId }) => {
        this.playerMakesChoice(socket, id, roomId);
      });

      socket.on('disconnect', () => {
        this.playerDisconnects(socket.id);
      });
    });
  }

  private emitStartGame(roomId: string) {
    if (this.lobbies[roomId].playerA && this.lobbies[roomId].playerB) {
      this.io.to(roomId).emit('start-game', { choices });
    }
  }

  private emitRoundResult(roomId: string, roundResult: Results) {
    this.io.to(roomId).emit('round-result', roundResult);
  }

  joinLobby(socket: Socket, name: string, roomId: string) {
    if (roomId.startsWith('single-player')) {
      const computerPlayer = { socketId: 'computer', name: 'Computer' };
      if (!this.lobbies[roomId]) {
        this.lobbies[roomId] = createLobby();
      }
      this.lobbies[roomId].playerA = { socketId: socket.id, name };
      this.lobbies[roomId].playerB = computerPlayer;
    } else {
      if (!this.lobbies[roomId]) {
        this.lobbies[roomId] = createLobby();
      }

      if (!this.lobbies[roomId].playerA) {
        this.lobbies[roomId].playerA = { socketId: socket.id, name };
        socket.join(roomId);
      } else if (
        !this.lobbies[roomId].playerB &&
        this.lobbies[roomId].playerA?.socketId !== socket.id
      ) {
        this.lobbies[roomId].playerB = { socketId: socket.id, name };
        socket.join(roomId);
      } else {
        socket.emit('error', 'Room is full.');
        return;
      }
    }

    if (roomId.startsWith('single-player')) {
      socket.emit('start-game', { choices });
    } else {
      this.emitStartGame(roomId);
    }
  }

  playerMakesChoice(socket: Socket, id: number, roomId: string) {
    const lobby = this.lobbies[roomId];

    if (!lobby) {
      return;
    }

    const playerA = lobby.playerA;
    const playerB = lobby.playerB;

    if (playerA && playerB) {
      if (socket.id === playerA.socketId) {
        lobby.choices.playerA = id;
      } else if (socket.id === playerB.socketId) {
        lobby.choices.playerB = id;
      }

      if (
        lobby.choices.playerA &&
        !lobby.choices.playerB &&
        playerB.socketId === 'computer'
      ) {
        lobby.choices.playerB = Math.floor(Math.random() * choices.length) + 1;
      }

      if (lobby.choices.playerA && lobby.choices.playerB) {
        const result = determineWinner(
          lobby.choices.playerA,
          lobby.choices.playerB
        );
        const winnerId =
          result === 'draw'
            ? 'draw'
            : result === 'playerA'
            ? playerA.socketId
            : playerB.socketId;

        if (result !== 'draw') {
          lobby.scores[result]++;
        }

        lobby.round++;

        const roundResult: Results = {
          winner: winnerId,
          playerA: lobby.choices.playerA,
          playerB: lobby.choices.playerB,
          round: lobby.round,
        };

        this.emitRoundResult(roomId, roundResult);

        lobby.choices.playerA = null;
        lobby.choices.playerB = null;

        // Emit end-game event if the game is over
        if (lobby.round === 3) {
          const winner =
            lobby.scores.playerA > lobby.scores.playerB
              ? playerA.socketId
              : lobby.scores.playerA < lobby.scores.playerB
              ? playerB.socketId
              : 'draw';

          this.io.to(roomId).emit('end-game', {
            winner,
            scores: lobby.scores,
          });
          delete this.lobbies[roomId];
        } else {
          this.emitStartGame(roomId);
        }
      } else {
        socket.to(roomId).emit('opponent-choice', { id });
      }
    }
  }

  playerDisconnects(socketId: string) {
    console.log('User disconnected:', socketId);
  }
}