import React from 'react';
import isObject from '../../_Functions/isObject';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
class ImageBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ImageBanner',
            id: isString(props.id) ? props.id : '',
            boxData: props.boxData ? props.boxData : '',
            boxProps: props.boxProps && typeof {} === typeof props.boxProps ? props.boxProps : {},
            image: (props.image && typeof '8' == typeof props.image) ? props.image : '',
            imageAsSource: typeof true === typeof props.imageAsSource ? props.imageAsSource : false,
            imageProps: props.imageProps && typeof {} === typeof props.imageProps ? props.imageProps : {},
            direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left', 'center'].includes(props.direction) ? props.direction : 'left',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'id',  'boxData', 'boxProps', 'image', 'imageAsSource', 'imageProps', 'direction'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                boxData: props.boxData ? props.boxData : '',
                boxProps: props.boxProps && typeof {} === typeof props.boxProps ? props.boxProps : {},
                image: (props.image && typeof '8' == typeof props.image) ? props.image : '',
                imageAsSource: typeof true === typeof props.imageAsSource ? props.imageAsSource : false,
                imageProps: props.imageProps && typeof {} === typeof props.imageProps ? props.imageProps : {},
                direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left', 'center'].includes(props.direction) ? props.direction : 'left',
            };
        }

        return null;
    }

    render() {
        const { defaultClass, addClass, id, boxProps, boxData, image, imageAsSource, imageProps, direction } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
                {...(!imageAsSource) && {
                    style: {
                        backgroundImage: `url(${image})`
                    }
                }}
                {...(isObject(imageProps)) && { ...imageProps }}
            >
                <div className={`banner ${direction}`}>
                    <div
                        className='banner-box'
                        {...(isObject(boxProps)) && { ...boxProps }}
                    >
                        {
                            boxData
                        }
                    </div>
                </div>
                {
                    imageAsSource &&
                    <div className='banner-image'>
                        {
                            image &&
                            <img
                                src={image}
                                {...(isObject(imageProps)) && { ...imageProps }}
                                className='image'
                            />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ImageBanner;
