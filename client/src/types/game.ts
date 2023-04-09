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
  winner: string
  playerA: { uid: string; choice: number };
  playerB: { uid: string; choice: number };
  round: number
}

export type PlayerTag = "playerA" | "playerB"