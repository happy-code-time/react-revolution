import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class RibbonMultiple extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'RibbonMultiple',
            id: isString(props.id) ? props.id : '',
            content: props.content ? props.content : '',
            ribbons: props.ribbons && typeof [] === typeof props.ribbons && 0 !== props.ribbons.lenth ? props.ribbons : [],
            uuid: `${internalUuid()}`
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'ribbons', 'content'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                content: props.content ? props.content : '',
                ribbons: props.ribbons && typeof [] === typeof props.ribbons && 0 !== props.ribbons.lenth ? props.ribbons : [],
            };
        }

        return null;
    }

    render() {
        const { addClass, defaultClass, id, ribbons, content, uuid } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                {
                    ribbons && 0 !== ribbons.length &&
                    ribbons.map(( o, i) => {
                        const directionX = o.directionX && typeof '8' === typeof o.directionX && ['left', 'right'].includes(o.directionX) ? o.directionX : 'right';
                        const directionY = o.directionY && typeof '8' === typeof o.directionY && ['top', 'bottom'].includes(o.directionY) ? o.directionY : 'top';
                        const background = o.background && typeof '8' === typeof o.background ? o.background : 'rgb(248, 165, 27)';
                        const backgroundCorner = (o.backgroundCorner && typeof '8' == typeof o.backgroundCorner) ? o.backgroundCorner : 'rgb(122, 122, 122)';
                        const color = o.color && typeof '8' === typeof o.color ? o.color : '';
                        const type = o.type && typeof '8' === typeof o.type && ['1', '2'].includes(o.type) ? o.type : '';
                        const stl = {};

                        if(background){
                            stl['--rr-ribbon-multiple-background'] = background;
                        }
                
                        if(backgroundCorner){
                            stl['--rr-ribbon-multiple-corner-background'] = backgroundCorner;
                        }
                
                        if(color){
                            stl['--rr-ribbon-multiple-color'] = color;
                        }

                        return (
                            <div 
                                key={`ribbon-multiple-holder-${i}-${uuid}`} 
                                className={`ribbon-multiple-${directionY}-${directionX} ${type ? `ribbon-multiple-type-${type}` : ''}`}
                                style={stl}
                            >
                                <span className='ribbon-multiple-holder'>
                                    <span className='ribbon-multiple'>
                                        {
                                            o.ribbon && o.ribbon
                                        }
                                    </span>
                                </span>
                                <span className='ribbon-multiple-corners'></span>
                            </div>
                        )
                    })
                }

                <div className='content-data'>
                    <div className='content'>
                        {
                            content
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RibbonMultiple;