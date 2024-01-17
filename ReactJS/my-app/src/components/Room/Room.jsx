import React, { useState, useEffect } from 'react';
import './Room.css';
import {useSearchParams} from 'react-router-dom';
import {SearchSong} from "./SearchSong.jsx";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import {Suggestions} from "./Suggestions.jsx";

export const Room = (props) => {
    const socket = props.socket;
    const [params, setParams] = useSearchParams();

    const [listRooms, setListRooms] = useState([]);
    const [roomExist, setRoomExist] = useState(false);
    const id = params.get("id");

    useEffect(() => {
        socket.emit('getRooms')
        socket.on('roomsList', (entryList) => {
            setListRooms(entryList);
        })
    }, [id]);

    useEffect(() => {
        if (listRooms.includes(id)) {
            socket.emit('joinRoom', id);
            setRoomExist(true);
        } else {
            setRoomExist(false);
        }
    }, [listRooms, id])

    return (
        <div>
            <Header title ="Welcome to the party !"/>
            {roomExist &&
                <div className="container">
                    <div className="column">
                        <div className="searchDiv">
                            <SearchSong socket={socket}/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="suggestDiv">
                            <Suggestions socket={socket}/>
                        </div>
                    </div>
                </div>
            }
            {!roomExist &&
                <h3>Your QR code is not valid ! Try again</h3>
            }
            <Footer/>
        </div>

    );
};
