import React from 'react';
import PropsCheck from '../../../internalFunctions/PropsCheck';

class InsideRight extends React.Component {
    constructor(props) {
        super(props);
        this.EscListener = this.EscListener.bind(this);
        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.removeHandleClick = this.removeHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            displayMenu: false,
            uuid: props.uuid,
            holderData: props.holderData,
            contentData: props.contentData,
            moduleStyle: props.moduleStyle,
            globalStyle: props.globalStyle,
            addClass: props.addClass,
            defaultClass: props.defaultClass,
            id: props.id,
            holderData: props.holderData,
            contentData: props.contentData,
            animationTimeout: props.animationTimeout,
            dataClass: '',
            animation: props.animation,
            closeOnEsc: props.closeOnEsc,
            closeOnOutsideClick: props.closeOnOutsideClick
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['closeOnEsc', 'closeOnOutsideClick', 'uuid', 'animation', 'animationTimeout', 'holderData', 'contentData', 'addClass', 'defaultClass', 'id', 'holderData', 'contentData'], props, state)) {
            return {
                uuid: props.uuid,
                holderData: props.holderData,
                contentData: props.contentData,
                addClass: props.addClass,
                defaultClass: props.defaultClass,
                id: props.id,
                holderData: props.holderData,
                contentData: props.contentData,
                animationTimeout: props.animationTimeout,
                animation: props.animation,
                closeOnEsc: props.closeOnEsc,
                closeOnOutsideClick: props.closeOnOutsideClick
            };
        }

        return null;
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
        if(this.state.closeOnOutsideClick){
            this.removeHandleClick();
            document.addEventListener('click', this.handleClick);
        }
    }

    removeHandleClick() {
        if(this.state.closeOnOutsideClick){
            document.removeEventListener('click', this.handleClick);
        }
    }

    handleClick(event) {
        if (this.refNode && this.refNode && !this.refNode.contains(event.target) && true == this.state.displayMenu && true === this.state.closeOnOutsideClick) {
            this.hideMenu();
        }
    }

    EscListener(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.hideMenu();
        }
    }

    cancel() {
        const { callback, callbackProps } = this.state;

        if (callback) {
            (callback)(callbackProps);
        }
    }

    hideMenu() {

        if(this.state.displayMenu){

            if(false == this.state.animation){
                return this.setState({ 
                    displayMenu: false
                });
            }

            this.setState({ 
                displayMenu: false,
                dataClass: 'data-active data-inactive'
            }, () => {
                setTimeout( () => {
                    this.setState({ 
                        dataClass: ''
                    });
                }, this.state.animationTimeout);
            });
        }
    }

    toggleMenu() {

        if(true === !this.state.displayMenu){

            if(false == this.state.animation){
                return this.setState({ 
                    displayMenu: !this.state.displayMenu,
                });
            }

            return this.setState({ 
                displayMenu: !this.state.displayMenu,
                dataClass: 'data-active'
            });
        }

        if(false == this.state.animation){
            return this.setState({ 
                displayMenu: !this.state.displayMenu,
            });
        }

        return this.setState({ 
            displayMenu: !this.state.displayMenu,
            dataClass: 'data-active data-inactive'
        }, () => {
            setTimeout( () => {
                this.setState({ 
                    dataClass: ''
                });
            }, this.state.animationTimeout);
        });
    }

    getMenu() {
        const { contentData, uuid } = this.state;

        if (undefined == contentData) {
            return null;
        }

        if (typeof [] == typeof contentData && contentData.length) {
            const menu = [];

            try {
                contentData.map((i, x) => {
                    menu.push(
                        <li key={`menu-popup-${x}-${uuid}`}>
                            {
                                i.data && i.data
                            }
                        </li>
                    );
                });
            }
            catch (e) { }

            return (
                <ul>
                    {
                        menu
                    }
                </ul>
            );
        }

        return (
            <div className='ctx'>
                {
                    contentData
                }
            </div>
        );
    }

    render() {
        const { defaultClass, addClass, id, holderData, displayMenu, overlap, dataClass } = this.state;

        if (!holderData) {
            return null;
        }

        return (
            <span
                ref={e => this.refNode = e}
                tabIndex="0"
                className={`${defaultClass} right ${addClass}`}
                id={id}
            >
                <span
                    className='data-holder data-inside'
                    ref={e => this.holderInside = e}
                    {...(displayMenu) && { style: { opacity: '0', zIndex: '-1' } }}
                >
                    <span
                        className={`data-holder data-inside`}
                    >
                        <span 
                            className={`data ${dataClass}`}
                            onClick={() => this.toggleMenu()}
                        >
                            {
                                holderData
                            }
                        </span>
                    </span>
                </span>
                {
                    displayMenu &&
                    <div className={`menu menu-inside menu-inside-active ${overlap ? 'overlap' : ''}`}>
                        <span
                            className='data-holder data-inside'
                        >
                            <span 
                                className={`data ${dataClass}`}
                                onClick={() => this.toggleMenu()}
                            >
                                {
                                    holderData
                                }
                            </span>
                        </span>
                        {
                            this.getMenu()
                        }
                    </div>
                }
            </span>
        );
    }
}

export default InsideRight;
