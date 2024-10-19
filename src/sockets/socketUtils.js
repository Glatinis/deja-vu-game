function getActiveGames(games, clients) {
  const activeGames = [];

  for (const [id, game] of Object.entries(games)) {
    if (!game.started) {
      if (game.gameState.players.length < 3)
        activeGames.push({id: id, host: clients[game.host]});
    }
  }

  return activeGames;
}

function isInGame(playerId, games) {
  for (const [gameId, game] of Object.entries(games)) {
    if (game.playerIds.includes(playerId))
      return true;
  }

  return false;
}

function getPlayersNamesInGame(game, clients) {
  return game.playerIds.map((id) => clients[id]);
}

function getGameFromPlayer(playerId, games) {
  for (const [gameId, game] of Object.entries(games)) {
    if (game.playerIds.includes(playerId)) {
      return game;
    }
  }
}

module.exports = {
  getActiveGames,
  isInGame,
  getPlayersNamesInGame,
  getGameFromPlayer,
};