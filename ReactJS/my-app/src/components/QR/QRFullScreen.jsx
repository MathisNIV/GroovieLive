import {useSearchParams} from 'react-router-dom';
import QRCode from 'qrcode.react';
import React from 'react';


export const QRFullScreen = () => {
    const [params, setParams] = useSearchParams();
    const url = params.get("url");
    console.log("url: " + url)

    return(
        <div className='QRCodeFullScreenHolder'>
            <QRCode value={url} size={700}/>
        </div>
    )
}