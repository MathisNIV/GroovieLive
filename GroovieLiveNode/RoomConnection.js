const {createPlaylist, deletePlaylist} = require('./playlistBeatport')

async function createRoom(user, socket, roomPlaylists, playlistIds,io, listToken) {
    const room = "DJ_" + user;
    socket.join(room);
    socket.emit('roomUrl', room);

    const currentRooms = Array.from(socket.rooms);
    currentRooms.shift();
    const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
    const currentDJ = currentRoom.substring(3);

    const token = listToken[currentDJ];


    roomPlaylists[room] = []; // Initialize playlist for the new room
    playlistIds[room] = await createPlaylist(room,token); // Create beatport playlist
    console.log("List rooms ", socket.rooms);
}

async function joinRoom(roomSelected, socket, roomPlaylists, io) {
    socket.join(roomSelected);
    if (!roomPlaylists[roomSelected]) {
        roomPlaylists[roomSelected] = []; // Initialize playlist for the joined room
    }
    io.to(roomSelected).emit('currentTrackListUpdate', roomPlaylists[roomSelected]);
    console.log(io.sockets.adapter.rooms);
}

async function getRooms(io, socket) {
    let listSocketRooms = io.sockets.adapter.rooms;
    const listRooms = [];
    for (const [key, value] of listSocketRooms.entries()) {
        if (key !== value.values().next().value) {
            listRooms.push(key);
        }
    }
    socket.emit('roomsList', listRooms);
}

async function deleteRoom(io, socket, playlistIds, roomPlaylists, listToken) {
    const currentRooms = Array.from(socket.rooms);
    currentRooms.shift();
    const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
    const currentDJ = currentRoom.substring(3);

    const token = listToken[currentDJ];

    if (!roomPlaylists[currentRoom]) {
        roomPlaylists[currentRoom] = []; // Initialize playlist for the joined room
    }
    io.to(currentRoom).emit('lastSave', roomPlaylists[currentRoom]);

    io.socketsLeave(currentRoom);
    console.log("TEST : ", io.sockets.adapter.rooms);
    deletePlaylist(playlistIds[currentRoom], token);

    console.log(`Room ${currentRoom} is deleted.`);
}


module.exports = {
    createRoom,
    joinRoom,
    getRooms,
    deleteRoom
};
