const axios = require('axios');

async function Register(user, socket, tokenBeatport) {
    if (user.username !== "") {
        axios.post('http://nginx:8081/GroovieLiveSpringAuth-api/Register', user)
            .then((response) => {
                if(response.data === "User registered successfully"){
                    console.log("Yes !");
                    socket.emit("RegisterUser", JSON.parse(response.config.data));
                }
                else {
                    socket.emit("RegisterUser", "Register failed");
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
        axios.post('http://nginx:8081/GroovieLiveSpringAuth-api/Login', user)
            .then((response) => {
                if (response.data === "Beatport server is currently unavailable, please try again later" ||
                    response.data === "Wrong credentials" ||
                    response.data === "Something went wrong") {
                    socket.emit("LoginUser", response.data);
                    throw new Error(response.data);
                }
                else {
                    socket.emit("LoginUser", JSON.parse(response.config.data));
                    socket.emit('SetToken', response.data.access_token);
                }
            })
            .catch((error) => {
                console.error('Error post user : ', error.message, error);
            })
            // .then((response) => {
            //     if(response.data === "User logged in successfully"){
            //         console.log("Yes !");
            //         socket.emit("LoginUser", JSON.parse(response.config.data));
            //     }
            //     else {
            //         socket.emit("LoginUser", "Login failed");
            //         throw new Error('Login failed');
            //     }
            // })
            // .catch((error) => {
            //     console.error('Error post user : ', error.message, error);
            // })
    }
}

module.exports = {
    Register,
    Login
};