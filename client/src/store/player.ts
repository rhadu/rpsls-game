import { IChoice } from "@/types/game"
import { nanoid } from 'nanoid'
import { create } from "zustand"

export const usePlayerState = create<{
  username: string
  setUsername: (username: string) => void
  id: string
  room: string
  setRoom: (room: string) => void
  joinedRoom: boolean
  setJoinedRoom: (joinedRoom: boolean) => void
  playerScore: number
  incrementPlayerScore: VoidFunction
  playerChoice: IChoice | null
  setPlayerChoice: (choice: IChoice) => void
}>((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  id: nanoid(),
  room: "",
  setRoom: (room) => set({ room }),
  joinedRoom: false,
  setJoinedRoom: (joinedRoom) => set({ joinedRoom }),
  playerScore: 0,
  incrementPlayerScore: () =>
    set((state) => ({ playerScore: state.playerScore + 1 })),
  playerChoice: null,
  setPlayerChoice: (choice: IChoice) => set({ playerChoice: choice }),
}))

export const useOpponentState = create<{
  opponentName: string
  setOpponentName: (name: string) => void
  opponentChoice: IChoice | null
  setOpponentChoice: (choice: IChoice) => void
  opponentScore: number
  incrementOpponentScore: VoidFunction
}>((set) => ({
  opponentName: ``,
  setOpponentName: (name) => set({ opponentName: name }),
  opponentChoice: null,
  setOpponentChoice: (choice: IChoice) => set({ opponentChoice: choice }),
  opponentScore: 0,
  incrementOpponentScore: () =>
    set((state) => ({ opponentScore: state.opponentScore + 1 })),
}))