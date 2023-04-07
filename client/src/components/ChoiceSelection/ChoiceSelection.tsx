import { motion } from "framer-motion"
import React from "react"
import Logo from "../Logo"
import { GameState } from "@/types/game"
import useGameState from "@/store/game"

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

const CHOICES = [
  {
    id: 1,
    name: "rock",
  },
  {
    id: 2,
    name: "paper",
  },
  {
    id: 3,
    name: "scissors",
  },
  {
    id: 4,
    name: "lizard",
  },
  {
    id: 5,
    name: "spock",
  },
]

const ChoiceSelection = ({}: IChoiceSelectionProps) => {
  const { setGameState } = useGameState((state) => ({
    setGameState: state.setGameState,
  }))
  function handleClick(choice: string) {
    console.log({ choice })
    setGameState(GameState.RESULTS_DISPLAY)
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
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 pt-24 choice-container"
      >
        {CHOICES.map(({ id, name }) => (
          <motion.div
            key={id}
            variants={item}
            className="cursor-pointer circle"
            onClick={() => handleClick(name)}
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ChoiceSelection
