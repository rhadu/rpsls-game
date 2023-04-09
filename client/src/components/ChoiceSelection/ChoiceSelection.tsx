import React from "react"
import { motion } from "framer-motion"
import { shallow } from "zustand/shallow"

import Choice from "@/components/Choice"

import { GameState, IChoice } from "@/types/game"
import useGameState from "@/store/game"
import { usePlayerState } from "@/store/player"
import { useGameService } from "@/contexts/GameServiceContext"
import Header from "../Header"

export interface IChoiceSelectionProps {}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ease: [0.32, 0.23, 0.4, 0.9] } },
}

const ChoiceSelection = ({}: IChoiceSelectionProps) => {
  const { choices, setGameState } = useGameState(
    (state) => ({
      choices: state.choices,
      setGameState: state.setGameState,
    }),
    shallow,
  )

  const { setPlayerChoice } = usePlayerState()
  const gameService = useGameService()

  function handleChoiceSelection(choice: IChoice) {
    setPlayerChoice(choice)
    setGameState(GameState.RESULTS_DISPLAY)
    gameService.emitPlayerChoice(choice.id)
  }
  return (
    <motion.div exit={{}} className="flex flex-col items-center h-full">
      <Header showHeadshot={true} />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 pt-24 choice-container"
      >
        {choices.map((choice: IChoice) => (
          <Choice
            key={choice.id}
            id={choice.id}
            name={choice.name}
            syncAnimationId={`player-choice-${choice.name}`}
            handleClick={() => handleChoiceSelection(choice)}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ChoiceSelection
