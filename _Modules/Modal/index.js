import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';

class Modal extends React.Component 
{
    constructor(props) {
        super(props);
        this.removeHandlers = this.removeHandlers.bind(this);
        this.setHandlers = this.setHandlers.bind(this);
        this.close = this.close.bind(this);
        this.onKeyUpCapture = this.onKeyUpCapture.bind(this);

        this.state = {
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-modal',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: props.data ? props.data : undefined,
            close: props.close ? props.close : undefined,
            display: typeof true == typeof props.display ? props.display : false,
            callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
            closeOnKeyDown: typeof true == typeof props.closeOnKeyDown ? props.closeOnKeyDown : true,
            closeOnClickDimmed: typeof true == typeof props.closeOnClickDimmed ? props.closeOnClickDimmed : true,
        };

        this.ref = React.createRef();
    }

    componentDidMount() {
        const { closeOnKeyDown } = this.state;

        if(closeOnKeyDown){
            this.setHandlers();
        }
    }

    componentWllUnmount(){
        const { closeOnKeyDown } = this.state;

        if(closeOnKeyDown){
            this.removeHandlers();
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'data', 'display', 'callback'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-modal',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: props.data ? props.data : undefined,
                display: typeof true == typeof props.display ? props.display : false,
                callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
            };
        }

        return null;
    }

    setHandlers(){
        this.removeHandlers();
        document.addEventListener('keyup', this.onKeyUpCapture);
        document.addEventListener('touchstart', this.onKeyUpCapture);
        document.addEventListener('touchend', this.onKeyUpCapture);
        document.addEventListener('touch', this.onKeyUpCapture);
    }

    removeHandlers(){
        document.removeEventListener('keyup', this.onKeyUpCapture);
        document.removeEventListener('touchstart', this.onKeyUpCapture);
        document.removeEventListener('touchend', this.onKeyUpCapture);
        document.removeEventListener('touch', this.onKeyUpCapture);
    }

    onKeyUpCapture(event) {
        event.preventDefault();
        event.stopPropagation();
        const { callback } = this.state;

        if (callback && event.keyCode && 27 == event.keyCode) {
            (callback)(event);
        }
    }

    close(event){
        const { callback } = this.state;

        if (callback) {
            (callback)(event);
        }
    }

    render() {
        const { display, addClass, defaultClass, id, data, callback, close, closeOnClickDimmed } = this.state;

        if(!display || !callback){
            return null;
        }

        return (
            <div
                ref={this.ref}
                className={`${defaultClass} ${addClass}`}
                id={id}
            >
                
                <div className="holder" {...(closeOnClickDimmed) && { onClick: (e) => this.close(e) }}></div>

                <div className='content'>
                    {
                        data && data
                    }
                    {
                        close && 
                        <div className="close" onClick={(e) => this.close(e)}>
                        {
                            close
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Modal;