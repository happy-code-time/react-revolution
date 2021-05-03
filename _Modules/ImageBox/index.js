import React from 'react';
import isObject from '../../_Functions/isObject';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class ImageBox extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ImageBox',
            id: isString(props.id) ? props.id : '',
            image: (props.image && typeof '8' == typeof props.image) ? props.image : '',
            imageData: props.imageData ? props.imageData : '',
            imageProps: props.imageProps && typeof {} === typeof props.imageProps ? props.imageProps : {},
            direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'right',
            boxData: props.boxData ? props.boxData : '',
            boxProps: props.boxProps && typeof {} === typeof props.boxProps ? props.boxProps : {},
            data: props.data ? props.data : '',
            displayData: typeof true === typeof props.displayData ? props.displayData : true
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id',  'image', 'imageData', 'imageProps', 'direction', 'boxData', 'boxProps', 'data', 'displayData'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ImageBox',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                image: (props.image && typeof '8' == typeof props.image) ? props.image : '',
                imageData: props.imageData ? props.imageData : '',
                imageProps: props.imageProps && typeof {} === typeof props.imageProps ? props.imageProps : {},
                direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'right',
                boxData: props.boxData ? props.boxData : '',
                boxProps: props.boxProps && typeof {} === typeof props.boxProps ? props.boxProps : {},
                data: props.data ? props.data : '',
                displayData: typeof true === typeof props.displayData ? props.displayData : true
            };
        }

        return null;
    }

    render() {
        const { defaultClass, addClass, id, image, imageData, direction, boxData, data, displayData } = this.state;
        let { imageProps, boxProps } = this.state;

        const img = (
            <div className='wrapper-box wrapper-image'>
                {
                    image &&
                    <img
                        src={image}
                        {...(isObject(imageProps)) && { ...imageProps }}
                        className='image'
                    />
                }
                {
                    imageData &&
                    <div className='data-image'>
                        {
                            imageData
                        }
                    </div>
                }
            </div>
        );

        const box = (
            <div className='wrapper-box wrapper-data'>
                {
                    boxData &&
                    <div
                        className='data-box'
                        {...(isObject(boxProps)) && { ...boxProps }}
                    >
                        {
                            boxData
                        }
                    </div>
                }
            </div>
        );

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div className={`wrapper ${direction} flex`}>
                    {
                        displayData && 
                        <div className='wrapper-box main-data'>
                        {
                            data
                        }
                        </div>
                    }
                    {
                        'left' === direction && img
                    }
                    {
                        box
                    }
                    {
                        'right' === direction && img
                    }
                </div>
            </div>
        );
    }
}

export default ImageBox;
