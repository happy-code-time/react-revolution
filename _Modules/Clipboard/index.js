import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Clipboard extends React.Component 
{
    
    constructor(props) {
        super(props);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.copyToClipboardAction = this.copyToClipboardAction.bind(this);

        this.state = {
            /**
             * App
             */
            formStyle: {
                display: 'none !important',
                opacity: 0,
                width: 0,
                height: 0,
                overflow: 'hidden'
            },
            internalUuid: `${internalUuid()}`,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Clipboard',
            id: isString(props.id) ? props.id : '',
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps,
            data: props.data && typeof [] == typeof props.data ? props.data : [],
            clipboard: props.clipboard,
            animation: props.animation && typeof '8' == typeof props.animation ? props.animation : undefined,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'id', 'callback', 'callbackProps', 'data', 'clipboard'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps,
                data: props.data && typeof [] == typeof props.data ? props.data : [],
                clipboard: props.clipboard
            };
        }

        return null;
    }

    copyToClipboardAction(data){
        if(this.clipboardNode){

            if(typeof [] == typeof data){
                data = JSON.stringify(data);
            }

            this.clipboardNode.value = data;
            this.clipboardNode.select();
            document.execCommand('copy');
            this.clipboardNode.value = '';
        }
    }

    copyToClipboard(e){
        const { clipboard, callback, callbackProps, animation } = this.state;
        this.copyToClipboardAction(clipboard);

        if(callback){
            (callback)(e, callbackProps, clipboard);
        }

        if(animation && this.clipboardNodeForAnimation){
            const classToToggle = `animation-${animation}`;
            this.clipboardNodeForAnimation.classList.add(classToToggle);

            if('scale' == animation){
                return setTimeout( () => {
                    if(animation && this.clipboardNodeForAnimation){
                        this.clipboardNodeForAnimation.classList.remove(classToToggle);
                    }
                }, 500);
            }

            if('jump' == animation){

                setTimeout( () => {
                    this.clipboardNodeForAnimation.classList.add(`${classToToggle}-back`);
                }, 200);

                return setTimeout( () => {
                    if(animation && this.clipboardNodeForAnimation){
                        this.clipboardNodeForAnimation.classList.remove(classToToggle);
                        this.clipboardNodeForAnimation.classList.remove(`${classToToggle}-back`);
                    }
                }, 400);
            }
        }
    }
    
    render() {
        const { addClass, data, defaultClass, id, formStyle, internalUuid } = this.state;

        return (
            <div 
                ref={ node => this.clipboardNodeForAnimation = node}
                className={`${defaultClass} ${addClass}`} 
                {...isString(id) && '' !== id && { id: id } }
                onClick={ (e) => this.copyToClipboard(e)}
            >
                {
                    data
                }
                <form style={formStyle}>
                    <textarea
                        ref={ node => this.clipboardNode = node}
                        id={internalUuid}
                        value=''
                        readOnly={true}
                    />
                </form>
            </div>
        );
    }
}

export default Clipboard;
