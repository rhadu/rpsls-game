import React from "react"
import { motion } from "framer-motion"
import Logo from "../Logo"
import { useOpponentState, usePlayerState } from "@/store/player"
import { shallow } from "zustand/shallow"
import Image  from "next/image"
import sheldonUrl from "public/avatars/sheldon.png"

export interface IHeaderProps {
  showHeadshot?: boolean
}

const Header = ({ showHeadshot }: IHeaderProps) => {
  const { playerScore } = usePlayerState(
    (state) => ({
      playerScore: state.playerScore,
    }),
    shallow,
  )
  const { opponentScore } = useOpponentState(
    (state) => ({
      opponentScore: state.opponentScore,
    }),
    shallow,
  )

  return (
    <motion.header className="flex gap-20 pt-10">
      {showHeadshot && (
        <motion.div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.div
            layoutId="playerA"
            className="rounded-full  w-[100px] bg-yellow-300 h-[100px]"
          ></motion.div>
          <motion.span className="flex-1 text-3xl font-semibold text-center">
            {playerScore} / 3
          </motion.span>
        </motion.div>
      )}

      <Logo width={100} />
      {showHeadshot && (
        <motion.div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.span className="flex-1 text-3xl font-semibold text-center">
            {opponentScore} / 3
          </motion.span>

          <motion.div
            layoutId="playerB"
            className="rounded-full w-[100px] bg-yellow-300 h-[100px] justify-self-end"
          >
            <Image
              src={sheldonUrl}
              className="mx-auto w-[100px] h-[100px] border-4 border-yellow-300 rounded-full"
              alt="Avatar"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header
