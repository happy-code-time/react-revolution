import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import internalUuid from '../internalFunctions/internalUuid';
import OutsideLeft from './Outside/OutsideLeft';
import OutsideCenter from './Outside/OutsideCenter';
import OutsideRight from './Outside/OutsideRight';
import InsideLeft from './Inside/InsideLeft';
import InsideCenter from './Inside/InsideCenter';
import InsideRight from './Inside/InsideRight';

class PopupData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // App
            displayMenu: false,
            uuid: internalUuid(),
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'PopupData',
            id: isString(props.id) ? props.id : '',
            holderData: props.holderData,
            contentData: props.contentData,
            direction: (props.direction && typeof '8' == typeof props.direction && ['left', 'center', 'right'].includes(props.direction)) ? props.direction : 'left',
            holderInside: (typeof true == typeof props.holderInside) ? true : false, 
            animationTimeout: (typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 300,
            animation: (typeof true == typeof props.animation) ? props.animation : true,
            closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
            closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass',  'id', 'closeOnEsc', 'closeOnOutsideClick', 'animation', 'animationTimeout', 'holderData', 'contentData', 'direction', 'holderInside'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'PopupData',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                holderData: props.holderData,
                contentData: props.contentData,
                direction: (props.direction && typeof '8' == typeof props.direction && ['left', 'center', 'right'].includes(props.direction)) ? props.direction : 'left',
                holderInside: (typeof true == typeof props.holderInside) ? true : false,
                animationTimeout: (typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 300,
                animation: (typeof true == typeof props.animation) ? props.animation : true,
                closeOnEsc: (typeof true == typeof props.closeOnEsc) ? props.closeOnEsc : true,
                closeOnOutsideClick: (typeof true == typeof props.closeOnOutsideClick) ? props.closeOnOutsideClick : true,
            };
        }

        return null;
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

    render() {
        const holderData = this.getHoldersJsx(this.state.holderData);
        const { holderInside, direction } = this.state;

        if (!holderInside) {

            if ('center' == direction) {
                return <OutsideCenter
                    displayMenu={this.state.displayMenu}
                    uuid={this.state.uuid}
                    holderData={holderData}
                    contentData={this.state.contentData}
                    moduleStyle={this.state.moduleStyle}
                    globalStyle={this.state.globalStyle}
                    addClass={this.state.addClass}
                    defaultClass={this.state.defaultClass}
                    id={this.state.id}
                    animationTimeout={this.state.animationTimeout}
                    animation={this.state.animation}
                    closeOnEsc={this.state.closeOnEsc}
                    closeOnOutsideClick={this.state.closeOnOutsideClick}
                />
            }

            if ('right' == direction) {
                return <OutsideRight
                    displayMenu={this.state.displayMenu}
                    uuid={this.state.uuid}
                    holderData={holderData}
                    contentData={this.state.contentData}
                    moduleStyle={this.state.moduleStyle}
                    globalStyle={this.state.globalStyle}
                    addClass={this.state.addClass}
                    defaultClass={this.state.defaultClass}
                    id={this.state.id}
                    animationTimeout={this.state.animationTimeout}
                    animation={this.state.animation}
                    closeOnEsc={this.state.closeOnEsc}
                    closeOnOutsideClick={this.state.closeOnOutsideClick}
                />
            }

            return <OutsideLeft
                displayMenu={this.state.displayMenu}
                uuid={this.state.uuid}
                holderData={holderData}
                contentData={this.state.contentData}
                moduleStyle={this.state.moduleStyle}
                globalStyle={this.state.globalStyle}
                addClass={this.state.addClass}
                defaultClass={this.state.defaultClass}
                id={this.state.id}
                animationTimeout={this.state.animationTimeout}
                animation={this.state.animation}
                closeOnEsc={this.state.closeOnEsc}
                closeOnOutsideClick={this.state.closeOnOutsideClick}
            />
        }

        if (holderInside) {

            if ('center' == direction) {
                return <InsideCenter
                    displayMenu={this.state.displayMenu}
                    uuid={this.state.uuid}
                    holderData={holderData}
                    contentData={this.state.contentData}
                    moduleStyle={this.state.moduleStyle}
                    globalStyle={this.state.globalStyle}
                    addClass={this.state.addClass}
                    defaultClass={this.state.defaultClass}
                    id={this.state.id}
                    animationTimeout={this.state.animationTimeout}
                    animation={this.state.animation}
                    closeOnEsc={this.state.closeOnEsc}
                    closeOnOutsideClick={this.state.closeOnOutsideClick}
                />
            }

            if ('right' == direction) {
                return <InsideRight
                    displayMenu={this.state.displayMenu}
                    uuid={this.state.uuid}
                    holderData={holderData}
                    contentData={this.state.contentData}
                    moduleStyle={this.state.moduleStyle}
                    globalStyle={this.state.globalStyle}
                    addClass={this.state.addClass}
                    defaultClass={this.state.defaultClass}
                    id={this.state.id}
                    animationTimeout={this.state.animationTimeout}
                    animation={this.state.animation}
                    closeOnEsc={this.state.closeOnEsc}
                    closeOnOutsideClick={this.state.closeOnOutsideClick}
                />
            }

            return <InsideLeft
                displayMenu={this.state.displayMenu}
                uuid={this.state.uuid}
                holderData={holderData}
                contentData={this.state.contentData}
                moduleStyle={this.state.moduleStyle}
                globalStyle={this.state.globalStyle}
                addClass={this.state.addClass}
                defaultClass={this.state.defaultClass}
                id={this.state.id}
                animationTimeout={this.state.animationTimeout}
                animation={this.state.animation}
                closeOnEsc={this.state.closeOnEsc}
                closeOnOutsideClick={this.state.closeOnOutsideClick}
            />
        }

        return null;
    }
}

export default PopupData;
