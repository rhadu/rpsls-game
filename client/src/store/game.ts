import { GameState } from "@/types/game"
import { create } from "zustand"

interface IGameState {
  playerName: string
  setPlayerName: (name: string) => void
  choice: string
  setPlayerChoice: (choice: string) => void
  playerScore: number
  incrementPlayerScore: VoidFunction
  opponentName: string
  setOpponentName: (name: string) => void
  opponentChoice: string
  setOpponentChoice: (choice: string) => void
  opponentScore: number
  incrementOpponentScore: VoidFunction
  room: string
  setRoom: (id: string) => void
  roundCount: number
  setRoundCount: (roundCount: number) => void
  gameState: GameState | undefined
  setGameState: (state: GameState) => void
  gameStatus: string
  setGameStatus: (status: string) => void
}

const useGameState = create<IGameState>((set) => ({
  playerName: "",
  setPlayerName: (name) => set({ playerName: name }),
  choice: "",
  setPlayerChoice: (choice) => set({ choice: choice }),
  playerScore: 0,
  incrementPlayerScore: () =>
    set((state) => ({ playerScore: state.playerScore + 1 })),
  opponentName: "",
  setOpponentName: (name) => set({ opponentName: name }),
  opponentChoice: "",
  setOpponentChoice: (choice) => set({ opponentChoice: choice }),
  opponentScore: 0,
  incrementOpponentScore: () =>
    set((state) => ({ opponentScore: state.opponentScore + 1 })),
  room: "",
  setRoom: (roomId) => set({ room: roomId }),
  roundCount: 0,
  setRoundCount: (roundCount) => set({ roundCount: roundCount }),
  gameState: GameState.WAITING_PLAYERS,
  setGameState: (state: GameState) => set({ gameState: state }),
  gameStatus: "",
  setGameStatus: (status) => set({ gameStatus: status }),
}))

export default useGameState
