const axios = require('axios');


// Token: beatport api token; Name: playlist name
async function createPlaylist(token, name){
    console.log("creating playlist " + name)
    try {
        let resp = await axios.put('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + name,
            {'token': token});
        let id = JSON.stringify(resp.data);

        console.log('id: ' + JSON.stringify(resp.data));
        return id;
    } catch(error) {
        // console.log(error);
        console.log("err create playlist");
    }
}

async function deletePlaylist(token, playlistId){
    try {
        let resp = await axios.delete('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + playlistId,
            {'token': token});
        console.log('status: ' + JSON.stringify(resp.data));
    } catch(error) {
        // console.log(error);
        console.log("err del playlist");
    }
}

async function addSong(token, playlistId, song){
    console.log("Adding song " + JSON.stringify(song) + " to playlist " + playlistId);
    try {
        let resp = await axios.patch('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + playlistId + "/add",
            {'token': token, 'songs': [song]});
        console.log('status: ' + JSON.stringify(resp.data));
    } catch(error) {
        // console.log(error);
        console.log("err add song")
    }
}

async function sortPlaylistBP(token, playlistId, songs){
    try {
        let resp = await axios.patch('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + playlistId + "/sort",
            {'token': token, 'songs': songs});
        console.log('status: ' + JSON.stringify(resp.data));
    } catch(error) {
        console.log("err sort");
        console.log(error);
    }
}

module.exports = {addSong, createPlaylist, deletePlaylist, sortPlaylistBP};