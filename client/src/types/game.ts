export enum GameState {
  WAITING_PLAYERS = "WAITING_PLAYERS",
  MATCHUP_INTRO = "MATCHUP_INTRO",
  CHOICE_SELECTION = "CHOICE_SELECTION",
  RESULTS_DISPLAY = "RESULTS_DISPLAY",
  GAME_WINNER = "GAME_WINNER",
}

export interface IChoice {
  id: number
  name: string
}

export type Player = {
  socketId: string
  uid: string
  name: string
  character: string
}

export type GamePlayers = {
  playerA: Player
  playerB: Player
}

export type Results = {
  winner: PlayerTag | "draw"
  playerA: { uid: string; choice: number; score: number }
  playerB: { uid: string; choice: number; score: number }
  round: number
}

export type PlayerTag = "playerA" | "playerB"

export type GameType = "single" | "multi"
