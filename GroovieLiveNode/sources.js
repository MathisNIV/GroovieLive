const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const bodyParser = require('body-parser');
const axios = require('axios');

let trackList = [];
let trackListDTO = [];
server.listen(3000, () => {
    console.log("Ecoute sur 3000");
});

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('createRoom', () => {
        //const room = "DJ_" + (Math.floor(Math.random() * 100) + 1).toString();
        const room = "DJ_1"
        socket.join(room);
        socket.emit('roomUrl', room);
        console.log("List rooms ", socket.rooms);
    });

    socket.on('joinRoom', (roomSelected) => {
        socket.join(roomSelected);
        io.emit('currentTrackListUpdate', trackList);
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
                io.to("DJ_1").emit('songs', songs);
            } else if (msg.type === 'artists') {
                const response = await axios.get('http://localhost/GroovieLiveSpring-api/search/artists/' + msg.text);
                const songs = response.data;
                io.to("DJ_1").emit('songs', songs);
            }
        } catch (error) {
            console.error('Error in Axios request:', error.message);
        }
    });

    socket.on('updateCurrentTrackList', (clickedSong) => {
        if (clickedSong !== null) {
            trackList = [...trackList, clickedSong];
        }
        //trackListDTO = [...trackListDTO, clickedSongDTO];

        console.log('trackList backend', trackList);
        io.sockets.in("DJ_1").emit('currentTrackListUpdate', trackList);

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
        if (user.username !== ""){
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
