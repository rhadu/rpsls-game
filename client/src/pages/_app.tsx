import "@/styles/globals.css"
import { AnimatePresence } from "framer-motion"
import type { AppProps } from "next/app"
import SocketContextComponent from '@/contexts/SocketContextProvider'

export default function App({ Component, pageProps, router }: AppProps) {
  console.log(Component)
  return (
    <SocketContextComponent>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </SocketContextComponent>
  )
}
