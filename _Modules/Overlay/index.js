import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';

class Overlay extends React.Component
{
    constructor(props) {
        super(props);
        this.EscListener = this.EscListener.bind(this);

        this.state = {
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-overlay',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            display: typeof true == typeof props.display ? props.display : false,
            callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
            callbackProps: props.callbackProps,
            data: props.data,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'data', 'display', 'callback', 'callbackProps'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-overlay',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                display: typeof true == typeof props.display ? props.display : false,
                callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
                callbackProps: props.callbackProps,
                data: props.data,
            };
        }

        return null;
    }

    componentDidMount() {
        this.addEscEventListener();
    }

    componentWillUnmount() {
        this.removeEscEventListener();
    }

    addEscEventListener() {
        window.addEventListener('keydown', this.EscListener, false);
    }

    removeEscEventListener() {
        window.removeEventListener('keydown', this.EscListener, false);
    }

    EscListener(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.cancel();
        }
    }

    cancel() {
        const { callback, callbackProps } = this.state;

        if(callback){
            (callback)(callbackProps);
        }
    }

    render() {
        const { display, data, defaultClass, addClass, id } = this.state;

        if (!display) {
            return null;
        }

        return (
            <div 
                className={`${defaultClass} ${addClass}`}
                id={id}
            >
                <div className="dimmed" onClick={ () => this.cancel()}></div>
                {
                    data && 
                    <div className="data ctx">
                    {
                        data
                    }    
                    </div>
                }
            </div>
        );
    }
}

export default Overlay;
