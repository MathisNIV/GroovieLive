const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const sort = require('./playlistSorter')
const axios = require('axios');
import { createRoom, joinRoom, getRooms } from './RoomConnection.js';
import { Register, Login } from './UserConnection.js';

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
        console.log('http://nginx:8081/GroovieLiveSpring-api/search/' + msg.text);
        try {
            if (msg.type === 'tracks') {
                const response = await axios.get('http://nginx:8081/GroovieLiveSpring-api/search/tracks/' + msg.text);
                const songs = response.data;
                io.emit('songs', songs);
            } else if (msg.type === 'artists') {
                const response = await axios.get('http://nginx:8081/GroovieLiveSpring-api/search/artists/' + msg.text);
                const songs = response.data;
                io.emit('songs', songs);
            }
        } catch (error) {
            console.error('Error in Axios request:', error.message);
        }
    });

    socket.on('updateCurrentTrackList', (clickedSong) => {
        if (clickedSong !== null) {
            const currentRooms = Array.from(socket.rooms);
            currentRooms.shift(); // Skip the socket's own ID
            const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
            if (currentRoom) {
                roomPlaylists[currentRoom] = [...roomPlaylists[currentRoom], clickedSong];
                io.to(currentRoom).emit('currentTrackListUpdate', roomPlaylists[currentRoom]);
                
                // Sort the playlist for later
                sort(roomPlaylists[currentRoom]);
            }
        }
        // if (trackListDTO.length === 2) {
        //     console.log('Comparing two songs');
        //     const [song1, song2] = trackListDTO;
        //     axios.post('http://localhost:5000/compare/songs', {
        //         song1,
        //         song2,
        //     })
        //         .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch((error) => {
        //             console.error('Error posting to Flask endpoint:', error.message);
        //         });
        // }
        // else if (trackListDTO.length > 2) {
        //     console.log('Comparing a song with a playlist');
        //     const [song, ...playlist] = trackListDTO;
        //     axios.post('http://localhost:5000/compare/playlist', {
        //         song,
        //         playlist,
        //     })
        //         .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch((error) => {
        //             console.error('Error posting to Flask endpoint:', error.message);
        //         });
        // }
    });
});
