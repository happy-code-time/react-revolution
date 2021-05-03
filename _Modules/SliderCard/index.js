import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import uuid from '../internalFunctions/internalUuid';

class SliderCard extends React.Component 
{
    constructor(props) 
    {
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
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'SliderCard',
            id: isString(props.id) ? props.id : '',
            data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
            slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
            slidersUuid: props.uuid && typeof '8' === typeof props.uuid ? props.uuid : `${uuid()}`,
            displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
            paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
            next: props.next ? props.next : '>',
            previous: props.previous ? props.previous : '<',
            docWidth: document.documentElement.getBoundingClientRect().width,
            dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside2 : true,
            displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
            displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
            // data root holder
            slidesTransform: `translate3d(-0px,0,0)`,
            slidesWidth: 100,
            // each single image holder
            slideWrapperWidth: '100%',
            // each single img tag
            dataTransform: `translate3d(-0px,0,0)`,
            // cards count in single row
            itemsXS: props.itemsXS && typeof 8 == typeof props.itemsXS ? props.itemsXS : 1,
            itemsS: props.itemsS && typeof 8 == typeof props.itemsS ? props.itemsS : 2,
            itemsL: props.itemsL && typeof 8 == typeof props.itemsL ? props.itemsL : 3,
            itemsXL: props.itemsXL && typeof 8 == typeof props.itemsXL ? props.itemsXL : 4,
            // cards count based on document width
            resizeS: props.resizeS && typeof 8 == typeof props.resizeS ? props.resizeS : 768,
            resizeL: props.resizeL && typeof 8 == typeof props.resizeL ? props.resizeL : 1024,
            resizeXL: props.resizeXL && typeof 8 == typeof props.resizeXL ? props.resizeXL : 1260,
            itemsPerLine: props.itemsXS && typeof 8 == typeof props.itemsXS ? props.itemsXS : 1,
            isUserCurrentlySliding: false,
            // items slide
            index: 0,
            // items to slide on button action
            slideItemsXS: props.slideItemsXS && typeof 8 == typeof props.slideItemsXS ? props.slideItemsXS : 1,
            slideItemsS: props.slideItemsS && typeof 8 == typeof props.slideItemsS ? props.slideItemsS : 2,
            slideItemsL: props.slideItemsL && typeof 8 == typeof props.slideItemsL ? props.slideItemsL : 3,
            slideItemsXL: props.slideItemsXL && typeof 8 == typeof props.slideItemsXL ? props.slideItemsXL : 4,
            paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
            autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
            autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
            autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
            animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
            allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
            buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
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
        this.userMoving = false;
        this.mouseClicksStart = 0;

        this.oldX = 0;
        this.mouseDirection = undefined;
        this.isClickOnActionButton = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['staticData', 'slideAfterMove', 'useLayerX', 'dotsInside', 'onSlideTime', 'inlineStyle', 'displayDots', 'buttonsAlwaysVisible', 'wrapDirection', 'itemsXS', 'allowMouseTouch', 'autoplay', 'autoplayTime', 'autoplayNext', 'animationTime', 'displayDotsIndex', 'paginationType', 'paginationInside', 'itemsS', 'itemsL', 'itemsXL', 'resizeS', 'resizeL', 'resizeXL', 'slideItemsXS', 'slideItemsS', 'slideItemsL', 'slideItemsXL', 'addClass', 'defaultClass',  'id', 'data', 'next', 'previous', 'displayPagination'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'SliderCard',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
                next: props.next ? props.next : '>',
                previous: props.previous ? props.previous : '<',
                slideAfterMove: typeof 8 == typeof props.slideAfterMove ? props.slideAfterMove : 50,
                paginationInside: typeof true == typeof props.paginationInside ? props.paginationInside : true,
                displayPagination: typeof true == typeof props.displayPagination ? props.displayPagination : true,
                // cards count in single row
                itemsXS: props.itemsXS && typeof 8 == typeof props.itemsXS ? props.itemsXS : 1,
                itemsS: props.itemsS && typeof 8 == typeof props.itemsS ? props.itemsS : 2,
                itemsL: props.itemsL && typeof 8 == typeof props.itemsL ? props.itemsL : 3,
                itemsXL: props.itemsXL && typeof 8 == typeof props.itemsXL ? props.itemsXL : 4,
                // cards count based on document width
                resizeS: props.resizeS && typeof 8 == typeof props.resizeS ? props.resizeS : 768,
                resizeL: props.resizeL && typeof 8 == typeof props.resizeL ? props.resizeL : 1024,
                resizeXL: props.resizeXL && typeof 8 == typeof props.resizeXL ? props.resizeXL : 1140,
                slideItemsXS: props.slideItemsXS && typeof 8 == typeof props.slideItemsXS ? props.slideItemsXS : 1,
                slideItemsS: props.slideItemsS && typeof 8 == typeof props.slideItemsS ? props.slideItemsS : 2,
                slideItemsL: props.slideItemsL && typeof 8 == typeof props.slideItemsL ? props.slideItemsL : 3,
                slideItemsXL: props.slideItemsXL && typeof 8 == typeof props.slideItemsXL ? props.slideItemsXL : 4,
                dotsInside: typeof true == typeof props.dotsInside ? props.dotsInside2 : true,
                displayDots: typeof true == typeof props.displayDots ? props.displayDots : true,
                displayDotsIndex: typeof true == typeof props.displayDotsIndex ? props.displayDotsIndex : false,
                paginationType: props.paginationType && typeof 8 == typeof props.paginationType && 0 < props.paginationType && 2 <= props.paginationType ? props.paginationType : 1,
                autoplay: typeof true == typeof props.autoplay ? props.autoplay : false,
                autoplayTime: props.autoplayTime && typeof 8 == typeof props.autoplayTime && 0 < props.autoplayTime ? props.autoplayTime : 5000,
                autoplayNext: typeof true == typeof props.autoplayNext ? props.autoplayNext : true,
                animationTime: (props.animationTime && typeof '8' == typeof props.animationTime) ? props.animationTime : '06',
                allowMouseTouch: typeof true == typeof props.allowMouseTouch ? props.allowMouseTouch : true,
                buttonsAlwaysVisible: typeof true == typeof props.buttonsAlwaysVisible ? props.buttonsAlwaysVisible : false,
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

        const { index, itemsPerLine, itemsXS, itemsS, itemsL, itemsXL, resizeS, resizeL, resizeXL, slideItems, slideItemsXS, slideItemsS, slideItemsL, slideItemsXL } = this.state;
        const docWidth = document.documentElement.getBoundingClientRect().width;

        let temp_itemsPerLine = itemsPerLine;
        let temp_slideItems = slideItems;
        let temp_index = index;
        let apply = false;

        if (docWidth < resizeS) {
            temp_itemsPerLine = itemsXS;
            temp_slideItems = slideItemsXS;
            temp_index = 0;
            apply = true;
        }

        if (docWidth < resizeL && docWidth >= resizeS && !apply) {
            temp_itemsPerLine = itemsS;
            temp_slideItems = slideItemsS;
            temp_index = 0;
            apply = true;
        }

        if (docWidth < resizeXL && docWidth >= resizeL && !apply) {
            temp_itemsPerLine = itemsL;
            temp_slideItems = slideItemsL;
            temp_index = 0;
            apply = true;
        }

        if (docWidth > resizeXL) {
            temp_itemsPerLine = itemsXL;
            temp_slideItems = slideItemsXL;
            temp_index = 0;
            apply = true;
        }

        if (apply) {
            return this.setState({
                itemsPerLine: temp_itemsPerLine,
                slideItems: temp_slideItems,
                index: temp_index,
            }, this.slide);
        }
    }

    setSlidesWidth() {
        this.setState({
            slidesWidth: (this.getSlidersWidth() * this.getDataLength()),
            slideWrapperWidth: (this.getSlidersWidth() * this.getDataLength() - 1) / this.getDataLength() - 1,
        }, () => {
            this.isClickOnActionButton = false;
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
    setSlide(index) {
        this.isClickOnActionButton = true;
        this.autoplay(false);

        if (typeof '8' == typeof index) {
            index = parseInt(index);
        }

        this.setState({ index }, () => {
            this.slide();
            this.autoplay();
        });
    }

    getMaxSlidesWidth() {
        return (this.getDataLength() - 1) * this.getSlidersWidth();
    }

    getIndexDirectionLeft() {
        let index = this.state.index - 1;

        if (0 > index) {

            if (this.state.wrapDirection) {
                // Change to the last in index
                index = this.getDataLength() - 1;
            }
            else {
                // hold current position
                index = 0;
            }
        }

        return index;
    }

    getIndexDirectionRight() {
        let index = this.state.index + 1;

        if (index > this.getDataLength() - 1) {

            if (this.state.wrapDirection) {
                // Change to the first in index
                index = 0;
            }
            else {
                // hold current position
                index = this.getDataLength() - 1;
            }
        }

        return index;
    }

    slidePrevious() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        this.setState({ index: this.getIndexDirectionLeft() }, () => {
            this.slide();
            this.autoplay();
        });
    }

    slideNext() {
        this.isClickOnActionButton = true;
        this.autoplay(false);
        this.setState({ index: this.getIndexDirectionRight() }, () => {
            this.slide();
            this.autoplay();
        });
    }

    getCurrentSlidersTransformation() {
        return ((this.state.index * this.state.slideItems) * this.getSingleCardsWidth());
    }

    slide() {
        let width = this.getCurrentSlidersTransformation();

        if (this.state.index == 0) {
            width = 0;
        }

        const maxWidth = this.getMaxSlidesWidth();

        if (width > maxWidth) {
            width = maxWidth;
        }

        this.setState({
            dataTransform: `translate3d(-(${0})px,0,0)`,
            slidesTransform: `translate3d(-${width}px,0,0)`,
        }, this.setSlidesWidth);
    }

    getButtonPreviousJsx() {

        if (this.state.index > 0 && 2 <= this.getDataLength() || this.state.buttonsAlwaysVisible) {

            return (
                <span className="button-previous" onClick={() => this.slidePrevious()}>
                    {
                        this.state.previous
                    }
                </span>
            );
        }
    }

    getButtonNextJsx() {

        if (this.state.index < this.getDataLength() - 1 || this.state.buttonsAlwaysVisible) {
            return (
                <span className="button-next" onClick={() => this.slideNext()}>
                    {
                        this.state.next
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
        this.userMoving = true;

        if (this.blockMove) {
            this.mouseMoveListeners(false);
            return;
        }

        let { index, inlineStyle } = this.state;
        // Calculate distance to translate holder.
        const currentWidth = this.getCurrentSlidersTransformation();
        // Calculate distance to translate holder.
        if (this.state.useLayerX) {
            this.movex = currentWidth + (this.mousestartx - event.layerX);
        }
        else {
            this.movex = currentWidth + (this.mousestartx - event.clientX);
        }
        // mouse direction
        this.setDirection(event.pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.getSingleCardsWidth() - this.movex));

        if (this.movex < this.getMaxSlidesWidth() && this.transformer) {
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
            /**
             * Move forwards (right)
             */
            if ('r' == this.mouseDirection && index < this.getDataLength()-1) {
                index = this.getIndexDirectionRight();
            }
            /**
             * Move backwards (left)
             */
            if ('l' == this.mouseDirection && 0 !== index) {
                index = this.getIndexDirectionLeft();
            }
        }

        this.setState({
            isUserCurrentlySliding: false
        }, () => {
            this.oldX = 0;
            this.mouseMoveListeners(false);
            this.autoplay();
            this.setState({ index }, this.slide);
        });
    }

    handleMouseLeave() {
        let { index, slideAfterMove } = this.state;
        this.blockMove = true;

        if (this.userMoving) {

            if (this.getAbs() >= slideAfterMove) {
                /**
                 * Move forwards (right)
                 */
                if ('r' == this.mouseDirection && index < this.getDataLength()-1) {
                    index = this.getIndexDirectionRight();
                }
                /**
                 * Move backwards (left)
                 */
                if ('l' == this.mouseDirection && 0 !== index) {
                    index = this.getIndexDirectionLeft();
                }
            }

            this.userMoving = false;
            this.oldX = 0;
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
        const currentWidth = this.getCurrentSlidersTransformation();
        // Calculate distance to translate holder.
        if (this.state.useLayerX) {
            this.movex = currentWidth + (this.touchstartx - event.touches[0].pageX);
        }
        else {
            this.movex = currentWidth + (this.touchstartx - event.touches[0].pageX);
        }

        // mouse direction
        this.setDirection(event.touches[0].pageX);
        // save mouse movement in px value for mouseUp or leave
        this.setAbs(Math.abs(index * this.getSingleCardsWidth() - this.movex));

        if(this.movex >= this.getMaxSlidesWidth()){
            this.movex = this.getMaxSlidesWidth();
        }

        if (this.transformer) {
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
        this.blockMove = true;

        if (115 >= performance.now() - this.mouseClicksStart || !this.userMoving) {
            this.userMoving = false;
            return;
        }

        let { index, slideAfterMove } = this.state;
        const absMove = Math.abs(index * this.slideWidth - this.movex);

        if (absMove >= slideAfterMove || false == this.longTouch) {
            /**
             * Move forwards (right)
             */
            if ('r' == this.mouseDirection && index < this.getDataLength()-1) {
                index = this.getIndexDirectionRight();
            }
            /**
             * Move backwards (left)
             */
            if ('l' == this.mouseDirection && 0 !== index) {
                index = this.getIndexDirectionLeft();
            }
        }

        this.setState({
            isUserCurrentlySliding: false
        }, () => {
            this.userMoving = false;
            this.mouseMoveListeners(false);
            this.autoplay();
            this.setState({ index }, this.slide);
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

            /**
             * First slide
             */
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

    getSingleCardsWidth() {
        return (this.state.slideWrapperWidth / this.state.itemsPerLine);
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

        const cardStyle = {
            width: `${this.getSingleCardsWidth()}px`,
            margin: `0`,
        };

        for (let x = 0; x <= data.length - 1; x++) {

            if (data[x].data) {
                card.push(
                    <div key={`slide-item-${x}`} style={cardStyle} className='slide-item'>
                        <div className='data'>
                            {
                                data[x].data
                            }
                        </div>
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
        if (this.state.index > 0 && 2 <= this.getDataLength() || buttonsAlwaysVisible) {
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
        if (this.state.index < this.getDataLength() - 1 || buttonsAlwaysVisible) {
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
        const { addClass, defaultClass, staticData, id, displayDots, dotsInside, displayPagination, isUserCurrentlySliding, onSlideTime, allowMouseTouch, animationTime, paginationType, paginationInside, slidersUuid, slidesWidth, slidesTransform, dataTransform, slideWrapperWidth } = this.state;
        const data = this.generateCards();

        return (
            <div className={`${defaultClass} ${addClass} animate-${animationTime}`} {...isString(id) && '' !== id && { id: id } }>
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
                                            className={`slide-data animate-${animationTime}`}
                                            style={{
                                                transform: `${dataTransform}`,
                                            }}
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

export default SliderCard;
