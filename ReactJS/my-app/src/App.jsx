import { useState } from 'react'
import './App.css'
import {DJ_Room} from "./components/Room/DJ_Room.jsx";
import {Room} from "./components/Room/Room.jsx";
import {Index} from "./components/Index.jsx";
import {Login} from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketClient from "socket.io-client";
import {Register} from "./components/Login/Register.jsx";

const socket = socketClient.connect();

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={ <Index socket = {socket}/> }/>
            <Route path="/login" element={ <Login socket = {socket}/> }/>
            <Route path="/register" element={ <Register socket = {socket}/> }/>
            <Route exact path="/DJRoom" element={ <DJ_Room socket = {socket} /> }/>
            <Route path="/PartyRoom" element={ <Room socket = {socket}/> } />
            {/*<Route exact path="/room/DJ_Mathis" element={<Room socket = {socket}/>}></Route>*/}
        </Routes>
    </Router>

  )
}

export default App
