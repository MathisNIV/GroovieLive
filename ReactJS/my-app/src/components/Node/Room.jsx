import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

export const Room = (props) => {

    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();

    useEffect(() => {
        socket.emit('joinRoom', "DJ_Mathis");
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
            setInputValue('');
        }

    };

    return (
        <div className="container">
            <div className="card">
                <h3>Hello You ! Welcome to the party</h3>
                <h4>Post id : {id}</h4>
            </div>

            {/*<form className="ui form center aligned" onSubmit={handleFormSubmit}>*/}
            {/*    <div className="ui action input">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={inputValue}*/}
            {/*            onChange={(e) => setInputValue(e.target.value)}*/}
            {/*            placeholder="Type your message..."*/}
            {/*        />*/}
            {/*        <button className='ui button' type="submit">Send</button>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );
}