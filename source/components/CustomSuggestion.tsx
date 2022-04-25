import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import isFunction from '../functions/isFunction';
import uuid from '../functions/uuid';

class CustomSuggestion extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private inputNode: any;
    private refNodeUl: any;
    private timeout: any;
    
    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
        this.setValue = this.setValue.bind(this);
        this.callbackEsc = this.callbackEsc.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.setFocusUpdater = this.setFocusUpdater.bind(this);
        this.setValueToInputField = this.setValueToInputField.bind(this);

        this.state = {
            /**
             * App
             */
            isLoading: false,
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'CustomSuggestion',
            
            plainValue: (props.value && typeof '8' == typeof props.value) ? props.value : '',
            callback: isFunction(props.callback) ? props.callback : undefined,
            suggestions: (props.suggestions && typeof [] == typeof props.suggestions) ? props.suggestions : [],
            inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
            props: (props.props && typeof {} == typeof props.props) ? props.props : {},
            inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
            callbackRerender: (typeof true == typeof props.callbackRerender) ? props.callbackRerender : false,
            allowOnlyAZ: (typeof true == typeof props.allowOnlyAZ) ? props.allowOnlyAZ : false,
            searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
            loading: props.loading ? props.loading : undefined
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['id', 'addClass', 'defaultClass', 'value', 'suggestions', 'callback', 'inputPlaceholder', 'props', 'inputType', 'callbackRerender', 'allowOnlyAZ', 'searchSensitive', 'loading'], props, state)) {
            const { callbackRerender } = state;

            if(callbackRerender){
                return {
                    
                    defaultClass: isString(props.defaultClass) ? props.defaultClass : 'CustomSuggestion',
                    
                    suggestions: state.suggestions,
                    callback: isFunction(props.callback) ? props.callback : undefined,
                    inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                    props: (props.props && typeof {} == typeof props.props) ? props.props : {},
                    inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
                    callbackRerender: (typeof true == typeof props.callbackRerender) ? props.callbackRerender : false,
                    allowOnlyAZ: (typeof true == typeof props.allowOnlyAZ) ? props.allowOnlyAZ : false,
                    searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
                    loading: props.loading ? props.loading : undefined
                };
            }

            return {
                
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'CustomSuggestion',
                
                suggestions: props.suggestions,
                plainValue: state.plainValue,
                callback: isFunction(props.callback) ? props.callback : undefined,
                inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                props: (props.props && typeof {} == typeof props.props) ? props.props : {},
                inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
                callbackRerender: (typeof true == typeof props.callbackRerender) ? props.callbackRerender : false,
                allowOnlyAZ: (typeof true == typeof props.allowOnlyAZ) ? props.allowOnlyAZ : false,
                searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
                loading: props.loading ? props.loading : undefined
            };
        }

        return null;
    }

    componentDidMount(): void {

        this.setFocusUpdater(true);
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    setFocusUpdater(usercallback = false) {
        let timeout = usercallback ? 100 : 0;

        setTimeout(() => {

            if (this.inputNode) {
                const val = this.inputNode.value || this.inputNode.defaultValue;

                this.setState({
                    plainValue: val
                }, () => {

                    this.callback(val);
                });
            }
        }, timeout);
    }

    /**
     * Hide data div
     * while user not inside it
     * @param {React.MouseEvent|any} e
     */
    handleMouseDown(e) {
        if (this.refNodeUl && !this.refNodeUl.contains(e.target)) {
            this.setState({
                suggestions: [],
            });
        }
    }

    /**
     * On state change callback
     */
    async callback(plainValue, emptySuggestions = false) {
        const { callback } = this.state;

        if (callback) {
            const suggestions = await (callback)(plainValue, emptySuggestions);

            this.setState({
                suggestions: emptySuggestions ? [] : suggestions
            }); 
        }
        else{
            this.setState({
                suggestions: []
            }); 
        }
    }

    callbackPromise(plainValue){
        const { callback } = this.state;

        return new Promise( async (resolve, reject) => {
            if (callback) {
                await (callback)(plainValue)
                .then( r => {
                    resolve(r);
                })
                .catch( r => {
                    resolve([]);
                });
            }
            else{
                resolve([]);
            }
        });
    }

    /**
     * Esc callback
     */
    callbackEsc() {
        this.setState({
            suggestions: [],
        });
    }

    /**
     * Set value on change input field
     */
    setValue(e) {
        let value = e.target.value;
        this.setValueToInputField(value);
    }

    handleKeyDown(event){
        event.persist();

        if (event.key === 'Escape') {
            return this.callbackEsc();
        }
    }

    setInputValue(value, emptySuggestions = false){
        this.setValueToInputField(value, emptySuggestions);
    }

    setValueToInputField(value, emptySuggestions = false){
        const { allowOnlyAZ, loading, isLoading } = this.state;

        if (allowOnlyAZ) {
            value = value.replace(/[^a-zA-Z ]/gmi, '');
            value = value.trim();
        }

        this.setState({
            plainValue: value,
            suggestions: []
        }, () => {
            const { plainValue } = this.state;

            if(loading && !isLoading && !emptySuggestions){
                clearTimeout(this.timeout);

                if('' == plainValue){
                    return this.setState({
                        isLoading: false,
                        suggestions: []
                    });
                }

                return this.timeout = setTimeout( () => {
                    this.setState({
                        isLoading: true,
                        suggestions: []
                    }, async () => {
                        await this.callbackPromise(plainValue)
                        .then( (data: any) => {                            
                            this.setState({
                                isLoading: false,
                                suggestions: emptySuggestions ? [] : ((data && typeof [] == typeof data && data.length) ? data : [])
                            });
                        })
                        .catch( () => {
                            this.setState({
                                isLoading: false,
                                suggestions: []
                            });
                        })
                    })
                }, 200);
            }
            else{
                this.callback(plainValue, emptySuggestions);
            }
        });
    }

    render() {
        const { addClass, defaultClass, id, props, suggestions, plainValue, inputPlaceholder, inputType, loading, isLoading } = this.state;

        return (
            <div className=''>
                <div className="input">
                    <input
                        type={inputType}
                        value={plainValue}
                        onChange={(e) => this.setValue(e)}
                        placeholder={inputPlaceholder}
                        onKeyDown={ (e) => this.handleKeyDown(e) }
                        
                        {...props}
                    />
                    {
                        loading && isLoading &&
                        <div className="loading-area">
                            {
                                loading
                            }
                        </div>
                    }
                    {
                        '' !== plainValue && suggestions && 0 !== suggestions.length &&
                        <div className="suggestions-area">
                            <ul
                                className="ul"
                                ref={(node) => this.refNodeUl = node}
                            >
                                <span className="suggestions">
                                    {
                                        suggestions.map( suggestion => {
                                            const { href, props, jsx, onClickValue } = suggestion;

                                            return (
                                                <li 
                                                    key={uuid()}
                                                    onClick={ () => this.setInputValue(onClickValue, true)}
                                                >
                                                    <a href={href} {...props}>
                                                    {
                                                        jsx
                                                    }
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </span>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default CustomSuggestion;