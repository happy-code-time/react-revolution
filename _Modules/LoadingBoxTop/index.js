import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class LoadingBoxTop extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'LoadingBoxTop',
            id: isString(props.id) ? props.id : '',
            text: (props.text && typeof '8' == typeof props.text) ? props.text : '',
            display: typeof true == typeof props.display ? props.display : false
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        
        if (PropsCheck([ 'id', 'text', 'display'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                text: (props.text && typeof '8' == typeof props.text) ? props.text : '',
                display: typeof true == typeof props.display ? props.display : false
            };
        }

        return null;
    }

    render(){
        const { addClass, text, defaultClass, id, display } = this.state;

        if(!display){
            return null;
        }

        return(
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    text
                }
            </div>
        );
    }
}

export default LoadingBoxTop;