import { PlayerTag } from "@/types/game"
import React from "react"
import Image from "next/image"
import useGameState from "@/store/game"
import { useOpponentState, usePlayerState } from "@/store/player"
import { shallow } from "zustand/shallow"
import { CHARACTERS, sheldonUrl } from "@/config/characters"
import clsx from "clsx"

export interface IAvatarProps {
  size: "small" | "large"
  player: "current" | "opponent"
}

const Avatar = ({ size, player }: IAvatarProps) => {
  const { gameType } = useGameState(
    (state) => ({
      gameType: state.gameType,
    }),
    shallow,
  )
  const { playerCharacter } = usePlayerState(
    (state) => ({
      playerCharacter: state.character,
    }),
    shallow,
  )

  const { opponentCharacter } = useOpponentState(
    (state) => ({
      opponentCharacter: state.opponentCharacter,
    }),
    shallow,
  )

  const playerAvatarUrl =
    CHARACTERS.find((c) => c.name === playerCharacter)?.url || ""
  const opponentAvatarUrl =
    gameType === "single"
      ? sheldonUrl
      : CHARACTERS.find((c) => c.name === opponentCharacter)?.url || ""

  const avatarUrl = player === "current" ? playerAvatarUrl : opponentAvatarUrl
  return (
    <Image
      src={avatarUrl}
      className={clsx(
        "mx-auto rounded-full border-4 border-yellow-300",
        size === 'small' && 'w-[100px] h-[100px]',
        size === 'large' && 'w-[200px] h-[200px]'
      )}
      alt={`${playerCharacter} Character Avatar`}
    />
  )
}

export default Avatar
