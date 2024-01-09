import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {DJ_Room} from "./components/Node/DJ_Room.jsx";
import {Room} from "./components/Node/Room.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketClient from "socket.io-client";

const socket = socketClient.connect('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route exact path="/room" element={<DJ_Room socket = {socket} />}/>
            {/*<Route*/}
            {/*    path="room/:id"*/}
            {/*    element={<Room />}*/}
            {/*/>*/}
            <Route exact path="/room/DJ_Mathis" element={<Room socket = {socket}/>}></Route>
        </Routes>
    </Router>

  )
}

export default App
