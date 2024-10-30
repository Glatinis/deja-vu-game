function initGameSocket(gameId, plrName) {
  const gameSocket = io(`/${gameId}`);
  console.log("init game socket, using id:", gameId);

  gameSocket.on("update", (data) => {
    console.log("Update received:", data);
  });

  function sendAction(actionData) {
    gameSocket.emit("action", actionData);
  }
}