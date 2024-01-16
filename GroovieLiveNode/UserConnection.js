const axios = require('axios');

async function Register(user, socket) {
    if (user.username !== "") {
        axios.post('http://nginx:8081/GroovieLiveSpring-api/register', user)
            .then((response) => {
                if(response.data === "User registered successfully"){
                    console.log("Yes !");
                    socket.emit("registerUser", JSON.parse(response.config.data));
                }
                else {
                    socket.emit("registerUser", "Register failed");
                    throw new Error('Register failed');
                }
            })
            .catch((error) => {
                console.error('Error post user : ', error.message, error);
            })
    }
}

async function Login(user, socket) {
    if (user.username !== "") {
        axios.post('http://nginx:8081/GroovieLiveSpring-api/Login', user)
            .then((response) => {
                if(response.data === "User logged in successfully"){
                    console.log("Yes !");
                    socket.emit("loginUser", JSON.parse(response.config.data));
                }
                else {
                    socket.emit("loginUser", "Login failed");
                    throw new Error('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error post user : ', error.message, error);
            })
    }
}

module.exports = {
    Register,
    Login
};