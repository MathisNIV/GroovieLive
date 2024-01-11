import React, { useState, useEffect } from 'react';
import './Song.css';


export const Suggestions = (props) => {
    const socket = props.socket;
    const [localUpdatedList, setLocalUpdatedList] = useState([]);

    useEffect(() => {
        socket.on('currentTrackListUpdate', (updatedList) => {
            setLocalUpdatedList(updatedList);
        });

    }, [socket]);

    useEffect(() => {
        console.log("locallist suggestions.jsx ", localUpdatedList);
    }, [localUpdatedList]);

    return (
        <div className="container">
            <h3>TrackList</h3>
            <div className="song-list">
                <ul className="song-ul">
                    {localUpdatedList.map((song, index) => (
                        <div key={index} className="song-container">
                            <img className="song-image" src={song.imageUrl} alt={`${song.title} cover`} />
                            <li className="song-li">
                                {song.title}, {song.author} ({song.mixTitle} version)
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};
