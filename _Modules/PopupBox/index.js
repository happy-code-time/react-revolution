import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';


class PopupBox extends React.Component 
{

    constructor(props) {
        super(props);
        this.fadePopupBoxOut = this.fadePopupBoxOut.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.togglePopupBox = this.togglePopupBox.bind(this);
        this.checkLocation = this.checkLocation.bind(this);

        const defaultAnimationTypes = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

        this.state = {
            /**
             * App
             */
            displayBox: false,
            displayBoxClassNames: 'box',
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'PopupBox',
            id: isString(props.id) ? props.id : '',
            data: props.data ? props.data : '',
            icon: props.icon ? props.icon : '',
            iconCallback: (props.iconCallback && typeof function(){} == typeof props.iconCallback) ? props.iconCallback : undefined,
            animationTime: (props.animationTime && typeof 8 == typeof props.animationTime) ? props.animationTime : 300,
            animation: (props.animation && typeof '8' == typeof props.animation && defaultAnimationTypes.includes(props.animation)) ? props.animation : 'top-left',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        const defaultAnimationTypes = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

        if (PropsCheck([ 'id', 'data', 'icon', 'iconCallback', 'animationTime', 'animation'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: props.data ? props.data : '',
                icon: props.icon ? props.icon : '',
                iconCallback: (props.iconCallback && typeof function(){} == typeof props.iconCallback) ? props.iconCallback : undefined,
                animationTime: (props.animationTime && typeof 8 == typeof props.animationTime) ? props.animationTime : 300,
                animation: (props.animation && typeof '8' == typeof props.animation && defaultAnimationTypes.includes(props.animation)) ? props.animation : 'top-left',
            };
        }

        return null;
    }

    componentDidMount() {
        this.oldHref = window.location.href;
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        clearInterval(this.odHrefInterval);
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Hide data div
     * while user not inside it
     * @param {React.MouseEvent|any} e
     */
    handleMouseDown(e) {
        if (this.nodeData && !this.nodeData.contains(e.target)) {
            this.fadePopupBoxOut();
        }

        this.checkLocation();
    }

    checkLocation() {
        clearInterval(this.odHrefInterval);
        let count = 10;
        this.odHrefInterval = setInterval(() => {

            if (this.oldHref !== window.location.href || 0 > count) {
                this.oldHref = window.location.href;
                clearInterval(this.odHrefInterval);

                this.setState({
                    displayBox: false,
                    displayBoxClassNames: 'box',
                });
            }
        }, 50);
    }

    togglePopupBox() {
        const { iconCallback } = this.state;

        if(iconCallback){
            (iconCallback)();
        }

        if (this.state.displayBox) {
            return this.fadePopupBoxOut();
        }

        this.setState({
            displayBox: true,
            displayBoxClassNames: 'box'
        });
    }

    fadePopupBoxOut() {
        const { displayBoxClassNames, animationTime } = this.state;

        this.setState(
            {
                displayBoxClassNames: `${displayBoxClassNames} fade-out`,
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        displayBox: false,
                        displayBoxClassNames: 'box',
                    });
                }, animationTime);
            }
        );
    }

    render() {
        const { addClass, defaultClass, id, displayBoxClassNames, animation, icon, displayBox, data } = this.state;

        return (
            <span ref={node => (this.nodeData = node)} {...isString(id) && '' !== id && { id: id } } className={`${defaultClass} ${addClass}`}>
                <span className="icon" onClick={e => this.togglePopupBox()}>
                    {
                        icon
                    }
                </span>
                {
                    displayBox && 
                    <div className={`${displayBoxClassNames} ${animation}`}>
                        {
                            data
                        }
                    </div>
                }
            </span>
        );
    }
}

export default PopupBox;
