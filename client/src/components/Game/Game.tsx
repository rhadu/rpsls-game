import { AnimatePresence, motion } from "framer-motion"
import React, { ReactNode } from "react"
import Logo from "../Logo"
import Spacer from "../Spacer"
import WaitingRoom from "../WaitingRoom"
import MatchupIntro from "../MatchupIntro"
import ChoiceSelection from "../ChoiceSelection"
import ResultsDisplay from "../ResultsDisplay"

export interface IGameProps {}

enum GameState {
  WAITING_PLAYERS = "WAITING_PLAYERS",
  MATCHUP_INTRO = "MATCHUP_INTRO",
  CHOICE_SELECTION = "CHOICE_SELECTION",
  RESULTS_DISPLAY = "RESULTS_DISPLAY",
}

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
  const agameState = GameState.WAITING_PLAYERS
  const gamingComponent = uiOptions[agameState]
  return <>{gamingComponent}</>
}

export default Game
