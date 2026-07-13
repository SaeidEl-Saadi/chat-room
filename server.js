const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("chat", (msg) => {
        io.emit("chat", msg);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});