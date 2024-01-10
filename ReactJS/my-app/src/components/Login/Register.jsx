import React, { useState, useEffect } from 'react';
import "./Login.css";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";

export const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState('');

    const RegisterSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        console.log(user);
        // fetch('http://localhost:8080//GroovieLiveSpring-api/auth', RegisterDTO);
    }
    return (
        <div>
            <Header title="Register"/>
            <form onSubmit={RegisterSubmit}>
                <div className="column">
                    <span className="labelInput">Username</span>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="column">
                    <span className="labelInput" id="labelPassword">Password</span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="column" id="DivSubmit">
                    <input type="submit" value="Connect"/>
                </div>
            </form>
            <Footer/>
        </div>
    )
}
