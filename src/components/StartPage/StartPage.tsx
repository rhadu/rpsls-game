import React from "react"
import Layout from "@/components/Layout"
import Logo from "@/components/Logo/index"
import Spacer from "@/components/Spacer"
import Link from "next/link"
import { motion } from "framer-motion"

export interface IStartPageProps {}

const StartPage = ({}: IStartPageProps) => {
  return (
    <motion.main className="flex flex-col items-center justify-between h-full">
      <motion.div className="py-10">
        <Logo/>
      </motion.div>

      <motion.div exit={{ y: 20, opacity: 0 }} className="flex flex-col gap-32">
        <motion.div>
          <p className="text-5xl font-semibold text-white w-fit">
            Select a mode to start playing
          </p>
        </motion.div>
        <div className="flex gap-12">
          <Link href="/single" className="flex-1 ">
            <a className="w-full px-12 py-4 text-xl font-semibold transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105">
              VS. Sheldon
            </a>
          </Link>
          <Link href="/" className="flex-1 ">
            <button className="w-full px-12 py-4 text-xl font-semibold transition-all bg-yellow-300 rounded-lg shadow-md cursor-pointer grow hover:scale-105">
              VS. Friend or Foe
            </button>
          </Link>
        </div>
      </motion.div>
      <motion.span
        exit={{ y: 20, opacity: 0 }}
        className="py-24 text-xl text-white "
      >
        How to play?
      </motion.span>
    </motion.main>
  )
}
export default StartPage
