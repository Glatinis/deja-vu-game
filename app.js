const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;

const clients = {};
const games = {};

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("register", (name) => {
    clients[socket.id] = name;
    console.log(`User registered: ${name} with Socket ID: ${socket.id}`);

    socket.emit("registered", { socketId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${clients[socket.id]}`);
    delete clients[socket.id];
  });
});

server.listen(PORT, function () {
  console.log("Example app listening on port " + PORT);
});
