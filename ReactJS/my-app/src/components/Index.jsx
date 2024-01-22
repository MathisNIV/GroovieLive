import {ListRooms} from "./Room/ListRooms.jsx";
import {Header} from "./Frameworks/Header.jsx";
import {Footer} from "./Frameworks/Footer.jsx";
import {Link} from "react-router-dom";
import "./Index.css";


export const Index = (props) => {
    const socket = props.socket;
    return (
        <div>
            <Header title="Welcome to GroovieLive"/>
            <div className="index">
                <div className="index-left">
                    <p>You are a Dj, <Link to={'/login'}>Login</Link> using your Beatport account</p>
                </div>
                <div className="index-right">
                    <p>You are a raver, join one of the following rooms:</p>
                    <ListRooms socket = {socket}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}