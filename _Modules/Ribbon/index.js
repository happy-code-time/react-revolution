import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Ribbon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Ribbon',
            id: isString(props.id) ? props.id : '',
            content: props.content ? props.content : '',
            ribbon: props.ribbon ? props.ribbon : '',
            color: (props.color && typeof '8' == typeof props.color) ? props.color : '',
            background: (props.background && typeof '8' == typeof props.background) ? props.background : 'rgb(248, 165, 27)',
            backgroundCorner: (props.backgroundCorner && typeof '8' == typeof props.backgroundCorner) ? props.backgroundCorner : 'rgb(122, 122, 122)',
            directionX: props.directionX && typeof '8' === typeof props.directionX && ['left', 'right'].includes(props.directionX) ? props.directionX : 'right',
            directionY: props.directionY && typeof '8' === typeof props.directionY && ['top', 'bottom'].includes(props.directionY) ? props.directionY : 'top',
            type: props.type && typeof '8' === typeof props.type && ['1', '2'].includes(props.type) ? props.type : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass',  'id', 'ribbon', 'background', 'color', 'content', 'directionX', 'directionY', 'background', 'backgroundCorner', 'type'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Ribbon',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                content: props.content ? props.content : '',
                ribbon: props.ribbon ? props.ribbon : '',
                color: (props.color && typeof '8' == typeof props.color) ? props.color : '',
                background: (props.background && typeof '8' == typeof props.background) ? props.background : 'rgb(248, 165, 27)',
                backgroundCorner: (props.backgroundCorner && typeof '8' == typeof props.backgroundCorner) ? props.backgroundCorner : 'rgb(122, 122, 122)',
                directionX: props.directionX && typeof '8' === typeof props.directionX && ['left', 'right'].includes(props.directionX) ? props.directionX : 'right',
                directionY: props.directionY && typeof '8' === typeof props.directionY && ['top', 'bottom'].includes(props.directionY) ? props.directionY : 'top',
                type: props.type && typeof '8' === typeof props.type && ['1', '2'].includes(props.type) ? props.type : '',
            };
        }

        return null;
    }

    componentDidMount(){

        if(this.ribbonNode && this.state.background){
            this.ribbonNode.style.setProperty('--rr-ribbon-background', this.state.background);
        }

        if(this.ribbonNode && this.state.backgroundCorner){
            this.ribbonNode.style.setProperty('--rr-ribbon-corner-background', this.state.backgroundCorner);
        }

        if(this.ribbonNode && this.state.color){
            this.ribbonNode.style.setProperty('--rr-ribbon-color', this.state.color);
        }
    }

    render() {
        const { addClass, defaultClass, id, ribbon, content, directionX, directionY, type } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass} ribbon-${directionY}-${directionX} ${type ? `ribbon-type-${type}` : ''}`}
                {...isString(id) && '' !== id && { id: id } }
                ref={x => this.ribbonNode = x }
            >
                <span className='ribbon-holder'>
                    <span className='ribbon'>
                        {
                            ribbon && ribbon
                        }
                    </span>
                </span>
                <span className='ribbon-corners'></span>
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

export default Ribbon;