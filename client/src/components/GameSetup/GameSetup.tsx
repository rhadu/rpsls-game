import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useGameService } from "@/contexts/GameServiceContext"
import Header from "@/components/Header"
import GameTypeSelector from "../GameTypeSelector"
import CharacterSelector from "../CharacterSelector"
import { shallow } from "zustand/shallow"
import useGameState from "@/store/game"

export interface IGameSetupProps {}

function GameSetup({}: IGameSetupProps) {
  const { gameType } = useGameState(
    (state) => ({
      gameType: state.gameType,
    }),
    shallow,
  )

  const gameService = useGameService()

  function handleGameModeSelection(mode: "single" | "multi"): void {
    if (mode === "single") gameService.emitJoinRoomSingleplayer()
    else gameService.emitJoinRoom()
  }

  return (
    <motion.div exit={{}} className="flex flex-col items-center h-full">
      <Header />
      <AnimatePresence mode="wait">
        {!gameType ? (
          <GameTypeSelector key="gameTypeSelector" />
        ) : (
          <CharacterSelector key="characterSelector" />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default GameSetup
