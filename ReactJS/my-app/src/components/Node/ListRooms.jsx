import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

export const ListRooms = (props) => {
    const socket = props.socket;
    const [listRooms, setListRooms] = useState([])
    useEffect(() => {
        socket.emit('getRooms');
        socket.on('roomsList', (entryList) => {
            console.log("list of rooms ", entryList);
            setListRooms(entryList);
        });
    }, [])


    return (
        <div>
            <h3>List of rooms available : </h3>
            <nav>
                <ul>
                    {listRooms.map((room, index) => (
                        <li key={index}>
                            <Link to={`room/${room}`}>{room}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}