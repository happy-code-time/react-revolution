import React from 'react';
import PropsCheck from '../functions/PropsCheck';
import isNotEmptyString from '../functions/isNotEmptyString';

export default class BackgroundImageFixed extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props){
        super(props);

        this.state = {
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
        if (PropsCheck(['image'], props, state)) {            
            return {
                image: isNotEmptyString(props.image) ? props.image : '',
            };
        }

        return null;
    }

    render(): JSX.Element {
        return (
            <div 
                className='BackgroundImageFixed position-fixed z-index-0 bg-fullscreen bg-blend-mode-darken w-100 h-100vh'
                style={{
                    backgroundImage: `url(${this.state.image})`
                }}
            >

            </div>
        );
    }
}