import React from 'react';

const Song = (props) => {
    return (
        <tr onClick={() => {}}>
            <td>{props.song.author}</td>
            <td>{props.song.title}</td>
            <td>
                <div className="ui vertical animated button" tabIndex="0">
                    <div className="hidden content">Sell</div>
                    <div className="visible content">
                        <i className="shop icon"></i>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default Song;
