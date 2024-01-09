import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import './Room.css';
=======
import {useParams, useSearchParams} from 'react-router-dom';
>>>>>>> ebc2ca4999f8851f323869415c152034be042c7e

export const Room = (props) => {
    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
<<<<<<< HEAD
    const [songs, setSongs] = useState([]);
    const { id } = useParams();
=======
    const [params, setParams] = useSearchParams();

    const [listRooms, setListRooms] = useState([]);
    const [roomExist, setRoomExist] = useState(false);
    const id = params.get("id");
>>>>>>> ebc2ca4999f8851f323869415c152034be042c7e

    useEffect(() => {
        socket.emit('getRooms')
        socket.on('roomsList', (entryList) => {
            setListRooms(entryList);
        })
    }, []);

    useEffect(() => {
        if(listRooms.includes(id)){
            socket.emit('joinRoom', id);
            setRoomExist(true);
        }
        else{
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
