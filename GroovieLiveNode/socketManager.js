const { createServer } = require('http');
const { Server } = require('socket.io');
const express = require('express');

function initializeSocketServer() {
    const app = express();
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return { server: app, io };
}

module.exports = initializeSocketServer;
