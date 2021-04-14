import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isObject from '../../_Functions/isObject';
import internalUuid from '../internalFunctions/internalUuid';

class Stars extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-stars',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            count: (props.count && typeof 8 == typeof props.count) ? props.count : 0,
            filled: (props.filled && typeof 8 == typeof props.filled) ? props.filled : 0,
            fillHover: (typeof true == typeof props.fillHover) ? props.fillHover : false,
            callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps,
            props: (props.props && typeof {} == typeof props.props) ? props.props : {},
            starsData: (props.starsData && typeof [] == typeof props.starsData) ? props.starsData : [],
            color: (props.color && typeof '8' == typeof props.color && ['orange', 'orange-yellow', 'yellow'].includes(props.color)) ? props.color : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'count', 'filled', 'fillHover', 'callback', 'callbackProps', 'props', 'starsData', 'color'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-stars',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                count: (props.count && typeof 8 == typeof props.count) ? props.count : 0,
                filled: (props.filled && typeof 8 == typeof props.filled) ? props.filled : 0,
                fillHover: (typeof true == typeof props.fillHover) ? props.fillHover : false,
                callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps,
                props: (props.props && typeof {} == typeof props.props) ? props.props : {},
                starsData: (props.starsData && typeof [] == typeof props.starsData) ? props.starsData : [],
                color: (props.color && typeof '8' == typeof props.color && ['orange', 'orange-yellow', 'yellow'].includes(props.color)) ? props.color : '',
            };
        }

        return null;
    }

    callback(e, x){
        const { callback, callbackProps } = this.state;

        if(callback){
            (callback)(e, x, callbackProps);
        }
    }

    generateStarsData(){
        const { starsData, count } = this.state;
        const generated = [];

        if(starsData && starsData.length){
            
            for(let x = 0; x < count ; x++){
                const object = starsData[x] ? starsData[x] : null;
                generated.push(object);
            }

            generated.reverse();
        }

        return generated;
    }

    getStars(){
        const { count, filled, fillHover, callback, color } = this.state;
        const starsData = this.generateStarsData();
        const stars = [];
        let starsDataCountReverse = 0;

        for(let x = count; x > 0 ; x--){
            let properties = {};
            let htmlData = undefined;

            if(starsData && starsData[starsDataCountReverse] && isObject(starsData[starsDataCountReverse])){
                const { props, data } = starsData[starsDataCountReverse];
                htmlData = data;

                try{
                    Object.keys(props);
                    properties = props;
                }catch(e){
                    properties = {};
                }
            }

            stars.push(
                <span 
                    key={internalUuid()}
                    className={`star ${filled >= x ? 'star-filled' : 'star-unfilled'} ${fillHover ? 'star-hover-fill' : ''} ${color ? `star-color-${color}` : ''}`}
                    {...properties}
                    {...(callback && { onClick: (e) => this.callback(e, x) })}
                >
                    {
                        htmlData && htmlData
                    }
                </span>
            );

            starsDataCountReverse += 1;
        }

        return stars;
    }

    render() {
        const { addClass, defaultClass, id, props } = this.state;
        let properties = {};

        try{
            properties = Object.keys(props);
        }
        catch(e){
            properties = {};
        }

        return (
            <div 
                className={`${defaultClass} ${addClass}`} 
                id={id}
            >
                <span className='stars' {...properties}>
                    {
                        this.getStars()
                    }
                </span>
            </div>
        );
    }
}

export default Stars;
