const initializeSocketServer = require('./socketManager');
const { server, io } = initializeSocketServer();
const sort = require('./playlistSorter')
const axios = require('axios');
const { createRoom, joinRoom, getRooms, deleteRoom } = require('./RoomConnection.js');
const {Register, Login} = require('./UserConnection.js');
const {Message, updateCurrentTrackList} = require('./SongSelection');
const xml2js = require('xml2js');


let roomPlaylists = {}; // Object to store room-specific playlists
let playlistIds = {}; // Beatport playlist ID for each room
let tokenBP = '';

server.listen(3000, () => {
    console.log("Ecoute sur 3000");
});

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('createRoom', (user) => {
        createRoom(user, socket, roomPlaylists, playlistIds);
    });

    socket.on('joinRoom', (roomSelected) => {
        joinRoom(roomSelected, socket, roomPlaylists, io);
    });

    socket.on('getRooms', () => {
        getRooms(io, socket);
    });

    socket.on('deleteRoom', () => {
        deleteRoom(io, socket, playlistIds, roomPlaylists);
    })

    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`);
    });

    socket.on('Register', (user) => {
        Register(user, socket);
    });

    socket.on('Login', (user) => {
        Login(user, socket);
    });

    socket.on('SaveToken', (token, user) => {
        const room = "DJ_" + user;
        console.log("IN SAVE TOKEN", token);
        io.to(room).emit('TokenUpdate', token);
    })

    socket.on('msg', async (msg) => {
        Message(msg, io);
    });

    socket.on('updateCurrentTrackList', (clickedSong) => {
        updateCurrentTrackList(clickedSong, socket, io, roomPlaylists, sort, playlistIds);
    });

    socket.on('downloadPlaylist', (playlist) => {
        const xmlData = {
            DJ_PLAYLISTS: {
                $: { Version: '1.0.0' },
                PRODUCT: {
                    $: { Name: 'rekordbox', Version: '6.8.1', Company: 'AlphaTheta' }
                },
                COLLECTION: {
                    $: { Entries: playlist.length },
                    TRACK: playlist.map((track, index) => ({
                        $: {
                            TrackID: track.id,
                            Name: track.title,
                            Artist: track.author.join(', '),
                            Composer: track.authorRemix.join(', '),
                            Album: track.mixTitle,
                            AverageBpm: track.bpm,
                            Tonality: track.camelotKey,
                            Mix: track.mixTitle,
                            Genre: track.genre,
                            Size: track.length,
                            TotalTime: track.length / 1000,

                        }
                    }))
                },
                PLAYLISTS: {
                    NODE: {
                        $: { Type: '0', Name: 'ROOT', Count: '0' }
                    }
                }
            }
        };

        const builder = new xml2js.Builder();
        const xmlPlaylist = builder.buildObject(xmlData);

        socket.emit('downloadPlaylistXML', xmlPlaylist);
    });
});
