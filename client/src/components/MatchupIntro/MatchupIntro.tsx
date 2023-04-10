/* eslint-disable @next/next/no-img-element */
import React from "react"
import { motion } from "framer-motion"
import useGameState from "@/store/game"
import { GameState } from "@/types/game"

import Header from "../Header"
import { shallow } from "zustand/shallow"
import { useOpponentState, usePlayerState } from "@/store/player"
import sheldonUrl from "public/avatars/sheldon.png"
import Image from 'next/image'

export interface IMatchupIntroProps {}

const MatchupIntro = ({}: IMatchupIntroProps) => {
  const { setGameState } = useGameState(
    (state) => ({
      setGameState: state.setGameState,
    }),
    shallow,
  )

  const { playerCharacter } = usePlayerState(
    (state) => ({
      playerCharacter: state.character,
    }),
    shallow,
  )

  const { opponentCharacter } = useOpponentState(
    (state) => ({
      opponentCharacter: state.opponentCharacter,
    }),
    shallow,
  )

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setGameState(GameState.CHOICE_SELECTION)
    }, 2500)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [setGameState])

  return (
    <motion.div className="flex flex-col items-center justify-between h-full">
      <Header />

      <motion.div className="flex items-center gap-20">
        <motion.div
          initial={{
            x: "-100%",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 0.3,
              ease: [0.32, 0.23, 0.4, 0.9],
            },
          }}
          layoutId="playerA"
          className="rounded-full w-[200px] bg-yellow-300  h-[200px]"
        >
          <motion.span className="text-3xl text-white ">
            {playerCharacter}
          </motion.span>
        </motion.div>
        <motion.span
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.75,
              ease: [0.32, 0.23, 0.4, 0.9],
            },
          }}
          exit={{
            y: 10,
            opacity: 0,
          }}
          className="text-3xl font-bold text-yellow-300 "
        >
          VS.
        </motion.span>
        <motion.div
          initial={{
            x: "100%",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.6,
              duration: 0.3,
              ease: [0.32, 0.23, 0.4, 0.9],
            },
          }}
          layoutId="playerB"
          className="rounded-full w-[200px] bg-yellow-300  h-[200px]"
        >
          <Image
            src={sheldonUrl}
            className="mx-auto w-[200px] h-[200px] rounded-full border-4 border-yellow-300"
            alt="Avatar"
          />
        </motion.div>
      </motion.div>
      <div className="h-[200px]"></div>
    </motion.div>
  )
}

export default MatchupIntro
