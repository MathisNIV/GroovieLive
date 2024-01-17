import React, { useState, useEffect } from 'react';
import './Song.css';
import {Footer} from "../Frameworks/Footer.jsx";


export const Suggestions = (props) => {
    const socket = props.socket;
    const [localUpdatedList, setLocalUpdatedList] = useState([]);

    useEffect(() => {
        socket.on('currentTrackListUpdate', (updatedList) => {
            setLocalUpdatedList(updatedList);
        });

    }, [socket]);

    useEffect(() => {
        console.log("localList suggestions.jsx ", localUpdatedList);
    }, [localUpdatedList]);

    return (
        <div className="container">
            <div className="suggestSong">
                <h3>TrackList</h3>
                <p>The people have requested the following songs :</p>
            </div>
            <ul className="song-ul">
                {localUpdatedList.map((song, index) => (
                    <div key={index} className="song-element">
                        <img className="song-image" src={song.imageUrl} alt={`${song.title} cover`} />
                        <li className="song-li">
                            {song.title}, {song.author} ({song.mixTitle} version)
                        </li>
                    </div>
                ))}
            </ul>
            <Footer/>
        </div>
    );
};
