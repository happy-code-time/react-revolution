import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import uuid from '../functions/uuid';

class ReadMoreCallback extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            /**
             * App
             */
            classList: '',
            toggled: false,
            loadingData: false,
            isError: false,
            dataToggle: '',
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ReadMoreCallback',
            
            animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
            toggleForwards: props.toggleForwards ? props.toggleForwards : '...',
            toggleBackwards: props.toggleBackwards ? props.toggleBackwards : undefined,
            toggleOnReject: (typeof true == typeof props.toggleOnReject) ? props.toggleOnReject : false, 
            toggleReject: props.toggleReject ? props.toggleReject : undefined,
            callback: props.callback && typeof function(){} == typeof props.callback ? props.callback: undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            loading: props.loading ? props.loading : '',
            data: props.data ? props.data : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass', 'defaultClass',  'id', 'animation', 'toggleForwards', 'toggleBackwards', 'toggleOnReject', 'toggleReject', 'callback', 'callbackProps', 'loading', 'data'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ReadMoreCallback',
                
                style: (typeof true == typeof props.style) ? props.style : true,
                
                
                animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
                toggleForwards: props.toggleForwards ? props.toggleForwards : '...',
                toggleBackwards: props.toggleBackwards ? props.toggleBackwards : undefined,
                toggleOnReject: (typeof true == typeof props.toggleOnReject) ? props.toggleOnReject : false, 
                toggleReject: props.toggleReject ? props.toggleReject : undefined,
                callback: props.callback && typeof function(){} == typeof props.callback ? props.callback: undefined,
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                loading: props.loading ? props.loading : '',
                data: props.data ? props.data : '',
            };
        }

        return null;
    }

    toggle(event) {
        const { loading, animation, toggled, callback, callbackProps, toggleOnReject } = this.state;
        let { dataToggle, classList, isError } = this.state;
    
        /**
         * Step 3
         */
        const process = (dataToggle, isError) => {

            if(animation && !toggled){
            
                return this.setState({
                    classList: `toggling animation-${animation}`,
                    toggled: dataToggle ? true : false,
                    dataToggle,
                    isError
                }, () => {
                    setTimeout( () => {
                        this.setState({
                            classList: `toggled animation-${animation}`,
                        });
                    }, 300);
                });
            }
    
            if(animation && toggled){
                
                return this.setState({
                    classList: `${classList} animation-${animation}-back`,
                    isError,
                    dataToggle
                }, () => {
                    setTimeout( () => {
                        this.setState({
                            toggled: false
                        });
                    }, 300);
                }); 
            }
            
            this.setState({
                toggled: dataToggle ? !this.state.toggled : false,
                classList: '',
                dataToggle
            });
        };

        /**
         * Step 2
         */
        const getData = async () => {

            if(loading){
                return this.setState({
                    loadingData: true
                }, async () => {
                    dataToggle = await callback(event, callbackProps)
                    .then( data => {
                        isError = false;
                        return data;
                    })
                    .catch( data => {
                        isError = true;

                        if(!data){
                            return undefined;
                        }

                        return data
                    });

                    return this.setState({
                        loadingData: false
                    }, () => {
                        process(dataToggle, isError);
                    });
                });
            }
            else{
                dataToggle = await callback(event, callbackProps)
                .then( data => {
                    isError = false;
                    return data;
                })
                .catch( data => {
                    isError = true;

                    if(!data){
                        return undefined;
                    }

                    return data
                });

                return process(dataToggle, isError);
            }
        }

        /**
         * Step 1
         */
        if(callback && toggleOnReject && isError){
            return getData();
        }

        if(callback && !toggled && !dataToggle){
            return getData();
        }

        process(dataToggle, isError);
    }

    render() {
        const { addClass, toggleOnReject, isError, toggleReject, loadingData, loading, defaultClass, id, data, dataToggle, toggled, toggleForwards, toggleBackwards, classList } = this.state;

        return (
            <span
                className=''
                
            >
                {
                    data &&
                    <span className="text">
                        {
                            data
                        }
                    </span>
                }
                {
                    loadingData && loading &&
                    <span className='loading'>
                    {
                        loading
                    }
                    </span>
                }
                {
                    !toggled && toggleForwards && !loadingData && !isError &&
                    <span
                        className='toggle-forwards'
                        onClick={(e) => this.toggle(e)}
                    >
                        {
                            toggleForwards
                        }
                    </span>
                }
                {/* display regular data if is not an error */}
                {
                    dataToggle && toggled && !isError &&
                    <span
                        key={uuid()}
                        className={classList}
                    >
                        {
                            dataToggle
                        }
                    </span>
                }
                {/* display error data comes from Promise reject if not undefined */}
                {
                    isError && dataToggle && toggleReject && !loadingData &&
                    <span
                        key={uuid()}
                        className={classList}
                    >
                        {
                            dataToggle
                        }
                    </span>
                }
                {/* try again on Promise reject */}
                {
                    isError && toggleOnReject && toggleReject && !loadingData &&
                    <span
                        className='toggle-forwards'
                        onClick={(e) => this.toggle(e)}
                    >
                        {
                            toggleReject
                        }
                    </span>
                }
                {/* toggle Backwards if no errros */}
                {
                    toggled && toggleBackwards && dataToggle && !isError &&
                    <span
                        className='toggle-back'
                        onClick={(e) => this.toggle(e)}
                    >
                        {
                            toggleBackwards
                        }
                    </span>
                }
            </span>
        );
    }
}

export default ReadMoreCallback;