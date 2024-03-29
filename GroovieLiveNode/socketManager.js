const { createServer } = require('http');
const { Server } = require('socket.io');
const express = require('express');

function initializeSocketServer() {
    const server = createServer();
    const io = new Server(server, {
        cors: {
            origin: "http://3.80.95.181",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return { server, io };
}

module.exports = initializeSocketServer;
