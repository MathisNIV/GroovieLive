import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

export const Room = (props) => {

    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');

    const {id} = useParams();

    useEffect(() => {
        socket.emit('joinRoom', id);
        console.log("ici");
    }, []);

    // socket.on('roomUrl', (room) => {
    //     setURL('http://localhost:5173/room/'+room);
    //     setShowQRCode(true);
    //     setDescription("Share this QR code to join the room !");
    // })
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            socket.emit('msg', {
                text: inputValue,
            });
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="container">
            <div className="card">
                <h3>Hello You ! Welcome to the party</h3>
            </div>

                <div className="ui action input">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            handleFormSubmit(e);
                        }}
                        placeholder="Type your message..."
                    />

                </div>
        </div>
    );
}