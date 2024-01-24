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
    const [finalPlaylist, setFinalPlaylist] = useState([]);

    const [listRooms, setListRooms] = useState([]);
    const [roomExist, setRoomExist] = useState(false);
    const [roomDeleted, setRoomDeleted] = useState(false);
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
            // setRoomDeleted(false);
        } else {
            setRoomExist(false);
        }
    }, [listRooms, id]);

    useEffect(() => {
        socket.on("lastSave", (playlist) =>{
            setFinalPlaylist(playlist);
            setRoomDeleted(true);
        })
    }, [socket]);

    // useEffect(() => {
    //     console.log("Room deleted ? ", roomDeleted);
    //     console.log("Room exist ? ", roomExist);
    // }, [roomDeleted, roomExist]);

    const DownloadPlaylist = (e) => {
        e.preventDefault();
        downloadJSON(finalPlaylist, 'playlist.json');
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
        <div>
            {roomExist && !roomDeleted &&(
                <div className="container">

                    <Header title ={`Welcome to the party !`}/>
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
            )}

            {roomDeleted && (
                <div>
                    <h3>The DJ set is finished.</h3>
                    <h5>Want to download it ?</h5>
                    <button className="ui button primary" onClick={DownloadPlaylist}>Download</button>
                </div>
            )}

            {!roomExist && !roomDeleted && (
                <h3>Your QR code is not valid ! Try again</h3>

            )}
            <Footer/>
        </div>

    );
};
