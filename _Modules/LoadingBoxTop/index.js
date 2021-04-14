import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';

class LoadingBoxTop extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-loading-box-top',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
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
        
        if (PropsCheck(['defaultClass', 'id', 'text', 'display'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-loading-box-top',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
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
            <div className={`${defaultClass} ${addClass}`} id={id}>
                {
                    text
                }
            </div>
        );
    }
}

export default LoadingBoxTop;