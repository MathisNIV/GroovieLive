import React, { useState, useEffect } from 'react';
import './Room.css';
import {useParams, useSearchParams} from 'react-router-dom';

export const Room = (props) => {
    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
    const [songs, setSongs] = useState([]);
    const [params, setParams] = useSearchParams();

    const [listRooms, setListRooms] = useState([]);
    const [roomExist, setRoomExist] = useState(false);
    const id = params.get("id");

    useEffect(() => {
        socket.emit('getRooms')
        socket.on('roomsList', (entryList) => {
            setListRooms(entryList);
        })
    }, []);

    useEffect(() => {
        if (listRooms.includes(id)) {
            socket.emit('joinRoom', id);
            setRoomExist(true);
        } else {
            setRoomExist(false);
        }
    }, [listRooms, id])

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
            {roomExist &&
            <div className="card">
                <h3>Hello You! Welcome to the party</h3>
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
                            <div key={index}>
                                <img src={song.imageUrl} />
                                <li onClick={() => handleSongClick(song)} className="song-li">{song.title}, {song.author} ({song.mixTitle} version)</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>}

            {!roomExist &&
                <h3>Your QR code is not valid ! Try again</h3>
            }
        </div>
    );
};
