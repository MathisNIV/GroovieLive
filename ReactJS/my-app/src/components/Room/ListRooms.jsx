import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";

export const ListRooms = (props) => {
    const socket = props.socket;
    const [listRooms, setListRooms] = useState([])
    useEffect(() => {
        socket.emit('getRooms');
        socket.on('roomsList', (entryList) => {
            setListRooms(entryList);
        });
    }, [socket])


    return (
        <div>
            <Header title="GroovieLive"/>
                <h3>List of rooms available : </h3>
                <nav>
                    <ul>
                        {listRooms.map((id, index) => (
                            <li key={index}>
                                <Link to={`http://localhost:8081/PartyRoom/?id=${id}`}>{id}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            <Footer/>
        </div>
    );
}