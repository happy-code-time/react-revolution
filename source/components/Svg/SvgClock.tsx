import React from 'react';

const SvgClock = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg className="svg-clock rotate-180" height={widthHeight} width={widthHeight} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-520.466 -18.785)">
                <ellipse cx="15.795" cy="15.795" fill="none" rx="15.795" ry="15.795" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" transform="translate(521.181 19.5)" />
                <path d="M25,20.6v9.834l7.04,7.11" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" transform="translate(511.976 5.9)" />
            </g>
        </svg>
    );
};

export default SvgClock;
