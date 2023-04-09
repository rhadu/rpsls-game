import React from "react"
import { motion } from "framer-motion"

import Header from "../Header"

export interface IWaitingRoomProps {}

const WaitingRoom = ({}: IWaitingRoomProps) => {
  return (
    <motion.div className="flex flex-col items-center h-full">
      <Header />

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
