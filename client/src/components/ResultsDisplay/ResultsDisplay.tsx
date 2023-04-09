import React from "react"
import { motion } from "framer-motion"
import { shallow } from "zustand/shallow"

import useGameState from "@/store/game"
import { GameState } from "@/types/game"
import { useOpponentState, usePlayerState } from "@/store/player"

import Choice from "@/components/Choice"
import Spacer from "@/components/Spacer"
import Header from "../Header"
import { useGameService } from "@/contexts/GameServiceContext"

export interface IResultsDisplayProps {}

const ResultsDisplay = ({}: IResultsDisplayProps) => {
  const gameService = useGameService()

  const { gameState, roundWinner } = useGameState(
    (state) => ({
      gameState: state.gameState,
      roundWinner: state.roundWinner,
    }),
    shallow,
  )
  const { playerChoice, playerTag } = usePlayerState(
    (state) => ({
      playerChoice: state.playerChoice,
      playerTag: state.playerTag,
    }),
    shallow,
  )
  const { opponentChoice } = useOpponentState(
    (state) => ({
      opponentChoice: state.opponentChoice,
    }),
    shallow,
  )

  const roundWinnerMessage =
    roundWinner === "draw"
      ? "It's a draw"
      : roundWinner === playerTag
      ? "You won!"
      : "You lost..."

  function handleNextRound() {
    gameService.goToNextRound()
  }

  return (
    <motion.div className="container flex flex-col items-center h-full mx-auto">
      <Header showHeadshot={true} />
      <Spacer size="200px" />
      <motion.div
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-20"
      >
        <motion.div
          exit={{ y: 0, opacity: 0 }}
          className="flex flex-col items-center gap-20"
        >
          <Choice
            id={playerChoice?.id}
            size="200px"
            syncAnimationId={`player-choice-${playerChoice?.name}`}
            name={playerChoice!.name}
          />
          {!opponentChoice && gameState !== GameState.CHOICE_SELECTION && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.8 } }}
              exit={{ y: 20, opacity: 0 }}
              className="text-3xl font-bold text-yellow-300"
            >
              Waiting for opponent choice
            </motion.div>
          )}
        </motion.div>

        {opponentChoice && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.8 } }}
            exit={{ y: 20, opacity: 0 }}
            className="flex flex-col items-center gap-10"
          >
            <div className="text-3xl font-bold text-yellow-300">
              {roundWinnerMessage}
            </div>
            <button
              onClick={handleNextRound}
              className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
            >
              Next Round
            </button>
          </motion.div>
        )}

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
