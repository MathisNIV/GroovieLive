import { Link } from "react-router-dom";
import { Header } from "../../Frameworks/Header.jsx";
import { Footer } from "../../Frameworks/Footer.jsx";



export const Forbidden = () => {
    return (
        <div>
            <Header title="403 - Forbidden!"/>
            <h1>403 - Forbidden!</h1>
            <p>Sorry, you can't acces to this page.
                Please <Link to={'/Login'}>Login</Link> or come back to a safe place: <Link to={'/'}>GroovieLive</Link>
            </p>
            <Footer/>
        </div>
    )
}