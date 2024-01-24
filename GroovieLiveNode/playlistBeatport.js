const axios = require('axios');


async function createPlaylist(name,token){
    console.log("creating playlist " + name)
    console.log("token create", token)
    try {
        let resp = await axios.put(
            'http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + name,
            {},
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        );
        let id = JSON.stringify(resp.data);

        console.log('id: ' + JSON.stringify(resp.data));
        return id;
    } catch(error) {
        // console.log(error);
        console.log("err create playlist",error);
    }
}

async function deletePlaylist(playlistId,token){
    console.log("deleting playlist " + playlistId)
    console.log("token del", token
    try {
        let resp = await axios.delete('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + playlistId,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log('status: ' + JSON.stringify(resp.data));
    } catch(error) {
        // console.log(error);
        console.log("err del playlist",error);
    }
}

async function addSong(playlistId, song, token) {
    console.log("Adding song " + JSON.stringify(song) + " to playlist " + playlistId);
    try {
        console.log("add song ", token)

        const response = await axios.patch(
            `http://nginx:8081/GroovieLiveSpringSong-api/playlist/${playlistId}/add`,
            { 'songs': [song] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('status: ' + JSON.stringify(response.data));
    } catch(error) {
        console.log("err add song", error);
    }
}

async function removeSong(playlistId, song, token) {
    console.log("Removing song " + JSON.stringify(song) + " from playlist " + playlistId);
    try {
        const response = await axios.patch(
            `http://nginx:8081/GroovieLiveSpringSong-api/playlist/${playlistId}/remove`,
            { 'songs': [song] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('status: ' + JSON.stringify(response.data));
    } catch(error) {
        console.log("Error removing song", error);
    }
}


async function sortPlaylistBP(playlistId, songs, token){
    try {
        console.log("sorting q:" + JSON.stringify(songs));
        let resp = await axios.patch('http://nginx:8081/GroovieLiveSpringSong-api/playlist/' + playlistId + "/sort",
            { 'songs': songs },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log('status: ' + JSON.stringify(resp.data));
    } catch(error) {
        console.log("err sort");
        console.log(error);
    }
}

module.exports = {addSong, createPlaylist, deletePlaylist, sortPlaylistBP, removeSong};