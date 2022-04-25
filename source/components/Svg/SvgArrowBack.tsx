import React from 'react';

const SvgArrowBack = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height={`${widthHeight}`} width={`${widthHeight}`} viewBox="0 0 122.88 108.06">
            <g>
                <path fill={`${color}`} d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z" />
            </g>
        </svg>
    );
};

export default SvgArrowBack;
