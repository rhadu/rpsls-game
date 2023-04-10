import { IChoice, PlayerTag } from "@/types/game"
import { nanoid } from "nanoid"
import { create } from "zustand"

export const usePlayerState = create<{
  username: string
  setUsername: (username: string) => void
  character: string
  setCharacter: (character: string) => void
  id: string
  room: string
  playerTag: PlayerTag
  setPlayerTag: (tag: PlayerTag) => void
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
  character: "",
  setCharacter:(character) => set({ character }),
  id: nanoid(),
  room: "",
  playerTag: null as unknown as PlayerTag,
  setPlayerTag: (tag) => set({ playerTag: tag }),
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
  opponentTag: PlayerTag
  setOpponentTag: (tag: PlayerTag) => void
  opponentScore: number
  incrementOpponentScore: VoidFunction
}>((set) => ({
  opponentName: ``,
  setOpponentName: (name) => set({ opponentName: name }),
  opponentChoice: null,
  setOpponentChoice: (choice: IChoice) => set({ opponentChoice: choice }),
  opponentTag: null as unknown as PlayerTag,
  setOpponentTag: (tag) => set({ opponentTag: tag }),
  opponentScore: 0,
  incrementOpponentScore: () =>
    set((state) => ({ opponentScore: state.opponentScore + 1 })),
}))
