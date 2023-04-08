import { Variants, motion } from "framer-motion"
import React, { MouseEventHandler } from "react"

export interface IChoiceProps {
  id: number | undefined
  name: string
  syncAnimationId?: string
  size?: string
  handleClick?: MouseEventHandler<HTMLElement>
}

const itemAnimations: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ease: [0.32, 0.23, 0.4, 0.9] } },
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const Choice = ({ size, name, handleClick, syncAnimationId }: IChoiceProps) => {
  return (
    <motion.div
      layoutId={syncAnimationId}
      variants={itemAnimations}
      style={{ "--circle-size": size } as React.CSSProperties}
      className="cursor-pointer circle"
      onClick={handleClick}
      transition={{
        layout: { type: "spring", duration:0.5},
      }}
    >
      {capitalizeFirstLetter(name)}
    </motion.div>
  )
}

export default Choice
