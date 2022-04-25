import React from 'react';

import uuid from '../functions/uuid';
import PropsCheck from '../functions/PropsCheck';

export default class RibbonMultiple extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * User
             */
            content: props.content ? props.content : '',
            ribbons: props.ribbons && typeof [] === typeof props.ribbons && 0 !== props.ribbons.lenth ? props.ribbons : [],
            uuid: `${uuid()}`
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['id', 'ribbons', 'content'], props, state)) {
            return {
                content: props.content ? props.content : '',
                ribbons: props.ribbons && typeof [] === typeof props.ribbons && 0 !== props.ribbons.lenth ? props.ribbons : []
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    render() {
        const { ribbons, content, uuid } = this.state;

        return (
            <div className="RibbonMultiple w-100">
                {ribbons &&
                    0 !== ribbons.length &&
                    ribbons.map((o, i) => {
                        const directionX = o.directionX && typeof '8' === typeof o.directionX && ['left', 'right'].includes(o.directionX) ? o.directionX : 'right';
                        const directionY = o.directionY && typeof '8' === typeof o.directionY && ['top', 'bottom'].includes(o.directionY) ? o.directionY : 'top';
                        const background = o.background && typeof '8' === typeof o.background ? o.background : 'rgb(248, 165, 27)';
                        const backgroundCorner = o.backgroundCorner && typeof '8' == typeof o.backgroundCorner ? o.backgroundCorner : 'rgb(122, 122, 122)';
                        const color = o.color && typeof '8' === typeof o.color ? o.color : '';
                        const type = o.type && typeof '8' === typeof o.type && ['1', '2'].includes(o.type) ? o.type : '';
                        const stl = {};

                        if (background) {
                            stl['--rr-ribbon-multiple-background'] = background;
                        }

                        if (backgroundCorner) {
                            stl['--rr-ribbon-multiple-corner-background'] = backgroundCorner;
                        }

                        if (color) {
                            stl['--rr-ribbon-multiple-color'] = color;
                        }

                        return (
                            <div key={`ribbon-multiple-holder-${i}-${uuid}`} {...('top' === directionY && 'left' === directionX && { className: 'ribbon-multiple-top-left' })} {...('top' === directionY && 'right' === directionX && { className: 'ribbon-multiple-top-right' })} {...('bottom' === directionY && 'left' === directionX && { className: 'ribbon-multiple-bottom-left' })} {...('bottom' === directionY && 'right' === directionX && { className: 'ribbon-multiple-bottom-right' })} {...('top' === directionY && 'left' === directionX && '1' === type && { className: 'ribbon-multiple-top-left ribbon-multiple-type-1' })} {...('top' === directionY && 'left' === directionX && '2' === type && { className: 'ribbon-multiple-top-left ribbon-multiple-type-2' })} {...('top' === directionY && 'right' === directionX && '1' === type && { className: 'ribbon-multiple-top-right ribbon-multiple-type-1' })} {...('top' === directionY && 'right' === directionX && '2' === type && { className: 'ribbon-multiple-top-right ribbon-multiple-type-2' })} {...('bottom' === directionY && 'left' === directionX && '1' === type && { className: 'ribbon-multiple-bottom-left ribbon-multiple-type-1' })} {...('bottom' === directionY && 'left' === directionX && '2' === type && { className: 'ribbon-multiple-bottom-left ribbon-multiple-type-2' })} {...('bottom' === directionY && 'right' === directionX && '1' === type && { className: 'ribbon-multiple-bottom-right ribbon-multiple-type-1' })} {...('bottom' === directionY && 'right' === directionX && '2' === type && { className: 'ribbon-multiple-bottom-right ribbon-multiple-type-2' })} style={stl}>
                                <span className="ribbon-multiple-holder">
                                    <span className="ribbon-multiple">{o.ribbon && o.ribbon}</span>
                                </span>
                                <span className="ribbon-multiple-corners"></span>
                            </div>
                        );
                    })}

                <div className="content-data">
                    <div className="content">{content}</div>
                </div>
            </div>
        );
    }
}
