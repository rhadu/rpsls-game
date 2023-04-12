# Rock Paper Scissors Lizard Spock Game

## Introduction

Rock Paper Scissors Lizard Spock (RPSLS) is an exciting and modern twist on the classic Rock Paper Scissors game. This engaging application features both single-player and multiplayer modes, allowing users to either practice against a computer opponent or challenge friends in real-time. RPSLS is built with a React and Next.js frontend, incorporating TypeScript for type safety and improved maintainability. The backend employs an Express server, while Socket.IO enables seamless real-time communication between users during multiplayer matches. Experience a refreshing take on a timeless favorite with RPSLS.

## Table of Contents

1. [Demo](#demo)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Docker Integration](#docker-integration)
7. [Testing](#testing)
8. [Code Structure](#code-structure)
9. [License](#license)

## Demo

https://rpsls-game-nine.vercel.app/

## Features

- **Singleplayer Mode**:

  - Click the **.Vs Sheldon** button to start a game against the computer, playing as Sheldon Cooper from the Big Bang Theory. Hone your skills and try to beat the virtual Sheldon in this fun and engaging singleplayer mode.

- **Real-time Multiplayer Mode**:

  - Click the **Vs. Friend or Foe** button to invite a friend (or foe) and challenge them in real-time. With seamless communication powered by Socket.IO, players can experience a smooth and responsive multiplayer experience.

- **Character Selector**:
  - Delight in playing as your favorite characters from the Big Bang Theory. Choose from Leonard, Howard, Raj, Penny, Bernadette or Amy and show off your skills as you triumph over your opponents in the classic game

## Technologies

1. [React](https://reactjs.org/)
2. [Next.js](https://nextjs.org/)
3. [TypeScript](https://www.typescriptlang.org/)
4. [Express](https://expressjs.com/)
5. [Node.js](https://nodejs.org/)
6. [Socket.io](https://socket.io/)
7. [Yarn](https://yarnpkg.com/)
8. [Zustand](https://zustand-demo.pmnd.rs/)
9. [Tawilwind](https://tailwindcss.com/)
10. [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (TBA)
11. [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)
12. [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- yarn installed

### Installation

1. Clone the repository

   ```
   git clone https://github.com/rhadu/rpsls-game.git
   ```

2. Install dependencies for the client-side and server-side
   ```
   cd rpsls-game/
   yarn
   ```

## Running the Application

1. Start the server and the Next.js Application

   ```
   cd rpsls-game/
   yarn start:dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Docker Integration

1. Install Docker on your machine by following the [official guide](https://docs.docker.com/get-docker/).
2. Clone the project repository
   ```
   git clone https://github.com/rhadu/rpsls-game.git
   ```
3. Navigate to the project directory
   ```
   cd rpsls-game
   ```
4. Build the Docker image
   ```
   make build
   ```
5. Run the Docker container
   ```
   make start
   ```
6. Access the application by navigating to `http://localhost:3000` in your browser.

7. Stop Docker container

   ```
   make stop
   ```

8. Clean Docker container

   ```
   make clean
   ```

## Testing

TBA

## Code Structure

```
project
│
├── client                  # Client-side code (Next.js)
│   ├── public              # Static files
│   ├── scripts             # Node scripts for cli usage
│   ├── src                 # React components and application logic
│   │   ├── components      # Reusable components
│   │   ├── config          # Static config variables
│   │   ├── contexts        # React Contexts used in the app
│   │   ├── pages           # Page-level components
│   │   ├── services        # Main Game service
│   │   ├── stores          # Zustand stores for state mngmt
│   │   ├── styles          # Global styles
│   │   └── types           # Types used in the app
│   ├── .gitignore          # Git ignore file
│   ├── Dockerfile          # Dockerfile for containerizing the app
│   ├── package.json        # Dependencies and scripts
│   ├── tailwind.config.js  # Tailwind config file
│   └── tsconfig.json       # Typescript config file
│
├── server                  # Server-side code (Express)
│   ├── src                 # Node files and app logic
│   │   ├── config          # Static config variables
│   │   ├── types           # Types used in the app
│   │   ├── utils           # Helpers for game logic
│   │   ├── lobbyManager.ts # Main service handling logic
│   │   └── server.ts       # Server initialization
│   ├── Dockerfile          # Dockerfile for containerizing the app
│   ├── nodemon.json        # Nodemon configuration file for auto-reload on server changes
│   ├── package.json        # Dependencies and scripts
│   └── tsconfig.json       # Typescript config file
│
├── docker-compose.yml     # Docker Compose configuration file
│
├── LICENSE                # License file
│
├── Makefile               # Makefile for automating tasks
│
├── package.json           # Dependencies and scripts
│
└── README.md              # README for entire app
```

Explanation:

- `client`: This folder contains all the client-side code developed using React with Next.js.
- `server`: This folder contains all the server-side code developed using Node.js with Express and Socket.io.

## License

[MIT License](./LICENSE)
