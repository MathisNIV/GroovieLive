import React, { useState, useEffect } from 'react';
import "./Header.css";

export const Header = (props) => {
    const title = props.title;

    return(
        <div className="header">
            <h3>{title}</h3>
        </div>
    )
}
