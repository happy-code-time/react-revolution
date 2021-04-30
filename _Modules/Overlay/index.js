import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Overlay extends React.Component
{
    constructor(props) {
        super(props);
        this.EscListener = this.EscListener.bind(this);

        this.state = {
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Overlay',
            id: isString(props.id) ? props.id : '',
            display: typeof true == typeof props.display ? props.display : false,
            callback: isFunction(props.callback) ? props.callback : undefined,
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
        if (PropsCheck(['addClass',  'id', 'data', 'display', 'callback', 'callbackProps'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                display: typeof true == typeof props.display ? props.display : false,
                callback: isFunction(props.callback) ? props.callback : undefined,
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
                {...isString(id) && '' !== id && { id: id } }
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
