import React from 'react';
import isObject from '../../_Functions/isObject';
import PropsCheck from '../internalFunctions/PropsCheck';
import internalUuid from '../internalFunctions/internalUuid';

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.handlePointerup = this.handlePointerup.bind(this);
        this.handlePointermove = this.handlePointermove.bind(this);
        this.handlePointerdown = this.handlePointerdown.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.persistTransformation = this.persistTransformation.bind(this);
        this.init = this.init.bind(this);

        this.state = {
            // App
            currentStep: 0,
            steps: 2,
            transform: "rotateX(0deg) rotateY(0deg)",
            animationPlayState: 'running',
            uuid: `${internalUuid()}`,
            // User
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-image-carousel',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            allowMouseTouch: typeof true === typeof props.allowMouseTouch ? props.allowMouseTouch : true,
            inlineStyle: typeof true === typeof props.inlineStyle ? props.inlineStyle : false,
            useLayerX: typeof true === typeof props.useLayerX ? props.useLayerX : false,
            transformationTime: props.transformationTime && typeof 8 === typeof props.transformationTime && 0 < props.transformationTime ? props.transformationTime : 1000,
            autoplay: typeof true === typeof props.autoplay ? props.autoplay : true,
            autoplayTime: typeof 8 === typeof props.autoplayTime ? props.autoplayTime : -60,
            nodeListener: typeof true === typeof props.nodeListener ? props.nodeListener : true,
            disableX: typeof true === typeof props.disableX ? props.disableX : false,
            disableY: typeof true === typeof props.disableY ? props.disableY : false,
            innerData: props.innerData ? props.innerData : '',
            onStartAnimation: typeof true === typeof props.onStartAnimation ? props.onStartAnimation : true,
            onStartDirection: props.onStartDirection && typeof '8' == typeof props.onStartDirection && ['right', 'left'].includes(props.onStartDirection) ? props.onStartDirection : 'right',
        };

        this.transformY = 10;
        this.transformX = 0;

        this.destinationX = 0;
        this.destinationY = 0;

        this.rootNodesCrouselInterval = undefined;

        this.radius = props.radius && typeof 8 === typeof props.radius ? props.radius: 240; // how big of the radius
        this.oldX = 0;
        this.oldY = 0;
        this.newX = 0;
        this.newY = 0;
        this.isMouseDown = false;
        this.userMoved = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'id', 'defaultClass', 'data', 'allowMouseTouch', 'inlineStyle', 'useLayerX', 'transformationTime', 'autoplay', 'autoplayTime', 'nodeListener', 'disableX', 'disableY', 'innerData', 'onStartAnimation', 'onStartDirection'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-image-carousel',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                allowMouseTouch: typeof true === typeof props.allowMouseTouch ? props.allowMouseTouch : true,
                inlineStyle: typeof true === typeof props.inlineStyle ? props.inlineStyle : false,
                useLayerX: typeof true === typeof props.useLayerX ? props.useLayerX : false,
                transformationTime: props.transformationTime && typeof 8 === typeof props.transformationTime && 0 < props.transformationTime ? props.transformationTime : 1000,
                autoplay: typeof true === typeof props.autoplay ? props.autoplay : true,
                autoplayTime: typeof 8 === typeof props.autoplayTime ? props.autoplayTime : -60,
                nodeListener: typeof true === typeof props.nodeListener ? props.nodeListener : true,
                disableX: typeof true === typeof props.disableX ? props.disableX : false,
                disableY: typeof true === typeof props.disableY ? props.disableY : false,
                innerData: props.innerData ? props.innerData : '',
                onStartAnimation: typeof true === typeof props.onStartAnimation ? props.onStartAnimation : true,
                onStartDirection: props.onStartDirection && typeof '8' == typeof props.onStartDirection && ['right', 'left'].includes(props.onStartDirection) ? props.onStartDirection : 'right',
            };
        }

        return null;
    }

    componentDidMount() {

        if(this.state.onStartAnimation){
            setTimeout(() => {
                this.init();
            }, 100);
        }
        else{
            this.init(0);
        }

        this.attachCarouselListener();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    attachCarouselListener() {

        if (this.state.allowMouseTouch) {

            if(this.state.nodeListener){
                return this.rootNode.addEventListener('pointerdown', this.handlePointerdown);
            }

            document.addEventListener('pointerdown', this.handlePointerdown);
        }
    }

    attachCarouselActionsHanlders() {

        if(this.state.nodeListener){
            this.rootNode.addEventListener('mousewheel', this.handleMouseWheel);
            this.rootNode.addEventListener('pointermove', this.handlePointermove);
            return this.rootNode.addEventListener('pointerup', this.handlePointerup);
        }

        document.addEventListener('mousewheel', this.handleMouseWheel);
        document.addEventListener('pointermove', this.handlePointermove);
        document.addEventListener('pointerup', this.handlePointerup);
    }

    removeListeners() {

        if(this.state.nodeListener){
            this.rootNode.removeEventListener('mousewheel', this.handleMouseWheel);
            this.rootNode.removeEventListener('pointermove', this.handlePointermove);
            return this.rootNode.removeEventListener('pointerup', this.handlePointerup);
        }

        document.removeEventListener('mousewheel', this.handleMouseWheel);
        document.removeEventListener('pointermove', this.handlePointermove);
        document.removeEventListener('pointerup', this.handlePointerup);
    }

    addAttributeString(currentString = '', attrName = '', attrVal = '') {
        return `${currentString}${attrName}:${attrVal};`;
    }

    setNodesAttribute(node, attr, val) {
        if (node) {

            if (node.getAttribute(attr)) {
                node.removeAttribute(attr);
            }

            node.setAttribute(attr, val);
        }
    }

    handleMouseLeave(){
        this.handleMouseDown(false);
        this.removeListeners();
    }

    init(delayTime) {
        const styleTransition = `transform ${this.state.transformationTime}ms`;
        const { data } = this.state;

        // Apply inline style
        if (this.state.inlineStyle && this.rootNode) {
            const images = this.rootNode.getElementsByTagName("img");
            let inline = '';

            for (var x = 0; x <= images.length-1; x++) {
                inline = this.addAttributeString(inline, 'transform', `rotateY(${undefined === delayTime && 'left' === this.state.onStartDirection?'-':''}${x * (360 / images.length)}deg) translateZ(${this.radius}px)`);
                inline = this.addAttributeString(inline, 'transition', styleTransition);
                inline = this.addAttributeString(inline, 'transition-delay', `${delayTime || ((data.length - x) / 4)}s`);
                this.setNodesAttribute(images[x], 'style', inline);
            }

            return;
        }

        // Apply style by state
        for (let x = 0; x <= data.length - 1; x++) {
            
            if(undefined === data[x].props){
                data[x].props = {};
            }

            if(undefined === data[x].props.style){
                data[x].props.style = {};
            }
            
            data[x].props.style.transform = `rotateY(${undefined === delayTime && 'left' === this.state.onStartDirection?'-':''}${x * (360 / data.length - 1)}deg) translateZ(${this.radius}px)`;
            data[x].props.style.transition = styleTransition;
            data[x].props.style.transitionDelay = `${delayTime || (data.length - 1 - x) / 4}s`;
        }

        this.setState({ data });
    }

    persistTransformation() {

        if (0 > this.transformY) {
            this.transformY = 0
        }

        if (180 < this.transformY) {
            this.transformY = 180;
        }

        const transform = `rotateX(-${this.state.disableY ? 0 : this.transformY}deg) rotateY(${this.state.disableX ? 0 : this.transformX}deg)`;

        if (this.state.inlineStyle && this.dragContainer.style.transform !== transform) {
            return this.dragContainer.style.transform = transform;
        }

        if(this.state.transform !== transform){
            this.setState({ transform });
        }
    }

    playSpin(run) {
        const animationPlayState = run ? "running" : "paused";

        if (this.state.inlineStyle && this.dragContainer.style.animationPlayState !== animationPlayState) {
            return this.dragContainer.style.animationPlayState = animationPlayState;
        }

        if(this.state.animationPlayState !== animationPlayState){
            this.setState({ animationPlayState });
        }
    }

    handleMouseWheel(e) {
        var d = e.wheelDelta / 20 || -e.detail;
        this.radius += d;
        this.init(1000);
    }

    handlePointerdown(e) {
        clearInterval(this.rootNodesCrouselInterval);
        this.attachCarouselActionsHanlders();

        if (this.state.useLayerX) {
            this.oldX = e.layerX,
            this.oldY = e.layerY;
        }
        else {
            this.oldX = e.clientX,
            this.oldY = e.clientY;
        }

        this.userMoved = false;
        this.handleMouseDown(true);
    }

    handleMouseDown(isMouseDown){

        if(!this.state.inlineStyle && this.state.isMouseDown !== isMouseDown){
            return this.setState({ isMouseDown });
        }

        if(isMouseDown !== this.isMouseDown){
            this.isMouseDown = isMouseDown;
            this.spinContainer.style.animation = `${this.state.autoplay ? `${this.state.autoplayTime > 0 ? `${this.isMouseDown ? 'paused' : ''} rrImageCarouselSpin` : `${this.isMouseDown ? 'paused' : ''} rrImageCarouselSpinRevert`} ${Math.abs(this.state.autoplayTime)}s infinite linear` : ''}`
        }
    }

    handlePointermove(e) {
        this.userMoved = true;

        if (this.state.useLayerX) {
            this.newX = e.layerX;
            this.newY = e.layerY;
        }
        else {
            this.newX = e.clientX;
            this.newY = e.clientY;
        }

        this.destinationX = this.newX - this.oldX;
        this.destinationY = this.newY - this.oldY;

        this.transformX += this.destinationX * 0.1;
        this.transformY += this.destinationY * 0.1;

        this.persistTransformation();

        this.oldX = this.newX;
        this.oldY = this.newY;
    }

    handlePointerup() {
        this.removeListeners();
        this.handleMouseDown(false);
    }

    handleClick(o){
        (o.callback)(o.callbackProps);
    }

    render() {
        const { defaultClass, addClass, id, transform, animationPlayState, data, innerData, uuid } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass} flex`}
                id={id}
                ref={x => this.rootNode = x}
                {...(this.state.allowMouseTouch && this.state.nodeListener) && { onMouseLeave: () => this.handleMouseLeave() }}
            >
                <div
                    ref={x => this.dragContainer = x}
                    className="drag-container"
                    style={{ transform, animationPlayState }}
                >
                    <div
                        className="spin-container user-select-none"
                        ref={x => this.spinContainer = x}
                        style={{
                            animation: `${this.state.autoplay ? `${this.state.autoplayTime > 0 ? `${this.state.isMouseDown ? 'paused' : ''} rrImageCarouselSpin` : `${this.state.isMouseDown ? 'paused' : ''} rrImageCarouselSpinRevert`} ${Math.abs(this.state.autoplayTime)}s infinite linear` : ''}`
                        }}
                    >
                        {
                            data && 0 !== data.length &&
                            data.map( (o, i) => {

                                if (isObject(o) && isObject(o.props)) {
                                    return (
                                        <img 
                                            className='carousel-image'
                                            key={`carousel-image-${i}-${uuid}`}
                                            {...o.props} 
                                            {...(o.callback && typeof function(){} === typeof o.callback) && { onClick: () => this.handleClick(o) }}
                                        />
                                    )
                                }
                            })
                        }
                        {
                            innerData &&
                            <div className='carousel-inner-data'>
                                {
                                    innerData
                                }
                            </div>
                        }
                    </div>
                    <div
                        className="ground"
                        style={
                            {
                                width: `${this.radius * 3}px`,
                                height: `${this.radius * 3}px`,
                            }
                        }
                    >

                    </div>
                </div>
            </div>
        );
    }
}

export default ImageCarousel;
