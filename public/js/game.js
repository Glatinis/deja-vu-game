function initGameSocket(gameId, plrName) {
  const gameSocket = io(`/${gameId}`);
  console.log("init game socket, using id:", gameId);


  gameSocket.on("init", (data) => {
    gameSocket.emit("initCfrm", plrName)

    let STARTINGVALUES =  data.STARTINGVALUES;
    console.log(STARTINGVALUES)
    
    for (const [key, value] of Object.entries(STARTINGVALUES)) {
      console.log(key + "-label")
      console.log(key + "-slider")
      document.getElementById(key + "-label").textContent = value;
      document.getElementById(key + "-slider").value = value;
    }
  });

  gameSocket.on("update", (data) => {
    console.log("Update received:", data);
  });

  document.querySelectorAll(".voteBtn").forEach(ele => {
    ele.onclick = () => {
    console.log("casted vote " + ele.id)
      sendAction({
        type: "voteCast",
        target: ele.id,
        influence: 10
      })
    }
  });

  function sendAction(actionData) {
    gameSocket.emit("action", actionData);
  }
}