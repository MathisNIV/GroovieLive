const axios = require('axios');


async function sort(playlist) {
    const playlistDTO = playlistToPlaylistDTO(playlist);
    try {
        let resp = await axios.post('http://nginx/GroovieLiveFlask-api/sort/playlist',
                                    {'playlist': playlistDTO});
        console.log('after ' + resp.data.playlist[0]);
    } catch(error) {
        console.log(error);
    }
}


function playlistToPlaylistDTO(playlist) {
    let playlistDTO = [];
    for (let songI = 0; songI < playlist.length; songI++) {
        curentSong = playlist[songI];
        playlistDTO.push({'id': curentSong.id,
                          'bpm': curentSong.bpm,
                          'genre': curentSong.genre,
                          'camelot_key': curentSong.musicalKey});
    };
    return playlistDTO;
}


module.exports = sort;