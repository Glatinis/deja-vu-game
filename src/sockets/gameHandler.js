const { getGameFromPlayer } = require("./socketUtils");
const { STARTINGVALUES } = require("../game/utils/constants");

module.exports = function (io, game) {
  const gameNamespace = io.of(`/${game.id}`); // Create game namespace
  clients = {};

  gameNamespace.on("connection", (socket) => {
    console.log(`Player ${clients[socket.id]} connected to game ${game.id}`);
    
    socket.join(game.id);

    // Give initial data, values, prices here
    socket.emit("init", {
      STARTINGVALUES: STARTINGVALUES
    });

    socket.on("initCfrm", (data) => {
      clients[socket.id] = data;
      console.log(clients)
    })

    socket.on("action", (actionData) => {
      console.log("Received action:", actionData);
      game.gameState.handleAction(actionData, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`Player ${socket.id} disconnected from game ${game.id}`);
      // Handle player removal logic
    });

    game.gameState.on("update", (data) => {
      if (data.type === "policiesUpdate") {
        gameNamespace.emit("update", data);
      }
    });
  
    game.started = true;
    game.gameState.startGame();
  });

  return {
    cleanup: () => {
      game.gameState.removeAllListeners("update");
      gameNamespace.removeAllListeners("action");
    }
  };
};
