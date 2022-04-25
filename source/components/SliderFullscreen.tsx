import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import uuid from '../functions/uuid';

class SliderFullscreen extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private slideWidth: number;
    private movex: number;
    private mousestartx: number;
    private blockMove: boolean;
    private mouseClicksStart: number;
    private userMoving: boolean;
    private oldX: number;
    private mouseDirection: string;
    private abs: number;
    private sliderPreviewRef: any;
    private wrapper: any;

    // preview slider
    private preview_movex: number;
    private preview_oldX: number;
    private preview_mouseDirection: string;
    private tempTimeout: any;
    private timeouterAutoplay: any;
    private isClickOnActionButton: any;
    private maxSlidePreviewSlide: any;
    private preview_userMoving:any;
    private touchstartx: number;

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
        this.toggleAutoplay = this.toggleAutoplay.bind(this);
        this.EscListener = this.EscListener.bind(this);
        // preview slider
        // Desktop
        this.preview_mouseDownListeners = this.preview_mouseDownListeners.bind(this);
        this.preview_mouseMoveListeners = this.preview_mouseMoveListeners.bind(this);
        this.preview_processMouseDown = this.preview_processMouseDown.bind(this);
        this.preview_handleMouseDown = this.preview_handleMouseDown.bind(this);
        this.preview_handleMouseMove = this.preview_handleMouseMove.bind(this);
        this.preview_handleMouseLeave = this.preview_handleMouseLeave.bind(this);
        // Mobile
        this.preview_handleTouchStart = this.preview_handleTouchStart.bind(this);
        this.preview_handleTouchMove = this.preview_handleTouchMove.bind(this);
        this.preview_handleTouchEnd = this.preview_handleTouchEnd.bind(this);

        this.state = {
            // App
            // images root holder
            slidesTransform: `translate3d(-0px,0,0)`,
            slidesWidth: 100,
            // each single image holder
            slideWrapperWidth: '100%',
            // each single img tag
            imagesTransform: `translate3d(-0px,0,0)`,
            // current slide index
            index: 0,
            renderPreview: true,
            autoplay: false,
            sliderPreviewTransformation: 0,
            ulAnimationDisabled: true,
            isUserCurrentlySliding: false,
            // User
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'SliderFullscreen',
            
            data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
            slidersUuid: props.slidersUuid && typeof '8' === typeof props.slidersUuid ? props.slidersUuid : uuid(),
            displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
            slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
            displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
            displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
            imageAsBackground: typeof true == typeof props.imageAsBackground ? props.imageAsBackground : false,
            autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
            autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
            animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
            wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
            useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
            autoplayStopOnLast: typeof true == typeof props.autoplayStopOnLast ? props.autoplayStopOnLast : true,
            //
            displayPreview: typeof true == typeof props.displayPreview ? props.displayPreview : true,
            previewWidth: props.previewWidth && typeof 8 == typeof props.previewWidth ? props.previewWidth : 80,
            previewHeight: props.previewHeight && typeof 8 == typeof props.previewHeight ? props.previewHeight : 70,
            previewMarginX: props.previewMarginX && typeof 8 == typeof props.previewMarginX ? props.previewMarginX : 10,
            previewMarginY: props.previewMarginY && typeof 8 == typeof props.previewMarginY ? props.previewMarginY : 10,
            previewToggle: props.previewToggle ? props.previewToggle : '⇩',
            toggleDirection: (props.toggleDirection && typeof '8' == typeof props.toggleDirection && ['left', 'right'].includes(props.toggleDirection)) ? props.toggleDirection : 'right',
            next: props.next ? props.next : '>>',
            previous: props.previous ? props.previous : '<<',
            autoplayIcon: props.autoplayIcon ? props.autoplayIcon : '🎥',
            closeIcon: props.closeIcon ? props.closeIcon : 'x',
            autoplayStopIcon: props.autoplayStopIcon ? props.autoplayStopIcon : '🛑',
            closeCallback: props.closeCallback && typeof function () { } === typeof props.closeCallback ? props.closeCallback : undefined,
            closeCallbackProps: props.closeCallbackProps,
            closeOnEsc: typeof true == typeof props.closeOnEsc ? props.closeOnEsc : true,
            onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
        };
        
        this.maxSlidePreviewSlide = (this.state.data.length * this.state.previewWidth) + (this.state.data.length * this.state.previewMarginX);

        this.slideWidth = 0;
        this.movex = 0;
        this.mousestartx = 0;

        this.blockMove = false;
        this.mouseClicksStart = 0;
        this.userMoving = false;

        this.oldX = 0;
        this.mouseDirection = 'r';
        this.abs = 0;

        // preview slider
        this.preview_movex = 0;
        this.preview_oldX = 0;
        this.preview_mouseDirection = 'r';
        this.tempTimeout = undefined;
        this.timeouterAutoplay = undefined;
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
            'addClass',
            'defaultClass',
            'id',
            'displayPagination',
            'slideAfterMove',
            'previewWidth',
            'previewHeight',
            'previewMarginX',
            'previewMarginY',
            'displayPreview',
            'wrapDirection',
            'previewToggle',
            'toggleDirection',
            'next',
            'previous',
            'imageAsBackground',
            'autoplayIcon',
            'closeIcon',
            'useLayerX',
            'autoplayTime',
            'autoplayNext',
            'animationTime',
            'data',
            'displayDots',
            'displayDotsIndex',
            'autoplayStopOnLast',
            'autoplayStopIcon',
            'closeCallback',
            'closeCallbackProps',
            'closeOnEsc',
            'onSlideTime'
        ], props, state)) {

            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'SliderFullscreen',
                
                
                data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
                displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
                slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
                displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
                displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
                imageAsBackground: typeof true == typeof props.imageAsBackground ? props.imageAsBackground : false,
                autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
                autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
                animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
                wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
                useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
                autoplayStopOnLast: typeof true == typeof props.autoplayStopOnLast ? props.autoplayStopOnLast : true,
                displayPreview: typeof true == typeof props.displayPreview ? props.displayPreview : true,
                previewWidth: props.previewWidth && typeof 8 == typeof props.previewWidth ? props.previewWidth : 80,
                previewHeight: props.previewHeight && typeof 8 == typeof props.previewHeight ? props.previewHeight : 70,
                previewMarginX: props.previewMarginX && typeof 8 == typeof props.previewMarginX ? props.previewMarginX : 10,
                previewMarginY: props.previewMarginY && typeof 8 == typeof props.previewMarginY ? props.previewMarginY : 10,
                previewToggle: props.previewToggle ? props.previewToggle : '⇩',
                toggleDirection: (props.toggleDirection && typeof '8' == typeof props.toggleDirection && ['left', 'right'].includes(props.toggleDirection)) ? props.toggleDirection : 'right',
                next: props.next ? props.next : '>>',
                previous: props.previous ? props.previous : '<<',
                autoplayIcon: props.autoplayIcon ? props.autoplayIcon : '🎥',
                closeIcon: props.closeIcon ? props.closeIcon : 'x',
                autoplayStopIcon: props.autoplayStopIcon ? props.autoplayStopIcon : '🛑',
                closeCallback: props.closeCallback && typeof function () { } === typeof props.closeCallback ? props.closeCallback : undefined,
                closeCallbackProps: props.closeCallbackProps,
                closeOnEsc: typeof true == typeof props.closeOnEsc ? props.closeOnEsc : true,
                onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
            };
        }

        return null;
    }

    componentDidMount(): void {


        if (!this.state.data.length) {
            return;
        }

        this.addEscEventListener();
        this.slideWidth = this.getSlidersWidth();
        this.setSlidesWidth();
        this.setResizeListener();
        this.mouseDownListeners();
        this.preview_mouseDownListeners();
        this.setResizeListener();
        this.resizeView(null);
    }

    componentWillUnmount() {
        this.removeEscEventListener();
        this.setResizeListener(false);
        this.mouseDownListeners(false);
        this.mouseMoveListeners(false);
        this.preview_mouseDownListeners(false);
        this.preview_mouseMoveListeners(false);
        clearTimeout(this.timeouterAutoplay);
    }

    autoplay(reattach = true) {
        const { autoplay } = this.state;
        clearTimeout(this.timeouterAutoplay);

        if (autoplay && reattach) {
            const { autoplayTime, autoplayNext } = this.state;

            this.timeouterAutoplay = setTimeout(() => {

                if(autoplayNext && this.state.index === this.state.data.length-1 && this.state.autoplayStopOnLast){
                    clearTimeout(this.timeouterAutoplay);
                    return this.setState({
                        autoplay: false,
                        renderPreview: true
                    });
                }

                if(!autoplayNext && 0 === this.state.index && this.state.autoplayStopOnLast){
                    clearTimeout(this.timeouterAutoplay);
                    return this.setState({
                        autoplay: false,
                        renderPreview: true
                    });
                }

                autoplayNext ? this.slideNext() : this.slidePrevious();
                this.autoplay(this.state.autoplay);
            }, autoplayTime);
        }
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

    EscListener(event) {
        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.closeFullscreenSlider();
        }
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
    getMaxItemsInRow() {
        const { previewWidth, previewMarginX } = this.state;
        //@ts-ignore
        const max = parseInt(document.documentElement.getBoundingClientRect().width / (previewWidth + previewMarginX));
        return max;
    }

    slide() {
        const { data, index, previewMarginX, previewWidth, displayPreview } = this.state;

        if (data && data[index] && data[index].callback && typeof function () { } == typeof data[index].callback) {
            (data[index].callback)(index, data[index].callbackProps);
        }

        // Autoslide of the preview slider
        if (displayPreview && index && index > this.getMaxItemsInRow() / 2) {
            //@ts-ignore
            const i = parseInt(index - (this.getMaxItemsInRow() / 2));
            let current = (i * previewWidth) + (i * previewMarginX);

            if (0 <= current && document.documentElement.getBoundingClientRect().width + current - (previewMarginX) < this.maxSlidePreviewSlide) {
                this.preview_movex = current;
            }

            if (current > this.maxSlidePreviewSlide) {
                this.preview_movex = this.maxSlidePreviewSlide - previewWidth;
            }
        }
        else {
            this.preview_movex = 0;
        }

        this.movex = index * this.state.slideWrapperWidth;

        this.setState({
            ulAnimationDisabled: false,
            dataTransform: `translate3d(-(${0})px,0,0)`,
            slidesTransform: `translate3d(-${this.movex}px,0,0)`,
            sliderPreviewTransformation: `translate3d(-${this.preview_movex}px,0,0)`
        }, () => {

            clearTimeout(this.tempTimeout);
            this.tempTimeout = setTimeout(() => {
                this.isClickOnActionButton = false;

                this.setState({
                    ulAnimationDisabled: true
                });
            }, 300);
        });
    }

    slidePrevious() {
        this.isClickOnActionButton = true;
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
        this.setState({ index }, this.slide);
    }

    slideNext() {
        this.isClickOnActionButton = true;
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
            index,
        }, this.slide);
    }

    setSlide(index, isPreview = false) {
        this.isClickOnActionButton = true;

        if(this.state.autoplay && isPreview){
            return;
        }

        if (typeof '8' == typeof index) {
            index = parseInt(index);
        }

        this.setState({ index }, this.slide);
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

    // preview slider
    preview_setDirection(pageX = 0) {
        if (this.preview_oldX < pageX) {
            this.preview_mouseDirection = 'r';
        }
        else {
            this.preview_mouseDirection = 'l';
        }

        this.preview_oldX = pageX;
    }

    preview_getDirection() {
        return this.preview_mouseDirection;
    }

    /**
     * Rect does not supports to give the layerX value
     * so we have to add the listener manually
     * https://reactjs.org/docs/events.html#mouse-events
     * 
     * @param {boolean} reattach 
     */
    mouseDownListeners(reattach = true) {

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

        this.setState({
            isUserCurrentlySliding: true
        });

        this.handleMouseDown(e);
    }

    handleMouseDown(event) {

        if (this.state.useLayerX) {
            this.mousestartx = event.layerX;
        }
        else {
            this.mousestartx = event.clientX;
        }

        this.mouseClicksStart = performance.now();
        this.blockMove = false;
        this.userMoving = false;
        this.mouseMoveListeners();

        setTimeout(() => {
            if (!this.userMoving || this.blockMove) {
                this.mouseMoveListeners(false);
            }
        }, 200);
    }

    handleMouseMove(event) {

        if(this.state.autoplay){
            return;
        }

        this.userMoving = true;

        if (this.blockMove) {
            this.mouseMoveListeners(false);
            return;
        }

        const { index } = this.state;

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

        if (this.movex < this.slideWidth * (this.state.data.length - 1)) {
            this.setState({
                slidesTransform: `translate3d(-${this.movex}px,0,0)`
            });
        }
    }

    handleMouseUp() {

        if(this.state.autoplay){
            return;
        }

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
            this.setState({ index }, this.slide);
        });
    }

    handleMouseLeave() {

        if(this.state.autoplay){
            return;
        }

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

        if(this.state.autoplay){
            return;
        }

        this.blockMove = true;
        this.mouseMoveListeners(false);
        this.userMoving = false;

        this.setState({ 
            isUserCurrentlySliding: false
        });

        return setTimeout(() => {
            this.blockMove = false;
        }, 100);
    }

    /**
     * ##############################
     * Mouse move slider preview
     * ##############################
     */
    preview_mouseDownListeners(reattach = true) {
        if (this.sliderPreviewRef) {
            this.sliderPreviewRef.removeEventListener('mousedown', this.preview_processMouseDown);

            if (reattach) {
                this.sliderPreviewRef.addEventListener('mousedown', this.preview_processMouseDown);
            }
        }
    }

    preview_mouseMoveListeners(reattach = true) {
        if (this.sliderPreviewRef) {
            this.sliderPreviewRef.removeEventListener('mousemove', this.preview_handleMouseMove);

            if (reattach) {
                this.sliderPreviewRef.addEventListener('mousemove', this.preview_handleMouseMove);
            }
        }
    }

    preview_processMouseDown(e) {

        if(this.state.autoplay){
            return;
        }

        e.preventDefault();
        this.preview_handleMouseDown();
    }

    preview_handleMouseDown() {

        if(this.state.autoplay){
            return;
        }

        this.preview_userMoving = false;
        this.preview_mouseMoveListeners();

        setTimeout(() => {
            if (!this.preview_userMoving) {
                this.preview_mouseMoveListeners(false);
            }
        }, 200);
    }

    preview_handleMouseMove(event) {

        if(this.state.autoplay){
            return;
        }

        this.preview_userMoving = true;
        const { previewMarginX, previewWidth } = this.state;

        // Calculate distance to translate holder.

        if (this.state.useLayerX) {
            this.preview_setDirection(event.pageX);
        }
        else {
            this.preview_setDirection(event.clientX);
        }

        if (this.state.useLayerX) {

            if ('l' == this.preview_getDirection() && document.documentElement.getBoundingClientRect().width + this.preview_movex - (previewWidth+previewMarginX) <= this.maxSlidePreviewSlide) {
                this.preview_movex += 10;
            }

            if ('r' == this.preview_getDirection() && -previewMarginX < this.preview_movex) {
                this.preview_movex -= 10;
            }
        }
        else {

            if ('l' == this.preview_getDirection() && document.documentElement.getBoundingClientRect().width + this.preview_movex - (previewWidth+previewMarginX) <= this.maxSlidePreviewSlide) {
                this.preview_movex += 10;
            }

            if ('r' == this.preview_getDirection() && -previewMarginX < this.preview_movex) {
                this.preview_movex -= 10;
            }
        }

        if (0 > this.preview_movex) {
            this.preview_movex = 0;
        }

        if (0 <= this.preview_movex && document.documentElement.getBoundingClientRect().width + this.preview_movex <= this.maxSlidePreviewSlide) {
            this.setState({
                sliderPreviewTransformation: `translate3d(-${this.preview_movex}px,0,0)`
            });
        }
    }

    preview_handleMouseLeave(e) {

        if(this.state.autoplay){
            return;
        }

        e.preventDefault();
        this.preview_mouseMoveListeners(false);
        this.enableAnimationTime();
    }

    /**
     * ##############################
     * TOUCH
     * ##############################
     */
    handleTouchStart(event) {

        if(this.state.autoplay){
            return;
        }

        // Get the original touch position.
        this.touchstartx = event.touches[0].pageX;

        this.setState({
            isUserCurrentlySliding: true
        });
    }

    handleTouchMove(event) {

        if(this.state.autoplay){
            return;
        }

        this.userMoving = true;
        let { index } = this.state;
        // Calculate distance to translate holder.
        this.movex = index * this.slideWidth + (this.touchstartx - event.touches[0].pageX);
        // mouse direction
        this.setDirection(event.touches[0].pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.slideWidth - this.movex));

        if (this.movex < this.slideWidth * (this.state.data.length - 1)) {
            this.setState({
                slidesTransform: `translate3d(-${this.movex}px,0,0)`
            });
        }
    }

    handleTouchEnd() {

        if(this.state.autoplay){
            return;
        }

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
                this.setState({ index }, this.slide);
            });
        }

        this.setState({
            isUserCurrentlySliding: false
        });
    }

    /**
     * ##############################
     * TOUCH slider preview
     * ##############################
     */
    preview_handleTouchStart() {

        if(this.state.autoplay){
            return;
        }

        this.preview_userMoving = false;
    }

    preview_handleTouchMove(event) {

        if(this.state.autoplay){
            return;
        }

        this.preview_userMoving = true;
        const { previewMarginX } = this.state;
        this.preview_setDirection(event.touches[0].pageX);

        if (this.state.useLayerX) {

            if ('l' == this.preview_getDirection() && document.documentElement.getBoundingClientRect().width + this.preview_movex <= this.maxSlidePreviewSlide) {
                this.preview_movex += 10;
            }

            if ('r' == this.preview_getDirection() && -previewMarginX < this.preview_movex) {
                this.preview_movex -= 10;
            }
        }
        else {

            if ('l' == this.preview_getDirection() && document.documentElement.getBoundingClientRect().width + this.preview_movex <= this.maxSlidePreviewSlide) {
                this.preview_movex += 10;
            }

            if ('r' == this.preview_getDirection() && -previewMarginX < this.preview_movex) {
                this.preview_movex -= 10;
            }
        }

        if (0 > this.preview_movex) {
            this.preview_movex = 0;
        }

        if (0 <= this.preview_movex && document.documentElement.getBoundingClientRect().width + this.preview_movex - previewMarginX <= this.maxSlidePreviewSlide) {
            this.setState({
                sliderPreviewTransformation: `translate3d(-${this.preview_movex}px,0,0)`
            });
        }
    }

    preview_handleTouchEnd() {

        if(this.state.autoplay){
            return;
        }
    }

    getButtonPreviousJsx() {
        const { previous, data, index } = this.state;

        if (index > 0 && 2 <= data.length) {
            return (
                <span className="button-previous-wrapper">
                    <span className="button-previous" onClick={() => this.slidePrevious()}>
                        {
                            previous
                        }
                    </span>
                </span>
            );
        }
    }

    getButtonNextJsx() {
        const { next, data, index } = this.state;

        if ((index < data.length - 1 && 2 <= data.length)) {
            return (
                <span className="button-next-wrapper">
                    <span className="button-next" onClick={() => this.slideNext()}>
                        {
                            next
                        }
                    </span>
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

    togglePreview() {
        this.setState({
            renderPreview: !this.state.renderPreview
        });
    }

    closeFullscreenSlider() {
        const { closeCallback, closeCallbackProps } = this.state;

        if (closeCallback) {
            (closeCallback)(closeCallbackProps);
        }
    }

    disableAnimationTime(e) {
        e.preventDefault();

        if (!this.state.ulAnimationDisabled) {
            this.setState({
                ulAnimationDisabled: true
            });
        }
    }

    enableAnimationTime() {
        if (this.state.ulAnimationTime) {
            this.setState({
                ulAnimationDisabled: false
            });
        }
    }

    toggleAutoplay(){
        this.setState({
            autoplay: !this.state.autoplay,
            renderPreview: false === !this.state.autoplay ? true : false
        }, () => {
            this.autoplay(this.state.autoplay);

            if(this.state.autoplay){
                this.mouseDownListeners(false);
            }
            else{
                this.mouseDownListeners();
            }
        });
    }

    render() {
        const { 
            addClass, 
            defaultClass, 
            id,  
            animationTime, 
            previewToggle, 
            displayDots, 
            autoplay, 
            autoplayStopIcon, 
            autoplayIcon, 
            ulAnimationDisabled, 
            closeIcon, 
            displayPagination, 
            renderPreview, 
            toggleDirection, 
            slidersUuid, 
            data, 
            index, 
            displayPreview, 
            slidesWidth, 
            previewMarginX, 
            previewMarginY, 
            previewWidth, 
            previewHeight, 
            sliderPreviewTransformation, 
            imageAsBackground, 
            slidesTransform, 
            imagesTransform, 
            slideWrapperWidth,
            onSlideTime,
            isUserCurrentlySliding
        } = this.state;

        return (
            <div className={`${defaultClass} ${addClass} animate-${animationTime}`} >
                {/* Need this wrapper to set a z-index lower then the page to avoid (on desktop the version) to execute the mousedown function (while using the pager). */}
                <div
                    key={`wrapper-${slidersUuid}`}
                    className="slider-wrapper"
                    ref={(node) => (this.wrapper = node)}
                    // Mobile
                    onTouchStart={(e) => this.handleTouchStart(e)}
                    onTouchMove={(e) => this.handleTouchMove(e)}
                    onTouchEnd={(e) => this.handleTouchEnd()}
                    // Desktop
                    onClick={(e) => this.handleClick()}
                    onMouseUp={(e) => this.handleMouseUp()}
                    onMouseLeave={(e) => this.handleMouseLeave()}
                >
                    <div className='fullscreen-media'>
                        <div className='media'>
                            <span
                                className='action action-close'
                                onClick={() => this.closeFullscreenSlider()}
                            >
                                {
                                    closeIcon
                                }
                            </span>
                            {
                                autoplayIcon &&
                                <span
                                    className='action action-autplay'
                                    onClick={() => this.toggleAutoplay()}
                                >
                                    {
                                        !autoplay && autoplayIcon
                                    }
                                    {
                                        autoplay && autoplayStopIcon && autoplayStopIcon
                                    }
                                    {
                                        autoplay && !autoplayStopIcon && autoplayIcon
                                    }
                                </span>
                            }
                        </div>
                    </div>
                    {
                        displayPagination && !autoplay && this.getButtonPreviousJsx()
                    }
                    <div
                        key={`slides-${slidersUuid}`}
                        className={`slides user-select-none animate-${animationTime} ${isUserCurrentlySliding && !this.isClickOnActionButton ? `animate-${onSlideTime}` : ''}`}
                        style={{
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
                                >
                                    <div className="slide">
                                        <span className='slide-image-span'>
                                            {
                                                imageAsBackground &&
                                                <div
                                                    className={`slide-image slide-image-data-wrapper animate-${animationTime}`}
                                                    style={{
                                                        transform: `${imagesTransform}`,
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
                                                    className={`slide-image animate-${animationTime}`}
                                                    src={image}
                                                    style={{
                                                        transform: `${imagesTransform}`,
                                                    }}
                                                />
                                            }
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {
                        displayDots && !autoplay && this.getDotsJsx()
                    }
                    {
                        displayPagination && !autoplay && this.getButtonNextJsx()
                    }
                </div>
                {
                    displayPreview &&
                    <div className={`slider-preview ${renderPreview ? 'show' : 'hidden'}`}>
                        {
                            previewToggle &&
                            <div
                                className={`preview-toggle ${toggleDirection}`}
                                onClick={() => this.togglePreview()}
                            >
                                <span className='data'>
                                    {
                                        previewToggle
                                    }
                                </span>
                            </div>
                        }
                        <div className='preview'>
                            <ul
                                ref={(node) => this.sliderPreviewRef = node}
                                style={
                                    {
                                        width: `${this.maxSlidePreviewSlide}px`,
                                        transform: `${sliderPreviewTransformation}`,
                                    }
                                }
                                className={`preview-ul ${ulAnimationDisabled ? 'animation-time-0' : ''}`}
                                // Mobile
                                onTouchStart={(e) => this.preview_handleTouchStart()}
                                onTouchMove={(e) => this.preview_handleTouchMove(e)}
                                onTouchEnd={(e) => this.preview_handleTouchEnd()}
                                // Desktop
                                onMouseLeave={(e) => this.preview_handleMouseLeave(e)}
                                onClick={(e) => this.preview_handleMouseLeave(e)}
                                onMouseUp={(e) => this.preview_handleMouseLeave(e)}
                            >
                                {
                                    data.map((s, i) => {

                                        if (typeof {} !== typeof s || undefined == s.image || typeof '8' !== typeof s.image) {
                                            return;
                                        }

                                        const { image, data } = s;

                                        return (
                                            <li
                                                key={`slide-image-${i}-${slidersUuid}`}
                                                onClick={() => this.setSlide(i, true)}
                                                className={`preview-li ${index == i ? 'active' : ''}`}
                                                {...(10 !== previewMarginX || 10 !== previewMarginY || 80 !== previewWidth || 70 !== previewHeight) && {
                                                    style: {
                                                        width: `${previewWidth}px`,
                                                        height: `${previewHeight}px`,
                                                        margin: `${previewMarginX}px ${previewMarginY}`
                                                    }
                                                }}
                                            >
                                                <span className='slide-image-span'>
                                                    {
                                                        imageAsBackground &&
                                                        <div
                                                            className={`slide-image slide-image-data-wrapper animate-${animationTime}`}
                                                            style={{
                                                                transform: `${imagesTransform}`,
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
                                                            className={`slide-image animate-${animationTime}`}
                                                            src={image}
                                                            style={{
                                                                transform: `${imagesTransform}`,
                                                            }}
                                                        />
                                                    }
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default SliderFullscreen;
