import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import internalUuid from '../internalFunctions/internalUuid';

class Center extends React.Component {
    constructor(props) {
        super(props);
        this.calculateLeft = this.calculateLeft.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            // App
            displayMenu: false,
            uuid: internalUuid(),
            dataClass: '',
            dataAnimationClass: '',
            menuDisplay: false,
            menuLeft: '0px',
            // User
            moduleStyle: props.moduleStyle,
            globalStyle: props.globalStyle,
            addClass: props.addClass,
            defaultClass: props.defaultClass,
            id: props.id,
            holderData: props.holderData,
            contentData: props.contentData,
            animationTimeout: props.animationTimeout,
            animation: props.animation,
            useMouseEnter: props.useMouseEnter
        };

        this.isproecessing = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'animation', 'animationTimeout', 'holderData', 'contentData', 'useMouseEnter'], props, state)) {
            return {
                moduleStyle: props.moduleStyle,
                globalStyle: props.globalStyle,
                addClass: props.addClass,
                defaultClass: props.defaultClass,
                id: props.id,
                holderData: props.holderData,
                contentData: props.contentData,
                animationTimeout: props.animationTimeout,
                animation: props.animation,
                useMouseEnter: props.useMouseEnter
            };
        }

        return null;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
    }

    handleClick(e) {
        /**
         * Hide opened hidden sidebar on location change
         */
        if (this.refNode && !this.refNode.contains(e.target) && true === this.state.displayMenu) {
            this.setState({ displayMenu: false });
        }
    }

    getDots() {
        return (
            <span className='dots'>
                <span className='wrapper'>
                    <span className='holder'>
                        <span className='box box-1'></span>
                        <span className='box box-2'></span>
                        <span className='box box-3'></span>
                    </span>
                </span>
            </span>
        );
    }

    getSquare() {
        return (
            <span className='square'>
                <span className='box-group box-group-1'>
                    <div className='box box-1'></div>
                    <div className='box box-2'></div>
                    <div className='box box-3'></div>
                </span>
                <span className='box-group box-group-2'>
                    <div className='box box-4'></div>
                    <div className='box box-5'></div>
                    <div className='box box-6'></div>
                </span>
                <span className='box-group box-group-3'>
                    <div className='box box-7'></div>
                    <div className='box box-8'></div>
                    <div className='box box-9'></div>
                </span>
            </span>
        );
    }

    getHamburger(direction = '') {
        return (
            <span className={`hamburger ${direction ? direction : ''}`}>
                <p className='box box-1'></p>
                <p className='box box-2'></p>
                <p className='box box-3'></p>
            </span>
        );
    }

    getHoldersJsx(usersHolderData) {

        if (typeof '8' !== typeof usersHolderData) {
            return usersHolderData;
        }

        switch (usersHolderData) {
            case 'dots': {
                return this.getDots();
            }
            case 'square': {
                return this.getSquare();
            }
            case 'hamburger': {
                return this.getHamburger();
            }
            case 'hamburger-right': {
                return this.getHamburger('right');
            }
            default: {
                return usersHolderData;
            }
        }
    }

    calculateLeft() {

        if (this.isproecessing || true === this.state.menuDisplay) {
            return;
        }

        this.isproecessing = true;

        const calculateLeft = (maxIntervals = 20) => {
            maxIntervals -= 1;

            if (0 <= maxIntervals && this.toggledMenu && this.holderOutside) {
                let left = (this.holderOutside.getBoundingClientRect().width / 2) - (this.toggledMenu.getBoundingClientRect().width / 2);
                
                return this.setState({
                    menuLeft: `${left}px`,
                }, () => {
                    this.isproecessing = false;
                    this.setState({ menuDisplay: true });
                });
            }

            if (0 <= maxIntervals) {
                return calculateLeft(maxIntervals);
            }
            else {
                this.isproecessing = false;
            }
        };

        calculateLeft();
    }

    displayMenuOnHover() {
        if (false == this.state.animation) {
            return this.setState({
                displayMenu: true,
            }, this.calculateLeft);
        }

        return this.setState({
            displayMenu: true,
            dataClass: 'data-active',
            dataAnimationClass: 'menu-active'
        }, this.calculateLeft);
    }


    toggleMenu(forceClose = false) {

        // Force close
        if (forceClose) {

            if(false === this.state.displayMenu){
                return;
            }

            if (false == this.state.animation) {
                return this.setState({
                    displayMenu: true,
                    menuDisplay: false,
                    menuLeft: 0,
                });
            }

            return this.setState({
                dataClass: 'data-active data-inactive',
                dataAnimationClass: 'menu-active menu-inactive'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        displayMenu: false,
                        dataClass: '',
                        dataAnimationClass: '',
                        menuDisplay: false,
                        menuLeft: 0,
                    });
                }, this.state.animationTimeout);
            });
        }

        // Display
        if (true === !this.state.displayMenu) {

            if (false == this.state.animation) {
                return this.setState({
                    displayMenu: true,
                }, this.calculateLeft);
            }

            return this.setState({
                displayMenu: true,
                dataClass: 'data-active',
                dataAnimationClass: 'menu-active'
            }, this.calculateLeft);
        }

        // Hide
        if (false == this.state.animation) {
            return this.setState({
                displayMenu: false,
                menuDisplay: false,
                menuLeft: 0,
            });
        }

        return this.setState({
            dataClass: 'data-active data-inactive',
            dataAnimationClass: 'menu-active menu-inactive'
        }, () => {
            setTimeout(() => {
                this.setState({
                    displayMenu: false,
                    dataClass: '',
                    dataAnimationClass: '',
                    menuDisplay: false,
                    menuLeft: 0,
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
                <ul className='ctx'>
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
        const { defaultClass, addClass, id, displayMenu, overlap, menuDisplay, menuLeft, dataClass, dataAnimationClass } = this.state;
        const holderData = this.getHoldersJsx(this.state.holderData);

        if (!holderData) {
            return null;
        }

        return (

            <div
                ref={e => this.refNode = e}
                className={`${defaultClass} center ${addClass}`}
                id={id}
                onMouseLeave={() => this.toggleMenu(true)}
            >
                <div
                    className={`data-holder data-outside`}
                    ref={e => this.holderOutside = e}
                >
                    <span
                        className={`data ${dataClass}`}
                        onClick={() => this.toggleMenu()}
                        {...(this.state.useMouseEnter) && { onMouseEnter : () => this.displayMenuOnHover()} }
                        {...(!this.state.useMouseEnter) && { onMouseOver : () => this.displayMenuOnHover()} }
                    >
                        {
                            holderData
                        }
                    </span>
                </div>
                {
                    displayMenu &&
                    <div
                        className={`menu menu-outside menu-outside-active ${overlap ? 'overlap' : ''} ${dataAnimationClass}`}
                    >
                        <div className='wrapper'>
                            <div
                                className='ul-wrapper'
                                ref={e => this.toggledMenu = e}
                                style={
                                    {
                                        left: menuLeft,
                                        opacity: menuDisplay ? '' : '0',
                                        zIndex: menuDisplay ? '' : '-1'
                                    }
                                }
                            >
                                {
                                    this.getMenu()
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Center;
