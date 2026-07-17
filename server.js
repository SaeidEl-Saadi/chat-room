const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const users = require("./users");

require("dotenv").config();
const HOST = process.env.HOST != null ? process.env.HOST : "127.0.0.1";
const PORT = process.env.PORT != null ? process.env.PORT : 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("chat", (msg) => {
        const user = users.getUser(socket.id);

        io.emit("chat", {
            username: user.username,
            color: user.color,
            message: msg
        });
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
        const user = users.getUser(socket.id);

        if (user == null) return;

        io.emit("leave", {
            username: user.username,
            color: user.color,
        });

        users.removeUser(socket.id);
    });

    socket.on("join", (username) => {
        users.addUser(socket.id, username);

        const user = users.getUser(socket.id);

        io.emit("join", {
            username: user.username,
            color: user.color,
        });
    })
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});