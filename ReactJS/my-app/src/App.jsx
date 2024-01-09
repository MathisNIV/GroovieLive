import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {DJ_Room} from "./components/Node/DJ_Room.jsx";
import {Room} from "./components/Node/Room.jsx";
import {ListRooms} from "./components/Node/ListRooms.jsx";
import {Login} from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketClient from "socket.io-client";
import {Register} from "./components/Login/Register.jsx";

const socket = socketClient.connect('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={ <ListRooms socket = {socket}/> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/register" element={ <Register /> }/>
            <Route exact path="/DJRoom" element={ <DJ_Room socket = {socket} /> }/>
            <Route path="/PartyRoom" element={ <Room socket = {socket}/> } />
            {/*<Route exact path="/room/DJ_Mathis" element={<Room socket = {socket}/>}></Route>*/}
        </Routes>
    </Router>

  )
}

export default App
