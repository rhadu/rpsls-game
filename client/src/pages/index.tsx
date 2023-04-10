import Game from "@/components/Game"
import Layout from "@/components/Layout"
import StartPage from "@/components/StartPage"
import useGameState from "@/store/game"
import { AnimatePresence } from "framer-motion"
import { shallow } from "zustand/shallow"

export default function Home() {
  const { gameStarted } = useGameState(
    (state) => ({
      gameStarted: state.gameStarted,
    }),
    shallow,
  )

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {!gameStarted ? <StartPage key='startPage' /> : <Game key='gamePage'/>}
      </AnimatePresence>
    </Layout>
  )
}
