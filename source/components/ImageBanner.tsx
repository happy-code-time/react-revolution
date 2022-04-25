import React from 'react';

import isObject from '../functions/isObject';
import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
class ImageBanner extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);

        this.state = {
            // User
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ImageBanner',
            
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
        if (PropsCheck(['addClass', 'defaultClass', 'id',  'boxData', 'boxProps', 'image', 'imageAsSource', 'imageProps', 'direction'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ImageBanner',
                
                
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

    componentDidMount(): void {

    }

    render() {
        const { defaultClass, addClass, id, boxProps, boxData, image, imageAsSource, imageProps, direction } = this.state;

        return (
            <div
                className=''
                
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
