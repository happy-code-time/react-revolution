import React from 'react';
import ReactDOM from 'react-dom';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import internalUuid from '../internalFunctions/internalUuid';

class ListSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.EscListener = this.EscListener.bind(this);
        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.removeHandleClick = this.removeHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.callback = this.callback.bind(this);

        this.state = {
            // App
            loading: false,
            display: false,
            currentData: '',
            oldData: '',
            step: 0,
            uuid: internalUuid(),
            isNextStep: false,
            isPreviousStep: false,
            classForSlide: '',
            disableClick: false,
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ListSwitch',
            id: isString(props.id) ? props.id : '',
            placeholder: props.placeholder ? props.placeholder : '',
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
            closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
            previous: props.previous ? props.previous : '<',
            next: props.next ? props.next : '>',
            title: props.title ? props.title : '',
            arrowNextClick: (typeof true == typeof props.arrowNextClick) ? props.arrowNextClick : false,
            animationTimeout: (typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 350,
            animation: (typeof true == typeof props.animation) ? props.animation : true,
            closeAfterCallback: (typeof true == typeof props.closeAfterCallback) ? props.closeAfterCallback : false,
            callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            holderLoading: props.holderLoading ? props.holderLoading : '',
            direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'left',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'id', 'holderLoading', 'direction', 'callback', 'callbackProps', 'animation', 'animationTimeout', 'closeAfterCallback', 'arrowNextClick',  'placeholder', 'data', 'closeOnEsc', 'closeOnOutsideClick', 'previous', 'next', 'title'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                placeholder: props.placeholder ? props.placeholder : '',
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : state.data,
                closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
                closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
                previous: props.previous ? props.previous : '<',
                next: props.next ? props.next : '>',
                title: props.title ? props.title : '',
                arrowNextClick: (typeof true == typeof props.arrowNextClick) ? props.arrowNextClick : false,
                animationTimeout: (typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 350,
                animation: (typeof true == typeof props.animation) ? props.animation : true,
                closeAfterCallback: (typeof true == typeof props.closeAfterCallback) ? props.closeAfterCallback : false,
                callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                holderLoading: props.holderLoading ? props.holderLoading : '',
                direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'left',
            };
        }

        return null;
    }

    componentDidMount() {
        this.addEscEventListener();
        this.attachHandleClick();

        if (this.state.data && this.state.data.length) {
            const data = this.generateStructure(this.state.data);
            return this.setState({
                currentData: this.generateData(data)
            });
        }
    }

    componentWillUnmount() {
        this.removeEscEventListener();
        this.removeHandleClick();
    }

    addEscEventListener() {
        if (this.state.closeOnEsc) {
            window.addEventListener('keydown', this.EscListener, false);
        }
    }

    removeEscEventListener() {
        if (this.state.closeOnEsc) {
            window.removeEventListener('keydown', this.EscListener, false);
        }
    }

    attachHandleClick() {
        if (this.state.closeOnOutsideClick) {
            this.removeHandleClick();
            document.addEventListener('click', this.handleClick, true);
        }
    }

    removeHandleClick() {
        if (this.state.closeOnOutsideClick) {
            document.removeEventListener('click', this.handleClick, true);
        }
    }

    handleClick(event) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            this.hideContext();
        }
    }

    EscListener(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.hideContext();
        }
    }

    hideContext() {
        this.setState({
            display: false,
            step: 0,
            currentData: ''
        });
    }

    toggle() {

        /**
         * Hide
         */
        if(false === !this.state.display){
            return this.hideContext();
        }
        
        /**
         * Data loaded or data from callback setted
         */
        let { data } = this.state;

        if (data.length) {
            data = this.generateStructure(data);

            return this.setState({
                data,
                step: 0,
                display: true,
                currentData: this.generateData(data),
            });
        }

        /**
         * Get data from callback
         */
        if (this.state.callback) {
            this.setState({
                loading: true,
                display: false,
            }, async () => {

                let data = await (this.state.callback)(this.state.callbackProps).then(r => r).catch(e => false);

                if (!data || typeof [] !== typeof data) {
                    return this.setState({
                        loading: false
                    });
                }

                this.setState({
                    data,
                }, () => {
                    data = this.generateStructure(data);

                    this.setState({
                        data,
                        loading: false,
                        display: true,
                        currentData: this.generateData(data),
                    });
                })
            });
        }
    }

    generateStructure(data = [], parent = undefined) {
        const { uuid } = this.state;

        if (data && typeof [] == typeof data && data.length) {

            for (let x = 0; x <= data.length - 1; x++) {

                // Unique key for react key behavior
                if (undefined == data[x].key) {
                    data[x].key = `single-entry-${x}-${uuid}`;
                }

                // Root
                if (!parent) {
                    data[x].nestedStep = 0;
                    data[x].parent = data[x];
                }
                else {
                    data[x].parent = parent;
                }

                // Childs
                if (parent && data[x].data && typeof [] == typeof data[x].data && data[x].data.length) {
                    data[x].nestedStep = parent.nestedStep + 1;
                }

                // Childs data
                if (data[x].data && typeof [] == typeof data[x].data && data[x].data.length) {
                    this.generateStructure(data[x].data, data[x]);
                }

                // Last
                if (parent && (undefined === data[x].data || typeof [] !== typeof data[x].data || !data[x].data.length)) {
                    data[x].nestedStep = parent.nestedStep + 1;
                }
            }
        }

        return data;
    }

    callback(c, p) {
        if (typeof function () { } == typeof c) {
            (c)(p);

            if (this.state.closeAfterCallback) {
                this.setState({
                    display: false
                });
            }
        }
    }

    next(currentDataSet, callback, callbackProps) {

        if (this.state.disableClick) {
            return;
        }

        if (callback && typeof function () { } == typeof callback) {

            if (this.state.closeAfterCallback) {
                return this.callback(callback, callbackProps);
            }

            this.callback(callback, callbackProps);
        }

        this.setState({
            step: this.state.step + 1,
            oldData: this.state.currentData,
            currentData: this.generateData(currentDataSet.data, this.state.step + 1, currentDataSet.text),
            isPreviousStep: false,
            isNextStep: this.state.animation ? true : false,
            classForSlide: this.state.animation ? 'slide-animate slide-next' : '',
            disableClick: this.state.animation ? true : false
        }, () => {

            if (this.state.animation) {
                setTimeout(() => {
                    this.setState({
                        isNextStep: false,
                        classForSlide: '',
                        disableClick: false
                    });
                }, this.state.animationTimeout);
            }
        });
    }

    previous(parent) {

        if (this.state.disableClick) {
            return;
        }

        this.disableClick = true;

        if (undefined !== parent && undefined !== parent.parent) {
            parent = parent.parent;
        }

        const title = (0 !== this.state.step - 1) ? parent.text : '';

        this.setState({
            step: this.state.step - 1,
            currentData: (0 !== this.state.step - 1) ? this.generateData(parent.data, this.state.step - 1, title) : this.generateData(this.state.data),
            oldData: this.state.currentData,
            isNextStep: false,
            isPreviousStep: this.state.animation ? true : false,
            classForSlide: this.state.animation ? 'slide-animate slide-previous' : '',
            disableClick: this.state.animation ? true : false
        }, () => {

            if (this.state.animation) {
                setTimeout(() => {
                    this.setState({
                        isPreviousStep: false,
                        classForSlide: '',
                        disableClick: false
                    });
                }, this.state.animationTimeout);
            }
        });
    }

    generateData(data = [], step = 0, stepTitle = '') {
        const { title, arrowNextClick, uuid } = this.state;
        let prev = this.state.previous;
        let nexios = this.state.next;
        const innerTitle = (step == 0 && title) ? title : stepTitle;
        let jsx = [];
        let titleData = '';

        if (data && data.length) {

            for (let x = 0; x <= data.length - 1; x++) {
                const { nestedStep, text, key, parent, next, callback, callbackProps } = data[x];

                if (parent && parent.previous) {
                    prev = parent.previous;
                }

                if (next) {
                    nexios = next;
                }

                // Title data
                if (0 === jsx.length && innerTitle) {
                    titleData = (
                        <div key={`area-title-${x}-${uuid}`} className='area-title'>
                            {
                                step !== 0 &&
                                <span
                                    className='navigation navigation-previous user-select-none'
                                    onClick={() => this.previous(parent)}
                                >
                                    {
                                        prev
                                    }
                                </span>
                            }
                            <div className='title'>
                                {
                                    innerTitle
                                }
                            </div>
                        </div>
                    );
                }

                // Step entries
                if (nestedStep === step && text) {

                    jsx.push(
                        <div
                            key={key}
                            className={`area-entry ${undefined !== data[x].data && typeof [] === typeof data[x].data && data[x].data.length ? 'has-children' : ''}`}
                            {...(!arrowNextClick && undefined !== data[x].data && typeof [] === typeof data[x].data && data[x].data.length) && { onClick: () => this.next(data[x], callback, callbackProps) }}
                            {...(!arrowNextClick && undefined == data[x].data || typeof [] !== typeof data[x].data || !data[x].data.length) && { onClick: () => this.callback(callback, callbackProps) }}
                        >
                            <div className='single-entry'>
                                {
                                    text
                                }
                            </div>
                            {
                                undefined !== data[x].data && typeof [] === typeof data[x].data && data[x].data.length &&
                                <span
                                    className='navigation navigation-next user-select-none'
                                    {...(arrowNextClick) && { onClick: () => this.next(data[x], callback, callbackProps) }}
                                >
                                    {
                                        nexios
                                    }
                                </span>
                            }
                        </div>
                    );
                }
            }

            return (
                <div>
                    {
                        titleData
                    }
                    {
                        jsx
                    }
                </div>
            );
        }

        return null;
    }

    render() {
        const { defaultClass, addClass, id, placeholder, loading, holderLoading, display, classForSlide, currentData, isNextStep, isPreviousStep, oldData, uuid, direction } = this.state;

        return (
            <span
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <span className='ctx'>
                    {
                        placeholder &&
                        <span className={`text ${direction}`} onClick={() => this.toggle()}>
                            {
                                placeholder
                            }
                        </span>
                    }
                    {
                        !display && loading &&
                        <div className='loading'>
                            {
                                holderLoading
                            }
                        </div>
                    }
                    {
                        display && !loading &&
                        <span className='data-list-switch'>
                            <span 
                                key={`data-list-switch-${uuid} ${direction}`} 
                                className={`data ${classForSlide}`}
                            >
                                <div className={`slide-wrapper ${direction}`}>
                                    <div className='slider'>
                                        {
                                            isNextStep && oldData &&
                                            <div className='old-data old-data-next'>
                                                {
                                                    oldData
                                                }
                                            </div>
                                        }
                                        {
                                            currentData &&
                                            <div className='area'>
                                                {
                                                    currentData
                                                }
                                            </div>
                                        }
                                        {
                                            isPreviousStep && oldData &&
                                            <div className='old-data old-data-previous'>
                                                {
                                                    oldData
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </span>
                        </span>
                    }
                </span>
            </span>
        );
    }
}

export default ListSwitch;
