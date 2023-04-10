const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    JOIN_ROOM: "JOIN_ROOM",
    PLAYER_CHOICE: "PLAYER_CHOICE",
  },
  SERVER: {
    PLAYER_DISCONNECTED: "PLAYER_DISCONNECTED",
    START_GAME: "START_GAME",
    ROUND_RESULT: "ROUND_RESULT",
    ERROR: "ERROR",
    ROOM_JOINED: "ROOM_JOINED",
    ROOM_JOINED_ERROR: "ROOM_JOINED_ERROR",
  },
}

export default EVENTS
