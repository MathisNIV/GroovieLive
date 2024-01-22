import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Header.css";

export const Header = (props) => {
    const title = props.title;

    return(
        <div className="header">
            <div className="header-left">
                <Link to={'/'}>GroovieLive</Link>
            </div>
            <div className="header-center">
                <h3 className="header-indexPage">{title}</h3>
            </div>
            <div className="header-right">
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    )
}
