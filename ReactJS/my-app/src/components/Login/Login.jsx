import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./Login.css";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { useDispatch } from "react-redux";
import { update_selected_user } from "../../slices/UserSlice.js";
import {useNavigate} from "react-router-dom";

export const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = props.socket;

    const handleOnUserConnected = (current_username) => {
        dispatch(update_selected_user(current_username));
        Cookies.set('DJ', current_username)
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            role: 'user',
        };
        socket.emit('Login', user);
    }

    useEffect(() => {
        setloginError("");
    }, [username, password]);

    useEffect(() => {
        socket.on('LoginUser', (userConnected) => {
            if (userConnected === "Beatport server is currently unavailable, please try again later" ||
                userConnected === "Wrong credentials" ||
                userConnected === "Something went wrong") {

                setloginError(userConnected);
            }
            else {
                handleOnUserConnected(userConnected.username)
                setUsername('');
                setPassword('');
                navigate('/DJRoom');
            }
        })
    }, [])

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

                <p className="errorWarning">{loginError}</p>
            </form>
            <Footer/>
        </div>
    )
}
