import { GameState, IChoice, PlayerTag } from "@/types/game"
import { create } from "zustand"

export const useGameState = create<{
  room: string
  setRoom: (id: string) => void
  choices: IChoice[]
  setChoices: (choices: IChoice[]) => void
  roundCount: number
  setRoundCount: (roundCount: number) => void
  roundWinner: PlayerTag | "draw" | ""
  gameState: GameState
  setGameState: (state: GameState) => void
  gameStarted: boolean
  setGameStarted: (flag: boolean) => void
}>((set) => ({
  room: "",
  setRoom: (roomId) => set({ room: roomId }),
  choices: null as unknown as IChoice[],
  setChoices: (choices) => set({ choices }),
  roundCount: 0,
  setRoundCount: (roundCount) => set({ roundCount: roundCount }),
  roundWinner: "",
  gameState: GameState.WAITING_PLAYERS,
  setGameState: (state: GameState) => set({ gameState: state }),
  gameStarted: false,
  setGameStarted: (flag) => set({ gameStarted: flag }),
}))

export default useGameState
