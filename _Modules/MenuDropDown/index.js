import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class MenuDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.EscListener = this.EscListener.bind(this);
        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.removeHandleClick = this.removeHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);

        this.state = {
            // App
            loading: false,
            display: false,
            data: '',
            cancleAsync: false,
            menuClicked: false,
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'MenuDropDown',
            id: isString(props.id) ? props.id : '',
            placeholder: props.placeholder ? props.placeholder : '',
            holderLoading: props.holderLoading ? props.holderLoading : '',
            callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
            closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
        };

        this.pending = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id',  'closeOnOutsideClick', 'closeOnEsc', 'callback', 'callbackProps', 'holderLoading', 'placeholder'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'MenuDropDown',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                placeholder: props.placeholder ? props.placeholder : '',
                holderLoading: props.holderLoading ? props.holderLoading : '',
                callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
                closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
            };
        }

        return null;
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        this.addEscEventListener();
        this.attachHandleClick();
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
        this.removeHandleClick();
        document.addEventListener('click', this.handleClick);
    }

    removeHandleClick() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {

        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && true === this.state.closeOnOutsideClick) {
            this.hideContext();
        }
    }

    EscListener(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.hideContext();
        }
    }

    hideContext() {
        if (false == !this.state.display || this.state.loading) {
            return this.setState({
                display: false,
                data: '',
                loading: false,
                cancleAsync: true
            });
        }
    }

    toggle() {

        // If is toggled, then close
        if (false == !this.state.display || this.state.loading) {
            return this.setState({
                display: false,
                data: '',
                loading: false,
                cancleAsync: true
            });
        }

        const { callback, callbackProps } = this.state;

        if (callback) {

            try {
                this.setState({
                    loading: true,
                    display: false,
                    cancleAsync: false
                }, async () => {

                    if (!this.pending) {
                        this.pending = true;
                        const data = await (callback)(callbackProps).then(r => r).catch(e => false);

                        if (false == data || this.state.cancleAsync) {
                            return this.setState({
                                loading: false
                            }, () => {
                                this.pending = false;
                            });
                        }

                        this.setState({
                            loading: false,
                            display: true,
                            data,
                            cancleAsync: false
                        }, () => {
                            this.pending = false;
                        });
                    }
                });
            }
            catch (e) {
                this.setState({
                    loading: false,
                    display: true,
                    cancleAsync: false
                }, () => {
                    this.pending = false;
                });
            }
        }
    }

    render() {
        const { defaultClass, addClass, id, placeholder, data, loading, display, holderLoading } = this.state;

        return (
            <span
                ref={this.setWrapperRef}
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div
                    className='placeholder'
                >
                    {
                        placeholder &&

                        <div className='text' onClick={() => this.toggle()}>
                            {
                                placeholder
                            }
                        </div>
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
                        display &&
                        <div className='data'>
                            {
                                data
                            }
                        </div>
                    }
                </div>
            </span>
        );
    }
}

export default MenuDropDown;
