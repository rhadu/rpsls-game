import { motion } from "framer-motion"
import React from "react"
import Logo from "../Logo"
import Spacer from '../Spacer'

export interface IWaitingRoomProps {}

const WaitingRoom = ({}: IWaitingRoomProps) => {
  return (
    <motion.main className="flex flex-col items-center">
      <motion.div layoutId="logo" className="py-10">
        <Logo width={100} />
      </motion.div>
      <Spacer size={"200px"} />

      <motion.div
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -10,
          opacity: 0,
        }}
      >
        Hello , I am a WaitingRoom component.
      </motion.div>
    </motion.main>
  )
}

export default WaitingRoom
