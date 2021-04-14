import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import uuid from '../internalFunctions/internalUuid';

class SliderItems extends React.Component {
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

        this.state = {
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-slider-items',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
            slidersUuid: props.uuid && typeof '8' === typeof props.uuid ? props.uuid : `${uuid()}`,
            displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
            paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
            slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
            dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside2 : true,
            displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
            displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
            buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
            next: props.next ? props.next : '>',
            previous: props.previous ? props.previous : '<',
            itemsXS: props.itemsXS && typeof 8 == typeof props.itemsXS ? props.itemsXS : 1,
            itemsS: props.itemsS && typeof 8 == typeof props.itemsS ? props.itemsS : 2,
            itemsL: props.itemsL && typeof 8 == typeof props.itemsL ? props.itemsL : 3,
            itemsXL: props.itemsXL && typeof 8 == typeof props.itemsXL ? props.itemsXL : 4,
            resizeS: props.resizeS && typeof 8 == typeof props.resizeS ? props.resizeS : 768,
            resizeL: props.resizeL && typeof 8 == typeof props.resizeL ? props.resizeL : 1024,
            resizeXL: props.resizeXL && typeof 8 == typeof props.resizeXL ? props.resizeXL : 1260,
            docWidth: document.documentElement.getBoundingClientRect().width,
            itemsPerLine: 1,
            // data root holder
            slidesTransform: `translate3d(-0px,0,0)`,
            slidesWidth: 100,
            // each single image holder
            slideWrapperWidth: '100%',
            // current slide index
            index: 0,
            isUserCurrentlySliding: false,
            paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
            autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
            autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
            autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
            animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
            allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
            wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
            inlineStyle: typeof true == typeof props.inlineStyle ? props.inlineStyle : false,
            useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
            onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
            staticData: props.staticData ? props.staticData : ''
        };

        this.slideWidth = 0;
        this.touchstartx = 0;
        this.movex = 0;
        this.longTouch = false;

        this.mousestartx = 0;

        this.blockMove = false;
        this.mouseClicksStart = 0;
        this.userMoving = false;

        this.oldX = 0;
        this.mouseDirection = 'r';
        this.abs = 0;
        this.isClickOnActionButton = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['staticData', 'itemsS', 'itemsL', 'onSlideTime',  'itemsXL', 'useLayerX', 'inlineStyle', 'allowMouseTouch', 'slideAfterMove', 'wrapDirection', 'autoplay', 'autoplayTime', 'autoplayNext', 'animationTime', 'paginationType', 'resizeS', 'resizeL', 'resizeXL', 'dotsInside', 'paginationInside', 'addClass', 'defaultClass', 'id', 'data', 'next', 'previous', 'displayPagination', 'displayDots', 'displayDotsIndex', 'buttonsAlwaysVisible'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-slider-items',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
                next: props.next ? props.next : '>',
                previous: props.previous ? props.previous : '<',
                displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
                displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
                dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside : true,
                displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
                buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
                itemsXS: props.itemsXS && typeof 8 == typeof props.itemsXS ? props.itemsXS : 1,
                itemsS: props.itemsS && typeof 8 == typeof props.itemsS ? props.itemsS : 2,
                itemsL: props.itemsL && typeof 8 == typeof props.itemsL ? props.itemsL : 3,
                itemsXL: props.itemsXL && typeof 8 == typeof props.itemsXL ? props.itemsXL : 4,
                resizeS: props.resizeS && typeof 8 == typeof props.resizeS ? props.resizeS : 768,
                resizeL: props.resizeL && typeof 8 == typeof props.resizeL ? props.resizeL : 1024,
                resizeXL: props.resizeXL && typeof 8 == typeof props.resizeXL ? props.resizeXL : 1140,
                paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
                slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
                paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
                animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
                autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
                autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
                autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
                allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
                wrapDirection: typeof true == typeof props.wrapDirection ? props.wrapDirection : true,
                inlineStyle: typeof true == typeof props.inlineStyle ? props.inlineStyle : false,
                useLayerX: typeof true == typeof props.useLayerX ? props.useLayerX : false,
                onSlideTime: (props.onSlideTime && typeof '8' == typeof props.onSlideTime) ? props.onSlideTime : '0',
                staticData: props.staticData ? props.staticData : ''
            };
        }

        return null;
    }

    componentDidMount() {

        if (!this.state.data.length) {
            return;
        }

        this.slideWidth = this.getSlidersWidth();
        this.setResizeListener();
        this.mouseDownListeners();
        this.autoplay();
        this.resizeView();

        setTimeout(() => {
            this.resizeView();
        }, 300);
    }

    componentWillUnmount() {
        this.setResizeListener(false);
        this.mouseDownListeners(false);
        this.mouseMoveListeners(false);
    }

    autoplay(reattach = true) {
        const { autoplay } = this.state;
        clearTimeout(this.timeouter);

        if (autoplay && reattach) {
            const { autoplayTime, autoplayNext } = this.state;

            this.timeouter = setTimeout(() => {
                autoplayNext ? this.slideNext() : this.slidePrevious();
                this.autoplay();
            }, autoplayTime);
        }
    }

    setResizeListener(attach = true) {
        window.removeEventListener('resize', this.resizeView);

        if (attach) {
            window.addEventListener('resize', this.resizeView);
        }
    }

    resizeView() {
        this.setSlidesWidth();
        this.slideWidth = this.getSlidersWidth();

        const { itemsPerLine, index, itemsXS, itemsS, itemsL, itemsXL, resizeS, resizeL, resizeXL } = this.state;
        const docWidth = document.documentElement.getBoundingClientRect().width;

        let temp_itemsPerLine = itemsPerLine;
        let temp_index = index;
        let apply = false;

        if (docWidth < resizeS) {
            temp_itemsPerLine = itemsXS;
            temp_index = 0;
            apply = true;
        }

        if (docWidth < resizeL && docWidth >= resizeS && !apply) {
            temp_itemsPerLine = itemsS;
            temp_index = 0;
            apply = true;
        }

        if (docWidth < resizeXL && docWidth >= resizeL && !apply) {
            temp_itemsPerLine = itemsL;
            temp_index = 0;
            apply = true;
        }

        if (docWidth > resizeXL) {
            temp_itemsPerLine = itemsXL;
            temp_index = 0;
            apply = true;
        }

        if (apply) {
            return this.setState({
                itemsPerLine: temp_itemsPerLine,
                index: temp_index,
            }, this.slide);
        }

        this.slide();
    }

    setSlidesWidth() {
        this.setState({
            slidesWidth: this.getSlidersWidth() * this.getDataLength() - 1,
            slideWrapperWidth: (this.getSlidersWidth() * this.getDataLength() - 1) / this.getDataLength() - 1,
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
     * Pagination
     * ##############################
     */
    setSlide(activeIndex) {
        this.isClickOnActionButton = true;
        this.autoplay(false);

        if (typeof '8' == typeof activeIndex) {
            activeIndex = parseInt(activeIndex);
        }

        this.setState({ index: activeIndex }, () => {
            this.slide();
            this.autoplay();
        });
    }

    slide(i = null) {
        let  { index } = this.state;

        if(null !== i){
            index = i;
        }

        let width = index * this.state.slideWrapperWidth;
        const maxWidth = (this.slideWidth * (this.getDataLength()));

        if (width > maxWidth) {
            width = maxWidth;
        }

        this.setState({
            index,
            slidesTransform: `translate3d(-${width}px,0,0)`,
        }, () => {
            this.userMoving = false;
            this.isClickOnActionButton = false;
        });
    }

    slidePrevious() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        let { index } = this.state;

        if (index === 0) {
            if (this.state.wrapDirection) {
                // Change to the last in index
                index = this.getDataLength();
            }
            else {
                // hold current position
                index = 1;
            }
        }

        index -= 1;
        this.setState({ index }, () => {
            this.slide();
            this.autoplay();
        });
    }

    slideNext() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        let { index } = this.state;

        if (index === this.getDataLength() - 1) {

            if (this.state.wrapDirection) {
                // Change to the first in index
                index = -1;
            }
            else {
                // hold current position
                index = this.getDataLength() - 2;
            }
        }

        index += 1;
        this.setState({ index }, () => {
            this.slide();
            this.autoplay();
        });
    }

    getButtonPreviousJsx() {
        const { buttonsAlwaysVisible, previous } = this.state;
        let { index } = this.state;

        if ((index > 0 && 2 <= this.getDataLength()) || buttonsAlwaysVisible) {

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
        const { buttonsAlwaysVisible, next } = this.state;
        let { index } = this.state;

        if (index < this.getDataLength() - 1 || buttonsAlwaysVisible) {

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
        const { displayDotsIndex, index, data } = this.state;

        if (2 > this.getDataLength()) {
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
                        this.getDataLength(true).map((x, i) => {
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
        return 'r' == this.getDirection() && this.state.index < this.getDataLength() - 1;
    }

    allowSlideLeft() {
        return 'l' == this.getDirection() && 0 < this.state.index;
    }

    maxMoveAxisX() {
        return this.slideWidth * (this.getDataLength() - 1);
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

        this.setState({
            isUserCurrentlySliding: true
        });

        this.handleMouseDown(e);
        this.autoplay(false);
    }

    handleMouseDown(event) {
        if (this.state.useLayerX) {
            this.mousestartx = event.layerX;
        }
        else {
            this.mousestartx = event.clientX;
        }
        this.mousedataClicksStart = performance.now();
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
        this.userMoving = true;

        if (this.blockMove) {
            this.mouseMoveListeners(false);
            return;
        }

        const { index, inlineStyle } = this.state;
        // Calculate distance to translate holder.
        if (this.state.useLayerX) {
            this.movex = index * this.slideWidth + (this.mousestartx - event.layerX);
        }
        else {
            this.movex = index * this.slideWidth + (this.mousestartx - event.clientX);
        }
        // mouse direction
        this.setDirection(event.pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.slideWidth - this.movex));

        if (this.movex < this.maxMoveAxisX() && this.transformer) {
            // Inline style = avoid flipping while fast mouse moving
            if (inlineStyle) {
                return this.transformer.style.transform = `translate3d(-${this.movex}px,0,0)`;
            }

            this.setState({
                slidesTransform: `translate3d(-${this.movex}px,0,0)`
            });
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

        if (this.getAbs() >= slideAfterMove) {
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
            this.oldX = 0;
            this.mouseMoveListeners(false);
            this.autoplay();
            this.slide(index);
        });
    }

    handleMouseLeave() {
        let { index, slideAfterMove } = this.state;
        this.blockMove = true;

        if (this.userMoving) {

            if (this.getAbs() >= slideAfterMove) {
                if (this.allowSlideRight()) {
                    index += 1;
                }
                if (this.allowSlideLeft()) {
                    index -= 1;
                }
            }

            this.userMoving = false;
            this.oldX = 0;
            this.mouseMoveListeners(false);
            this.autoplay();
            return this.setState({
                isUserCurrentlySliding: false
            }, () => {
                this.slide(index)
            });
        }
        
        this.setState({ 
            isUserCurrentlySliding: false
        });
    }

    handleClick() {
        this.blockMove = true;
        this.userMoving = false;
        this.mouseMoveListeners(false);

        this.setState({ 
            isUserCurrentlySliding: false
        });

        setTimeout(() => {
            this.blockMove = false;
        }, 100);
    }

    /**
     * ##############################
     * TOUCH
     * ##############################
     */
    handleTouchStart(event) {
        this.longTouch = false;
        this.mouseClicksStart = performance.now();
        this.blockMove = false;
        this.userMoving = false;
        this.autoplay(false);

        setTimeout(function () {
            this.longTouch = true;
        }, 250);

        // Get the original touch position.
        this.touchstartx = event.touches[0].pageX;

        this.setState({
            isUserCurrentlySliding: true
        });
    }

    handleTouchMove(event) {
        this.userMoving = true;

        if (this.blockMove) {
            return;
        }

        let { index, inlineStyle } = this.state;
        // Calculate distance to translate holder.
        this.movex = index * this.slideWidth + (this.touchstartx - event.touches[0].pageX);
        // mouse direction
        this.setDirection(event.touches[0].pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.slideWidth - this.movex));

        if (this.movex < this.maxMoveAxisX() && this.transformer) {
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

            if (this.getAbs() >= slideAfterMove || false == this.longTouch) {
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

    /**
     * Calculate dummy array for items.length calucation
     * - dots
     * - next slide action
     * - slide action 
     */
    getDataLength(getArray = false) {
        const { data, itemsPerLine } = this.state;
        const i = [];
        let t = [];

        for (let x = 0; x <= data.length - 1; x++) {

            if (data[x].data) {
                t.push(1);
            }

            if (itemsPerLine === t.length || t.length && x == data.length - 1) {
                i.push(1);
                t = [];
            }
        }

        if (getArray) {
            return i;
        }

        return i.length;
    }

    /**
     * Generate grouped cards
     */
    generateCards() {
        const { itemsPerLine, data } = this.state;

        if (!data || !data.length) {
            return [];
        }

        const cardsGroup = [];
        let card = [];

        for (let x = 0; x <= data.length - 1; x++) {

            if (data[x].data) {
                card.push(
                    <div key={`slide-item-${x}`} className='slide-item'>
                        {
                            data[x].data
                        }
                    </div>
                );
            }

            if (itemsPerLine === card.length || card.length && x == data.length - 1) {
                cardsGroup.push(
                    {
                        data: (
                            <div key={`slide-group-${x}`} className='slide-group'>
                                {
                                    card
                                }
                            </div>
                        )
                    }
                );
                card = [];
            }
        }

        return cardsGroup;
    }

    getPaginationType2() {
        const { data, displayDotsIndex, index, previous, next, slidersUuid, buttonsAlwaysVisible } = this.state;

        if (2 > this.getDataLength()) {
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
        if ((index > 0 && 2 <= this.getDataLength()) || buttonsAlwaysVisible) {
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
        this.getDataLength(true).map((x, i) => {
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
        if (index < this.getDataLength() - 1 || buttonsAlwaysVisible) {
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

    render() {
        const { addClass, defaultClass, id, staticData, paginationInside, allowMouseTouch, displayPagination, isUserCurrentlySliding, onSlideTime, animationTime, paginationType, dotsInside, displayDots, slidersUuid, slidesWidth, slidesTransform, slideWrapperWidth, itemsPerLine } = this.state;
        const data = this.generateCards();

        return (
            <div className={`${defaultClass} ${addClass}`} id={id}>
                {
                    staticData &&
                    <div className='static-data' key={`static-data-${slidersUuid}`}>
                        {
                            staticData
                        }
                    </div>
                }
                {
                    !paginationInside && displayPagination && 1 == paginationType && this.getButtonPreviousJsx()
                }
                {/* Need this wrapper to set a z-index lower then the page to avoid (on desktop the version) to execute the mousedown function (while using the pager). */}
                <div
                    key={`wrapper-${uuid}`}
                    className="slider-wrapper"
                    ref={(node) => (this.wrapper = node)}
                    // Mobile
                    {...((true == allowMouseTouch) && { onTouchStart: (e) => this.handleTouchStart(e) })}
                    {...((true == allowMouseTouch) && { onTouchMove: (e) => this.handleTouchMove(e) })}
                    {...((true == allowMouseTouch) && { onTouchEnd: (e) => this.handleTouchEnd(e) })}
                    // Desktop
                    {...((true == allowMouseTouch) && { onClick: (e) => this.handleClick(e) })}
                    {...((true == allowMouseTouch) && { onMouseUp: (e) => this.handleMouseUp(e) })}
                    {...((true == allowMouseTouch) && { onMouseLeave: (e) => this.handleMouseLeave(e) })}
                >
                    {
                        paginationInside && displayPagination && 1 == paginationType && this.getButtonPreviousJsx()
                    }
                    <div
                        ref={(node) => (this.transformer = node)}
                        key={`slides-transform-${slidersUuid}`}
                        className={`slides user-select-none animate-${animationTime} ${isUserCurrentlySliding && !this.isClickOnActionButton ? `animate-${onSlideTime}` : ''}`}
                        style={{
                            transform: `${slidesTransform}`,
                            width: `${slidesWidth}px`,
                        }}
                    >
                        {0 !== data.length && data.map((source, i) => {
                            const { data } = source;

                            return (
                                <div
                                    key={`slide-wrapper-${slidersUuid}-${i}`}
                                    className="slide-wrapper"
                                    style={{
                                        width: `${slideWrapperWidth}px`,
                                    }}
                                >
                                    <div className="slide">
                                        <div
                                            className={`slide-data`}
                                        >
                                            {
                                                data && data
                                            }
                                        </div>
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
                    !paginationInside && displayPagination && 1 == paginationType && this.getButtonNextJsx()
                }
                {
                    displayDots && !dotsInside && 1 == paginationType && this.getDotsJsx()
                }
                {
                    2 == paginationType && !paginationInside && this.getPaginationType2()
                }
            </div>
        );
    }
}

export default SliderItems;
