import React from "react"
import { motion } from "framer-motion"

import Header from "../Header"
import Spacer from "../Spacer"
import useGameState from "@/store/game"
import Avatar from "../Avatar"
import { usePlayerState } from "@/store/player"
import { useGameService } from "@/contexts/GameServiceContext"
import { shallow } from 'zustand/shallow'

export interface IGameWinnerProps {}

const GameWinner = ({}: IGameWinnerProps) => {
  const gameService = useGameService()
  
  const { gameWinner } = useGameState((state) => ({
    gameWinner: state.gameWinner,
  }), shallow)

  const { playerTag } = usePlayerState((state) => ({
    playerTag: state.playerTag,
  }), shallow)

  const gameEndMessage =
    playerTag === gameWinner ? "You WON the GAME !!!" : "You lost the game..."

  function onPlayAgainClick() {
    gameService.playAgain()
  }

  return (
    <motion.div className="container flex flex-col items-center h-full mx-auto">
      <Header />
      <Spacer size="200px" />
      <motion.div
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-20"
      >
        <motion.div
          layoutId="playerA"
          className="rounded-full  w-[200px] bg-yellow-300 h-[200px]"
        >
          <Avatar size="large" player="current" />
        </motion.div>
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="text-3xl font-bold text-yellow-300"
          >
            {gameWinner && gameEndMessage}
          </motion.div>
          <motion.button
            onClick={onPlayAgainClick}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
            whileHover={{ scale: 1.05 }}
            exit={{ y: 20, opacity: 0 }}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center bg-yellow-300 rounded-lg shadow-md cursor-pointer grow"
          >
            Play again?
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameWinner
