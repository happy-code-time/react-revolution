import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // App
            uuid: internalUuid(),
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Timeline',
            id: isString(props.id) ? props.id : '',
            data: (props.data && typeof {} == typeof props.data) ? props.data : undefined,
            direction: props.direction && typeof '8' == typeof props.direction && ['left', 'right'].includes(props.direction) ? props.direction : 'left',
            timelineStart: props.timelineStart ? props.timelineStart : '',
            timelineEnd: props.timelineEnd ? props.timelineEnd : '',
            timelineStartProps: props.timelineStartProps && typeof {} === typeof props.timelineStartProps ? props.timelineStartProps : {}, 
            timelineEndProps: props.timelineEndProps && typeof {} === typeof props.timelineEndProps ? props.timelineEndProps : {}, 
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'timelineStartProps', 'timelineEndProps', 'data', 'keysProps', 'direction', 'timelineStart', 'timelineEnd'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: (props.data && typeof {} == typeof props.data) ? props.data : undefined,
                direction: props.direction && typeof '8' == typeof props.direction && ['left', 'right'].includes(props.direction) ? props.direction : 'left',
                timelineStart: props.timelineStart ? props.timelineStart : '',
                timelineEnd: props.timelineEnd ? props.timelineEnd : '',
                timelineStartProps: props.timelineStartProps && typeof {} === typeof props.timelineStartProps ? props.timelineStartProps : {}, 
                timelineEndProps: props.timelineEndProps && typeof {} === typeof props.timelineEndProps ? props.timelineEndProps : {}, 
            };
        }

        return null;
    }

    callback(callback, callbackProps){
        if(callback){
            (callback)(callbackProps);
        }
    }

    getData() {
        let rootKeys = [];

        try {
            rootKeys = Object.keys(this.state.data);
        }
        catch (e) {
            rootKeys = [];
        }

        if (!rootKeys.length) {
            return null;
        }

        const { uuid, direction } = this.state;
        const jsx = [];

        for (let x = 0; x <= rootKeys.length - 1; x++) {
            const { data, props } = this.state.data[rootKeys[x]];
            let localData = [];

            if (data && typeof [] === typeof data && data.length) {

                data.map((o, i) => {
                    const { icon, callback, callbackProps, iconProps, dataProps } = o;

                    const iconJsx = (
                        <span className='entry-icon'>
                            <div 
                                {...(iconProps && typeof {} === typeof iconProps && {...iconProps})}
                                {...(callback && typeof function(){} === typeof callback) && { onClick: () => this.callback(callback, callbackProps)}}
                                className={`icon ${iconProps && typeof {} === typeof iconProps && undefined !== iconProps.className ? iconProps.className : ''} ${callback && typeof function(){} === typeof callback ? 'timeline-callback' : ''}`}
                            >
                                {
                                    icon
                                }
                            </div>
                        </span>
                    );

                    localData.push(
                        <div
                            key={`timeline-entry-${x}-${i}-${uuid}`}
                            className='timeline-entry'
                        >
                            {
                                'left' == direction && icon && iconJsx
                            }
                            {
                                o.data &&
                                <span className='entry-data'>
                                    <div 
                                        {...(dataProps && typeof {} === typeof {dataProps} && {...dataProps})}
                                        className={`data ${dataProps && typeof {} === typeof dataProps && undefined !== dataProps.className ? dataProps.className : ''}`}
                                    >
                                        {
                                            o.data
                                        }
                                    </div>
                                </span>
                            }
                            {
                                'right' == direction && icon && iconJsx
                            }
                        </div>
                    );
                });
            }

            if (localData.length) {
                jsx.push(
                    <div
                        key={`timeline-area-${x}-${localData.length}-${uuid}`}
                        className='timeline-area'
                    >
                        <div className='timeline-time'>
                            <span 
                                {...(props && typeof {} === typeof props) && {...props}}
                                className={`time ${props && typeof {} === typeof props && undefined !== props.className ? props.className : ''}`}
                            >
                                {
                                    rootKeys[x]
                                }
                            </span>
                        </div>
                        {
                            localData
                        }
                    </div>
                )
            }
        }

        return jsx;
    }

    render() {
        const { addClass, defaultClass, id, direction, timelineStart, timelineStartProps, timelineEnd, timelineEndProps } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <span className={`timline-wrapper ${timelineStart ? 'timline-wrapper-has-start' : ''} ${timelineStart ? 'timline-wrapper-has-end' : ''} ${direction}`}>
                    {
                        timelineStart &&
                        <span 
                            className='timeline-start'
                            {...(timelineStartProps && typeof {} === typeof {timelineStartProps} && {...timelineStartProps})}
                        >
                            {
                                timelineStart
                            }
                        </span>
                    }
                    {
                        this.getData()
                    }
                    {
                        timelineEnd &&
                        <span 
                            className='timeline-end'
                            {...(timelineEndProps && typeof {} === typeof {timelineEndProps} && {...timelineEndProps})}
                        >
                            {
                                timelineEnd
                            }
                        </span>
                    }
                </span>
            </div>
        );
    }
}

export default Timeline;
