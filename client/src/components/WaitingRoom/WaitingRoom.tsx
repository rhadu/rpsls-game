import { motion } from "framer-motion"
import React from "react"
import Logo from "../Logo"
import Spacer from "../Spacer"
import useGameState from "@/store/game"
import { GameState } from "@/types/game"

export interface IWaitingRoomProps {}

const WaitingRoom = ({}: IWaitingRoomProps) => {
  const { setGameState } = useGameState((state) => ({
    setGameState: state.setGameState,
  }))

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      console.log("Waiting Room -> Matchup")
      setGameState(GameState.MATCHUP_INTRO)
    }, 1000)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [setGameState])
  return (
    <motion.div className="flex flex-col items-center h-full">
      <motion.header className="py-10">
        <Logo width={100} />
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
        className="py-40 text-3xl font-bold text-yellow-300 "
      >
        Waiting for Opponent ...
      </motion.div>
    </motion.div>
  )
}

export default WaitingRoom
