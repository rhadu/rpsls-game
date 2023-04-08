import express from "express"
import http from "http"
import { Server } from "socket.io"
import { LobbyManager } from "./lobbyManager"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "*",
  },
})

const PORT = process.env.PORT || 9000

const lobbyManager = new LobbyManager(io)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("join-room", ({ name, roomId }) => {
    lobbyManager.joinLobby(socket, name, roomId)
  })

  socket.on("player-choice", ({ id, roomId }) => {
    lobbyManager.playerMakesChoice(socket, id, roomId)
  })

  socket.on("disconnect", () => {
    lobbyManager.playerDisconnects(socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
