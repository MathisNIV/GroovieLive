import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Room = (props) => {
    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        socket.emit('joinRoom', id);
        console.log('ici');
    }, [id, socket]);

    useEffect(() => {
        if (inputValue.trim()) {
            socket.emit('msg', {
                text: inputValue,
            });
        }
    }, [inputValue, socket]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="container">
            <div className="card">
                <h3>Hello You! Welcome to the party</h3>
            </div>
            <div className="ui action input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
            </div>
        </div>
    );
};
