const lobbyMenu = document.getElementById("lobbyMenu");
const mainMenu = document.getElementById("mainMenu");
const gameScreen = document.getElementById("gameScreen");
let plrId, gameId;

let socket = io();

let plrName = prompt("Enter your player name: ");
socket.emit("register", plrName);

document.getElementById("createGame").onclick = () => {
  socket.emit("createGame");
}

socket.on("registerConfirm", (data) => {
  plrId = data.id;
});

socket.on("activeGames", (data) => {
  document.getElementById("games").innerHTML = "";
  for (const game of data.games) {
    if (game.host == plrName) continue;

    const gameJoinBtn = document.createElement("button");
    gameJoinBtn.textContent = "Join Game";
    gameJoinBtn.onclick = () => {
      socket.emit("joinRequest", game.id);
    }

    const gameName = document.createElement("h2");
    gameName.textContent = `${game.host}'s game`;

    const gameElement = document.createElement("div");
    gameElement.appendChild(gameName);
    gameElement.appendChild(gameJoinBtn)
    document.getElementById("games").appendChild(gameElement);
  }
});


socket.on("joinConfirm", (data) => {
  console.log(`You have joined ${data.host}'s game with ID ${data.id}`);
  console.log(data);
  gameId = data.id;

  lobbyMenu.classList.remove("hidden");
  mainMenu.classList.add("hidden");
  document.getElementById("lobbyName").textContent = `${data.host}'s game`;
  for (const player of data.players) {
    const playerElement = document.createElement("h3");
    playerElement.textContent = player;
    document.getElementById("players").appendChild(playerElement);
  }

  if (data.host == plrName) {
    let startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.onclick = () => {
      socket.emit("startGame", plrId);
    }
    document.getElementById("players").appendChild(startBtn);
  }
});

socket.on("playerJoined", (data) => {
  const playerElement = document.createElement("h3");
  playerElement.textContent = data;
  document.getElementById("players").appendChild(playerElement);
});

socket.on("startConfirm", (data) => {
  lobbyMenu.classList.add("hidden");
  // gameScreen.classList.remove("hidden");
  loadPage("game")
  initGameSocket(gameId, plrName);
});

socket.on("error", (data) => {
  document.getElementById("error").textContent = data;
});

function loadPage(pageName) {
  fetch(pageName + ".html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
  })
  .catch(error => console.error('Error loading game page:', error));
}