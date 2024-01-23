import { useState } from 'react'
import './App.css'
import {DJ_Room} from "./components/Room/DJ_Room.jsx";
import {Room} from "./components/Room/Room.jsx";
import {ListRooms} from "./components/Room/ListRooms.jsx";
import {Login} from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketClient from "socket.io-client";
import {Register} from "./components/Login/Register.jsx";
import {CookiesProvider, useCookies} from "react-cookie";

const socket = socketClient.connect();

function App() {
  // const [cookies, setCookie] = useCookies(["user"]);
  // function handleLogin(user) {
  //     setCookie("user", user);
  // }
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <ListRooms socket = {socket}/> }/>
                <Route path="/login" element={ <Login socket = {socket} />}/>
                <Route path="/register" element={ <Register socket = {socket}/> }/>
                <Route exact path="/DJRoom" element={ <DJ_Room socket = {socket}  /> }/>
                <Route path="/PartyRoom" element={ <Room socket = {socket}/> } />
            </Routes>
        </Router>


    )
  // return (
  //     <CookiesProvider>
  //         <Router>
  //             <Routes>
  //                 <Route path="/" element={ <ListRooms socket = {socket}/> }/>
  //                 <Route path="/login" element={ <Login socket = {socket} handleLogin={handleLogin}/> }/>
  //                 <Route path="/register" element={ <Register socket = {socket}/> }/>
  //                 <Route exact path="/DJRoom" element={ <DJ_Room socket = {socket} cookies={cookies.user} /> }/>
  //                 <Route path="/PartyRoom" element={ <Room socket = {socket}/> } />
  //                 {/*<Route exact path="/room/DJ_Mathis" element={<Room socket = {socket}/>}></Route>*/}
  //             </Routes>
  //         </Router>
  //     </CookiesProvider>
  //
  //
  // )
}

export default App
