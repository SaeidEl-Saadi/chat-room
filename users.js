const users = new Map();

const COLORS = [
    "#e74c3c",
    "#3498db",
    "#00441c",
    "#f39c12",
    "#9b59b6",
    "#1c00b8",
    "#e67e22",
    "#f1c40f",
    "#000000"
];

function getRandomColor() {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
}

function addUser(socketId, username) {
    users.set(socketId, {
        socketId,
        username,
        color: getRandomColor()
    });
}

function removeUser(socketId) {
    users.delete(socketId);
}

function getUser(socketId) {
    return users.get(socketId);
}

module.exports = {
    addUser,
    removeUser,
    getUser
};