import React, { ReactNode } from "react"
import GameService from "../services/GameService"
import { useSocket } from "./SocketContext"

const GameServiceContext = React.createContext<GameService>(null as unknown as GameService);

interface GameServiceProviderProps {
  children: ReactNode
}

export function GameServiceProvider({ children }: GameServiceProviderProps) {
  const { socket } = useSocket()
  const [gameService, setGameService] = React.useState<GameService>(null as unknown as GameService);

  React.useEffect(() => {
    setGameService(new GameService({ connected: true, socket }));
  }, [socket])

  return (
    <GameServiceContext.Provider value={gameService}>
      {children}
    </GameServiceContext.Provider>
  )
}

export const useGameService = () => {
  const context = React.useContext(GameServiceContext)
  if (context === undefined) {
    throw new Error("useGameService must be used within a GameServiceProvider")
  }
  return context
}