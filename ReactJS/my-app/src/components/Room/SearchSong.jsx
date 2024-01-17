import React, { useState, useEffect } from 'react';
import './Song.css';

export const SearchSong = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [songs, setSongs] = useState([]);
    const [clickedSong, setClickedSong] = useState();
    const [searchType, setSearchType] = useState('tracks');
    const [audioPlayers, setAudioPlayers] = useState([]);

    const socket = props.socket;

    useEffect(() => {
        socket.on('songs', (songs) => {
            setSongs(songs.slice(0, 10));
        });
        if (inputValue.trim()) {
            socket.emit('msg', {
                text: inputValue,
                type: searchType,
            });
        }
    }, [inputValue, searchType, socket]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSongClick = (song) => {
        setInputValue('');
        setClickedSong(song);
        pauseAllPlayers();
    };

    useEffect(() => {
        console.log("clickedSong", clickedSong);
        if (clickedSong){
            socket.emit('updateCurrentTrackList', clickedSong);
        }
    },[clickedSong]);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    // socket.on('downloadPlaylist', (jsonPlaylist) => {
    //     const blob = new Blob([jsonPlaylist], { type: 'application/json' });
    //
    //     // Créez un lien temporaire pour le téléchargement
    //     const a = document.createElement('a');
    //     a.href = URL.createObjectURL(blob);
    //     a.download = 'playlist.json';
    //
    //     // Ajoutez le lien au DOM, déclenchez le téléchargement, puis retirez-le
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //
    //     // Révoquez l'URL pour libérer les ressources
    //     URL.revokeObjectURL(a.href);
    // });


    const pauseAllPlayers = () => {
        audioPlayers.forEach((player) => {
            if (player && !player.paused) {
                player.pause();
            }
        });
        setAudioPlayers([]);
    };


    const handlePlayClick = (song, index) => {
        const currentAudioPlayer = audioPlayers[index];

        const updateAudioPlayers = (newPlayer) => {
            setAudioPlayers((prevAudioPlayers) => {
                const updatedPlayers = [...prevAudioPlayers];
                updatedPlayers[index] = newPlayer;
                return updatedPlayers;
            });
        };

        if (currentAudioPlayer) {
            if (!currentAudioPlayer.paused) {
                currentAudioPlayer.pause();
            } else {
                currentAudioPlayer.play();
            }
        } else {
            const newAudioPlayer = new Audio(song.sampleUrl);

            const removeAudioPlayer = () => updateAudioPlayers(null);

            newAudioPlayer.addEventListener('ended', removeAudioPlayer);
            newAudioPlayer.addEventListener('pause', removeAudioPlayer);
            newAudioPlayer.addEventListener('play', () => {
                audioPlayers.forEach((player, i) => {
                    if (i !== index && player && !player.paused) {
                        player.pause();
                        updateAudioPlayers(null);
                    }
                });
                updateAudioPlayers(newAudioPlayer);
            });

            newAudioPlayer.play();
        }
    };


    return (
        <div className="container">
            <div className="searchSong">
                <h3>Choose your song to suggest</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search for a song..."
                    id="InputSearch"
                />
                <select id="SelectSearch" value={searchType} onChange={handleSearchTypeChange}>
                    <option value="tracks">Song</option>
                    <option value="artists">Artist</option>
                </select>
            </div>
            <ul className="song-ul">
                {inputValue.trim() && songs.map((song, index) => (
                    <div key={index} className="song-element">
                        <img className="song-image" src={song.imageUrl}/>
                        <li onClick={() => handleSongClick(song)}
                            className="song-li">{song.title}, {song.author} ({song.mixTitle} version)
                        </li>
                        <button onClick={() => handlePlayClick(song, index)}>
                            {audioPlayers[index] && !audioPlayers[index].paused ? (
                                <span>&#x23F8;</span>
                            ) : (
                                <span>&#x25B6;</span>
                            )}
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};
