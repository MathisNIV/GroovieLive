import QRCode from 'qrcode.react';
import React, { useRef } from 'react';

export const QR = (props) => {
    const url = props.value;    
    const qrRef = useRef();

    const handleClick = () => {
        window.open('/QRFullScreen?url=' + url, "_blank");
    };

    return(
        <div className='QRCodeHolder' onClick={handleClick} ref={qrRef}>
            <QRCode value={url} />
        </div>
    )
}
