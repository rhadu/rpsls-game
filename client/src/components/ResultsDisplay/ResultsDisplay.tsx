import React from "react"
import { motion } from "framer-motion"
import { shallow } from "zustand/shallow"

import useGameState from "@/store/game"
import { GameState } from "@/types/game"
import { useOpponentState, usePlayerState } from "@/store/player"

import Choice from "@/components/Choice"
import Logo from "@/components/Logo"
import Spacer from "@/components/Spacer"

export interface IResultsDisplayProps {}

const ResultsDisplay = ({}: IResultsDisplayProps) => {
  const { setGameState } = useGameState(
    (state) => ({
      setGameState: state.setGameState,
    }),
    shallow,
  )
  const { playerChoice } = usePlayerState(
    (state) => ({
      playerChoice: state.playerChoice,
    }),
    shallow,
  )
  const { opponentChoice } = useOpponentState(
    (state) => ({
      opponentChoice: state.opponentChoice,
    }),
    shallow,
  )

  function handleNextRound() {
    setGameState(GameState.CHOICE_SELECTION)
  }

  return (
    <motion.div className="container flex flex-col items-center h-full mx-auto">
      <motion.header className="flex gap-20 pt-10">
        <div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.div
            layoutId="playerA"
            className="rounded-full  w-[100px] bg-yellow-300 h-[100px]"
          ></motion.div>
          <motion.span className="flex-1 text-3xl font-semibold text-center">
            3 / 2
          </motion.span>
        </div>

        <Logo width={100} />
        <motion.div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.span className="flex-1 text-3xl font-semibold text-center">
            3 / 2
          </motion.span>

          <motion.div
            layoutId="playerB"
            className="rounded-full w-[100px] bg-yellow-300 h-[100px] justify-self-end"
          ></motion.div>
        </motion.div>
      </motion.header>
      <Spacer size="200px" />
      <motion.div
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-20"
      >
        <motion.div exit={{ y: 0, opacity: 0 }}>
          <Choice
            id={playerChoice?.id}
            size="200px"
            syncAnimationId={`player-choice-${playerChoice?.name}`}
            name={playerChoice!.name}
          />
        </motion.div>

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

        {opponentChoice && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            exit={{ y: 0, opacity: 0 }}
          >
            <Choice
              id={opponentChoice?.id}
              size="200px"
              name={opponentChoice!.name}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ResultsDisplay
