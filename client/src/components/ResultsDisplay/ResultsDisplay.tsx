import { motion } from "framer-motion"
import React from "react"
import Choice from "../Choice"
import Logo from "../Logo"
import useGameState from "@/store/game"
import Spacer from "@/components/Spacer"
import { GameState } from "@/types/game"

export interface IResultsDisplayProps {}

const ResultsDisplay = ({}: IResultsDisplayProps) => {
  const { choice, setGameState } = useGameState()

  function handleNextRound() {
    setGameState(GameState.CHOICE_SELECTION)
  }

  return (
    <motion.div className="flex flex-col items-center h-full">
      <motion.header className="flex gap-32 pt-10">
        <motion.div
          layoutId="playerA"
          className="rounded-full w-[100px] bg-yellow-300 h-[100px]"
        ></motion.div>
        <Logo width={100} />
        <motion.div
          layoutId="playerB"
          className="rounded-full w-[100px] bg-yellow-300 h-[100px]"
        ></motion.div>
      </motion.header>
      <Spacer size="200px" />
      <motion.div
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-20"
      >
        <Choice
          id={0}
          size="200px"
          syncAnimationId={`player-choice-${choice}`}
          name={choice}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.8 } }}
          exit={{ y: 20, opacity: 0 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="text-3xl font-bold text-yellow-300">You Win</div>
          <button
            onClick={handleNextRound}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            Next Round
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          exit={{ y: 20, opacity: 0 }}
        >
          <Choice id={1} name={"lizard"} size="200px" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ResultsDisplay
