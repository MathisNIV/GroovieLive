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
            <a href="https://www.beatport.com/account/signup" target="_blank" rel="noopener noreferrer">
                <h1>Register with Beatport</h1>
            </a>
            <Footer/>
        </div>
    )
}
