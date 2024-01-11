const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const bodyParser = require('body-parser');
const axios = require('axios');

let roomPlaylists = {}; // Object to store room-specific playlists

server.listen(3000, () => {
    console.log("Ecoute sur 3000");
});

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('createRoom', () => {
        const room = "DJ_" + (Math.floor(Math.random() * 100) + 1).toString();
        socket.join(room);
        socket.emit('roomUrl', room);
        roomPlaylists[room] = []; // Initialize playlist for the new room
        console.log("List rooms ", socket.rooms);
    });

    socket.on('joinRoom', (roomSelected) => {
        socket.join(roomSelected);
        if (!roomPlaylists[roomSelected]) {
            roomPlaylists[roomSelected] = []; // Initialize playlist for the joined room
        }
        io.to(roomSelected).emit('currentTrackListUpdate', roomPlaylists[roomSelected]);
        console.log(io.sockets.adapter.rooms);
    });

    socket.on('getRooms', () => {
        let listSocketRooms = io.sockets.adapter.rooms;
        const listRooms = [];
        for (const [key, value] of listSocketRooms.entries()) {
            if (key !== value.values().next().value) {
                listRooms.push(key);
            }
        }
        socket.emit('roomsList', listRooms);
    });

    socket.on('msg', async (msg) => {
        console.log('http://localhost/GroovieLiveSpring-api/search/' + msg.text);
        try {
            if (msg.type === 'tracks') {
                const response = await axios.get('http://localhost/GroovieLiveSpring-api/search/tracks/' + msg.text);
                const songs = response.data;
                io.emit('songs', songs);
            } else if (msg.type === 'artists') {
                const response = await axios.get('http://localhost/GroovieLiveSpring-api/search/artists/' + msg.text);
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

    socket.on('register', (user) => {
        console.log(user);
        if (user.username !== "") {
            axios.post('http://localhost/GroovieLiveSpring-api/register', user)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error post user : ', error.message, error);
                })
        }
    })

    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`);
    });

});
