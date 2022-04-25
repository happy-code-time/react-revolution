import React from 'react';

const SvgClock2 = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={widthHeight} width={widthHeight} viewBox="0 0 21 21">
            <path fill={color} d="M10.5,0A10.5,10.5,0,1,0,21,10.5,10.51,10.51,0,0,0,10.5,0Zm0,19.53a9,9,0,1,1,9-9A9,9,0,0,1,10.5,19.53Zm4.82-8.18a.74.74,0,0,1-.74.73H9.31V5.43a.74.74,0,1,1,1.47,0v5.18h3.8A.74.74,0,0,1,15.32,11.35Z" />
        </svg>
    );
};

export default SvgClock2;
