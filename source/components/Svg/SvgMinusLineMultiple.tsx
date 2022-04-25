import React from 'react';
import SETTINGS from '../Settings';
import SvgMinusLine from './SvgMinusLine';

const SvgMinusLineMultipleJsx = [];

const SvgMinusLineMultiple = (count = 6) => {
    if (0 !== SvgMinusLineMultipleJsx.length) {
        return SvgMinusLineMultipleJsx;
    }

    const i = [];

    for (let x = 0; x <= count; x++) {
        i.push(SvgMinusLine(SETTINGS.SVG.WIDTH.XXS, SETTINGS.SVG.COLOR.WHITE));
    }

    SvgMinusLineMultipleJsx.push(<div className="flex justify-content-between px-4">{i}</div>);

    return SvgMinusLineMultipleJsx;
};

export default SvgMinusLineMultiple;
