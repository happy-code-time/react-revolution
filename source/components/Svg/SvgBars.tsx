import React from 'react';
import uuid from '../../functions/uuid';

const SvgBars = (width = 32, height = 32, color = 'rgb(69,69,69)', filled = 1) => {
    const items = [
        {
            height: '8',
            transform: 'translate(0 17)'
        },
        {
            height: '12',
            transform: 'translate(6 13)'
        },
        {
            height: '16',
            transform: 'translate(12 9)'
        },
        {
            height: '20',
            transform: 'translate(19 5)'
        },
        {
            height: '24',
            transform: 'translate(26 1)'
        }
    ];

    return (
        <svg className="svg-bars" height={`${height}`} width={`${width}`} viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg">
            <g>
                {items.map((o: any, index: number) => {
                    const { height, transform } = o;
                    return <rect key={`svg-bars-${uuid()}`} fill={index + 1 <= filled ? color : 'none'} height={height} stroke={`${color}`} strokeLinejoin="round" strokeWidth="0.33" transform={transform} width="4" />;
                })}
            </g>
        </svg>
    );
};

export default SvgBars;
