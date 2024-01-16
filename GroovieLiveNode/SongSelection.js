const axios = require('axios');
const sort = require("./playlistSorter");
async function Message(msg, io) {
    console.log('http://nginx:8081/GroovieLiveSpringSong-api/search/' + msg.text);
    try {
        if (msg.type === 'tracks') {
            const response = await axios.get('http://nginx:8081/GroovieLiveSpringSong-api/search/tracks/' + msg.text);
            const songs = response.data;
            io.emit('songs', songs);
        } else if (msg.type === 'artists') {
            const response = await axios.get('http://nginx:8081/GroovieLiveSpringSong-api/search/artists/' + msg.text);
            const songs = response.data;
            io.emit('songs', songs);
        }
    } catch (error) {
        console.error('Error in Axios request:', error.message);
    }
}

async function updateCurrentTrackList(clickedSong, socket, io, roomPlaylists, sort) {
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
}


module.exports = {
    Message,
    updateCurrentTrackList
};