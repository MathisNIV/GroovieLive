const axios = require('axios');
const sort = require("./playlistSorter");
const {addSong, sortPlaylistBP,removeSong} = require('./playlistBeatport');

async function Message(msg, io, ListToken,socket) {

    const currentRooms = Array.from(socket.rooms);
    currentRooms.shift();
    const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
    const currentDJ = currentRoom.substring(3);
    console.log('token '+ListToken[currentDJ]);

    console.log('http://nginx:8081/GroovieLiveSpringSong-api/search/' + msg.text);
    try {
        if (msg.type === 'tracks') {
            const response = await axios.get(
            'http://nginx:8081/GroovieLiveSpringSong-api/search/tracks/' + msg.text,
            {
                headers: {
                    Authorization: `Bearer ${ListToken[currentDJ]}`
                }
            }
        );
            const songs = response.data;
            io.emit('songs', songs);

        } else if (msg.type === 'artists') {
            const response = await axios.get(
                'http://nginx:8081/GroovieLiveSpringSong-api/search/artists/' + msg.text,
                {
                    headers: {
                        Authorization: `Bearer ${ListToken[currentDJ]}`
                    }
                }
            );               const songs = response.data;
            io.emit('songs', songs);
        }
    } catch (error) {
        console.error('Error in Axios request:', error.message);
    }
}

async function updateCurrentTrackList(clickedSong, socket, io, roomPlaylists, sort, playlistIds,listToken) {
    if (clickedSong !== null) {

        const currentRooms = Array.from(socket.rooms);
        currentRooms.shift();
        const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
        const currentDJ = currentRoom.substring(3);

        const token = listToken[currentDJ];


        if (currentRoom) {
            const songIds = roomPlaylists[currentRoom].map(song => song.id);
            console.log('songIds: ' + songIds);

            if (!songIds.includes(clickedSong.id)) {
                roomPlaylists[currentRoom] = [...roomPlaylists[currentRoom], clickedSong];
                addSong(playlistIds[currentRoom], clickedSong, token); // Add song to beatport playlist
                let sorted_playlist = await sort(roomPlaylists[currentRoom]);
                roomPlaylists[currentRoom] = sorted_playlist;
                if(sorted_playlist.length > 1){
                    sortPlaylistBP(playlistIds[currentRoom], sorted_playlist,token);
                }
                io.to(currentRoom).emit('currentTrackListUpdate', roomPlaylists[currentRoom]);

            } else {
                console.log('La chanson est déjà dans la playlist.');
            }
        }
    }
}
async function deleteSong(clickedSong, socket, io, roomPlaylists, sort, playlistIds, listToken) {
    if (clickedSong !== null) {

        const currentRooms = Array.from(socket.rooms);
        currentRooms.shift();
        const currentRoom = currentRooms.length > 0 ? currentRooms[0] : null;
        const currentDJ = currentRoom.substring(3);

        const token = listToken[currentDJ];

        if (currentRoom) {
            const songIds = roomPlaylists[currentRoom].map(song => song.id);
            console.log('songIds: ' + songIds);

            if (songIds.includes(clickedSong.id)) {
                roomPlaylists[currentRoom] = roomPlaylists[currentRoom].filter(song => song.id !== clickedSong.id);
                console.log("roomPlaylists[currentRoom]",roomPlaylists[currentRoom]);
                removeSong(playlistIds[currentRoom], clickedSong, token); // Implement this function to remove the song from the playlist
                let sorted_playlist = await sort(roomPlaylists[currentRoom]);
                roomPlaylists[currentRoom] = sorted_playlist;
                if (sorted_playlist.length > 1) {
                    sortPlaylistBP(playlistIds[currentRoom], sorted_playlist, token);
                }
                io.to(currentRoom).emit('currentTrackListUpdate', roomPlaylists[currentRoom]);

            } else {
                console.log('La chanson n\'est pas dans la playlist.');
            }
        }
    }
}

module.exports = {
    Message,
    updateCurrentTrackList,
    deleteSong,
};