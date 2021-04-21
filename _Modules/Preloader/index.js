import React from 'react';
import isArray from '../../_Functions/isArray';
import isBoolean from '../../_Functions/isBoolean';
import isNumber from '../../_Functions/isNumber';
import isObject from '../../_Functions/isObject';
import isString from '../../_Functions/isString';
import PropsCheck from '../internalFunctions/PropsCheck';

class Preloader extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass: 'rr-preloader',
            id: isString(props.id) ? props.id : '',
            data: isArray(props.data) ? props.data : [],
            size: isString(props.size) && ['xs', 's', 'l', 'xl', 'xxl'].includes(props.size) ? props.size : '',
            backgroundColor: isString(props.backgroundColor) ? props.backgroundColor : 'rgb(226,226,226)',
            backgroundLoader: isString(props.backgroundLoader) ? props.backgroundLoader : 'rgba(255, 255, 255, 0.2)',
        };

        this.allowedTypes = {
            'square-xs' : {
                width: '50px',
                height: '50px'
            },
            'square-s' : {
                width: '100px',
                height: '100px'
            },
            'square' : {
                width: '150px',
                height: '150px'
            },
            'square-l' : {
                width: '200px',
                height: '200px'
            },
            'square-xl' : {
                width: '250px',
                height: '250px'
            },
            'square-xxl' : {
                width: '300px',
                height: '300px'
            },
            'rectangle-xs' : {
                width: '100px',
                height: '50px'
            },
            'rectangle-s' : {
                width: '200px',
                height: '100px'
            },
            'rectangle' : {
                width: '300px',
                height: '150px'
            },
            'rectangle-l' : {
                width: '400px',
                height: '200px'
            },
            'rectangle-xl' : {
                width: '500px',
                height: '250px'
            },
            'rectangle-xxl' : {
                width: '600px',
                height: '300px'
            },
            'text-xs' : {
                width: '50px',
                height: '20px'
            }, 
            'text-s' : {
                width: '100px',
                height: '20px'
            },
            'text' : {
                width: '150px',
                height: '20px'
            },
            'text-l' : {
                width: '200px',
                height: '20px'
            },
            'text-xl' : {
                width: '250px',
                height: '20px'
            },
            'text-xxl' : {
                width: '300px',
                height: '20px'
            },
            'title-xs' : {
                width: '50px',
                height: '30px'
            }, 
            'title-s' : {
                width: '100px',
                height: '30px'
            },
            'title' : {
                width: '150px',
                height: '30px'
            },
            'title-l' : {
                width: '200px',
                height: '30px'
            },
            'title-xl' : {
                width: '250px',
                height: '30px'
            },
            'title-xxl' : {
                width: '300px',
                height: '30px'
            },
            'circle-xs' : {
                width: '10px',
                height: '10px'
            },
            'circle-s' : {
                width: '15px',
                height: '15px'
            },
            'circle' : {
                width: '30px',
                height: '30px'
            },
            'circle-l' : {
                width: '45px',
                height: '45px'
            },
            'circle-xl' : {
                width: '60px',
                height: '60px'
            },
            'circle-xxl' : {
                width: '75px',
                height: '75px'
            },
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) 
    {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'items', 'itemsPerLine', 'data', 'size', 'backgroundColor', 'backgroundLoader'], props, state)) 
        {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                defaultClass: isString(props.defaultClass) ? props.defaultClass: 'rr-preloader',
                id: isString(props.id) ? props.id : '',
                data: isArray(props.data) ? props.data : [],
                size: isString(props.size) && ['xs', 's', 'l', 'xl', 'xxl'].includes(props.size) ? props.size : '',
                backgroundColor: isString(props.backgroundColor) ? props.backgroundColor : 'rgb(226,226,226)',
                backgroundLoader: isString(props.backgroundLoader) ? props.backgroundLoader : 'rgba(255, 255, 255, 0.2)',
            };
        }

        return null;
    }

    /**
     * 
     * @param int i 
     * @param string type 
     * @param object props 
     * @param HTMLElement|string userJsx 
     * @returns []
     */
    getSingleTextBox(i, type, props, userJsx, width, height, backgroundColor, backgroundLoader)
    {
        const { size } = this.state;

        // Apply global size
        if('' !== size && -1 === type.indexOf('-'))
        {
            type = `${type}-${size}`;
        }

        const j = [];

        if('' === width)
        {
            width = this.allowedTypes[type].width;
        }

        if('' === height)
        {
            height = this.allowedTypes[type].height;
        }

        let stl = {};

        for(let x = 0; x <= i-1; x++)
        {
        
            stl['--rr-preloader-bg-color'] = backgroundColor;
            stl['--rr-preloader-bg-loader'] = backgroundLoader;
            
            j.push(
                <div 
                    className={`preloader-item`}
                    {...props}
                >
                    <div 
                        className={`preloader-loading preloader-default preloader-${type}`}
                        style={
                            {
                                ...stl, ...{ width: `${width}`, height: `${height}` }
                            }
                        }
                    >
                        {
                            userJsx && userJsx
                        }
                    </div>
                </div>
            );
        }

        return j;
    }

    /**
     * 
     * @param object item 
     * @returns object
     */
    getSingleElements(item)
    {
        let type = 'square';
        let count = 1;
        let userJsx = '';
        let children = [];
        let flexColumn = false;
        let props = {};
        let width = '';
        let height = ''
        let backgroundColor = this.state.backgroundColor;
        let backgroundLoader = this.state.backgroundLoader;

        if(isObject(item))
        {
            count = isNumber(item.count) && 0 < item.count ? parseInt(item.count) : count;
            type = isString(item.type) && Object.keys(this.allowedTypes).includes(item.type) ? item.type : type;
            userJsx = item.jsx ? item.jsx : userJsx;
            children = isArray(item.data) ? item.data : children;
            flexColumn = isBoolean(item.flexColumn) ? item.flexColumn : flexColumn;
            props = isObject(item.props) ? item.props : props;
            width = isString(item.width) ? item.width : width;
            height = isString(item.height) ? item.height : height;
            backgroundColor = isString(item.backgroundColor) ? item.backgroundColor : backgroundColor;
            backgroundLoader = isString(item.backgroundLoader) ? item.backgroundLoader : backgroundLoader;
        }

        return {
            count,
            type,
            userJsx,
            children,
            flexColumn,
            props,
            width,
            height,
            backgroundColor,
            backgroundLoader,
        };
    }

    /**
     * 
     * @param array data 
     * @param boolean nested 
     * @returns array
     */
    preloaderJsx(data = this.state.data, nested = false)
    {
        const jsx = [];
        const max = data.length-1;

        for(let x = 0; x <= max; x++)
        {
            const { type, count, userJsx, children, flexColumn, props, width, height, backgroundColor, backgroundLoader} = this.getSingleElements(data[x]);

            const preloaderJsx = (
                <div className={`preloader-items flex ${flexColumn ? 'flex-column' : ''}`}>
                    {
                        this.getSingleTextBox(count, type, props, userJsx, width, height, backgroundColor, backgroundLoader)
                    }
                    {
                        isArray(children) && 0 !== children.length && 
                        <div className='preloader-children'>
                            {
                                this.preloaderJsx(children, true)
                            }
                        </div>
                    }
                </div>
            );

            if(!nested)
            {
                jsx.push(
                    <div className='preloader-group'>
                        {
                            preloaderJsx
                        }
                    </div>
                );
            }
            else
            {
                jsx.push(preloaderJsx);

            }
        }

        return jsx;
    }

    render() 
    {
        return (
            <div
                id={this.state.id}
                className={`${this.state.defaultClass} ${this.state.addClass}`}
            >
                <div className='preloader-wrapper flex felx-column'>
                    {
                        this.preloaderJsx()
                    }
                </div>
            </div>
        );
    }
}

export default Preloader;
