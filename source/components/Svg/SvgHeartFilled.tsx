import React from 'react';

const SvgHeartFilled = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 122.88 107.41" height={`${widthHeight}`} width={`${widthHeight}`}>
            <g>
                <path fill={`${color}`} d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z" />
            </g>
        </svg>
    );
};

export default SvgHeartFilled;
