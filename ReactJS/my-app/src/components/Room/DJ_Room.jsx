import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { useSelector } from 'react-redux';
import "./DJ_Room.css";

export const DJ_Room = (props) => {
    const [url, setURL] = useState('http://localhost:8081/react/PartyRoom');
    const [showQRCode, setShowQRCode] = useState(false);
    const [description, setDescription] = useState('Create your own room !');
    const [roomPlaylist, setRoomPlaylist] = useState({});
    const [flagPlaylist, setFlagPlaylist] = useState(false);

    let current_user = useSelector(state => state.userReducer.current_user);
    const socket = props.socket;

    const CreationRoom = (e) => {
        e.preventDefault();
        socket.emit('createRoom', current_user);
        socket.on('roomUrl', (room) => {
            setURL('http://localhost:8081/PartyRoom/?id='+room);
            setShowQRCode(true);
            setDescription("Share this QR code to join the room !");
        })
    }

    const DeleteRoom = (e) => {
        e.preventDefault();
        socket.emit("deleteRoom");
        setShowQRCode(false);
        setDescription('Create your own room !');
    }

    useEffect(() => {
        socket.on('currentTrackListUpdate', (updatedList) => {
            setRoomPlaylist(updatedList);
        });
    }, [socket]);

    useEffect(() => {
        if(Object.keys(roomPlaylist).length === 0){
            setFlagPlaylist(false);
        }
        else{
            setFlagPlaylist(true);
        }
        console.log(roomPlaylist);
    }, [roomPlaylist])

    const DownloadPlaylist = (e) => {
        e.preventDefault();
        downloadJSON(roomPlaylist, 'playlist.json');
    }
    function downloadJSON(jsonData, filename) {
        const blobData = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blobData);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Release the URL object
        URL.revokeObjectURL(url);
    }

    return (
        <div className="container">
            <Header title={`DJ : ${current_user}`}/>

            <div className="startDiv">
                <h3>Hello {current_user}</h3>
                <h4>{description}</h4>
                {!showQRCode &&
                    <button className="ui button primary" onClick={CreationRoom}>
                        Create Room
                    </button>}
                {showQRCode &&
                    <div>
                        <QRCode value={url}/>
                        <button className="ui button primary" onClick={DeleteRoom}>
                            DeleteRoom
                        </button>
                        <button className="ui button primary" onClick={DownloadPlaylist}>
                            Download Playlist
                        </button>
                    </div>
                }
            </div>

            {showQRCode && flagPlaylist &&
                (<div className="ListDiv">
                    <ul className="song-ul">
                        {roomPlaylist.map((song, index) => (
                            <div key={index} className="song-element">
                                <img className="song-image" src={song.imageUrl} alt={`${song.title} cover`}/>
                                <li className="song-li">
                                    {song.title},{song.author} ({song.mixTitle} version)
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>)

            }
            <Footer/>
        </div>
    );
}