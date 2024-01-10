import React, { useState, useEffect } from 'react';
import './Room.css';
import { useDispatch } from "react-redux";
import { update_selected_song } from "../../slices/SongSlice.js";

export const SearchSong = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [songs, setSongs] = useState([]);
    const [CurrentTrackListDTO, setCurrentTrackListDTO] = useState([]);
    const [CurrentTrackList, setCurrentTrackList] = useState([]);
    const [searchType, setSearchType] = useState('tracks');

    const socket = props.socket;
    const dispatch = useDispatch();

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
    }, [inputValue,searchType, socket]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSongClick = (song) => {
        setInputValue('');
        dispatch(update_selected_song(song));


        const songDTO = {
            bpm: song.bpm,
            genre: song.genre,
            sub_genre: song.sub_genre,
            camelot_key: song.musicalKey,
        };
        console.log(songDTO);

        setCurrentTrackListDTO((prevList) => [...prevList, songDTO]);
        setCurrentTrackList((prevList) => [...prevList, song]);
    }
    useEffect(() => {
        socket.emit('updateCurrentTrackList', CurrentTrackList, CurrentTrackListDTO);
    }, [CurrentTrackList, socket]);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="container">
            <div className="searchSong">
                <h3>Choose your song to suggest</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Rechercher une musique..."
                />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="tracks">Musique</option>
                    <option value="artists">Artiste</option>
                </select>
            </div>
            <ul className="song-ul">
                {inputValue.trim() && songs.map((song, index) => (
                    <div key={index} className="song-element">
                        <img className="song-image" src={song.imageUrl}/>
                        <li onClick={() => handleSongClick(song)}
                            className="song-li">{song.title}, {song.author} ({song.mixTitle} version)
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}