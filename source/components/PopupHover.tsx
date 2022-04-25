import React from 'react';

import isString from '../functions/isString';
import PopupHoverCenter from './PopupHoverCenter';
import _uuid from '../functions/uuid';
import PropsCheck from '../functions/PropsCheck';
import isBoolean from '../functions/isBoolean';
import isNumber from '../functions/isNumber';
import isArray from '../functions/isArray';

class PopupHover extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private refNode: any;

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            // App
            displayMenu: false,
            uuid: `${_uuid()}`,
            dataClass: '',
            dataAnimationClass: '',
            // User
            holderData: props.holderData,
            contentData: props.contentData,
            direction: isString(props.direction) && ['left', 'center', 'right'].includes(props.direction) ? props.direction : 'left',
            animationTimeout: isNumber(props.animationTimeout) ? props.animationTimeout : 200,
            animation: isBoolean(props.animation) ? props.animation : true,
            useMouseEnter: isBoolean(props.useMouseEnter) ? props.useMouseEnter : true,
            isMenuOutside: isBoolean(props.isMenuOutside) ? props.useMouseEnter : false
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['animation', 'animationTimeout', 'holderData', 'contentData', 'direction', 'useMouseEnter'], props, state)) {
            return {
                holderData: props.holderData,
                contentData: props.contentData,
                direction: isString(props.direction) && ['left', 'center', 'right'].includes(props.direction) ? props.direction : 'left',
                animationTimeout: isNumber(props.animationTimeout) ? props.animationTimeout : 200,
                animation: isBoolean(props.animation) ? props.animation : true,
                useMouseEnter: isBoolean(props.useMouseEnter) ? props.useMouseEnter : true,
                isMenuOutside: isBoolean(props.isMenuOutside) ? props.useMouseEnter : false
            };
        }

        return null;
    }

    componentDidMount(): void {

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
            this.toggleMenu(true);
        }
    }

    getDots() {
        return (
            <span className="dots">
                <span className="wrapper">
                    <span className="holder">
                        <span className="box box-1"></span>
                        <span className="box box-2"></span>
                        <span className="box box-3"></span>
                    </span>
                </span>
            </span>
        );
    }

    getSquare() {
        return (
            <span className="square">
                <span className="box-group box-group-1">
                    <div className="box box-1"></div>
                    <div className="box box-2"></div>
                    <div className="box box-3"></div>
                </span>
                <span className="box-group box-group-2">
                    <div className="box box-4"></div>
                    <div className="box box-5"></div>
                    <div className="box box-6"></div>
                </span>
                <span className="box-group box-group-3">
                    <div className="box box-7"></div>
                    <div className="box box-8"></div>
                    <div className="box box-9"></div>
                </span>
            </span>
        );
    }

    getHamburger(direction = '') {
        return (
            <span className={`hamburger ${direction ? direction : ''}`}>
                <p className="box box-1"></p>
                <p className="box box-2"></p>
                <p className="box box-3"></p>
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

    displayMenuOnHover() {
        if(false === this.state.displayMenu){
            if (false == this.state.animation) {
                return this.setState({
                    displayMenu: true
                });
            }
    
            return this.setState({
                displayMenu: true,
                dataClass: 'data-active',
                dataAnimationClass: 'menu-active'
            });   
        }
    }

    gracefullCloseMenu(){
        this.setState(
            {
                dataClass: 'data-active data-inactive',
                dataAnimationClass: 'menu-active menu-inactive'
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        displayMenu: false,
                        dataClass: '',
                        dataAnimationClass: ''
                    });
                }, this.state.animationTimeout);
            }
        );
    }

    toggleMenu(forceClose = false) {
        // Force close
        if (forceClose) {

            if (false === this.state.displayMenu) {
                return;
            }

            if (false == this.state.animation) {
                return this.setState({
                    displayMenu: false,
                    dataClass: '',
                    dataAnimationClass: ''
                });
            }

            return this.gracefullCloseMenu();
        }

        // Display
        if (true === !this.state.displayMenu) {
            if (false == this.state.animation) {
                return this.setState({
                    displayMenu: true
                });
            }

            return this.setState({
                displayMenu: true,
                dataClass: 'data-active',
                dataAnimationClass: 'menu-active'
            });
        }

        // Hide
        if (false == this.state.animation) {
            return this.setState({
                displayMenu: false
            });
        }

        return this.gracefullCloseMenu();
    }

    getMenu() {
        const { contentData, uuid } = this.state;

        if (undefined == contentData) {
            return null;
        }

        if (isArray(contentData) && 0 !== contentData.length) {
            const menu = [];

            try {
                contentData.map((i, x) => {
                    if (i.data) {
                        menu.push(
                            <li 
                                key={`menu-popup-${x}-${uuid}`}
                            >
                                {
                                    i.data
                                }
                            </li>
                        );
                    }
                });
            } catch (e) {}

            return (
                <ul className="border-radius popup-hover-data">
                    {
                        menu
                    }
                </ul>
            );
        }

        return (
            <div className="border-radius popup-hover-data">
                {
                    contentData
                }
            </div>
        );
    }

    render() {
        const { isMenuOutside, direction, displayMenu, dataClass, overlap, dataAnimationClass } = this.state;
        const holderData = this.getHoldersJsx(this.state.holderData);

        if (!holderData) {
            return null;
        }

        if ('center' === direction) {
            return <PopupHoverCenter 
                moduleStyle={this.state.moduleStyle} 
                globalStyle={this.state.globalStyle} 
                addClass={this.state.addClass} 
                defaultClass={this.state.defaultClass} 
                holderData={this.state.holderData} 
                contentData={this.state.contentData} 
                animationTimeout={this.state.animationTimeout} 
                animation={this.state.animation} 
                useMouseEnter={this.state.useMouseEnter} 
                isMenuOutside={this.state.isMenuOutside} 
            />;
        }

        return (
            <div 
                ref={e => (this.refNode = e)} 
                {...('right' === direction && { className: 'PopupHover right' })} 
                {...('left' === direction && { className: 'PopupHover left' })} 
                {...('right' === direction && isMenuOutside && { className: 'PopupHover right menu-outside-active-20px' })} 
                {...('left' === direction && isMenuOutside && { className: 'PopupHover left menu-outside-active-20px' })} 
                {...('right' === direction && true === displayMenu && { className: 'PopupHover opened right' })} 
                {...('left' === direction && true === displayMenu && { className: 'PopupHover opened left' })} 
                {...('right' === direction && true === displayMenu && isMenuOutside && { className: 'PopupHover opened right menu-outside-active-20px' })} 
                {...('left' === direction && true === displayMenu && isMenuOutside && { className: 'PopupHover opened left menu-outside-active-20px' })} 

                {...(!this.state.useMouseEnter && { onMouseLeave: () => this.toggleMenu(true) })} 
            >
                <div className="data-holder data-outside">
                    <span 
                        {...('' === dataClass && { className: 'data' })} 
                        {...('data-active' === dataClass && { className: 'data data-active' })} 
                        {...('data-active data-inactive' === dataClass && { className: 'data data-active data-inactive' })} 
                        onClick={() => this.toggleMenu()} 
                        {...(!this.state.useMouseEnter && { onMouseEnter: () => this.displayMenuOnHover() })} 
                        {...(!this.state.useMouseEnter && { onMouseOver: () => this.displayMenuOnHover() })}
                    >
                        {holderData}
                    </span>
                </div>
                {
                    displayMenu && 
                    (
                        <div 
                            {...('' === dataAnimationClass && !overlap && { className: 'menu menu-outside' })} 
                            {...('' === dataAnimationClass && overlap && { className: 'menu menu-outside overlap' })} 
                            {...('menu-active' === dataAnimationClass && !overlap && { className: 'menu menu-outside menu-outside-active' })} 
                            {...('menu-active' === dataAnimationClass && overlap && { className: 'menu menu-outside menu-outside-active overlap menu-active' })} 
                            {...('menu-active menu-inactive' === dataAnimationClass && !overlap && { className: 'menu menu-outside menu-outside-active menu-active menu-inactive' })}
                            {...('menu-active menu-inactive' === dataAnimationClass && overlap && { className: 'menu menu-outside menu-outside-active overlap menu-active menu-inactive' })}>
                            <div className="wrapper">
                                <div className="ul-wrapper">
                                    {
                                        this.getMenu()
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default PopupHover;
