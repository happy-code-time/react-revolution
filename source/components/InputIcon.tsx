import React from 'react';

import isFunction from '../functions/isFunction';
import isNotEmptyString from '../functions/isNotEmptyString';
import PropsCheck from '../functions/PropsCheck';

interface stateI {
    [key: string]: any;
}

class InputIcon extends React.Component<stateI, stateI> {
    private wrapperRef: any; 
    private placeholderRef: any;
    private inputRef: any;
    private itemsChanges: number;

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            icon: isNotEmptyString(props.icon) ? props.icon : '',
            data: isNotEmptyString(props.data) ? props.data : '',
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props. callbackProps,
            placeholder: isNotEmptyString(props.placeholder) ? props.placeholder: '',
            animation: false,
        };

        this.itemsChanges = 0;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['icon', 'data', 'callback', 'callbackProps', 'placeholder'], props, state)) {
            return {
                icon: isNotEmptyString(props.icon) ? props.icon : '',
                data: isNotEmptyString(props.data) ? props.data : '',
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackProps: props. callbackProps,
                placeholder: isNotEmptyString(props.placeholder) ? props.placeholder: '',
            };
        }

        return null;
    }

    componentDidMount(): void {

        this.checkUiBehavior();
        this.calcHeight();
        this.listener(true);
    }

    componentWillUnmount(): void {
        this.listener(false);
    }

    componentDidUpdate(): void {
        this.checkUiBehavior();
    }

    checkUiBehavior(){
        if('' !== this.state.data){
            this.click();
        }

        if('' == this.state.data && true == this.state.animation && 0 > this.itemsChanges){
            this.blur();
        }
    }

    listener(attach){
        document.documentElement.removeEventListener('click', this.handleClick);

        if(attach){
            document.documentElement.addEventListener('click', this.handleClick);
        }
    }

    handleClick(e) {

        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.blur(true);
        }
    }

    calcHeight(){
        if(this.wrapperRef && this.placeholderRef){
            const wH = this.wrapperRef.getBoundingClientRect().height;
            this.placeholderRef.style.height = `${wH}px`;
        }
    }

    getIconSvg(){
        const { icon } = this.state;
        const size = 24;

        if('user' == icon){
            return icon;
        }
    
        return icon;
    }

    keyUp(e){
        const { callback, callbackProps, data } = this.state;
        const isEnter = e.key === 'Enter' || e.key === 'NumpadEnter';

        if(isEnter && callback){
            (callback)(data, callbackProps, true);
        }
    }

    change(e){
        const { callback, callbackProps } = this.state;
        this.itemsChanges += 1;

        if(callback){
            (callback)(e.target.value, callbackProps);
        }
    }

    click(e: any = null){
        if(e !== null){
            this.inputRef.focus();
        }

        if(this.placeholderRef){
            const wH = this.wrapperRef.getBoundingClientRect().height;
            this.placeholderRef.style.top = `-${(wH*0.5)}px`;
            this.placeholderRef.style.zIndex = 0;
            this.inputRef.style.zIndex = 1;
        }

        if(true == this.state.animation){
            return;
        }

        this.setState({
            animation: true,
        });
    }

    blur(force: boolean = false){
        if((false == this.state.animation || '' !== this.state.data) && false == force){
            return;
        }
        
        if(this.placeholderRef){
            this.placeholderRef.style.top = `0px`;
            this.placeholderRef.style.zIndex = 1;
        }

        if(this.inputRef){
            this.inputRef.style.zIndex = 0;
        }

        this.itemsChanges = 0;

        this.setState({
            animation: false,
        });
    }

    render() {
        const { placeholder, animation, icon } = this.state;

        return (
            <span className='d-inline-block flex w-100'>
                {
                    isNotEmptyString(icon) &&
                    <span className='d-inline-block py-2 px-4'>
                        <span className='d-inline-block m-auto'>
                            {
                                this.getIconSvg()
                            }
                        </span>
                    </span>
                }
                <span 
                    className='flex w-100 p-2 position-relative'
                    ref={ x => this.wrapperRef = x }
                >
                    <input 
                        className='w-100 border-none my-auto font-s position-relative bg-transparent'
                        {...(true === animation) && { className: 'w-100 border-none my-auto font-s position-relative bg-white' }}
                        type="text" 
                        {...('password' === this.state.callbackProps || 'password2' === this.state.callbackProps) && { type: 'password' }}
                        onChange={e => this.change(e)} 
                        onKeyUp={e => this.keyUp(e)} 
                        value={this.state.data}
                        onFocusCapture={ () => this.click() }
                        onBlurCapture={ () => this.blur() }
                        ref={ x => this.inputRef = x }
                    />
                    <div 
                        className='absolute w-100 h-100 p-1 bg-transparent text-muted transition-duration flex'
                        {...(true === animation) && { className: 'absolute h-100 p-1 bg-white text-muted transition-duration flex dodgerblue' }}
                        ref={ x => this.placeholderRef = x }
                        onClick={ (e) => this.click(e) }
                        onTouchStartCapture={ (e) => this.click(e) }
                    >
                        <span 
                            className='d-inline-block my-auto px-2 font-size-inherit color-inherit transition-duration user-select-none'
                            {...(true === animation) && { className: 'd-inline-block my-auto px-2 font-xs color-inherit transition-duration user-select-none' }}
                        >
                            {
                                placeholder
                            }
                        </span>
                    </div>
                </span>
            </span>
        );
    }
}

export default InputIcon;
