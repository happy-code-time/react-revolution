import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import isArray from '../../_Functions/isArray';
import isObject from '../../_Functions/isObject';
import isInViewport from '../../_Functions/isInViewport';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Box extends React.Component 
{
    constructor(props) {
        super(props);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);

        this.state = {
            /**
             * App
             */
            uuid: `${internalUuid()}`,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Box',
            id: isString(props.id) ? props.id : '',
            direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'right',
            type: props.type && typeof '8' == typeof props.type && ['10','20','30','40','50','60','70','80','90','100'].includes(props.type) ? props.type : '30',
            animation: props.animation && typeof '8' == typeof props.animation && ['mount', 'scroll'].includes(props.animation) ? props.animation : 'scroll',
            scrollAdd: props.scrollAdd && typeof 8 === typeof props.scrollAdd && 0 < props.scrollAdd ? props.scrollAdd : 0,
            animationTime: props.animationTime && typeof 8 === typeof props.animationTime && 0 < props.animationTime ? props.animationTime : 300,
            data: isArray(props.data) ? props.data : [],
            itemsPerLine: props.itemsPerLine && typeof 8 === typeof props.itemsPerLine && 0 < props.itemsPerLine ? props.itemsPerLine : 3,
            animationDelay: props.animationDelay && typeof 8 === typeof props.animationDelay && 0 < props.animationDelay ? props.animationDelay : 50,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'id',  'direction', 'type', 'animation', 'animationTime', 'data', 'itemsPerLine', 'animationDelay', 'scrollAdd'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                direction: props.direction && typeof '8' == typeof props.direction && ['right', 'left'].includes(props.direction) ? props.direction : 'right',
                type: props.type && typeof '8' == typeof props.type && ['10','20','30','40','50','60','70','80','90','100'].includes(props.type) ? props.type : '30',
                animation: props.animation && typeof '8' == typeof props.animation && ['mount', 'scroll'].includes(props.animation) ? props.animation : 'scroll',
                scrollAdd: props.scrollAdd && typeof 8 === typeof props.scrollAdd && 0 < props.scrollAdd ? props.scrollAdd : 0,
                animationTime: props.animationTime && typeof 8 === typeof props.animationTime && 0 < props.animationTime ? props.animationTime : 300,
                data: isArray(props.data) ? props.data : [],
                itemsPerLine: props.itemsPerLine && typeof 8 === typeof props.itemsPerLine && 0 < props.itemsPerLine ? props.itemsPerLine : 3,
                animationDelay: props.animationDelay && typeof 8 === typeof props.animationDelay && 0 < props.animationDelay ? props.animationDelay : 50,
            };
        }

        return null;
    }

    componentDidMount() {
        const { animation } = this.state;

        if('scroll' === animation){
            this.setMarginTop();
            return this.setScrollListener();
        }

        if('mount' === animation){
            this.executeAnimation();
        }
    }

    componentWillUnmount() {
        if('scroll' === this.state.animation){
            this.setScrollListener(false);
        }
    }

    setScrollListener(attach = true){
        window.removeEventListener('scroll', this.handleScrollEvent);

        if(attach){
            window.addEventListener('scroll', this.handleScrollEvent);
        }
    }

    handleScrollEvent() {
        if(isInViewport(this.boxesReference, this.state.scrollAdd)){
            this.executeAnimation();
        }
    }

    setMarginTop(){
        const { data } = this.state;

        if(0 === data.length){
            return;
        }

        for(let x = 0; x <= data.length-1; x++){

            if(undefined === data[x].marginTop){
                data[x].marginTop = `${this.state.type}px`;
            }
        }

        this.setState({ data });
    }

    executeAnimation() {
        const { data } = this.state;

        if(0 === data.length){
            return;
        }

        const { itemsPerLine, type, animationTime, animationDelay, direction } = this.state;
        let persist = false;
        let c = 'left' === direction ? 0 : itemsPerLine;
        let ca = 0;

        for(let x = 0; x <= data.length-1; x++){

            if(undefined === data[x].animation){
                persist = true;

                if(undefined === data[x].marginTop){
                    data[x].marginTop = `${type}px`;
                }

                data[x].animation = `animationRrBoxesFromTop${type} ${animationTime}ms forwards ease-in`;
                data[x].animationDelay = `${c*animationDelay}ms`;
            }

            if('left' === direction){
                c += 1;
            }

            if('right' === direction){
                c -= 1;

                if(x !== 0 && c % itemsPerLine == 0){
                    ca += 1;
                    c = itemsPerLine+(itemsPerLine*ca);
                }
            }
        }

        if(persist){
            // Persist animation
            this.setState({ data });
        }
    }

    handleClick(o) {
        (o.callback)(o.callbackProps);
    }

    getDataJsx(){
        const { data, itemsPerLine, uuid } = this.state;

        if(0 === data.length){
            return;
        }

        const jsx = [];
        let group = [];

        for(let x = 0; x <= data.length-1; x++){
            
            const stl = {};

            if(data[x].animation){
                stl.animation = data[x].animation;
            }

            if(data[x].marginTop){
                stl.marginTop = data[x].marginTop;
            }

            if(data[x].animationDelay){
                stl.animationDelay = data[x].animationDelay;
            }

            group.push(
                <div 
                    key={`box-item-${x}-${uuid}`}
                    className={`box-item`}
                    style={stl}
                    {...(isObject(data[x].props)) && {...data[x].props}}
                    {...(data[x].callback && typeof function () { } === typeof data[x].callback) && { onClick: () => this.handleClick(data[x]) }}
                >
                    {
                        data[x].data && data[x].data
                    }
                </div>
            );

            if((x === data.length-1 && group.length) || (x !== 0 && group.length % itemsPerLine === 0)){

                jsx.push(
                    <div 
                        key={`box-group-${x}-${uuid}`}
                        className='box-group flex'
                    >
                        {
                            group
                        }
                    </div>
                );

                group = [];
            }
        }

        return jsx;
    }

    render() {
        const { addClass, defaultClass, id } = this.state;

        return (
            <div 
                className={`${defaultClass} ${addClass}`} 
                {...isString(id) && '' !== id && { id: id } }
                ref={ x => this.boxesReference = x }
            >
                {
                    this.getDataJsx()
                }
            </div>

        );
    }
}
export default Box;
