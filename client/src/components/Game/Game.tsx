import { AnimatePresence, motion } from "framer-motion"
import React, { ReactNode } from "react"
import Logo from "../Logo"
import Spacer from "../Spacer"
import WaitingRoom from "../WaitingRoom"
import MatchupIntro from "../MatchupIntro"
import ChoiceSelection from "../ChoiceSelection"
import ResultsDisplay from "../ResultsDisplay"
import { GameState } from "@/types/game"
import useGameState from "@/store/game"

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
  const { gameState } = useGameState()

  const gamingComponent = uiOptions[gameState || GameState.WAITING_PLAYERS]
  
  return <AnimatePresence mode="wait">{gamingComponent}</AnimatePresence>
}

export default Game
