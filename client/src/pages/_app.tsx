import { SocketProvider } from "@/contexts/SocketContext"
import "@/styles/globals.css"
import { AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <SocketProvider>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </SocketProvider>
  )
}
