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

    const DownloadPlaylist = (e) => {
        e.preventDefault();
        downloadTXT(finalPlaylist, 'playlist.txt');
    }

    function downloadTXT(jsonData, filename) {
        let txtContent = 'Soirée du 20/04/2021\n\n';

        // Format JSON data to desired text format
        jsonData.forEach(item => {
            const title = item.title;
            const artist = item.author[0];
            const mixtitle = item.mixTitle;

            txtContent += `${title} - ${artist} - ${mixtitle}   \n`;
        });

        // Create a Blob containing the text
        const blobData = new Blob([txtContent], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blobData);

        // Create a link element and trigger download
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
