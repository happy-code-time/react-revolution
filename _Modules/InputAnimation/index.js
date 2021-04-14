import React from 'react';

class InputAnimation extends React.Component 
{
    constructor (props) {
        super(props);
        this.callback=this.callback.bind(this);
        this.onFocus=this.onFocus.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.setValue=this.setValue.bind(this);
        this.callbackEnter=this.callbackEnter.bind(this);
        this.setFocus=this.setFocus.bind(this);

        this.state={
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-input-animation',
            defaultClassOrigin: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-input-animation',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            plainValue: (props.value && typeof '8' == typeof props.value) ? props.value : '',
            callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
            inputType: (props.type && typeof '8' == typeof props.type) ? props.type : 'text',
            props: (props.props && typeof {} == typeof props.props) ? props.props : {},
            inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
            animatePlaceholder: (typeof true == typeof props.animatePlaceholder) ? props.animatePlaceholder : true,
            onEnter: (props.onEnter && typeof function(){} == typeof props.onEnter) ? props.onEnter : undefined,
            allowOnlyAZ: (typeof true == typeof props.allowOnlyAZ) ? props.allowOnlyAZ : false,
            getValueFromCallback: (typeof true == typeof props.getValueFromCallback) ? props.getValueFromCallback : false,
        }
    }

    componentDidMount(){
        this.setFocus();
        this.setFocusUpdater(true);
    }

    componentDidUpdate(){
        this.setFocusUpdater(false);
    }

    setFocusUpdater(usercallback = false){
        let timeout = usercallback ? 100 : 0;

        setTimeout( () => {
            const { getValueFromCallback } = this.state;

            if(this.inputNode){
                const val= this.inputNode.value || this.inputNode.defaultValue;
    
                if('' !== val){
                    this.setState({
                        plainValue: val
                    }, () => {

                        if(usercallback){
                            if(getValueFromCallback){
                                this.callback(val);
                            }
                            else{
                                this.callback();
                            }
                        }

                        this.setFocus();
                    });
                }
            }
        }, timeout);
    }

    /**
     * On state change callback
     */
    async callback(val = null) {
        const { getValueFromCallback } = this.state;
        
        if (this.props.callback&&'function'==typeof this.props.callback) {
            
            if(getValueFromCallback){
                const plainValue = await (this.props.callback)(val);

                if(typeof '8' == typeof plainValue){
                    this.setState({
                        plainValue
                    });
                }

            }
            else{
                const { plainValue }=this.state;

                (this.props.callback)(plainValue);
            }
        }
    }

    /**
     * Enter callback
     */
    callbackEnter() {
        if (this.props.onEnter&&'function'==typeof this.props.onEnter) {
            const { plainValue }=this.state;

            (this.props.onEnter)(plainValue);
        }
    }

    /**
     * On Focus action
     */
    onFocus() {
        const { animatePlaceholder, defaultClassOrigin, defaultClass } = this.state;

        if (animatePlaceholder && -1 == defaultClass.indexOf('focus')) {
            this.setState({
                defaultClass: `${defaultClassOrigin} focus`,
            });
        }
    }

    /**
     * On Blur action
     */
    onBlur() {
        const { animatePlaceholder, defaultClassOrigin, plainValue } = this.state;

        if (animatePlaceholder && '' == plainValue) {
            this.setState({
                defaultClass: defaultClassOrigin,
            });
        }
    }

    /**
     * Set focus
     */
    setFocus(){
        const { defaultClass, animatePlaceholder, defaultClassOrigin, plainValue } = this.state;
    
        if (animatePlaceholder && '' !== plainValue && -1 == defaultClass.indexOf('focus')) {

            this.setState({
                defaultClass: `${defaultClassOrigin} focus`,
            });
        }
    }

    /**
     * Set value on change input field
     */
    setValue(e) {
        const { getValueFromCallback } = this.state;
        let val=e.target.value;

        if(this.state.allowOnlyAZ){
            val = val.replace(/[^a-zA-Z ]/gmi,'');
            val = val.trim();
        }

        if(getValueFromCallback){
            this.callback(val);
            this.setFocus();            
        }
        else{
            this.setState({
                plainValue: val
            }, () => {
                this.callback();
                this.setFocus();
            });
        }
    }

    render() {
        const { addClass, animatePlaceholder, inputPlaceholder, id, defaultClass, inputType, props, plainValue } = this.state;

        return (
            <div className={`${defaultClass} ${addClass}`}>
                {
                    animatePlaceholder &&
                    <div className="font-input title">
                        {
                            inputPlaceholder
                        }
                    </div>
                }
                {
                    'textarea'== inputType &&
                    <textarea
                        className="font-input"
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur }
                        type={ inputType }
                        value={ plainValue }
                        onChange={ (e) => this.setValue(e) }
                        placeholder={animatePlaceholder ? '' : inputPlaceholder}
                        id={id}
                        { ...props }
                    />
                }
                {
                    'textarea' !== inputType &&
                    <input
                        className="font-input"
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur }
                        type={ inputType }
                        value={ plainValue }
                        onChange={ (e) => this.setValue(e) }
                        onKeyPress={ event => {
                            if (event.key==='Enter') {
                                this.callbackEnter();
                            }
                        } }
                        ref={ (node) => this.inputNode = node }
                        placeholder={animatePlaceholder ? '' : inputPlaceholder}
                        id={id}
                        { ...props }
                    />
                }
            </div>
        );
    }
}

export default InputAnimation;