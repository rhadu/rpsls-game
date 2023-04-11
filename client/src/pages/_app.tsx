import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { AnimatePresence } from "framer-motion"
import { GameServiceProvider } from "@/contexts/GameServiceContext"
import { SocketProviderMemo } from "@/contexts/SocketContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <SocketProviderMemo>
        <GameServiceProvider>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </GameServiceProvider>
      </SocketProviderMemo>
      <Analytics />
    </>
  )
}
