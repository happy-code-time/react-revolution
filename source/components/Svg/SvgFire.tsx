import React from 'react';

const SvgFire = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" height={`${widthHeight}`} width={`${widthHeight}`} viewBox="0 0 83.35 122.88" x="0px" y="0px">
            <g>
                <path fill={`${color}`} d="M74.55,87.92C79,30.42,47.85,21.5,30.8,0c14.28,29.8-5.84,41.03-20.23,58.47 C-1.27,72.82-4.48,93.69,7.78,108.76c2.87,3.53,6.58,6.6,11.19,9.23c4.11,2.35,8.4,3.99,12.85,4.89 C3.75,99.78,43.88,91.82,36.1,72.91c13.15,10.77,30.53,33.41,15.24,49.21c26.53-6.45,34.95-25.51,31.16-48.1 C80.88,80.98,78.9,86.14,74.55,87.92L74.55,87.92z" />
            </g>
        </svg>
    );
};

export default SvgFire;
