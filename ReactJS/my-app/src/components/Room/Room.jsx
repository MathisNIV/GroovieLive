import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Room.css';

export const Room = (props) => {
    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        socket.emit('joinRoom', id);
        console.log('ici');
    }, [id, socket]);

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
        // socket.emit('song', {
        //     song,
        // });

    }

    return (
        <div className="container">
            <div className="card">
                <h3>Hello You! Welcome to the party</h3>
            </div>
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
                        <li onClick={() => handleSongClick(song)} className="song-li" key={index}>{song.title} , {song.author}  ({song.mixTitle} version)</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
