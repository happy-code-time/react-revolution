import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import SliderFullscreenMode from './SliderFullscreenMode';
import uuid from '../functions/uuid';

class Slider extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private slideWidth: number;
    private touchstartx: number;
    private movex: number;
    private mousestartx: number;
    private blockMove: boolean;
    private mouseClicksStart: number;
    private userMoving: boolean;
    private oldX: number;
    private mouseDirection: string;
    private abs: number;
    private moveTimeoutReset: any;
    private wasMove: boolean;
    private isClickOnActionButton: boolean;
    private timeouter: any;
    private wrapper: any;
    private transformer: any;

    constructor(props) {
        super(props);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.processMouseDown = this.processMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.resizeView = this.resizeView.bind(this);
        this.mouseDownListeners = this.mouseDownListeners.bind(this);
        this.mouseMoveListeners = this.mouseMoveListeners.bind(this);
        this.autoplay = this.autoplay.bind(this);
        this.parent_closeFullscreenSlider = this.parent_closeFullscreenSlider.bind(this);
        this.parent_setSlide = this.parent_setSlide.bind(this);

        this.state = {
            // App
            // images root holder
            slidesTransform: `translate3d(-0px,0,0)`,
            slidesWidth: 100,
            // each single image holder
            slideWrapperWidth: '100%',
            // current slide index
            index: 0,
            fullscreenactive: false,
            isUserCurrentlySliding: false,
            // User
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Slider',
            
            data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
            slidersUuid: uuid(),
            displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
            slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
            displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
            displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
            buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
            next: props.next ? props.next : '>',
            previous: props.previous ? props.previous : '<',
            callbackMount: props.callbackMount && typeof function () { } == typeof props.callbackMount ? props.callbackMount : undefined,
            callbackMountProps: props.callbackMountProps,
            imageAsBackground: typeof true == typeof props.imageAsBackground ? props.imageAsBackground : false,
            dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside2 : true,
            paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
            paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
            autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
            autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
            autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
            animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
            allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
            wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
            inlineStyle: typeof true == typeof props.inlineStyle ? props.inlineStyle : false,
            useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
            autoplayStopOnLast: typeof true == typeof props.autoplayStopOnLast ? props.autoplayStopOnLast : true,
            staticData: props.staticData ? props.staticData : '',
            onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
            callbackFsActive: props.callbackFsActive && typeof function () { } == typeof props.callbackFsActive ? props.callbackFsActive : undefined,
            callbackFsActiveProps: props.callbackFsActiveProps,
            callbackFsInactive: props.callbackFsInactive && typeof function () { } == typeof props.callbackFsInactive ? props.callbackFsInactive : undefined,
            callbackFsInactiveProps: props.callbackFsInactiveProps,
            // slider fullscreen
            fsDisplayPreview: typeof true == typeof props.fsDisplayPreview ? props.fsDisplayPreview : true,
            fsWrapDirection: typeof true == typeof props.fsWrapDirection ? props.fsWrapDirection : true,
            fsDisplayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
            fsSlideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
            fsPreviewWidth: props.fsPreviewWidth && typeof 8 == typeof props.fsPreviewWidth ? props.fsPreviewWidth : 80,
            fsPreviewHeight: props.fsPreviewHeight && typeof 8 == typeof props.fsPreviewHeight ? props.fsPreviewHeight : 70,
            fsPreviewMarginX: props.fsPreviewMarginX && typeof 8 == typeof props.fsPreviewMarginX ? props.fsPreviewMarginX : 10,
            fsPreviewMarginY: props.fsPreviewMarginY && typeof 8 == typeof props.fsPreviewMarginY ? props.fsPreviewMarginY : 10,
            fsAutoplayIcon: props.fsAutoplayIcon ? props.fsAutoplayIcon : '🎥',
            fsPreviewToggle: props.fsPreviewToggle ? props.fsPreviewToggle : '⇩',
            fsToggleDirection: (props.fsToggleDirection && typeof '8' == typeof props.fsToggleDirection && ['left', 'right'].includes(props.fsToggleDirection)) ? props.fsToggleDirection : 'right',
            fsNext: props.fsNext ? props.fsNext : '>>',
            fsPrevious: props.fsPrevious ? props.fsPrevious : '<<',
            fsImageAsBackground: typeof true == typeof props.fsImageAsBackground ? props.fsImageAsBackground : false,
            fsCloseIcon: props.fsCloseIcon ? props.fsCloseIcon : 'x',
            fsUseLayerX: typeof true == typeof props.fsUseLayerX ? props.fsUseLayerX : true,
            fsAutoplayTime: props.fsAutoplayTime && typeof 8 == typeof props.fsAutoplayTime && 0 < props.fsAutoplayTime ? props.fsAutoplayTime : 5000,
            fsAutoplayNext: typeof true == typeof props.fsAutoplayNext ? props.fsAutoplayNext : true,
            fsAnimationTime: (props.fsAnimationTime && typeof '8' == typeof props.fsAnimationTime) ? props.fsAnimationTime : '06',
            fsAutoplayStopIcon: props.fsAutoplayStopIcon ? props.fsAutoplayStopIcon : '🛑',
            fsDisplayDots: typeof true == typeof props.fsDisplayDots ? props.fsDisplayDots : true,
            fsDisplayDotsIndex: typeof true == typeof props.fsDisplayDotsIndex ? props.fsDisplayDotsIndex : true,
            fsAutoplayStopOnLast: typeof true == typeof props.fsAutoplayStopOnLast ? props.fsAutoplayStopOnLast : true,
            fsCloseOnEsc: typeof true == typeof props.fsCloseOnEsc ? props.fsCloseOnEsc : true,
            fsActive: typeof true == typeof props.fsActive ? props.fsActive : false,
            fsOnSlideTime: (props.fsOnSlideTime && typeof '8' == typeof props.fsOnSlideTime) ? props.fsOnSlideTime : '0',
            callbackFsState: typeof true == typeof props.callbackFsState ? props.callbackFsState : true,
        };

        this.slideWidth = 0;
        this.touchstartx = 0;
        this.movex = 0;
        this.mousestartx = 0;

        this.blockMove = false;
        this.mouseClicksStart = 0;
        this.userMoving = false;

        this.oldX = 0;
        this.mouseDirection = 'r';
        this.abs = 0;

        // Fullscreen slider
        this.moveTimeoutReset = undefined;
        this.wasMove = false;
        this.isClickOnActionButton = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([
            'onSlideTime',
            'fsOnSlideTime',
            'index',
            'addClass', 
            'defaultClass',
            'useLayerX',
            'inlineStyle',
            'allowMouseTouch',
            'slideAfterMove',
            'wrapDirection',
            'dotsInside',
            'autoplay',
            'autoplayTime',
            'autoplayNext',
            'animationTime',
            'paginationInside',
            'paginationType',
            'id',
            'data',
            'next',
            'previous',
            'displayPagination',
            'displayDots',
            'displayDotsIndex',
            'buttonsAlwaysVisible',
            'callbackMount',
            'callbackMountProps',
            'imageAsBackground',
            'fsDisplayPreview',
            'fsWrapDirection',
            'fsDisplayPagination',
            'fsSlideAfterMove',
            'fsPreviewWidth',
            'fsPreviewHeight',
            'fsPreviewMarginX',
            'fsPreviewMarginY',
            'fsAutoplayIcon',
            'fsPreviewToggle',
            'fsToggleDirection',
            'fsNext',
            'fsPrevious',
            'fsImageAsBackground',
            'fsCloseIcon',
            'fsUseLayerX',
            'fsAutoplayTime',
            'fsAutoplayNext',
            'fsAnimationTime',
            'fsAutoplayStopIcon',
            'fsDisplayDots',
            'fsAutoplayStopOnLast',
            'fsDisplayDotsIndex',
            'fsCloseOnEsc',
            'fsActive',
            'staticData',
            'callbackFsActive',
            'callbackFsActiveProps',
            'callbackFsInactive',
            'callbackFsInactiveProps',
            'callbackFsState'
        ], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Slider',
                index: state.index, // to handle indexes made by child fullscreen events
                
                
                data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
                next: props.next ? props.next : '>',
                previous: props.previous ? props.previous : '<',
                slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
                displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
                displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
                displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
                buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
                callbackMount: props.callbackMount && typeof function () { } == typeof props.callbackMount ? props.callbackMount : undefined,
                callbackMountProps: props.callbackMountProps,
                imageAsBackground: typeof true == typeof props.imageAsBackground ? props.imageAsBackground : false,
                dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside2 : true,
                paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
                paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
                autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
                autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
                autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
                animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
                allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
                wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
                inlineStyle: typeof true == typeof props.inlineStyle ? props.inlineStyle : false,
                useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
                staticData: props.staticData ? props.staticData : '',
                onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
                // fullscreen slider
                fsDisplayPreview: typeof true == typeof props.fsDisplayPreview ? props.fsDisplayPreview : true,
                fsWrapDirection: typeof true == typeof props.fsWrapDirection ? props.fsWrapDirection : true,
                fsDisplayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
                fsSlideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
                fsPreviewWidth: props.fsPreviewWidth && typeof 8 == typeof props.fsPreviewWidth ? props.fsPreviewWidth : 80,
                fsPreviewHeight: props.fsPreviewHeight && typeof 8 == typeof props.fsPreviewHeight ? props.fsPreviewHeight : 70,
                fsPreviewMarginX: props.fsPreviewMarginX && typeof 8 == typeof props.fsPreviewMarginX ? props.fsPreviewMarginX : 10,
                fsPreviewMarginY: props.fsPreviewMarginY && typeof 8 == typeof props.fsPreviewMarginY ? props.fsPreviewMarginY : 10,
                fsAutoplayIcon: props.fsAutoplayIcon ? props.fsAutoplayIcon : '🎥',
                fsPreviewToggle: props.fsPreviewToggle ? props.fsPreviewToggle : '⇩',
                fsToggleDirection: (props.fsToggleDirection && typeof '8' == typeof props.fsToggleDirection && ['left', 'right'].includes(props.fsToggleDirection)) ? props.fsToggleDirection : 'right',
                fsNext: props.fsNext ? props.fsNext : '>>',
                fsPrevious: props.fsPrevious ? props.fsPrevious : '<<',
                fsImageAsBackground: typeof true == typeof props.fsImageAsBackground ? props.fsImageAsBackground : false,
                fsCloseIcon: props.fsCloseIcon ? props.fsCloseIcon : 'x',
                fsUseLayerX: typeof true == typeof props.fsUseLayerX ? props.fsUseLayerX : false,
                fsAutoplayTime: props.fsAutoplayTime && typeof 8 == typeof props.fsAutoplayTime && 0 < props.fsAutoplayTime ? props.fsAutoplayTime : 5000,
                fsAutoplayNext: typeof true == typeof props.fsAutoplayNext ? props.fsAutoplayNext : true,
                fsAnimationTime: (props.fsAnimationTime && typeof '8' == typeof props.fsAnimationTime) ? props.fsAnimationTime : '03',
                fsAutoplayStopIcon: props.fsAutoplayStopIcon ? props.fsAutoplayStopIcon : '🛑',
                fsDisplayDots: typeof true == typeof props.fsDisplayDots ? props.fsDisplayDots : true,
                fsAutoplayStopOnLast: typeof true == typeof props.fsAutoplayStopOnLast ? props.fsAutoplayStopOnLast : true,
                fsDisplayDotsIndex: typeof true == typeof props.fsDisplayDotsIndex ? props.fsDisplayDotsIndex : true,
                fsCloseOnEsc: typeof true == typeof props.fsCloseOnEsc ? props.fsCloseOnEsc : true,
                fsActive: typeof true == typeof props.fsActive ? props.fsActive : false,
                fsOnSlideTime: (props.fsOnSlideTime && typeof '8' == typeof props.fsOnSlideTime) ? props.fsOnSlideTime : '0',
                callbackFsActive: props.callbackFsActive && typeof function () { } == typeof props.callbackFsActive ? props.callbackFsActive : undefined,
                callbackFsActiveProps: props.callbackFsActiveProps,
                callbackFsInactive: props.callbackFsInactive && typeof function () { } == typeof props.callbackFsInactive ? props.callbackFsInactive : undefined,
                callbackFsInactiveProps: props.callbackFsInactiveProps,
                callbackFsState: typeof true == typeof props.callbackFsState ? props.callbackFsState : true,
            };
        }

        return null;
    }

    componentDidMount(): void {


        if (!this.state.data.length) {
            return;
        }

        this.slideWidth = this.getSlidersWidth();
        this.setSlidesWidth();
        this.setResizeListener();
        this.callbackMount();
        this.mouseDownListeners();
        this.autoplay();
    }

    autoplay(reattach = true) {
        const { autoplay } = this.state;
        clearTimeout(this.timeouter);

        if (autoplay && reattach) {
            const { autoplayTime, autoplayNext } = this.state;

            this.timeouter = setTimeout(() => {

                if (autoplayNext && this.state.index === this.state.data.length - 1 && this.state.autoplayStopOnLast) {
                    return clearTimeout(this.timeouter);
                }

                if (!autoplayNext && 0 === this.state.index && this.state.autoplayStopOnLast) {
                    return clearTimeout(this.timeouter);
                }

                autoplayNext ? this.slideNext() : this.slidePrevious();
                this.autoplay();
            }, autoplayTime);
        }
    }

    async callbackMount() {
        const { callbackMount, callbackMountProps } = this.state;

        if (callbackMount) {
            let index = await (callbackMount)(callbackMountProps).then(r => r).catch(e => null);

            if (typeof 8 === typeof index) {
                /**
                 * User passed negative index value
                 */
                if (0 > index) {
                    index = 0;
                }
                /**
                 * User passed index value heigher then the assed images array length
                 */
                if (index > this.state.data.length - 1) {
                    index = this.state.data.length - 1;
                }

                this.setState({
                    index
                }, this.slide);
            }
        }
    }

    componentWillUnmount() {
        this.setResizeListener(false);
        this.mouseDownListeners(false);
        this.mouseMoveListeners(false);
        clearTimeout(this.timeouter);
    }

    setResizeListener(attach = true) {
        window.removeEventListener('resize', this.resizeView);

        if (attach) {
            window.addEventListener('resize', this.resizeView);
        }
    }

    resizeView(e, doubleResize = true) {
        this.slideWidth = this.getSlidersWidth();
        this.setSlidesWidth();
        this.slide();

        if (doubleResize) {
            setTimeout(() => {
                this.resizeView(null, false);
            }, 300);
        }
    }

    setSlidesWidth() {
        this.setState({
            slidesWidth: this.getSlidersWidth() * this.state.data.length,
            slideWrapperWidth: (this.getSlidersWidth() * this.state.data.length) / this.state.data.length,
        });
    }

    getSlidersWidth() {

        if (this.wrapper) {
            return this.wrapper.getBoundingClientRect().width;
        }

        return 0;
    }

    /**
     * ##############################
     * Pager
     * ##############################
     */
    slide(i = null) {
        let { data, index, inlineStyle } = this.state;

        if (null !== i) {
            index = i;
        }

        if (data && data[index] && data[index].callback && typeof function () { } == typeof data[index].callback) {
            (data[index].callback)(index, data[index].callbackProps);
        }

        this.movex = index * this.state.slideWrapperWidth;


        if (this.transformer) {
            // Inline style = avoid flipping while fast mouse moving
            if (inlineStyle) {
                this.transformer.style.transform = `translate3d(-${this.movex}px,0,0)`;
                return this.setState({ 
                    index 
                }, () => {
                    this.isClickOnActionButton = false;
                });
            }
            else {
                return this.setState({
                    index,
                    slidesTransform: `translate3d(-${this.movex}px,0,0)`,
                }, () => {
                    this.isClickOnActionButton = false;
                });
            }
        }
        else {
            this.setState({
                index,
                slidesTransform: `translate3d(-${this.movex}px,0,0)`,
            }, () => {
                this.isClickOnActionButton = false;
            });
        }
    }

    slidePrevious() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        let { index } = this.state;

        if (index === 0) {

            if (this.state.wrapDirection) {
                // Change to the last in index
                index = this.state.data.length;
            }
            else {
                // hold current position
                index = 1;
            }
        }

        index -= 1;
        this.setState({
            index
        }, () => {
            this.autoplay();
            this.slide();
        });
    }

    slideNext() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        let { index } = this.state;

        if (index === this.state.data.length - 1) {
            if (this.state.wrapDirection) {
                // Change to the last in index
                index = -1;
            }
            else {
                // hold current position
                index = this.state.data.length - 2;
            }
        }

        index += 1;
        this.setState({
            index
        }, () => {
            this.autoplay();
            this.slide();
        });
    }

    setSlide(index) {
        this.isClickOnActionButton = true;
        this.autoplay(false);

        if (typeof '8' == typeof index) {
            index = parseInt(index);
        }

        this.autoplay();
        this.setState({
            index
        }, () => {
            this.autoplay();
            this.slide();
        });
    }

    /**
     * ##############################
     * Mouse
     * ##############################
     */
    setDirection(pageX = 0) {
        if (this.oldX < pageX) {
            this.mouseDirection = 'l';
        }
        else {
            this.mouseDirection = 'r';
        }
        this.oldX = pageX;
    }

    getDirection() {
        return this.mouseDirection;
    }

    setAbs(abs) {
        this.abs = abs;
    }

    getAbs() {
        return this.abs;
    }

    allowSlideRight() {
        return 'r' == this.getDirection() && this.state.index < this.state.data.length - 1;
    }

    allowSlideLeft() {
        return 'l' == this.getDirection() && 0 < this.state.index;
    }

    /**
     * Rect does not supports to give the layerX value
     * so we have to add the listener manually
     * https://reactjs.org/docs/events.html#mouse-events
     * 
     * @param {boolean} reattach 
     */
    mouseDownListeners(reattach = true) {
        const { allowMouseTouch } = this.state;

        if (!allowMouseTouch) {
            return;
        }

        if (this.wrapper) {
            this.wrapper.removeEventListener('mousedown', this.processMouseDown);

            if (reattach) {
                this.wrapper.addEventListener('mousedown', this.processMouseDown);
            }
        }
    }

    mouseMoveListeners(reattach = true) {
        if (this.wrapper) {
            this.wrapper.removeEventListener('mousemove', this.handleMouseMove);

            if (reattach) {
                this.wrapper.addEventListener('mousemove', this.handleMouseMove);
            }
        }
    }

    processMouseDown(e) {
        e.preventDefault();
        this.handleMouseDown(e);

        this.setState({
            isUserCurrentlySliding: true
        });
    }

    handleMouseDown(event) {
        this.mouseClicksStart = performance.now();
        this.blockMove = false;
        this.userMoving = false;
        this.mouseMoveListeners();
        this.autoplay(false);

        if (this.state.useLayerX) {
            this.mousestartx = event.layerX;
        }
        else {
            this.mousestartx = event.clientX;
        }

        setTimeout(() => {
            if (!this.userMoving || this.blockMove) {
                this.mouseMoveListeners(false);
            }
        }, 200);
    }

    handleMouseMove(event) {
        this.userMoving = true;

        if (this.blockMove) {
            this.mouseMoveListeners(false);
            return;
        }

        const { index, inlineStyle } = this.state;

        // mouse direction
        if (this.state.useLayerX) {
            this.setDirection(event.pageX);
        }
        else {
            this.setDirection(event.clientX);
        }

        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.slideWidth - this.movex));

        // Calculate distance to translate holder.
        if (this.state.useLayerX) {
            this.movex = index * this.slideWidth + (this.mousestartx - event.layerX);
        }
        else {
            this.movex = index * this.slideWidth + (this.mousestartx - event.clientX);
        }

        if (0 > this.movex) {
            this.movex = 0;
        }

        if (this.movex >= this.slideWidth * (this.state.data.length - 1)) {
            this.movex = this.slideWidth * (this.state.data.length - 1);
        }

        if (this.transformer) {
            // Inline style = avoid flipping while fast mouse moving
            if (inlineStyle) {
                this.transformer.style.transform = `translate3d(-${this.movex}px,0,0)`;
            }
            else {
                this.setState({
                    slidesTransform: `translate3d(-${this.movex}px,0,0)`
                });
            }
        }

        if (this.state.fsActive) {
            this.wasMove = true;
            clearTimeout(this.moveTimeoutReset);
            this.moveTimeoutReset = setTimeout(() => {
                this.wasMove = false;
            }, 500);
        }
    }

    handleMouseUp() {
        this.blockMove = true;

        if (115 >= performance.now() - this.mouseClicksStart || !this.userMoving) {
            this.userMoving = false;
            this.mouseMoveListeners(false);
            return;
        }

        let { index, slideAfterMove } = this.state;

        if (this.getAbs() > slideAfterMove) {
            if (this.allowSlideRight()) {
                index += 1;
            }
            if (this.allowSlideLeft()) {
                index -= 1;
            }
        }

        this.setState({
            isUserCurrentlySliding: false
        }, () => {
            this.userMoving = false;
            this.mouseMoveListeners(false);
            this.autoplay();
            this.slide(index);
        });
    }

    handleMouseLeave() {
        let { index, slideAfterMove } = this.state;
        this.blockMove = true;

        if (this.userMoving) {
            this.mouseMoveListeners(false);

            if (this.getAbs() > slideAfterMove) {
                if (this.allowSlideRight()) {
                    index += 1;
                }
                if (this.allowSlideLeft()) {
                    index -= 1;
                }
            }

            this.userMoving = false;
            this.mouseMoveListeners(false);
            this.autoplay();
            return this.setState({
                index,
                isUserCurrentlySliding: false
            }, this.slide);
        }

        this.setState({
            isUserCurrentlySliding: false
        });
    }

    handleClick() {
        if (this.wasMove) {
            this.blockMove = true;
            this.mouseMoveListeners(false);
            this.userMoving = false;

            return setTimeout(() => {
                this.blockMove = false;
            }, 100);
        }

        // Click handle to activate the fullscreen slider
        if (this.state.fsActive) {

            if(!this.state.callbackFsState){
                this.callbackFullscreenActive();
            }

            this.setState({
                isUserCurrentlySliding: false,
                fullscreenactive: true
            }, () => {
                if(this.state.callbackFsState){
                    this.callbackFullscreenActive();
                }
            });
        }
    }

    callbackFullscreenActive(){
        const { callbackFsActive, callbackFsActiveProps } = this.state;

        if(callbackFsActive){
            (callbackFsActive)(callbackFsActiveProps);
        }
    }

    callbackFullscreenDeActive(){
        const { callbackFsInactive, callbackFsInactiveProps } = this.state;

        if(callbackFsInactive){
            (callbackFsInactive)(callbackFsInactiveProps);
        }
    }

    /**
     * ##############################
     * TOUCH
     * ##############################
     */
    handleTouchStart(event) {
        this.autoplay(false);
        // Get the original touch position.
        this.touchstartx = event.touches[0].pageX;

        this.setState({
            isUserCurrentlySliding: true
        });
    }

    handleTouchMove(event) {
        this.userMoving = true;
        let { index, inlineStyle } = this.state;
        // Calculate distance to translate holder.
        this.movex = index * this.slideWidth + (this.touchstartx - event.touches[0].pageX);
        // mouse direction
        this.setDirection(event.touches[0].pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.slideWidth - this.movex));

        if (this.movex < this.slideWidth * (this.state.data.length - 1) && this.transformer) {
            // Inline style = avoid flipping while fast mouse moving
            if (inlineStyle) {
                return this.transformer.style.transform = `translate3d(-${this.movex}px,0,0)`;
            }

            this.setState({
                slidesTransform: `translate3d(-${this.movex}px,0,0)`
            });
        }
    }

    handleTouchEnd() {
        let { index, slideAfterMove } = this.state;
        this.blockMove = true;

        if (this.userMoving) {
            this.mouseMoveListeners(false);

            if (this.getAbs() > slideAfterMove) {
                if (this.allowSlideRight()) {
                    index += 1;
                }
                if (this.allowSlideLeft()) {
                    index -= 1;
                }
            }

            return this.setState({
                isUserCurrentlySliding: false
            }, () => {
                this.userMoving = false;
                this.mouseMoveListeners(false);
                this.autoplay();
                this.setState({ index }, this.slide);
            });
        }

        this.setState({
            isUserCurrentlySliding: false
        });
    }

    getButtonPreviousJsx() {
        const { buttonsAlwaysVisible, previous, data, index } = this.state;

        if (index > 0 && 2 <= data.length || buttonsAlwaysVisible) {
            return (
                <span className="button-previous" onClick={() => this.slidePrevious()}>
                    {
                        previous
                    }
                </span>
            );
        }
    }

    getButtonNextJsx() {
        const { buttonsAlwaysVisible, next, data, index } = this.state;

        if ((index < data.length - 1 && 2 <= data.length) || buttonsAlwaysVisible) {
            return (
                <span className="button-next" onClick={() => this.slideNext()}>
                    {
                        next
                    }
                </span>
            );
        }
    }

    getDotsJsx() {
        const { data, displayDotsIndex, index } = this.state;

        if (2 > data.length) {
            return;
        }

        const getDotFromData = (i) => {
            if (data && undefined !== data[i] && undefined !== data[i].dot) {
                return data[i].dot;
            }

            return null;
        };

        return (
            <div className="pagination">
                <div className="actions">
                    {
                        data.map((x, i) => {
                            return (
                                <span
                                    className={`action ${index === i ? 'active' : ''}`}
                                    onClick={() => this.setSlide(i)}
                                    key={`paginations-dot-${i}`}
                                >
                                    {
                                        displayDotsIndex && `${i + 1}`
                                    }
                                    {
                                        !displayDotsIndex && getDotFromData(i)
                                    }
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    getPaginationType2() {
        const { data, displayDotsIndex, index, previous, next, buttonsAlwaysVisible, slidersUuid } = this.state;

        if (2 > data.length) {
            return;
        }

        const getDotFromData = (i) => {
            if (data && undefined !== data[i] && undefined !== data[i].dot) {
                return data[i].dot;
            }

            return null;
        };

        const pagesrData = [];

        // Button previous
        if (index > 0 && 2 <= data.length || buttonsAlwaysVisible) {
            pagesrData.push(
                <li key={`slide-previous-${slidersUuid}`} className="page-item" onClick={() => this.slidePrevious()}>
                    <span className="page-link">
                        {
                            previous
                        }
                    </span>
                </li>
            );
        }

        // Pages
        data.map((x, i) => {
            pagesrData.push(
                <li
                    className={`page-item ${index === i ? 'active' : ''}`}
                    onClick={() => this.setSlide(i)}
                    key={`slide-page-${i}`}
                >
                    <span className="page-link">
                        {
                            displayDotsIndex && `${i + 1}`
                        }
                        {
                            !displayDotsIndex && getDotFromData(i)
                        }
                    </span>
                </li>
            )
        });

        // Button next
        if ((index < data.length - 1 && 2 <= data.length) || buttonsAlwaysVisible) {
            pagesrData.push(
                <li key={`slide-next-${slidersUuid}`} className="page-item" onClick={() => this.slideNext()}>
                    <span className="page-link">
                        {
                            next
                        }
                    </span>
                </li>
            );
        }

        return (
            <ul className="pagination-2">
                {
                    pagesrData
                }
            </ul>
        );
    }

    parent_closeFullscreenSlider() {

        if(!this.state.callbackFsState){
            this.callbackFullscreenDeActive();
        }

        this.setState({ fullscreenactive: false }, () => {
            if(this.state.callbackFsState){
                this.callbackFullscreenDeActive();
            }
        });
    }

    parent_setSlide(index) {
        this.setSlide(index);
    }

    render() {
        const { isUserCurrentlySliding, addClass, defaultClass, id, onSlideTime, displayDots, staticData, allowMouseTouch, displayPagination, animationTime, paginationType, dotsInside, paginationInside, slidersUuid, data, slidesWidth, imageAsBackground, slidesTransform, slideWrapperWidth, fullscreenactive } = this.state;

        return (
            <div className='' >

                {
                    fullscreenactive &&
                    <SliderFullscreenMode
                        // App
                        parent_closeFullscreenSlider={this.parent_closeFullscreenSlider}
                        parent_setSlide={this.parent_setSlide}
                        slidersUuid={this.state.slidersUuid}
                        slidesTransform={this.state.slidesTransform}
                        slidesWidth={this.state.slidesWidth}
                        slideWrapperWidth={this.state.slideWrapperWidth}
                        index={this.state.index}
                        data={this.state.data}
                        // User
                        displayPagination={this.state.fsDisplayPagination}
                        slideAfterMove={this.state.fsSlideAfterMove}
                        previewWidth={this.state.fsPreviewWidth}
                        previewHeight={this.state.fsPreviewHeight}
                        previewMarginX={this.state.fsPreviewMarginX}
                        previewMarginY={this.state.fsPreviewMarginY}
                        displayPreview={this.state.fsDisplayPreview}
                        wrapDirection={this.state.fsWrapDirection}
                        previewToggle={this.state.fsPreviewToggle}
                        toggleDirection={this.state.fsToggleDirection}
                        imageAsBackground={this.state.fsImageAsBackground}
                        autoplayIcon={this.state.fsAutoplayIcon}
                        closeIcon={this.state.fsCloseIcon}
                        useLayerX={this.state.fsUseLayerX}
                        autoplayTime={this.state.fsAutoplayTime}
                        autoplayNext={this.state.fsAutoplayNext}
                        animationTime={this.state.fsAnimationTime}
                        next={this.state.fsNext}
                        previous={this.state.fsPrevious}
                        autoplayStopIcon={this.state.fsAutoplayStopIcon}
                        displayDots={this.state.fsDisplayDots}
                        autoplayStopOnLast={this.state.fsAutoplayStopOnLast}
                        displayDotsIndex={this.state.fsDisplayDotsIndex}
                        closeOnEsc={this.state.fsCloseOnEsc}
                        onSlideTime={this.state.fsOnSlideTime}
                    />
                }
                {
                    staticData &&
                    <div className='static-data' key={`static-data-${slidersUuid}`}>
                        {
                            staticData
                        }
                    </div>
                }
                {/* Need this wrapper to set a z-index lower then the page to avoid (on desktop the version) to execute the mousedown function (while using the pager). */}
                {
                    !paginationInside && displayPagination && 1 == paginationType && this.getButtonPreviousJsx()
                }
                <div
                    key={`wrapper-${slidersUuid}`}
                    className="slider-wrapper"
                    ref={(node) => (this.wrapper = node)}
                    // Mobile
                    {...((true == allowMouseTouch) && { onTouchStart: (e) => this.handleTouchStart(e) })}
                    {...((true == allowMouseTouch) && { onTouchMove: (e) => this.handleTouchMove(e) })}
                    {...((true == allowMouseTouch) && { onTouchEnd: (e) => this.handleTouchEnd() })}
                    // Desktop
                    {...((true == allowMouseTouch) && { onMouseUp: (e) => this.handleMouseUp() })}
                    {...((true == allowMouseTouch) && { onMouseLeave: (e) => this.handleMouseLeave() })}

                >
                    {
                        paginationInside && displayPagination && 1 == paginationType && this.getButtonPreviousJsx()
                    }
                    <div
                        key={`slides-${slidersUuid}`}
                        ref={(node) => (this.transformer = node)}
                        className={`slides user-select-none animate-${animationTime} ${isUserCurrentlySliding && !this.isClickOnActionButton ? `animate-${onSlideTime}` : ''}`}
                        style={{
                            transitionTimingFunction: 'ease',
                            transform: `${slidesTransform}`,
                            width: `${slidesWidth}px`,
                        }}
                    >
                        {0 !== data.length && data.map((s, i) => {

                            if (typeof {} !== typeof s || undefined == s.image || typeof '8' !== typeof s.image) {
                                return;
                            }

                            const { image, data } = s;

                            return (
                                <div
                                    key={`slide-wrapper-${slidersUuid}-${i}`}
                                    className="slide-wrapper"
                                    style={{
                                        width: `${slideWrapperWidth}px`,
                                    }}
                                    {...((true == allowMouseTouch) && { onClick: (e) => this.handleClick() })}
                                >
                                    <div className="slide">
                                        {
                                            imageAsBackground &&
                                            <div
                                                className={`slide-image slide-image-data-wrapper`}
                                                style={{
                                                    backgroundImage: `url(${image})`
                                                }}
                                            >
                                                {
                                                    data &&
                                                    <div className='slide-image-data'>
                                                        {
                                                            data
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                        {
                                            !imageAsBackground &&
                                            <img
                                                className={`slide-image`}
                                                src={image}
                                            />
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {
                        displayDots && dotsInside && 1 == paginationType && this.getDotsJsx()
                    }
                    {
                        paginationInside && displayPagination && 1 == paginationType && this.getButtonNextJsx()
                    }
                    {
                        2 == paginationType && paginationInside && this.getPaginationType2()
                    }
                </div>
                {
                    displayDots && !dotsInside && 1 == paginationType && this.getDotsJsx()
                }
                {
                    !paginationInside && displayPagination && 1 == paginationType && this.getButtonNextJsx()
                }
                {
                    2 == paginationType && !paginationInside && this.getPaginationType2()
                }
            </div>
        );
    }
}

export default Slider;
