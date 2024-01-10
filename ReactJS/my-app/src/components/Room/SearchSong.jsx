import React, { useState, useEffect } from 'react';
import './Room.css';
import { useDispatch } from "react-redux";
import { update_selected_song } from "../../slices/SongSlice.js";

export const SearchSong = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [songs, setSongs] = useState([]);
    const socket = props.socket;
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('songs', (songs) => {
            setSongs(songs.slice(0, 10));
        });
        if (inputValue.trim()) {
            socket.emit('msg', {
                text: inputValue,
            });
        }
    }, [inputValue, socket]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSongClick = (song) => {
        setInputValue('');
        console.log(song);
        dispatch(update_selected_song(song));
        // socket.emit('song', {
        //     song,
        // });

    }

    return (
        <div className="searchSong">
            <h3>Choose your song to suggest</h3>
            <div className="ui action input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Rechercher une musique..."
                />
            </div>
            <div className="song-list">
                <ul className="song-ul">
                    {inputValue.trim() && songs.map((song, index) => (
                        <div key={index} className="song-container">
                            <img className="song-image" src={song.imageUrl}/>
                            <li onClick={() => handleSongClick(song)}
                                className="song-li">{song.title}, {song.author} ({song.mixTitle} version)
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}