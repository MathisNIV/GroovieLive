const axios = require('axios');
const sort = require("./playlistSorter");
const {addSong, sortPlaylistBP} = require('./playlistBeatport');

async function Message(msg, io) {
    console.log("IN MESSAGE TOKEN : ", msg.token);
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

async function updateCurrentTrackList(clickedSong, socket, io, roomPlaylists, sort, playlistIds) {
    if (clickedSong !== null) {
        const currentRooms = Array.from(socket.rooms);
        currentRooms.shift();
        const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;

        if (currentRoom) {
            const songIds = roomPlaylists[currentRoom].map(song => song.id);
            console.log('songIds: ' + songIds);

            if (!songIds.includes(clickedSong.id)) {
                console.log("Playlist before: " + roomPlaylists[currentRoom]);
                roomPlaylists[currentRoom] = [...roomPlaylists[currentRoom], clickedSong];
                addSong("", playlistIds[currentRoom], clickedSong); // Add song to beatport playlist
                console.log("Playlist after: " + roomPlaylists[currentRoom]);
                roomPlaylists[currentRoom] = await sort(roomPlaylists[currentRoom]);
                console.log("Playlist sorted: " + roomPlaylists[currentRoom]);
                sortPlaylistBP("", playlistIds[currentRoom], roomPlaylists[currentRoom]);
                io.to(currentRoom).emit('currentTrackListUpdate', roomPlaylists[currentRoom]);

            } else {
                console.log('La chanson est déjà dans la playlist.');
            }
        }
    }
}


module.exports = {
    Message,
    updateCurrentTrackList,
};