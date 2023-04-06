import Layout from "@/components/Layout"
import Logo from "@/components/Logo"
import Spacer from "@/components/Spacer"
import { AnimatePresence, motion } from "framer-motion"
import React, { ReactNode } from "react"

type GameStates = "loading" | "playing"

const uiOptions: Record<GameStates, ReactNode> = {
  loading: <Loading key="loading" />,
  playing: <Playing key="playing" />,
}

export default function SinglePlayerPage() {
  const [gameState, setGameState] = React.useState<GameStates>("loading")
  const gamingComponent = uiOptions[gameState]

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setGameState("playing")
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  })


  return (
    <Layout>
      <motion.main className="flex flex-col items-center">
        <motion.div layoutId="logo" className="py-10">
          <Logo width={100} />
        </motion.div>
        <Spacer size={"200px"} />
        <AnimatePresence mode="wait">{gamingComponent}</AnimatePresence>
      </motion.main>
    </Layout>
  )
}

function Loading() {
  return (
    <motion.span
      key="loading"
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
      Waiting for opponent to join
    </motion.span>
  )
}

function Playing() {
  return (
    <motion.div
      key="playing"
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: 10,
        opacity: 0,
      }}
    >
      <div>You</div>
      <div>VS.</div>
      <div>Sheldon</div>
    </motion.div>
  )
}
