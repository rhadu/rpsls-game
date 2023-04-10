import { motion } from "framer-motion"
import React from "react"
import Spacer from "../Spacer"
import useGameState from "@/store/game"
import { shallow } from "zustand/shallow"
import { GameType } from "@/types/game"

export interface IGameTypeSelectorProps {}

const GameTypeSelector = ({}: IGameTypeSelectorProps) => {
  const { setGameType } = useGameState(
    (state) => ({
      setGameType: state.setGameType,
    }),
    shallow,
  )

  function handleGameTypeSelection(gameType: GameType) {
    setGameType(gameType)
  }

  return (
    <>
      <Spacer size="200px" />
      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: 20,
          opacity: 0,
        }}
        className="flex flex-col gap-32"
      >
        <motion.div>
          <p className="text-5xl font-semibold text-white w-fit">
            Select a mode to start playing
          </p>
        </motion.div>
        <div className="flex gap-12">
          <button
            onClick={() => handleGameTypeSelection("single")}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Sheldon
          </button>
          <button
            onClick={() => handleGameTypeSelection("multi")}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Friend or Foe
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default GameTypeSelector
