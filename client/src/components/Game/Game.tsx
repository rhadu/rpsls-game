import React, { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { GameState } from "@/types/game"
import useGameState from "@/store/game"

import WaitingRoom from "@/components/WaitingRoom/"
import ChoiceSelection from "@/components/ChoiceSelection"
import MatchupIntro from "@/components/MatchupIntro"
import ResultsDisplay from "@/components/ResultsDisplay"
import { shallow } from "zustand/shallow"

export interface IGameProps {}

const uiOptions: Record<GameState, ReactNode> = {
  [GameState.WAITING_PLAYERS]: <WaitingRoom key={GameState.WAITING_PLAYERS} />,
  [GameState.MATCHUP_INTRO]: <MatchupIntro key={GameState.MATCHUP_INTRO} />,
  [GameState.CHOICE_SELECTION]: (
    <ChoiceSelection key={GameState.CHOICE_SELECTION} />
  ),
  [GameState.RESULTS_DISPLAY]: (
    <ResultsDisplay key={GameState.RESULTS_DISPLAY} />
  ),
}

const Game = ({}: IGameProps) => {
  const { gameState } = useGameState(
    (state) => ({
      gameState: state.gameState,
    }),
    shallow,
  )

  const gamingStateComponent = uiOptions[gameState]

  return <AnimatePresence mode="wait">{gamingStateComponent}</AnimatePresence>
}

export default Game
