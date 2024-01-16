const axios = require('axios');


async function sort(playlist) {
    console.log('unsorted: ' + JSON.stringify(playlist))
    try {
        let resp = await axios.post('http://nginx/GroovieLiveFlask-api/sort/playlist',
                                    {'playlist': playlist});
        console.log('sorted: ' + JSON.stringify(playlist));
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


function sortedPlaylistDTOToSortedPlaylist(sortedPlaylistDTO, playlist) {
    let sortedPlaylist = sortedPlaylistDTO.map(dto => {
        return playlist.find(song => song.id === dto.id);
    });
    return sortedPlaylist.reverse();
}


module.exports = sort;