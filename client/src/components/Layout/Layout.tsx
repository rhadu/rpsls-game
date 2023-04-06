import Head from "next/head"
import { Exo_2 } from "next/font/google"
import React, { ReactNode } from "react"
import { motion } from 'framer-motion'

const nextFont = Exo_2({ subsets: ["latin"] })

export interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Head>
        <title>RPSLS Game</title>
        <meta name="description" content="Rock Paper Scissors Lizard Spock Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div exit={{}} className={`${nextFont.className}`}>{children}</motion.div>
    </>
  )
}

export default Layout
