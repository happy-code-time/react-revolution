import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class GlobalMessage extends React.Component 
{
    constructor(props) {
        super(props);
        this.checkLocation = this.checkLocation.bind(this);

        this.state = {
            /**
             * App
             */
            messagesApp: [],
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'GlobalMessage',
            id: isString(props.id) ? props.id : '',
            messageKey: (props.messageKey && typeof '8' == typeof props.messageKey) ? props.messageKey : '',
            codeMapping: (props.codeMapping && typeof {} === typeof props.codeMapping) ? props.codeMapping : {},
            timer: (props.timer && typeof 8 == typeof props.timer) ? props.timer : 2500,
            empty: (typeof true == typeof props.empty) ? props.empty : true,
        };

        this.removeMessage = this.removeMessage.bind(this);
        this.setIntervaller = this.setIntervaller.bind(this);
        this.href = window.location.href;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass',  'id', 'messageKey', 'codeMapping', 'timer', 'empty'], props, state)) {            
            return {
                moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
                globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                messageKey: (props.messageKey && typeof '8' == typeof props.messageKey) ? props.messageKey : '',
                codeMapping: (props.codeMapping && typeof {} === typeof props.codeMapping) ? props.codeMapping : {},
                timer: (props.timer && typeof 8 == typeof props.timer) ? props.timer : 2500,
                empty: (typeof true == typeof props.empty) ? props.empty : true,
            };
        }

        return null;
    }


    componentDidMount() {
        this.clearStore(true);
        const { messageKey, empty } = this.state;

        if(empty){
            this.setOnClickEventListenerToTheDom();
        }

        if('' !== messageKey){
            this.setIntervaller();
        }
    }

    componentWillUnmount() {
        const { empty } = this.state;

        if(empty){
            document.removeEventListener('click', this.checkLocation);
        }
        clearInterval(this.globalMessagesIntervaller);
    }

    /**
     * Check if the website using a react-router
     * and if the url changed then reload the protector functionalitty
     */
    setOnClickEventListenerToTheDom() {
        document.removeEventListener('click', this.checkLocation);
        document.addEventListener('click', this.checkLocation);
    }

    /**
     * Check location, if the stored href are changed then
     * reload the security context of this extension
     * This feature needed for websites based on
     * react framework
     */
    checkLocation() {
        const self = this;
        let count = 5;
        clearInterval(x);

        var x = setInterval(() => {
            /**
             * If the current href changed
             */            
             if (self.href !== window.location.href && count > 0) {
                self.href = window.location.href;
                self.clearStore(true);
                return clearInterval(x);
            }

            if (!count) {
                return clearInterval(x);
            }

            count--;
        }, 100);
    }

    /**
     * Read messages from store
     */
    readStore() {
        const { messageKey } = this.state;

        if (null !== sessionStorage.getItem(messageKey)) {
            return JSON.parse(sessionStorage.getItem(messageKey));
        }

        return [];
    }

    /**
     * Clear storage
     */
    clearStore(resetMessages = false) {
        const { messageKey } = this.state;

        sessionStorage.removeItem(messageKey);
        
        if(resetMessages){
            this.setState({
                messagesApp: []
            });
        }
    }

    /**
     * Looper
     */
    setIntervaller() {
        const { timer } = this.state;
        clearInterval(this.globalMessagesIntervaller);

        this.globalMessagesIntervaller = setInterval(() => {
            let { messagesApp } = this.state;
            let newMessagesApp = this.readStore();

            if (0 !== newMessagesApp.length) {
                this.clearStore(false);

                /**
                 * Check for clear Stack
                 */
                let target = undefined;
                let persistGivenMessage = false;

                for(let x = 0; x <= newMessagesApp.length-1; x++){
                    const { clearStack, persistCurrentMessage } = newMessagesApp[x];

                    if(undefined !== clearStack && typeof true === typeof clearStack && true == clearStack){
                        target = newMessagesApp[x];
                        persistGivenMessage = persistCurrentMessage;
                        break;
                    }
                }

                if(target){

                    if(undefined !== persistGivenMessage && typeof true == typeof persistGivenMessage && true == persistGivenMessage){
                        return this.setState({
                            messagesApp: [ target ]
                        });
                    }
                    else{
                        return this.setState({
                            messagesApp: []
                        });
                    }
                }

                /**
                 * Check for clear Stack by errorCode
                 */
                let targetFound = undefined;
                let messages = [];

                for(let x = 0; x <= newMessagesApp.length-1; x++){
                    const { clearStack, persistCurrentMessage } = newMessagesApp[x];

                    if(undefined !== clearStack && typeof 8 === typeof clearStack){
                        targetFound = true;
                        target = newMessagesApp[x];
                        messages = [...messagesApp, ...newMessagesApp];
                        messages = messages.filter( item => undefined !== item.errorCode && typeof 8 === typeof item.errorCode && item.errorCode !== clearStack);

                        if(undefined !== persistCurrentMessage && typeof true == typeof persistCurrentMessage && true == persistCurrentMessage){
                            messages.push(target);
                        }
                        break;
                    }
                }

                if(targetFound){
                    return this.setState({
                        messagesApp: messages
                    });
                }

                /**
                 * Default messages generation process
                 */
                for(let x = 0; x <= newMessagesApp.length-1; x++){
                    newMessagesApp[x].unique = `${internalUuid()}`;

                    if(newMessagesApp[x].disappear && typeof 8 == typeof newMessagesApp[x].disappear){
                        setTimeout( () => {
                            this.setState({ 
                                messagesApp: this.state.messagesApp.filter( item => newMessagesApp[x].unique !== item.unique),
                            });
                        }, newMessagesApp[x].disappear);
                    }
                }

                this.setState({ 
                    messagesApp: [...messagesApp, ...newMessagesApp]
                });
            }

        }, timer);
    }

    /**
     * Remove single message by index
     */
    removeMessage(unique) {
        this.setState({
            messagesApp: this.state.messagesApp.filter( item => unique !== item.unique),
        });
    }

    render() {
        const { addClass, codeMapping, messagesApp, defaultClass, id } = this.state;
        const mappingKeys = Object.getOwnPropertyNames(codeMapping);

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    messagesApp.map( obj => {

                        let { errorCode, errorMessage, unique } = obj;
                        errorCode = JSON.stringify(errorCode);

                        if (mappingKeys.includes(errorCode) && undefined !== codeMapping[errorCode]) {
                            const { title, displayErrorCode, text, close, link } = codeMapping[errorCode];
                            let propsText = {};
                            let propsLink = {};
                            let propsClose = {};

                            if (text && typeof {} === typeof text && text.props && typeof {} === typeof text.props) {
                                propsText = text.props;
                            }

                            if (link && typeof {} === typeof link && link.props && typeof {} === typeof link.props) {
                                propsLink = link.props;
                            }

                            if (close && typeof {} === typeof close && close.props && typeof {} === typeof close.props) {
                                propsClose = close.props;
                            }

                            return (
                                <div className="single-error" key={internalUuid()}>
                                    {
                                        title &&
                                        typeof '000' === typeof title &&
                                        <h1>
                                            {`${title} ${displayErrorCode ? errorCode : ''}`}
                                        </h1>
                                    }
                                    {
                                        title &&
                                        typeof {} === typeof title &&
                                        <h1>
                                            {
                                                title
                                            }
                                            {` ${displayErrorCode ? errorCode : ''}`}
                                        </h1>
                                    }
                                    <div
                                        className="text"
                                        {...propsText}
                                    >
                                        {`${text && text.prefix ? `${text.prefix} ` : ''} ${errorMessage ? `${errorMessage} ` : ''} ${text && text.suffix ? `${text.suffix}` : ''}`}
                                    </div>

                                    <div className="options">
                                        <div
                                            onClick={e => this.removeMessage(unique)}
                                            className="single-option"
                                            {...propsClose}
                                        >
                                            {`${close && close.text ? `${close.text} ` : ''}`}
                                        </div>
                                        {
                                            link && typeof {} === typeof link && link.text && typeof '000' === typeof link.text &&
                                            <div className="single-option">
                                                <a
                                                    rel="noopener noreferrer"
                                                    href={`${link.href ? link.href : ''}`}
                                                    {...propsLink}
                                                >
                                                    {
                                                        link.text
                                                    }
                                                </a>
                                            </div>
                                        }
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    })
                }
            </div>
        );
    }
}

export default GlobalMessage;