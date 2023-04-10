import Game from "@/components/Game"
import Layout from "@/components/Layout"
import GameSetup from "@/components/GameSetup"
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
        {!gameStarted ? <GameSetup key='gameSetup' /> : <Game key='game'/>}
      </AnimatePresence>
    </Layout>
  )
}
