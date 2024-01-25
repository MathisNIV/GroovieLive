import './App.css'
import {DJ_Room} from "./components/Room/DJ_Room.jsx";
import {Room} from "./components/Room/Room.jsx";
import {Index} from "./components/Index.jsx";
import {Login} from "./components/Login/Login.jsx";
import { NotFound } from './components/Errors/NotFound/NotFound.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketClient from "socket.io-client";
import {Register} from "./components/Login/Register.jsx";
import { QRFullScreen } from './components/QR/QRFullScreen.jsx';

const socket = socketClient.connect();

function App() {
  return (
    <Router>
        <Routes>
            <Route path="*" element={ <NotFound/> } />
            <Route path="/" element={ <Index socket = {socket}/> }/>
            <Route path="/login" element={ <Login socket = {socket}/> }/>
            <Route path="/QRFullScreen" element={ <QRFullScreen/> }/>
            <Route path="/register" element={ <Register socket = {socket}/> }/>
            <Route exact path="/DJRoom" element={ <DJ_Room socket = {socket} /> }/>
            <Route path="/PartyRoom" element={ <Room socket = {socket}/> } />
        </Routes>
    </Router>
    )
}

export default App
