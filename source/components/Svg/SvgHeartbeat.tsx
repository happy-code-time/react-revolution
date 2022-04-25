import React from 'react';

export default (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" 
            y="0px" 
            height={`${widthHeight}`} 
            width={`${widthHeight}`} 
            viewBox="0 0 122.88 90.39"
        >
            <g>
                <path 
                    fill={`${color}`} 
                    d="M114.41,36.28c4.68,0,8.47,3.79,8.47,8.47c0,4.67-3.79,8.47-8.47,8.47c-2.88,0-5.42-1.44-6.95-3.63l-14.19,0 L78.23,90.37l-9.27,0.02L40.88,15.35L27.9,46.55l-1.27,3.06L0,49.61V39.7h20.04L36.55,0l9.19,0.17l27.8,74.3l11.63-31.52l1.19-3.23 h21.23C109.14,37.64,111.61,36.28,114.41,36.28L114.41,36.28L114.41,36.28z" 
                />
            </g>
        </svg>
    );
};
