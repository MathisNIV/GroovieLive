import {Link} from "react-router-dom";


export const NotFound = () => {
    return (
        <div>
            <h1>404 - Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist.
                Come back to a safe place: <Link to={'/'}>GroovieLive</Link>
            </p>
        </div>
    )
}