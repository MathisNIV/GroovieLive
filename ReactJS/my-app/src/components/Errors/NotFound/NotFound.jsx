import { Link } from "react-router-dom";
import { Header } from "../../Frameworks/Header.jsx";
import { Footer } from "../../Frameworks/Footer";


export const NotFound = () => {
    return (
        <div>
            <Header title="404 - Not Found!"/>
            <h1>404 - Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist.
                Come back to a safe place: <Link to={'/'}>GroovieLive</Link>
            </p>
            <Footer/>
        </div>
    )
}