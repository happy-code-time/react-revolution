import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';

class ScrollTo extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-scroll-to',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : internalUuid(),
            navigationTime: (props.navigationTime && typeof 8 == typeof props.navigationTime) ? props.navigationTime : 300,
            navigationTarget: (props.navigationTarget && typeof '8' == typeof props.navigationTarget) ? props.navigationTarget : '',
            html: props.html ? props.html : undefined,
            callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined
        };
    }

    navigateWindowToElement(event, masterId) {
        const { navigationTarget, navigationTime, callback } = this.state;
        const self = this;

        if (callback) {
            (callback)(event);
        }

        if ('#' == navigationTarget.charAt(0)) {
            const str = navigationTarget.replace('#', '');

            if(document.getElementById(str)){
                const domElement = document.getElementById(str);
                return self.scrollToElement(event, navigationTime, domElement, masterId);    
            }
        }

        if ('.' == navigationTarget.charAt(0) && document.querySelector(navigationTarget)) {
            const domElement = document.querySelector(navigationTarget);
            return self.scrollToElement(event, navigationTime, domElement, masterId);
        }

        if ('#' != navigationTarget.charAt(0) && '.' != navigationTarget.charAt(0)) {
            switch (navigationTarget) {
                case 'top': {
                    self.navigationTargetTopOfWebpage(navigationTime);
                    break;
                }
                case 'bottom': {
                    self.navigationTargetBottomOfWebpage(navigationTime);
                    break;
                }
                default: {
                    self.navigationTargetTopOfWebpage(navigationTime);
                    break;
                }
            }
        }
    }

    navigationTargetTopOfWebpage(navigationTime) {
        navigationTime = navigationTime/10;
        let userOnXPosition = document.documentElement.scrollTop;

        if(0 == userOnXPosition){
            return null;
        }

        let pxToAdd = (userOnXPosition / navigationTime)*4;
        let xTop = setInterval( () => {
            userOnXPosition -= (pxToAdd);
            document.documentElement.scrollTop = userOnXPosition;

            if(-10 >= userOnXPosition){
                clearInterval(xTop);
            }
        }, 1 );
    }

    navigationTargetBottomOfWebpage(time) {
        let userOnXPosition = document.documentElement.scrollTop;
        let elementsOffsetTop = document.documentElement.scrollHeight;
        elementsOffsetTop = parseInt(elementsOffsetTop) - 50;

        const haveToScrollXpixels = elementsOffsetTop - userOnXPosition;

        let timer = parseInt(time, 10);
        let pxToAdd = (haveToScrollXpixels / timer) * 4;

        userOnXPosition = Math.abs(userOnXPosition);
        userOnXPosition = parseInt(userOnXPosition);

        let xavier = userOnXPosition;
        let xBottom = setInterval(() => {
            xavier += pxToAdd;
            document.documentElement.scrollTop = xavier;
            
            if (xavier >= haveToScrollXpixels) {
                clearInterval(xBottom);
            }
        }, 1);
    }

    scrollToElement(event, time, domElement, masterId) {
        const target = document.getElementById(masterId);

        if (null !== domElement) {
            let currentXPosition = event.target.getBoundingClientRect().top;
            let targetsXPosition = domElement.getBoundingClientRect().top;
            let navigationCalculation = currentXPosition;

            // navigate to bottom, becouse found +
            if (0 < (targetsXPosition - currentXPosition)) {
                targetsXPosition += document.documentElement.scrollTop;
                let targetToScroll = (targetsXPosition - currentXPosition);
                let pixelToAdd = (targetToScroll / time) * 4;

                let scroller = setInterval(() => {
                    navigationCalculation += (pixelToAdd);
                    document.documentElement.scrollTop = navigationCalculation;

                    if (navigationCalculation >= targetsXPosition - 50) { 
                        clearInterval(scroller) 
                    }

                }, (time / 100));
                return;
            }

            // navigate to top, becouse found -
            if (0 > (targetsXPosition - currentXPosition) && null !== target) {
                const currentTop = document.documentElement.scrollTop;
                let pxToSlideUp = (currentTop - Math.abs(targetsXPosition));
                let adder = 0;
                let pixelToAdd = (currentTop / time);
                let scroller = setInterval(() => {
                    adder += pixelToAdd;
                    document.documentElement.scrollTop -= adder;

                    if (document.documentElement.scrollTop <= pxToSlideUp) { 
                        clearInterval(scroller) 
                    }

                }, (time / 100));
                return;
            }
        }
    }

    render() {
        const { addClass, html, defaultClass, id, navigationTarget } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                id={id}
                onClick={(e) => this.navigateWindowToElement(e, id)}
            >
                {
                    !html && 'top' === navigationTarget &&
                    <div
                        className='to-top'
                    >
                        <div className='arrow'>
                            &#8593;
                        </div>
                    </div>
                }
                {
                    !html && 'bottom' === navigationTarget &&
                    <div
                        className='to-bottom'
                    >
                        <div className='arrow'>
                            &#8595;
                        </div>
                    </div>
                }
                {
                    html && html
                }
            </div>
        )
    }
}
export default ScrollTo;
