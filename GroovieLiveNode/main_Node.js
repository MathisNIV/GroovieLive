const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const sort = require('./playlistSorter')
const axios = require('axios');
const { createRoom, joinRoom, getRooms } = require('./RoomConnection.js');
const {Register, Login} = require('./UserConnection.js');
const {Message, updateCurrentTrackList} = require('./SongSelection')

let roomPlaylists = {}; // Object to store room-specific playlists

server.listen(3000, () => {
    console.log("Ecoute sur 3000");
});

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('createRoom', (user) => {
        createRoom(user, socket, roomPlaylists);
    });

    socket.on('joinRoom', (roomSelected) => {
        joinRoom(roomSelected, socket, roomPlaylists, io);
    });

    socket.on('getRooms', () => {
        getRooms(io, socket);
    });

    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`);
    });

    socket.on('register', (user) => {
        Register(user, socket);
    });

    socket.on('login', (user) => {
        Login(user, socket);
    });

    socket.on('msg', async (msg) => {
        Message(msg, io);
    });

    socket.on('updateCurrentTrackList', (clickedSong) => {
        updateCurrentTrackList(clickedSong, socket, io, roomPlaylists, sort);
    });
});
