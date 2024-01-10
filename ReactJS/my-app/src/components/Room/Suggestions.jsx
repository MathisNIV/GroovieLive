import React, { useState, useEffect } from 'react';
import './Room.css';
import { useSelector } from 'react-redux';

export const Suggestions = (props) => {

    let current_song = useSelector(state => state.songReducer.current_song);
    console.log(current_song);

    return (
        <div className="suggestions">
            <h3>List of Suggested Songs</h3>
        </div>
    )
}