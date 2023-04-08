export const determineWinner = (
  idA: number,
  idB: number,
): "playerA" | "playerB" | "draw" => {
  if (idA === idB) return "draw"

  const winningCombinations: { [key: number]: number[] } = {
    1: [3, 4], // rock: scissors, lizard
    2: [1, 5], // paper: rock, spock
    3: [2, 4], // scissors: paper, lizard
    4: [5, 2], // lizard: spock, paper
    5: [3, 1], // spock: scissors, rock
  }

  if (winningCombinations[idA].includes(idB)) {
    return "playerA"
  } else {
    return "playerB"
  }
}
