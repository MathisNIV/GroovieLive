import React, { useState, useEffect } from 'react';
import "./Login.css";
import {Header} from "../Frameworks/Header.jsx";
import {Footer} from "../Frameworks/Footer.jsx";

export const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [loginError, setloginError] = useState('');
    const socket = props.socket;

    const RegisterSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            role: 'user',
            email: email,
        };

        socket.emit('register', user);
        // fetch('http://localhost:8080//GroovieLiveSpring-api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(response => {
        //         console.log(response);
        //         // if (response.ok) {
        //         //     return response.json();
        //         // } else {
        //         //
        //         //     throw new Error('Login failed');
        //         // }
        //     })
        //     .then(data => {
        //         console.log('Success:', data);
        //         // handleOnUserSelected(data);
        //         // navigate('/index');
        //         setUsername('');
        //         setPassword('');
        //         setEmail('')
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //         setloginError('Wrong username or passeword');
        //     });
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
            </form>
            <Footer/>
        </div>
    )
}
