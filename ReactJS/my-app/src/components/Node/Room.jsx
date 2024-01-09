import React, { useState, useEffect } from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

export const Room = (props) => {
    const socket = props.socket;
    const [inputValue, setInputValue] = useState('');
    const [params, setParams] = useSearchParams();

    const [listRooms, setListRooms] = useState([]);
    const [roomExist, setRoomExist] = useState(false);
    const id = params.get("id");

    useEffect(() => {
        socket.emit('getRooms')
        socket.on('roomsList', (entryList) => {
            setListRooms(entryList);
        })
    }, []);

    useEffect(() => {
        if(listRooms.includes(id)){
            socket.emit('joinRoom', id);
            setRoomExist(true);
        }
        else{
            setRoomExist(false);
        }
    }, [listRooms, id])

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
                {!roomExist && <h3>Your QR code is not valid !</h3>}
            </div>

            {roomExist &&
                <div className="card">
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
            }
        </div>
    );
};
