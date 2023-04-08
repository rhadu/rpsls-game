import React from "react"
import Layout from "@/components/Layout"
import Logo from "@/components/Logo/index"
import Spacer from "@/components/Spacer"
import Link from "next/link"
import { motion } from "framer-motion"
import useGameState from "@/store/game"
import { GameState } from "@/types/game"

export interface IStartPageProps {}

const StartPage = ({}: IStartPageProps) => {
  const { setGameState } = useGameState((state) => ({
    setGameState: state.setGameState,
  }))

  React.useEffect(() => {
    setGameState(GameState.WAITING_PLAYERS)
  }, [setGameState])
  return (
    <motion.div className="flex flex-col items-center justify-between h-full">
      <motion.header className="py-10">
        <Logo />
      </motion.header>

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
          <Link
            href="/single"
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Sheldon
          </Link>
          <Link
            href="/"
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Friend or Foe
          </Link>
        </div>
      </motion.div>
      <motion.div
        exit={{ y: 20, opacity: 0 }}
        className="py-24 text-xl text-white "
      >
        How to play?
      </motion.div>
    </motion.div>
  )
}
export default StartPage
