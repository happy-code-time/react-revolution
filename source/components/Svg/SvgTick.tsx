import React from 'react';

const SvgTick = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px" 
            height={`${widthHeight}`} 
            width={`${widthHeight}`} 
            viewBox="0 0 512 457.57"
        >
            <g>
                <path 
                    fill={`${color}`} 
                    d="M0,220.57c100.43-1.33,121-5.2,191.79,81.5,54.29-90,114.62-167.9,179.92-235.86C436-.72,436.5-.89,512,.24,383.54,143,278.71,295.74,194.87,457.57,150,361.45,87.33,280.53,0,220.57Z"
                />
            </g>
        </svg>
    );
};

export default SvgTick;
