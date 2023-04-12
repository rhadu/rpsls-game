import { Server, Socket } from "socket.io"
import { createServer } from "http"
import { AddressInfo } from "net"

import { Socket as ClientSocket, io } from "socket.io-client"

import GameService from "@/services/GameService"


describe("GameService", () => {
  let server: Server
  let socket: ClientSocket

  beforeEach(async () => {
    const httpServer = createServer()
    server = new Server(httpServer)

    // Wrap the server.listen in a Promise to wait for the connection
    const listenPromise = new Promise<void>((resolve) => {
      httpServer.listen(() => {
        const port = (httpServer.address() as AddressInfo).port
        socket = io(`http://localhost:${port}`)
        resolve()
      })
    })

    // Register the event listeners for the 'server'
    server.on("connection", (socket: Socket) => {
      // Your server-side event listeners here
    })

    await listenPromise
  })

  afterEach(() => {
    server.close()
    socket.close()
  })

  test("should initialize GameService and bind onStartGame", () => {
    const webSocketContext = { socket, connected: true }
    const gameService = new GameService(webSocketContext)
    expect(gameService).toBeDefined()
    expect(gameService.onStartGame).toBeDefined()
  }, 10000)

  test("should initialize socket events", () => {
    const webSocketContext = { socket, connected: true }

    const gameService = new GameService(webSocketContext)

    gameService["onRoomJoined"]({
      tag: "playerA",
      showWaitingRoom: false
    });

    const onStartGameSpy = jest.spyOn(gameService, "onStartGame")
    const onRoundResultSpy = jest.spyOn(gameService, "onRoundResult")

    gameService["onStartGame"]({
      choices: [],
      players: {
        playerA: {
          socketId: "1111",
          name: "Leonard",
          uid: "1234-1234-1234-1234",
          character: "Leornard",
        },
        playerB: {
          socketId: "2222",
          name: "Sheldon",
          uid: "2222-2222-2222-2222",
          character: "Sheldon",
        },
      },
    })
    expect(onStartGameSpy).toHaveBeenCalled()

    gameService["onRoundResult"]({
      winner: "draw",
      playerA: { uid: "1111", choice: 2, score: 1 },
      playerB: { uid: "1111", choice: 2, score: 1 },
      round: 3,
    })
    expect(onRoundResultSpy).toHaveBeenCalled()
  }, 10000)
})
