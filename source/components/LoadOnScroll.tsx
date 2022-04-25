import React from 'react';

import isFunction from '../functions/isFunction';
import isArray from '../functions/isArray';
import isInViewPort from '../functions/isInViewPort';
import isNumber from '../functions/isNumber';
import PropsCheck from '../functions/PropsCheck';

interface SP {
    [key: string]: any;
};

class LoadOnScroll extends React.Component<SP, SP> 
{
    private scrollReference: any;
    private scrollEventReference:any;

    constructor(props) {
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.buildData = this.buildData.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.attachScrollEvent = this.attachScrollEvent.bind(this);
        this.removeScrollEvent = this.removeScrollEvent.bind(this);

        this.state = {
            /**
             * App
             */
            dataJsx: [],
            loadingData: false,
            isError: false,
            /**
             * User
             */
            data: isArray(props.data) ? props.data : [],
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps,
            minify: isNumber(props.minify) ? props.minify : 0,
        };

        this.scrollEventReference = null;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'data', 'loading', 'minify', 'callbackProps' ], props, state)) {
            return {
                data: isArray(props.data) ? props.data : [],
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps,
                minify: isNumber(props.minify) ? props.minify : 0,
            };
        }

        return null;
    }


    componentDidMount(): void {

        this.attachScrollEvent();
        this.buildData(this.state.data);
    }

    attachScrollEvent() {
        document.removeEventListener('scroll', this.scrollEvent);
        document.addEventListener('scroll', this.scrollEvent);
    }

    componentWillUnmount() {
        this.removeScrollEvent();
    }

    removeScrollEvent() {
        document.removeEventListener('scroll', this.scrollEvent);
    }

    scrollToBottom() {
        if (this.scrollReference) {
            this.scrollReference.scrollTop = this.scrollReference.getBoundingClientRect().height;
        }
    }

    loadMore(event) {
        const self = this;
        let { callback, callbackProps } = this.state;
        this.removeScrollEvent();

        this.setState({
            loadingData: true,
        }, async () => {

            await (callback)(event, callbackProps)
                .then(data => {

                    if ('break' == data) {
                        return self.setState({ loadingData: false });
                    }

                    if (null == data) {
                        return null;
                    }

                    self.buildData(data);

                    return self.attachScrollEvent();
                });
        });
    }

    buildData(data = []) {
        let { dataJsx } = this.state;
        dataJsx.push(data);

        this.setState({
            dataJsx,
            loadingData: false
        });
    }

    scrollEvent(e) {
        const { minify } = this.state;
        const min = parseInt(minify);

        if(this.scrollEventReference && isInViewPort(this.scrollEventReference, min)){
            return this.loadMore(e);
        }
    }


    render() {
        const { dataJsx, loadingData, errorData, loading, isError, onReject } = this.state;

        return (
            <div className='LoadOnScroll ignore row w-100'>
                {
                    dataJsx && dataJsx.map(i => i)
                }
                {
                    loadingData && loading
                }
                {
                    isError && errorData && errorData
                }
                {
                    isError && onReject &&
                    <span onClick={(e) => this.loadMore(e)}>
                        {
                            onReject
                        }
                    </span>
                }
                {
                    isArray(dataJsx) && 0 !== dataJsx.length && <span ref={ x => this.scrollEventReference = x} />
                }
            </div>
        );
    }
}

export default LoadOnScroll;
