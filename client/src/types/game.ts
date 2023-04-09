export enum GameState {
  WAITING_PLAYERS = "WAITING_PLAYERS",
  MATCHUP_INTRO = "MATCHUP_INTRO",
  CHOICE_SELECTION = "CHOICE_SELECTION",
  RESULTS_DISPLAY = "RESULTS_DISPLAY",
}

export interface IChoice {
  id: number
  name: string
}

export type Results = {
  winner: PlayerTag | "draw"
  playerA: { uid: string; choice: number; score: number }
  playerB: { uid: string; choice: number; score: number }
  round: number
}

export type PlayerTag = "playerA" | "playerB"
