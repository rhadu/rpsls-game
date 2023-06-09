export type Choice = {
  id: number
  name: string
}

export type Player = {
  socketId: string
  uid: string
  name: string
  character: string
}

export type Results = {
  winner: string
  playerA: { uid: string; choice: number; score: number }
  playerB: { uid: string; choice: number; score: number }
  round: number
}

export type Lobby = {
  playerA: Player | null
  playerB: Player | null
  choices: { playerA: number | null; playerB: number | null }
  round: number
  scores: { playerA: number; playerB: number }
}
