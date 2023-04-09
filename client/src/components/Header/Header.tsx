import React from "react"
import { motion } from "framer-motion"
import Logo from "../Logo"

export interface IHeaderProps {
  showHeadshot?: boolean
}

const Header = ({ showHeadshot }: IHeaderProps) => {
  
  return (
    <motion.header className="flex gap-20 pt-10">
      {showHeadshot && (
        <motion.div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.div
            layoutId="playerA"
            className="rounded-full  w-[100px] bg-yellow-300 h-[100px]"
          ></motion.div>
          {/* <motion.span className="flex-1 text-3xl font-semibold text-center">
            3 / 2
          </motion.span> */}
        </motion.div>
      )}

      <Logo width={100} />
      {showHeadshot && (
        <motion.div className="w-[200px] rounded-full bg-yellow-100 flex items-center">
          <motion.span className="flex-1 text-3xl font-semibold text-center"></motion.span>

          <motion.div
            layoutId="playerB"
            className="rounded-full w-[100px] bg-yellow-300 h-[100px] justify-self-end"
          ></motion.div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header
