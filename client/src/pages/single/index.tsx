import Game from "@/components/Game"
import Layout from "@/components/Layout"
import useGameState from "@/store/game"
import { GameState } from "@/types/game"
import React from "react"

export default function SinglePlayerPage() {
  
  return (
    <Layout>
      <Game />
    </Layout>
  )
}
