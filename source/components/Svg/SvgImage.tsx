import React from 'react';

const SvgImage = (widthHeight: any = 32, color = 'rgb(69,69,69)') => {
    return (
        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" height={`${widthHeight}`} width={`${widthHeight}`} xmlns="http://www.w3.org/2000/svg">
            <path fill={`${color}`} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
    );
};

export default SvgImage;
