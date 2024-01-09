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
        // Changer variable room pour mettre le username du DJ
        const room = "DJ_" + (Math.floor(Math.random() * 100) + 1).toString();
        // const room = "DJ_Mathis";
        socket.join(room);
        socket.emit('roomUrl', room);

        console.log("List rooms ", socket.rooms);
        // console.log("nombre de rooms", socket.rooms.size -1);
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
        try {
            response = axios.get('http://localhost/GroovieLiveSpring-api/search/' + msg.text).then((response) => {
                console.log(response.data);
            })
        } catch (error) {
            console.error('Error posting message to Spring backend:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`);
    });

});

