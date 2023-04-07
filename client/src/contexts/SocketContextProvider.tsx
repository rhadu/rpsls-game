import { PropsWithChildren } from "react"
import {
  SocketContextProvider,
  SocketReducer,
  defaultSocketContextState,
} from "./SocketContext"
import { useSocket } from "@/hooks/useSocket"
import React from "react"
import { Socket } from "socket.io-client"

export interface ISocketContextComponentProps {
  children?: React.ReactNode
}

function SocketContextComponent({ children }: ISocketContextComponentProps) {
  const socket = useSocket("ws://localhost:9000", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  })

  const [socketTest, setSocketTest] = React.useState<Socket | undefined>(
    undefined,
  )

  const [SocketState, SocketDispatch] = React.useReducer(
    SocketReducer,
    defaultSocketContextState,
  )

  console.log("connect")

  React.useEffect(() => {
    socket.connect()
    console.log("teesst")
    console.log(socket.id)
    // SocketDispatch({ type: 'update_socket', payload: socket });
    setSocketTest(socket)
    SendHandshake()

    // eslint-disable-next-line
  }, [])
  const SendHandshake = async () => {
    console.info("Sending handshake to server ...")

    socket.emit("handshake", async (uid: string, users: string[]) => {
      console.info("User handshake callback message received")
      console.log({ uid })
      console.log({ users })
    })
  }

  console.log({ SocketState })

  return (
    <SocketContextProvider
      value={{ SocketState: { socket: socketTest }, SocketDispatch }}
    >
      {children}
    </SocketContextProvider>
  )
}

export default SocketContextComponent
