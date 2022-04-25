import React from 'react';

const SvgFlag = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height={`${widthHeight}`} width={`${widthHeight}`} viewBox="0 0 116.333 122.88">
            <g>
                <path fill={`${color}`} d="M20.416,17.743c46.635-32.238,50.118,31.566,95.917-8.271v65.01 c-43.681,39.279-53.104-24.185-95.917,8.068V17.743L20.416,17.743z M8.898,0c4.915,0,8.899,3.986,8.899,8.898 c0,3.263-1.758,6.114-4.375,7.663h0.42v7.624v74.512v7.624h-0.42c2.617,1.549,4.375,3.574,4.375,7.662 c0,4.087-3.984,8.896-8.899,8.896c-4.914,0-8.898-4.81-8.898-8.896c0-4.088,1.757-6.113,4.374-7.662H3.955v-7.624V24.185v-7.624 h0.419C1.757,15.012,0,12.162,0,8.898C0,3.986,3.984,0,8.898,0L8.898,0z" />
            </g>
        </svg>
    );
};

export default SvgFlag;
