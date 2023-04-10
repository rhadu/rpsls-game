import useGameState from "@/store/game"
import { motion } from "framer-motion"
import React from "react"
import { shallow } from "zustand/shallow"
import Spacer from "../Spacer/index"
import { usePlayerState } from "@/store/player"
import clsx from "clsx"
import { useGameService } from "@/contexts/GameServiceContext"

export interface ICharacterSelectorProps {}

const characters = [
  {
    name: "Leonard",
    url: "",
  },
  {
    name: "Penny",
    url: "",
  },
  {
    name: "Rajesh",
    url: "",
  },
  {
    name: "Bernadette",
    url: "",
  },
  {
    name: "Howard",
    url: "",
  },
  {
    name: "Amy",
    url: "",
  },
]

const CharacterSelector = ({}: ICharacterSelectorProps) => {
  const gameService = useGameService()
  const { gameType } = useGameState(
    (state) => ({
      gameType: state.gameType,
    }),
    shallow,
  )

  const { character, setCharacter } = usePlayerState(
    (state) => ({
      character: state.character,
      setCharacter: state.setCharacter,
    }),
    shallow,
  )

  function handleStartGame() {
    if (gameType === "single") gameService.emitJoinRoomSingleplayer()
    else gameService.emitJoinRoom()
  }

  return (
    <>
      <Spacer size="100px" />
      <motion.div exit={{}} className="flex flex-col items-center gap-16">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-semibold text-center text-white w-fit"
        >
          Select a character
        </motion.p>
        <div className="flex flex-wrap justify-center gap-12 w-[500px]">
          {characters.map(({ name, url }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => setCharacter(name)}
            >
              <div
                className={clsx(
                  "w-24 h-24 text-white border-4 border-yellow-300 rounded-full ",
                  character === name &&
                    "outline-2 outline outline-offset-4 outline-yellow-100",
                )}
              ></div>
              <span className="text-white">{name}</span>
            </div>
          ))}
        </div>
        {character !== "" && (
          <motion.button
            onClick={handleStartGame}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1 w-full px-12 py-4 text-xl font-semibold text-center bg-yellow-300 rounded-lg shadow-md cursor-pointer max-w-fit grow"
          >
            Start Game
          </motion.button>
        )}
      </motion.div>
    </>
  )
}

export default CharacterSelector
