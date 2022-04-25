import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';

class LoadingBoxTop extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props){
        super(props);

        this.state = {
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'LoadingBoxTop',
            
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
        
        if (PropsCheck([ 'addClass', 'defaultClass', 'id', 'text', 'display'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'LoadingBoxTop',
                
                
                text: (props.text && typeof '8' == typeof props.text) ? props.text : '',
                display: typeof true == typeof props.display ? props.display : false
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    render(){
        const { addClass, text, defaultClass, id, display } = this.state;

        if(!display){
            return null;
        }

        return(
            <div className='' >
                {
                    text
                }
            </div>
        );
    }
}

export default LoadingBoxTop;