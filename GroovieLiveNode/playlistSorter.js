const axios = require('axios');


async function sort(playlist) {
    //console.log('unsorted: ' + JSON.stringify(playlist.map(song => song.title), null, 2));
    try {
        let resp = await axios.post('http://nginx:8081/GroovieLiveFlask-api/sort/playlist',
                                    {'playlist': playlist});
        console.log('sorted: ' + JSON.stringify(resp.data.playlist.map(song => song.title), null, 2));
        return resp.data.playlist;
    } catch(error) {
        console.log(error);
    }
}


module.exports = sort;