import { GameState } from "@/types/game"
import { create } from "zustand"

export const useGameState = create<{
  room: string
  setRoom: (id: string) => void
  roundCount: number
  setRoundCount: (roundCount: number) => void
  gameState: GameState | undefined
  setGameState: (state: GameState) => void
}>((set) => ({
  room: "",
  setRoom: (roomId) => set({ room: roomId }),
  roundCount: 0,
  setRoundCount: (roundCount) => set({ roundCount: roundCount }),
  gameState: GameState.WAITING_PLAYERS,
  setGameState: (state: GameState) => set({ gameState: state })
}))

export default useGameState
