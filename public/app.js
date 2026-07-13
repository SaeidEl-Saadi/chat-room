const socket = io();

socket.on("chat", (data) => {
    console.log(`${data.user}: ${data.message}`);
});

function sendMessage() {
    socket.emit("chat", {
        user: "Test User",
        message: "Hello!"
    });
}