import React, { ReactNode } from "react"
import { Socket, io } from "socket.io-client"
import { NEXT_PUBLIC_SOCKET_SERVER_URL } from "@/config/constants"

export const SocketContext = React.createContext<{
  socket: Socket | null
  connected: boolean
}>({
  socket: null,
  connected: false,
})

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const [connected, setConnected] = React.useState(false)

  React.useEffect(() => {
    const socket = io(NEXT_PUBLIC_SOCKET_SERVER_URL)
    setSocket(socket)

    socket.on("connect", () => {
      console.log("User connect")

      setConnected(true)
    })

    socket.on("disconnect", () => {
      console.log("User disconnect")
      setConnected(false)
    })

    socket.emit("handshake", async (uid: string, users: string[]) => {
      console.info("User handshake callback message received")
      console.log(uid)
      console.log(users)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = React.useContext(SocketContext)

  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }

  return context
}
