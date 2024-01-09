import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';


export const DJ_Room = (props) => {
    const [url, setURL] = useState('http://localhost/room');
    const [showQRCode, setShowQRCode] = useState(false);
    const [description, setDescription] = useState('Create your own room !');

    const socket = props.socket;
    const CreationRoom = (e) => {
        e.preventDefault();
        socket.emit('createRoom');
        socket.on('roomUrl', (room) => {
            setURL('http://localhost/room/'+room);
            setShowQRCode(true);
            setDescription("Share this QR code to join the room !");
        })
    }

    return (
        <div className="container">
            <div className="card">
                <h3>Hello DJ</h3>
                <h4>{description}</h4>
                {!showQRCode &&
                    <button className="ui button primary" onClick={CreationRoom}>
                        Create Room
                    </button>}
                {showQRCode && <QRCode value={url}/>}
            </div>
        </div>
    );
}