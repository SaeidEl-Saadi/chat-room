const socket = io();
let username = "";

socket.on("chat", (data) => {
    const div = document.createElement("div");

    const name = document.createElement("span");
    name.style.color = data.color;
    name.textContent = `<${data.username}>`;

    div.appendChild(name);
    div.append(`: ${data.message}`);

    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

socket.on("join", (data) => {
    const div = document.createElement("div");

    const name = document.createElement("span");
    name.style.color = data.color;
    name.textContent = `${data.username}`;

    div.appendChild(name);
    div.append(" has joined");

    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

socket.on("leave", (data) => {
    const div = document.createElement("div");

    const name = document.createElement("span");
    name.style.color = data.color;
    name.textContent = `${data.username}`;

    div.appendChild(name);
    div.append(" has left");

    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

function sendMessage() {
    if (document.getElementById("messageInput").value.trim() == "") {
        document.getElementById("submit").disabled = true;
        return;
    }

    const message = document.getElementById("messageInput").value.trim();

    socket.emit("chat", message);

    document.getElementById("messageInput").value = "";
    document.getElementById("submit").disabled = true;
}

function submitUsername() {
    let input = document.getElementById("usernameInput").value;
    username = input.trim();

    socket.emit("join", username);

    document.getElementById("join").hidden = true;
    document.getElementById("chatBox").hidden = false;
}

document.getElementById("usernameInput").addEventListener("input", () => {

    document.getElementById("joinButton").disabled = !document.getElementById("usernameInput").value.trim();

});

document.getElementById("messageInput").addEventListener("input", () => {

    document.getElementById("submit").disabled = !document.getElementById("messageInput").value.trim();

});

document.getElementById("joinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    submitUsername();
});

document.getElementById("messageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
});