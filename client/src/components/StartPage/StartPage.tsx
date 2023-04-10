import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { useGameService } from "@/contexts/GameServiceContext"

import Header from "../Header"


export interface IStartPageProps {}

const StartPage = ({}: IStartPageProps) => {
  const gameService = useGameService()

  function handleGameModeSelection(mode: "single" | "multi"): void {
    if (mode === "single") gameService.emitJoinRoomSingleplayer()
    else gameService.emitJoinRoom()
  }

  return (
    <motion.div className="flex flex-col items-center justify-between h-full">
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
        className="flex flex-col gap-32"
      >
        <motion.div>
          <p className="text-5xl font-semibold text-white w-fit">
            Select a mode to start playing
          </p>
        </motion.div>
        <div className="flex gap-12">
          <button
            onClick={() => handleGameModeSelection("single")}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Sheldon
          </button>
          <button
            onClick={() => handleGameModeSelection("multi")}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105"
          >
            VS. Friend or Foe
          </button>
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
