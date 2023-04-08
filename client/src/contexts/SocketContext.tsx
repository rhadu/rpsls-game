import React, { ReactNode } from "react"
import { Socket, io } from "socket.io-client"
import { NEXT_PUBLIC_SOCKET_SERVER_URL } from "@/config/constants"
import EVENTS from "@/config/events"

export const SocketContext = React.createContext<{
  socket: Socket
  connected: boolean
}>({
  socket: null as unknown as Socket,
  connected: false,
})

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = React.useState<Socket>(null as unknown as Socket)
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    const socket = io(NEXT_PUBLIC_SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    setSocket(socket)

    socket.on(EVENTS.connection, () => {
      setConnected(true)
    })

    socket.on(EVENTS.disconnect, () => {
      setConnected(false)
    })

    /** Connection / reconnection listeners */
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt)
    })

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection Attempt: " + attempt)
    })

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error)
    })

    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure.")
      alert(
        "We are unable to connect you to the RPSLS service. Please make sure your internet connection is stable or try again later.",
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  if (!connected) {
    return (
      <div className="grid text-3xl font-semibold text-yellow-300 place-items-center">
        <h2>Establishing connection to server...</h2>
      </div>
    )
  }

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const SocketProviderMemo = React.memo(SocketProvider)

export const useSocket = () => {
  const context = React.useContext(SocketContext)

  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }

  return context
}
