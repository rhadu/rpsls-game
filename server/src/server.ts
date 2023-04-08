import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { LobbyManager } from './lobbyManager';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "*",
  },
})

const PORT = process.env.PORT || 9000;

new LobbyManager(io);

/** Log the request */
app.use((req, res, next) => {
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });

  next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
});

/** Healthcheck */
app.get('/ping', (req, res, next) => {
  return res.status(200).json({ hello: 'world!' });
});

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
      message: error.message
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});