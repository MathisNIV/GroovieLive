import React, { useState, useEffect } from 'react';
import "./Login.css";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { update_selected_user } from "../../slices/UserSlice.js";

export const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [registerError, setRegisterError] = useState('');
    const socket = props.socket;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RegisterSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            role: 'user',
            email: email,
        };
        console.log("Register : ", user);
        socket.emit('Register', user);
    }

    useEffect(() => {
        setRegisterError("");
    }, [username, password, email]);

    useEffect(() => {
        socket.on('RegisterUser', (userConnected) => {
            if(typeof userConnected === 'string') {
                setRegisterError('Invalid Credentials');
            }
            else {
                console.log("Hi it's", userConnected.username);
                handleOnUserRegistered(userConnected.username)
                setUsername('');
                setPassword('');
                setEmail('');
                navigate('/DJRoom');
            }
        })
    }, [])

    const handleOnUserRegistered = (current_username) => {
        dispatch(update_selected_user(current_username));
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
                <div className="column">
                    <span className="labelInput">Email</span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="column" id="DivSubmit">
                    <input type="submit" value="Connect"/>
                </div>
                <div className="column">
                    <p className="errorWarning">{registerError}</p>
                </div>
            </form>
            <Footer/>
        </div>
    )
}
