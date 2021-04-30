import React from 'react';
import isString from '../../../../_Functions/isString';
import PropsCheck from '../../../internalFunctions/PropsCheck';

class InsideCenter extends React.Component {
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
            menuDisplay: false,
            menuLeft: '0px',
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

            if (false === this.state.animation) {
                return this.setState({ 
                    displayMenu: false, 
                    menuDisplay: false, 
                    menuLeft: 0,
                });
            }

            this.setState({ 
                displayMenu: false, 
                menuDisplay: false, 
                menuLeft: 0,
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

        if (false === !this.state.displayMenu && this.state.animation) {
            return this.setState({ 
                displayMenu: false, 
                menuDisplay: false, 
                menuLeft: 0,
                dataClass: 'data-active data-inactive'
            }, () => {
                setTimeout( () => {
                    this.setState({ 
                        dataClass: ''
                    });
                }, this.state.animationTimeout);
            });
        }

        if (false === !this.state.displayMenu && false == this.state.animation) {
            return this.setState({ 
                displayMenu: false, 
                menuDisplay: false, 
                menuLeft: 0,
            });
        }

        const calculateLeft = (maxIntervals = 20) => {
            maxIntervals -= 1;

            if (0 <= maxIntervals && this.holderOutside && this.holderMenu) {
                let left = (this.holderOutside.getBoundingClientRect().width / 2) - (this.holderMenu.getBoundingClientRect().width / 2);
                
                return this.setState({
                    menuLeft: `-${left}px`,
                }, () => {
                    this.isproecessing = false;
                    this.setState({ menuDisplay: true });
                });
            }

            if(0 <= maxIntervals){
                return calculateLeft(maxIntervals);
            }
        };

        if (false === this.state.animation) {
            return this.setState({ 
                displayMenu: true,
            }, calculateLeft);
        }

        this.setState({ 
            displayMenu: true,
            dataClass: 'data-active', 
        }, calculateLeft);
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
        const { defaultClass, addClass, id, holderData, displayMenu, overlap, menuDisplay, menuLeft, dataClass } = this.state;

        if (!holderData) {
            return null;
        }

        return (
            <span
                ref={e => this.refNode = e}
                tabIndex="0"
                className={`${defaultClass} center d-inline ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div 
                    className={`${displayMenu ? 'menu-inside-enabled' : 'menu-inside-disabled'}`}
                    {...(menuDisplay) && { 
                        style: {
                            left: menuLeft
                        }
                    }}
                >
                    <div 
                        className={`data-holder data-inside`}
                        ref={e => this.holderOutside = e}
                    >
                        <div className='main'>
                            <span
                                className={`data ${dataClass}`}
                                onClick={() => this.toggleMenu()}
                                ref={e => this.holderMenu = e}
                            >
                                {
                                    holderData
                                }
                            </span>
                            {
                                displayMenu &&
                                <div className={`menu menu-inside menu-inside-active ${overlap ? 'overlap' : ''}`}>
                                    {
                                        this.getMenu()
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default InsideCenter;
