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

    const handlePlayClick = (song, index) => {
        const newAudioPlayer = new Audio(song.sampleUrl);

        newAudioPlayer.addEventListener('ended', () => {
            setAudioPlayers((prevAudioPlayers) => {
                const updatedPlayers = [...prevAudioPlayers];
                updatedPlayers[index] = null;
                return updatedPlayers;
            });
        });

        setAudioPlayers((prevAudioPlayers) => {
            const updatedPlayers = [...prevAudioPlayers];
            updatedPlayers[index] = newAudioPlayer;
            return updatedPlayers;
        });

        if (!newAudioPlayer.paused) {
            newAudioPlayer.pause();
        } else {
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
