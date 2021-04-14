import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
class LoadOnScroll extends React.Component {

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
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-load-on-scroll',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: props.data && typeof [] == typeof props.data ? props.data : '',
            loading: props.loading ? props.loading : '',
            callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            minify: typeof 8 == typeof props.minify ? props.minify : 0,
            scrollReference: typeof true == typeof props.scrollReference ? props.scrollReference : true,
            onReject: props.onReject ? props.onReject : '',
            persistReject: typeof true == typeof props.persistReject ? props.persistReject : false,
            fireScrollEvent: typeof 8 == typeof props.fireScrollEvent ? props.fireScrollEvent : 0,
            fireScrollBack: typeof true == typeof props.fireScrollBack ? props.fireScrollBack : true,
            scrolledToBottom: typeof true == typeof props.scrolledToBottom ? props.scrolledToBottom : false,
        };

        this.loadingAllowed = true;
        this.fireScrollBackCount = 0;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['defaultClass', 'id', 'data', 'loading', 'minify', 'scrollReference', 'callbackProps', 'onReject', 'persistReject', 'fireScrollEvent', 'fireScrollBack', 'scrolledToBottom'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-load-on-scroll',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: props.data && typeof [] == typeof props.data ? props.data : '',
                loading: props.loading ? props.loading : '',
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                dataJsx: state.dataJsx,
                minify: typeof 8 == typeof props.minify ? props.minify : 0,
                scrollReference: typeof true == typeof props.scrollReference ? props.scrollReference : true,
                onReject: props.onReject ? props.onReject : '',
                persistReject: typeof true == typeof props.persistReject ? props.persistReject : false,
                fireScrollEvent: typeof 8 == typeof props.fireScrollEvent ? props.fireScrollEvent : 0,
                fireScrollBack: typeof true == typeof props.fireScrollBack ? props.fireScrollBack : true,
                scrolledToBottom: typeof true == typeof props.scrolledToBottom ? props.scrolledToBottom : false,
            };
        }

        return null;
    }


    componentDidMount() {
        this.attachScrollEvent();
        this.buildData(this.state.data, true);
    }

    fireScrollEvents() {
        const { fireScrollEvent, fireScrollBack, scrollReference } = this.state;

        if (fireScrollEvent) {

            if (this.scrollReference && scrollReference) {
                this.scrollReference.scrollTop = fireScrollEvent;
            }

            if (!scrollReference) {
                document.documentElement.scrollTop = fireScrollEvent;
            }
        }

        if (fireScrollBack) {
            
            if (this.scrollReference && scrollReference) {
                this.scrollReference.scrollTop = 0;
            }

            if (!scrollReference) {

                if (fireScrollBack && 0 == this.fireScrollBackCount) {
                    this.fireScrollBackCount = 1;

                    document.documentElement.scrollTop = 0;

                    setTimeout(() => {
                        document.documentElement.scrollTop = 0;
                    }, 100);
                }
            }
        }
    }

    attachScrollEvent() {
        const { scrollReference } = this.state;

        if (this.scrollReference && scrollReference) {
            this.scrollReference.removeEventListener('scroll', this.scrollEvent);
            this.scrollReference.addEventListener('scroll', this.scrollEvent);
        }

        if (!scrollReference) {
            document.removeEventListener('scroll', this.scrollEvent);
            document.addEventListener('scroll', this.scrollEvent);
        }
    }

    componentWillUnmount() {
        this.removeScrollEvent();
    }

    removeScrollEvent() {
        const { scrollReference } = this.state;

        if (this.scrollReference) {
            this.scrollReference.removeEventListener('scroll', this.scrollEvent);
        }

        if (!scrollReference) {
            document.removeEventListener('scroll', this.scrollEvent);
        }
    }

    scrollToBottom() {
        const { scrollReference } = this.state;

        try {

            // if(!scrollReference){
            //     document.documentElement.scrollTop = document.documentElement.getBoundingClientRect().height;
            // }

            if (scrollReference && this.scrollReference) {
                this.scrollReference.scrollTop = this.scrollReference.getBoundingClientRect().height;
            }
        }
        catch (e) {

        }
    }

    loadMore(event) {
        const self = this;
        let { callback, persistReject, callbackProps } = this.state;
        this.removeScrollEvent();

        if (callback) {

            this.setState({
                loadingData: true,
                isError: false
            }, async () => {
                this.scrollToBottom();

                await (callback)(event, callbackProps)
                    .then(data => {

                        if ('break' == data) {
                            return self.setState({ loadingData: false });
                        }

                        self.buildData(data);

                        if (persistReject) {
                            return null;
                        }

                        return self.attachScrollEvent();
                    })
                    .catch(errorData => {

                        if (undefined == errorData) {
                            /**
                             * No more items to load
                             */
                            return self.setState({
                                loadingData: false,
                                isError: true
                            }, () => {
                                if (!persistReject) {
                                    setTimeout(() => {
                                        self.attachScrollEvent();
                                        self.callbackRendered = true;
                                    }, 500);
                                }
                            });
                        }

                        return self.setState({
                            errorData,
                            isError: true,
                            loadingData: false
                        }, () => {

                            if (persistReject) {
                                const timeouts = [100, 200];

                                for (let x = 0; x <= timeouts.length - 1; x++) {
                                    setTimeout(() => {
                                        self.scrollToBottom();
                                    }, timeouts[x]);
                                }
                            }

                            if (!persistReject) {
                                setTimeout(() => {
                                    self.attachScrollEvent();
                                    self.callbackRendered = true;
                                }, 500);
                            }
                        });
                    });
            });
        }
        else {
            self.setState({
                loadingData: false,
                isError: false
            });
        }
    }

    buildData(data = [], fireScrollEvent = false) {
        let { dataJsx } = this.state;

        if (typeof [] === typeof data && undefined !== data[0]) {
            data.map(i => {
                dataJsx.push(
                    <span

                        className="section"
                    >
                        {
                            i
                        }
                    </span>
                );
            });
        }
        else {
            dataJsx.push(
                <span
                    key={internalUuid()}
                    className="section"
                >
                    {
                        data
                    }
                </span>
            );
        }

        this.setState({
            dataJsx,
            loadingData: false
        }, () => {
            this.callbackRendered = true;

            /**
             * Fired only once, after component did mount
             */
            if(fireScrollEvent){
                setTimeout( () => {
                    this.fireScrollEvents();
                }, 300);
            }
        });
    }

    scrollEvent(e) {
        const { minify, scrollReference, scrolledToBottom } = this.state;

        /**
         * Reference listener
         */
        const min = parseInt(minify);

        if (this.scrollReference && this.callbackRendered && scrollReference && !scrolledToBottom) {
            /**
             * Scrolled to bottom - min
             */
            if (this.scrollReference.offsetHeight + this.scrollReference.scrollTop >= this.scrollReference.scrollHeight - min) {
                this.callbackRendered = false;
                return this.loadMore(e);
            }
        }

        /**
         * Document listener
         */
        if(!scrollReference && document.body && !scrolledToBottom){
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - min) {
                this.callbackRendered = false;
                return this.loadMore(e); 
            }
        }

        if (!scrollReference && document.documentElement && scrolledToBottom) {
            /**
             * Scrolled to bottom - min
             */
            const currentScrollY = document.documentElement.scrollTop + document.documentElement.getBoundingClientRect().height;
            const documentMaxHeight = document.documentElement.scrollHeight - min;

            if (currentScrollY >= documentMaxHeight) {
                this.callbackRendered = false;
                this.loadMore(e);
            }
        }
    }


    render() {
        const { addClass, dataJsx, defaultClass, loadingData, errorData, loading, id, scrollReference, isError, onReject } = this.state;

        return (
            <div
                ref={(node) => this.scrollReference = node}
                className={`${defaultClass} ${addClass} ${scrollReference ? '' : 'ignore'}`}
                id={id}
            >
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
            </div>
        );
    }
}

export default LoadOnScroll;
