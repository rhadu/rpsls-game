export type Choice = {
  id: number
  name: string
}

export type Player = {
  socketId: string
  name: string
}

export type Results = {
  winner: string
  playerA: number
  playerB: number
  round: number
}

export type Lobby = {
  playerA: Player | null
  playerB: Player | null
  choices: { playerA: number | null; playerB: number | null }
  round: number
  scores: { playerA: number; playerB: number }
}

export const determineWinner = (
  idA: number,
  idB: number,
): "playerA" | "playerB" | "draw" => {
  if (idA === idB) return "draw"
  if (
    (idA === 1 && idB === 3) ||
    (idA === 2 && idB === 1) ||
    (idA === 3 && idB === 2)
  ) {
    return "playerA"
  }
  return "playerB"
}
