const {addSong, sortPlaylistBP} = require("./playlistBeatport");

function updateLikeCount(socketId, song, room, likes){
    // Check if the key exists in the dictionary
    if (likes.hasOwnProperty(room)){
        if (likes[room].hasOwnProperty(song)) {

            // Check if the value (a list) contains the given string
            const index = likes[room][song].indexOf(socketId);
            if (index !== -1) {
                console.log("found socketId");
                // If the string is found, remove it from the list
                likes[room][song].splice(index, 1);
            } else {
                console.log("not found socketId");
                // If the string is not found, add it to the list
                likes[room][song].push(socketId);
            }
        }else{
            console.log("song not found");
            likes[room][song] = [socketId];
        }
    } else {
        console.log("room not found");
        // If the key doesn't exist, create a new key with a list containing the given string

        likes[room][song] = [socketId];
    }
    console.log("Updated likes: " + JSON.stringify(likes));
}

function broadcastLikeUpdate(currentRoom, io, likes){
    console.log('like update: ' + JSON.stringify(likes[currentRoom]));
    io.to(currentRoom).emit('likeUpdate', likes[currentRoom]);
}

function getCurrentRoom(socket){
    const currentRooms = Array.from(socket.rooms);
    currentRooms.shift();
    return currentRooms.length > 0 ? currentRooms[0] : null;
}

module.exports = {
    updateLikeCount,
    broadcastLikeUpdate,
    getCurrentRoom
};