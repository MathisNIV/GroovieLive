
async function createRoom(user, socket, roomPlaylists) {
    const room = "DJ_" + user;
    socket.join(room);
    socket.emit('roomUrl', room);
    roomPlaylists[room] = []; // Initialize playlist for the new room
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


module.exports = {
    createRoom,
    joinRoom,
    getRooms
};
