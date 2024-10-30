const crypto = require("crypto");
const Game = require("../game/game");
const { getGameFromPlayer, getPlayersNamesInGame, isInGame, getActiveGames } = require("./socketUtils");
const gameHandler = require("./gameHandler");

const gameHandlers = {}; // Track active handlers

module.exports = function (io) {
  const clients = {};
  const games = {};

  function joinGame(gameId, socket) {
    const game = games[gameId];
    if (game.playerIds.includes(socket.id)) {
      socket.emit("error", "You are already in this game");
      return;
    }
    if (game.playerIds.length >= 3) {
      socket.emit("error", "Game is full");
      return;
    }

    socket.emit("joinConfirm", {
      id: game.id,
      host: clients[game.host],
      players: getPlayersNamesInGame(game, clients)
    });

    game.addPlayer(socket.id);
    socket.to(game.id).emit("playerJoined", clients[socket.id]);
    socket.join(game.id);
  }

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("register", (name) => {
      clients[socket.id] = name;
      console.log(`User registered: ${name} with Socket ID: ${socket.id}`);
      socket.emit("registerConfirm", { id: socket.id });
      socket.emit("activeGames", { games: getActiveGames(games, clients) });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${clients[socket.id]}`);
      delete clients[socket.id];
    });

    socket.on("createGame", () => {
      if (clients[socket.id]) {
        if (!isInGame(socket.id, games)) {
          const id = crypto.randomBytes(16).toString("hex");
          games[id] = new Game(id, socket.id);
          joinGame(id, socket);

          console.log(`User ${clients[socket.id]} created game: ${id}`);
          socket.broadcast.emit("activeGames", { games: getActiveGames(games, clients) });
        } else {
          socket.emit("error", "You are already in a game");
        }
      } else {
        socket.emit("error", "You are not registered");
      }
    });

    socket.on("joinRequest", (id) => {
      joinGame(id, socket);
    });

    socket.on("startGame", (playerId) => {
      const game = getGameFromPlayer(playerId, games);
      if (!game) {
        socket.emit("error", "Game not found");
        return;
      }

      if (game.host === playerId) {
        if (game.playerIds.length === 1) { // Set to one for testing purposes
          if (!game.started) {
            // Initialize gameHandler if not already set up for this game
            if (!gameHandlers[game.id]) {
              gameHandlers[game.id] = gameHandler(io, game);
            }

            socket.emit("startConfirm");
          } else {
            socket.emit("error", "Game has already started");
          }
        } else {
          socket.emit("error", "Game is not full");
        }
      } else {
        socket.emit("error", "You are not the host of this game");
      }
    });
  });
};
