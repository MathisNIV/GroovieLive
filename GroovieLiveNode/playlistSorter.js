const axios = require('axios');


async function sort(playlist) {
    console.log('unsorted: ' + JSON.stringify(playlist))
    try {
        let resp = await axios.post('http://nginx:8081/GroovieLiveFlask-api/sort/playlist',
                                    {'playlist': playlist});
        console.log('sorted: ' + JSON.stringify(resp.data.playlist));
    } catch(error) {
        console.log(error);
    }
}


module.exports = sort;