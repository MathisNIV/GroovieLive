import React, { useState, useEffect } from 'react';
import "./Login.css";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { useDispatch } from "react-redux";
import { update_selected_user } from "../../slices/UserSlice.js";

export const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState('');
    const dispatch = useDispatch();

    const handleOnUserConnected = (current_user) => {
        dispatch(update_selected_user(current_user));
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        console.log(user);
        // fetch('http://localhost:8080//GroovieLiveSpring-api/auth', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //
        //             throw new Error('Login failed');
        //         }
        //     })
        //     .then(data => {
        //         console.log('Success:', data);
        //         handleOnUserSelected(data);
        //         navigate('/index');
        //         setUsername('');
        //         setPassword('');
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //         setloginError('Wrong username or passeword');
        //     });
    }
    return (
        <div className="login">
            <Header title="Login"/>
            <form onSubmit={loginSubmit}>
                <div className="column">
                    <span className="labelInput">Username</span>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="column">
                    <span className="labelInput" id="labelPassword">Password</span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="column">
                    <input type="submit" value="Connect"/>
                </div>
            </form>
            <Footer/>
        </div>
    )
}
