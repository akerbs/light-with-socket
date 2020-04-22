const express = require("express");
const socketIo = require("socket.io");
const app = express();
// express.js wird mit http von NodeJS verbunden
const http = require("http").createServer(app);
// const process = require('process'); // Nicht nötig Über NodeJS direkt zugriff drauf
// https://nodejs.org/api/process.html
// socketIo greift auf dass HTTP-Modul von NodeJS zurück
const io = socketIo(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let lightStatus = true;

io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}.`);

  socket.on("get light status", () => {
    socket.emit("set light status", lightStatus);
  });

  socket.on("toggle light status", () => {
    lightStatus = !lightStatus;
    socket.emit("set light status", lightStatus);
  });
});

// Server wird über http-Modul von NodeJs.
http.listen(PORT, () => {
  console.log(`Server running...`);
});
