import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isNotEmptyString from '../functions/isNotEmptyString';
import isString from '../functions/isString';

export default class BackgroundImageFullScreen extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props){
        super(props);

        this.state = {
            size: isString(props.size) && ['s', 'xl'].includes(props.size) ? props.size : 's',
            image: isNotEmptyString(props.image) ? props.image : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state
     */
     static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['size', 'image'], props, state)) {            
            return {
                size: isString(props.size) && ['s', 'xl'].includes(props.size) ? props.size : 's',
                image: isNotEmptyString(props.image) ? props.image : '',
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    render(): JSX.Element {
        if('s' == this.state.size){
            return (
                <div 
                    className='BackgroundImageFullScreen position-absolute z-index-0 bg-fullscreen bg-fullscreen-s bg-blend-mode-darken border-radius'
                    style={{
                        backgroundImage: `url(${this.state.image})`
                    }}
                >
        
                </div>
            );
        }

        return (
            <div 
                className='BackgroundImageFullScreen position-absolute z-index-0 w-100 min-h-100vh bg-fullscreen bg-blend-mode-darken'
                style={{
                    backgroundImage: `url(${this.state.image})`
                }}
            >
    
            </div>
        );
    }
}