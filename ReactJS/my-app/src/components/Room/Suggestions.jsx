import React, { useState, useEffect } from 'react';
import './Song.css';
import { useSelector } from 'react-redux';
import {current} from "@reduxjs/toolkit";

export const Suggestions = (props) => {
    const socket = props.socket;
    let current_song = useSelector(state => state.songReducer.current_song);
    const [CurrentTrackList, setCurrentTrackList] = useState([]);

    useEffect(() => {
        if(Object.keys(current_song).length !== 0){
            const current_song_DTO = {
                bpm: current_song.bpm,
                genre: current_song.genre,
                sub_genre: current_song.sub_genre,
                camelot_key: current_song.musicalKey,
            };

            console.log("DTO of song clicked :", current_song_DTO);

            setCurrentTrackList((prevList) => [...prevList, current_song_DTO]);
            socket.emit('updateCurrentTrackList', CurrentTrackList);

            console.log(CurrentTrackList);
        }
    }, [current_song, socket])

    return (
        <div>
            <div className="container">
                <h3>List of Suggested Songs</h3>
            </div>
        </div>
    )
}