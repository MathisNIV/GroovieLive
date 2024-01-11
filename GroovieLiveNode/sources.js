const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const bodyParser = require('body-parser');
const axios = require('axios');

server.listen(3000, () => {
    console.log("Ecoute sur 3000");
});

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('createRoom', () => {
        const room = "DJ_" + (Math.floor(Math.random() * 100) + 1).toString();
        socket.join(room);
        socket.emit('roomUrl', room);

        console.log("List rooms ", socket.rooms);
    })

    socket.on('joinRoom', (roomSelected) => {
        socket.join(roomSelected);
        console.log(io.sockets.adapter.rooms);
    })

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

    socket.on('msg', (msg) => {
        console.log('http://localhost/GroovieLiveSpring-api/search/' + msg.text);
        if (msg.type === 'tracks') {
            try {
                response = axios.get('http://nginx/GroovieLiveSpring-api/search/tracks/' + msg.text).then((response) => {
                songs = response.data;
                socket.emit('songs', songs);
                })
            } catch (error) {
                console.error('Error posting message to Spring backend:', error.message);
            }
        }
        else if (msg.type === 'artists') {
            try {
                response = axios.get('http://nginx/GroovieLiveSpring-api/search/artists/' + msg.text).then((response) => {
                songs = response.data;
                socket.emit('songs', songs);
                })
            } catch (error) {
                console.error('Error posting message to Spring backend:', error.message);
            }
        }
    });

    socket.on('updateCurrentTrackList', (updatedList, updateListDTO) => {
        console.log('Updated CurrentTrackList:', updatedList);
        console.log('Updated CurrentTrackListDTO:', updateListDTO);

        if (updateListDTO.length === 2) {
            console.log('Comparing two songs');
            const [song1, song2] = updateListDTO;

            axios.post('http://localhost:5000/compare/songs', {
                song1,
                song2,
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error posting to Flask endpoint:', error.message);
                });
        }
        else if(updateListDTO.length > 2) {
            console.log('Comparing a song with a playlist');
            const [song, ...playlist] = updateListDTO;

            axios.post('http://localhost:5000/compare/playlist', {
                song,
                playlist,
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error posting to Flask endpoint:', error.message);
                });
        }
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

