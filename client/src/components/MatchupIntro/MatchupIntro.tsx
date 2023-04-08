import useGameState from "@/store/game"
import { GameState } from "@/types/game"
import { motion } from "framer-motion"
import React from "react"
import Logo from '../Logo'


export interface IMatchupIntroProps {}

const MatchupIntro = ({}: IMatchupIntroProps) => {
  const { setGameState } = useGameState((state) => ({
    setGameState: state.setGameState,
  }))

  React.useEffect(() => {
    const timeoutId2 = window.setTimeout(() => {
      console.log("Matchup -> ChoiceSelection")
      setGameState(GameState.CHOICE_SELECTION)
    }, 2200)
    return () => {
      window.clearTimeout(timeoutId2)
    }
  }, [setGameState])

  return (
    <motion.div className="flex flex-col items-center h-full">
      <motion.header className="flex gap-32 py-10">
        <Logo width={100} />
      </motion.header>

      <motion.div className="flex items-center flex-1 gap-20">
        <motion.div
          initial={{
            x: "-100%",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              ease: [0.32, 0.23, 0.4, 0.9],
            },
          }}
          layoutId="playerA"
          className="rounded-full w-[200px] bg-yellow-300  h-[200px]"
        ></motion.div>
        <motion.span
          exit={{
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
              delay: 0.3,
              ease: [0.32, 0.23, 0.4, 0.9],
            },
          }}
          layoutId="playerB"
          className="rounded-full w-[200px] bg-yellow-300  h-[200px]"
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MatchupIntro
