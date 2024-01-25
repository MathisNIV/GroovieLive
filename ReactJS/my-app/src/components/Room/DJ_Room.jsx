import React, { useState, useEffect, useRef } from 'react';
import {QR} from '../QR/QR.jsx';
import Cookies from 'js-cookie';
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { Forbidden } from '../Errors/Forbidden/Forbidden.jsx';
import { useSelector } from 'react-redux';
import "./DJ_Room.css";

export const DJ_Room = (props) => {
    const [url, setURL] = useState('http://52.3.93.100:8081/react/PartyRoom');
    const [showQRCode, setShowQRCode] = useState(false);
    const [description, setDescription] = useState('Create your own room !');
    const [roomPlaylist, setRoomPlaylist] = useState({});
    const [flagPlaylist, setFlagPlaylist] = useState(false);
    const [likes, setLikes] = useState([]);

    let current_user = useSelector(state => state.userReducer.current_user);
    const socket = props.socket;
    const qrRef = useRef();

    const CreationRoom = (e) => {
        e.preventDefault();
        socket.emit('createRoom', current_user);
        socket.on('roomUrl', (room) => {
            setURL('http://52.3.93.100:8081/PartyRoom/?id=' + room);
            setShowQRCode(true);
            setDescription("Share this QR code to join the room !");
        })
    }

    const DeleteRoom = (e) => {
        e.preventDefault();
        socket.emit("deleteRoom");
        setShowQRCode(false);
        setDescription('Create your own room !');
        setRoomPlaylist({});
    }

    useEffect(() => {
        socket.on('currentTrackListUpdate', (updatedList) => {
            setRoomPlaylist(updatedList);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('likeUpdate', (updatedLikes) => {
            console.log("received like update:" + JSON.stringify(updatedLikes));
            setLikes(updatedLikes);
        });

    }, [socket]);

    useEffect(() => {
        if (Object.keys(roomPlaylist).length === 0) {
            setFlagPlaylist(false);
        } else {
            setFlagPlaylist(true);
        }
        console.log(roomPlaylist);
    }, [roomPlaylist])

    const DownloadPlaylist = (e) => {
        socket.emit('downloadPlaylist', roomPlaylist);
    }

    useEffect(() => {
        socket.on('downloadPlaylistXML', (xmlPlaylist) => {
            downloadXML(xmlPlaylist, 'playlist.xml');
        });
    }, [socket]);

    function downloadXML(xmldata, filename) {
        const blobData = new Blob([xmldata], {type: 'application/xml'});
        const url = URL.createObjectURL(blobData);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Release the URL object
        URL.revokeObjectURL(url);
    }

    const deleteSong = (song) => {
        console.log("delete song emited")
        socket.emit('deleteSong', song);
    }


    if (!Cookies.get('DJ')) {
        return <Forbidden/>;
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
                        <QR value={url}/>
                            <div className="button-container">
                                <button className="ui button primary" onClick={DeleteRoom}>
                                    DeleteRoom
                                </button>
                                <button className="ui button primary" onClick={DownloadPlaylist}>
                                    Download Playlist
                                </button>
                            </div>
                    </div>
                }
            </div>

            {showQRCode && flagPlaylist &&
                (<div className="ListDiv">
                        <table className="song-table">
                            <thead>
                            <tr>

                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>BPM</th>
                                <th>Camelot Key</th>
                                <th>Likes</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {roomPlaylist.map((song, index) => (
                                <tr key={index} className="song-row">
                                    <td><img className="song-image" src={song.imageUrl}
                                             alt={`${song.title} cover`}/> {song.title} </td>
                                    <td>{song.author}</td>
                                    <td>{song.genre}</td>
                                    <td>{song.bpm}</td>
                                    <td>{song.camelotKey}</td>
                                    <td>
                                        ♥ {likes[song.id] ? likes[song.id].length : '0'}
                                    </td>
                                    <td>
                                        <button className="ui button primary" onClick={() => {
                                            deleteSong(song);
                                        }}>
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            <Footer/>
        </div>
    );
}
