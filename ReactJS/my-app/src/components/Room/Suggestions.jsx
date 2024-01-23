import React, { useState, useEffect } from 'react';
import './Song.css';
import {Footer} from "../Frameworks/Footer.jsx";

export const Suggestions = (props) => {
    const socket = props.socket;
    const [localUpdatedList, setLocalUpdatedList] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        socket.on('currentTrackListUpdate', (updatedList) => {
            setLocalUpdatedList(updatedList);
        });

    }, [socket]);

    useEffect(() => {
        socket.on('likeUpdate', (updatedLikes) => {
            console.log("received like update:" + JSON.stringify(updatedLikes));
            setLikes(updatedLikes);
        });

    }, [socket]);

    useEffect(() => {
        console.log("localList suggestions.jsx ", localUpdatedList);
    }, [localUpdatedList]);

    function like(song){
        console.log("emitting like");
        socket.emit('like', (song.id));
    }

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
                            <button onClick={() => like(song)}>
                                ♥ {likes[song.id] ? likes[song.id].length : '0'}
                            </button>
                        </li>
                    </div>
                ))}
            </ul>
            <Footer/>
        </div>
    );
};
