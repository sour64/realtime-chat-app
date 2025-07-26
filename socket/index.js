const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://realtime-chat-app-1-8w8i.onrender.com", "http://localhost:5173"],
        methods: ["GET", "POST"],
    }
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log('new connection', socket.id);

    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit('getOnlineUsers', onlineUsers);
    });

    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);
        if (user) {
            io.to(user.socketId).emit('getMessage', message);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
