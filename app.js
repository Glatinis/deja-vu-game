const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const socketHandler = require("./src/sockets/socketHandler");
socketHandler(io);

server.listen(PORT, function () {
  console.log("Example app listening on port " + PORT);
});
