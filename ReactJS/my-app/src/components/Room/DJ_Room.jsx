import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { useSelector } from 'react-redux';

export const DJ_Room = (props) => {
    const [url, setURL] = useState('http://nginx:8081/react/PartyRoom');
    const [showQRCode, setShowQRCode] = useState(false);
    const [description, setDescription] = useState('Create your own room !');

    let current_user = useSelector(state => state.userReducer.current_user);
    const socket = props.socket;

    const CreationRoom = (e) => {
        e.preventDefault();
        socket.emit('createRoom', current_user);
        socket.on('roomUrl', (room) => {
            setURL('http://nginx:8081/react/PartyRoom/?id='+room);
            setShowQRCode(true);
            setDescription("Share this QR code to join the room !");
        })
    }

    return (
        <div className="container">
            <Header title={`DJ : ${current_user}`}/>
            <div className="card">
                <h3>Hello {current_user}</h3>
                <h4>{description}</h4>
                {!showQRCode &&
                    <button className="ui button primary" onClick={CreationRoom}>
                        Create Room
                    </button>}
                {showQRCode && <QRCode value={url}/>}
            </div>
            <Footer/>
        </div>
    );
}