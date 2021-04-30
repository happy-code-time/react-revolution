import React from 'react';
import isBoolean from '../../_Functions/isBoolean';
import isFunction from '../../_Functions/isFunction';
import isNumber from '../../_Functions/isNumber';
import isObject from '../../_Functions/isObject';
import isString from '../../_Functions/isString';
import uuid from '../../_Functions/uuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import keyPressed from '../../_Functions/keyPressed';

const getRangeSliderMaxValue = (props) => 
{
    const min =  isNumber(props.min) && 0 <= props.min ? parseInt(props.min) : 0;
    let max =  isNumber(props.max) && 0 <= props.max ? parseInt(props.max) : 100;

    if(max <= min)
    {
        max = min+1;
    }

    return max;
};

class Range extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleLineClick = this.handleLineClick.bind(this);
        /**
         * Mouse
         */
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
         /**
          * Touch
          */
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        /**
         * Mouse && Touch handlers
         */
        this.handleMoveStart = this.handleMoveStart.bind(this);
        this.handleMoveEnd = this.handleMoveEnd.bind(this);
        /**
         * References
         */
        this.setReference = this.setReference.bind(this);
        
        this.state = {
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Range',
            id: isString(props.id) ? props.id : '',
            min: isNumber(props.min) && 0 <= props.min ? parseInt(props.min) : 0,
            max: getRangeSliderMaxValue(props),
            size: isString(props.size) && ['xs', 's', 'l', 'xl'].includes(props.size) ? props.size : 'l',
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps,
            minMaxDisplay: isBoolean(props.minMaxDisplay) ? props.minMaxDisplay : true,
            minMaxInput: isBoolean(props.minMaxInput) ? props.minMaxInput : true,
            minMaxInputReadonly: isBoolean(props.minMaxInputReadonly) ? props.minMaxInputReadonly : false,
            minMaxY: isString(props.minMaxY) && ['top', 'bottom'].includes(props.minMaxY) ? props.minMaxY : 'bottom',
            minInputProps: isObject(props.minInputProps) ? props.minInputProps : {},
            maxInputProps: isObject(props.maxInputProps) ? props.maxInputProps : {},
            format: isString(props.format) && ['integer', 'float'].includes(props.format) ? props.format : 'integer',
            toFixed: isNumber(props.toFixed) && 0 <= props.toFixed ? parseInt(props.toFixed) : 2,
            minMaxInputAutoWidth: isBoolean(props.minMaxInputAutoWidth) ? props.minMaxInputAutoWidth : true,
            callbackOnEnter: isBoolean(props.callbackOnEnter) ? props.callbackOnEnter : true,
            backgroundLine: isString(props.backgroundLine) ? props.backgroundLine : '',
            backgroundMinMax: isString(props.backgroundMinMax) ? props.backgroundMinMax : '',
            // App
            uuid: `${uuid()}-${uuid()}`,
            currentStart: 0,
            currentEnd: isNumber(props.max) && 0 <= props.max ? parseInt(props.max) : 100,
            start: 0,
            end: 0,
            disableLineClick: false,
        };

        /**
         * Node references
         */
        this.reference_range = null;
        this.reference_line = null;
        this.reference_start = null;
        this.reference_end = null;

        this.mouseDirection_start = 'r';
        this.mouseDirection_end = 'l';
        this.oldx_start = 0;
        this.oldx_end = 0;
        this.current_moved = '';

        this.mouseDownPersistet = false;
        this.timeoutDisableLineClick = undefined;
        this.timeoutCheckMouseDownPersisted = undefined;

        this.allowedSize = {
            'xs' : {
                lineHeight: 1,
                width: 7,
                height: 7,
                top: -( (7-1) / 2 ),
            },
            's' : {
                lineHeight: 2,
                top: -17,
                width: 10,
                height: 10,
                top: -( (10-2) / 2 ),
            },
            'l' : {
                lineHeight: 3,
                width: 16,
                height: 16,
                top: -( (16-3) / 2 ),
            },
            'xl' : {
                lineHeight: 4,
                width: 20,
                height: 20,
                top: -( (20-4) / 2 ),
            },
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state)
    {
        if (
            PropsCheck(
                [
                    'addClass',
                    'id',
                    'min',
                    'max',
                    'size',
                    'minMaxDisplay',
                    'callback',
                    'callbackProps',
                    'callbackOnEnter',
                    'minMaxInput',
                    'minMaxInputReadonly',
                    'minMaxY',
                    'minInputProps',
                    'maxInputProps',
                    'format',
                    'toFixed',
                    'minMaxInputAutoWidth',
                    'backgroundLine',
                    'backgroundMinMax',
                ],
                props, 
                state
            )
        )
        {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                min: isNumber(props.min) && 0 <= props.min ? parseInt(props.min) : 0,
                max: getRangeSliderMaxValue(props),
                size: isString(props.size) && ['xs', 's', 'l', 'xl'].includes(props.size) ? props.size : '',
                minMaxDisplay: isBoolean(props.minMaxDisplay) ? props.minMaxDisplay : true,
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps,
                minMaxInput: isBoolean(props.minMaxInput) ? props.minMaxInput : true,
                minMaxInputReadonly: isBoolean(props.minMaxInputReadonly) ? props.minMaxInputReadonly : false,
                minMaxY: isString(props.minMaxY) && ['top', 'bottom'].includes(props.minMaxY) ? props.minMaxY : 'bottom',
                minInputProps: isObject(props.minInputProps) ? props.minInputProps : {},
                maxInputProps: isObject(props.maxInpu7tProps) ? props.maxInputProps : {},
                format: isString(props.format) && ['integer', 'float'].includes(props.format) ? props.format : 'integer',
                toFixed: isNumber(props.toFixed) && 0 <= props.toFixed ? parseInt(props.toFixed) : 2,
                minMaxInputAutoWidth: isBoolean(props.minMaxInputAutoWidth) ? props.minMaxInputAutoWidth : true,
                callbackOnEnter: isBoolean(props.callbackOnEnter) ? props.callbackOnEnter : true,
                backgroundLine: isString(props.backgroundLine) ? props.backgroundLine : '',
                backgroundMinMax: isString(props.backgroundMinMax) ? props.backgroundMinMax : '',
            };
        }

        return null;
    }

    componentDidMount()
    {
        this.setOutsideHandler();
    }

    componentWillUnmount()
    {
        this.setOutsideHandler(false);
    }

    /**
     * @param {boolean} attach 
     * 
     * @return {void}
     */
    setOutsideHandler(attach = true)
    {
        document.removeEventListener('click', this.handleClickOutside);
        
        if(attach)
        {
            document.addEventListener('click', this.handleClickOutside);
        }
    }

    /**
     * @param {MouseEvent} mouseEvent 
     * 
     * @return {void}
     */
    handleClickOutside(mouseEvent)
    {
        if(this.reference_range && !this.reference_range.contains(mouseEvent.target))
        {
            this.mouseMoveListeners(false);
        }
    }

    /**
     * @param {HTMLElement} x 
     * @param {string} ref 
     * 
     * @return {void}
     */
    setReference(x, ref)
    {
        this[`reference_${ref}`] = x;
    }

    /**
     * @return {void}
     */
    callback()
    {
        const { currentStart, currentEnd, callback, callbackProps } = this.state;

        if(callback)
        {
            (callback)(currentStart, currentEnd, callbackProps);
        }
    }

    /**
     * @return {int}
     */
    getSingleStepsWidth()
    {
        let step = 0;

        if(this.reference_range)
        {
            const swp = this.reference_range.getBoundingClientRect();

            if('integer' === this.state.format)
            {
                step = parseInt(swp.width);
                step = step/this.state.max;
            }
            
            if('float' === this.state.format)
            {
                step = parseFloat(swp.width);
                step = parseFloat(step/this.state.max);
            }
        }

        return step;
    }

    /**
     * @param {string} val 
     * 
     * @return {string}
     */
    FormatNumer(val)
    {
        const { toFixed } = this.state;

        if(!isString(val))
        {
            val = JSON.stringify(val);
        }

        let toReturn = val.replace(/[^0-9\.,]/g, '');
        toReturn = toReturn.replace(/,/g, '.');

        const splitted = toReturn.split('.');

        if (toReturn.split('.').length > toFixed) {
            toReturn = toReturn.replace(/[^0-9\.]/g, '');
            toReturn = parseFloat(toReturn).toFixed(toFixed);
        }

        if(splitted.length >= toFixed && undefined !== splitted[1] && null !== splitted[1])
        {
            toReturn = splitted[0] + '.' + splitted[1].substring(0 , toFixed);
        }

        return toReturn;
    }

    /**
     * @param {int} start
     * 
     * @return {int}
     */
    getCurrentStart(start)
    {
        if('integer' === this.state.format)
        {
            start = parseInt(start);
            start = parseInt(start/this.getSingleStepsWidth());
    
            if(isNaN(start))
            {
                start = this.state.min;
            }

            return Math.abs(start);
        }
        else
        {
            start = this.FormatNumer(start);
            start = parseFloat(start);
            start = parseFloat(start/this.getSingleStepsWidth());
            start = parseFloat(this.state.min-start);
    
            if(isNaN(start))
            {
                start = parseFloat(this.state.min);
            }
        }

        start = Math.abs(start);
        start = start.toFixed(this.state.toFixed);

        return parseFloat(start);
    }

    /**
     * @param {int} end
     * 
     * @return {int}
     */
    getCurrentEnd(end)
    {
        if('integer' === this.state.format)
        {
            end = parseInt(end);
            end = parseInt(end/this.getSingleStepsWidth());
            end = parseInt(this.state.max-end);
    
            if(isNaN(end))
            {
                end = this.state.max;
            }

            return Math.abs(end);
        }

        end = this.FormatNumer(end);
        end = parseFloat(end);
        end = parseFloat(end/this.getSingleStepsWidth());
        end = parseFloat(this.state.max-end);

        if(isNaN(end))
        {
            end = parseFloat(this.state.max);
        }

        end = Math.abs(end);
        end = end.toFixed(this.state.toFixed);

        return parseFloat(end);
    }

    /**
     * ##############################
     * Mouse
     * ##############################
     */
    /**
     * @param {int} x 
     * @param {string} ref 
     * 
     * @return {void}
     */
    setDirection(x, ref)
    {
        if (this[`oldx_${ref}`] > x)
        {
            this[`mouseDirection_${ref}`] = 'l';
        }
        else {
            this[`mouseDirection_${ref}`] = 'r';
        }

        this[`oldx_${ref}`] = x;
    }

    /**
     * @param {string} ref 
     * 
     * @return {string}
     */
    getDirection(ref) {
        return this[`mouseDirection_${ref}`];
    }

    /**
     * @param {string} ref 
     * 
     * @return {void}
     */
    handleMouseDown(ref)
    {
        this.current_moved = ref;
        this.mouseMoveListeners(true);

        clearTimeout(this.timeoutCheckMouseDownPersisted);
        this.timeoutCheckMouseDownPersisted = setTimeout( () => {
            if(!this.mouseDownPersistet)
            {
                this.handleMouseUp();
            }
        }, 500);
    }

    /**
     * @param {boolean} reattach 
     * 
     * @return {void}
     */
    mouseMoveListeners(reattach)
    {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);

        if (reattach) {
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        }
    }

    /**
     * @param {MouseEvent} event 
     */
    handleMouseMove(event)
    {
        this.mouseDownPersistet = true;
        const x = event.clientX

        if('start' === this.current_moved)
        {
            return this.handleMoveStart(x);
        }

        this.handleMoveEnd(x);
    }

    /**
     * @param {MouseEvent} event 
     * 
     * @return {function(): void | void}
     */
    handleLineClick(event)
    {
        if(this.reference_range)
        {
            const x = event.clientX;
            const swp = this.reference_range.getBoundingClientRect();

            if(x < (swp.left+(swp.width/2)))
            {
                this.handleMoveStart(x);
                return this.handleMouseUp();
            }

            this.handleMoveEnd(x);
            this.handleMouseUp();
        }
    }

    /**
     * @return {void} 
     */
    handleMouseUp()
    {
        this.mouseMoveListeners(false);
        this.mouseDownPersistet = false;
        
        clearTimeout(this.timeoutDisableLineClick);
        this.timeoutDisableLineClick = setTimeout( () => {
            this.setState({ disableLineClick: false });
        }, 100);
    }

    /**
     * @return {void} 
     */
    handleMouseLeave()
    {
        this.handleMouseUp();
    }

    /**
     * ##############################
     * TOUCH
     * ##############################
     */
    /**
     * @param string ref 
     * 
     * @return {void} 
     */
    handleTouchStart(ref)
    {
        this.current_moved = ref;
        this.touchMoveListeners(true);
    }

    /** 
     * @param {boolean} reattach 
     * 
     * @return {void}
     */
    touchMoveListeners(reattach)
    {
        document.removeEventListener('touchmove', this.handleMouseMove);
        document.removeEventListener('touchend', this.handleTouchMove);

        if (reattach) {
            document.addEventListener('touchmove', this.handleTouchMove);
            document.addEventListener('touchend', this.handleTouchEnd);
        }
    }

    /**
     * @param {TouchEvent} event 
     * 
     * @return {function(): void | void}
     */
    handleTouchMove(event)
    {
        this.mouseDownPersistet = true;
        const x = event.touches[0].pageX;

        if('start' === this.current_moved)
        {
            return this.handleMoveStart(x);
        }

        this.handleMoveEnd(x);
    }

    /**
     * @return {void}
     */
    handleTouchEnd()
    {
        this.touchMoveListeners(false);
        this.mouseDownPersistet = false;

        clearTimeout(this.timeoutDisableLineClick);
        this.timeoutDisableLineClick = setTimeout( () => {
            this.setState({ disableLineClick: false });
        }, 500);
    }

    /**
     * ##############################
     * MOUSE && TOUCH handlers
     * ##############################
     */
    /**
     * @param {int} clientX 
     * 
     * @return {undefined | function(): void | void} 
     */
    handleMoveStart(clientX)
    {
        if(!this.reference_range)
        {
            return;
        }

        // Center mouse
        clientX -= parseInt(this.allowedSize[this.state.size].width/2);

        const swp = this.reference_range.getBoundingClientRect();
        clientX -= swp.left;

        // Min size reached (left)
        if(0 > clientX)
        {
            return this.setStart(0, true);
        };

        clientX = Math.abs(clientX);
        const maxRight = swp.width-this.state.end-(this.allowedSize[this.state.size].width*2);

        // MAx size reached (right)
        if(clientX > maxRight)
        {
            return this.setStart(maxRight, true);
        }

        this.setStart(clientX, true);
    }

    /**
     * @param {int} start 
     * @param {boolean} disableLineClick 
     * 
     * @return {void}
     */
    setStart(start, disableLineClick)
    {
        this.setState({ start, disableLineClick, currentStart: this.getCurrentStart(start) }, this.callback);
    }

    /**
     * @param {int} clientX 
     * 
     * @return {undefined | function(): void | void} 
     */
    handleMoveEnd(clientX)
    {
        if(!this.reference_range)
        {
            return
        };

        // Center mouse
        clientX += parseInt(this.allowedSize[this.state.size].width/2);

        const swp = this.reference_range.getBoundingClientRect();

        // Max size reached (right)
        if(clientX > swp.left+swp.width)
        {
            return this.setEnd(0, true);
        }

        const maxLeft = (swp.width-this.state.start)-(this.allowedSize[this.state.size].width*2);
        clientX = clientX-(swp.left+swp.width);
        clientX = Math.abs(clientX);
        
        // Min size reached (left)
        if(clientX > maxLeft)
        {
            return this.setEnd(maxLeft, true);
        };

        this.setEnd(clientX, true);
    }

    /**
     * @param {int} end 
     * @param {boolean} disableLineClick 
     */
    setEnd(end, disableLineClick)
    {
        this.mouseDownPersistet = true;
        this.setState({ 
            end, 
            disableLineClick, 
            currentEnd: this.getCurrentEnd(end) 
        }, this.callback);
    }

    /**
     * @param {KeyPressEvent} e 
     * @param {string} type 
     * 
     * @return {undefined|function(): void}
     */
    handleChange(e, type)
    {
        if(this.state.minMaxInputReadonly)
        {
           return  
        }

        const { max, currentEnd } = this.state;

        let value = e.target.value;

        /**
         * Dont allow value over the maximum
         */
        if('currentStart' === type)
        {
            if(value && parseInt(value) > currentEnd-this.getSingleStepsWidth())
            {
                return;
            }
        } 
        /**
         * Dont allow value over the minimum
         */
        if('currentEnd' === type)
        {
            if(value && parseInt(value) > max)
            {
                return;
            }
        }

        this.setState({
            [type]: this.allowOnlyNumbers(value)
        });
    }

    /**
     * @param {string} type 
     * 
     * @return {undefined|function(): void}
     */
    slide(type)
    {
        const { currentStart, currentEnd } = this.state;

        if('currentStart' === type)
        {
            return this.setState({
                start: currentStart*this.getSingleStepsWidth(),
            });
        }

        if(!this.reference_range)
        {
            return;
        }

        const swp = this.reference_range.getBoundingClientRect();

        if(parseInt(currentEnd) < currentStart+this.getSingleStepsWidth() || '' == currentEnd || parseInt(currentEnd) < currentStart)
        {
            return;
        }

        return this.setState({
            end: swp.width-(currentEnd*this.getSingleStepsWidth()),
        });             
    }

    /**
     * @param {string} val 
     * @return {string}
     */
    allowOnlyNumbers(val)
    {
        let toReturn = val.replace(/[^0-9\.,]/g, '');
        toReturn = toReturn.replace(/,/g, '.');

        return toReturn;
    }

    /**
     * @param {BlurEvent} e 
     * @param {string} type 
     * 
     * @return {function(): void}
     */
    handleBlur(e, type)
    {
        const { min, max, format, currentStart, currentEnd, toFixed } = this.state;

        let value = e.target.value;

        if('integer' === format)
        {
            if('currentStart' === type)
            {
                if(parseInt(value) < min || '' === value)
                {
                    value = min;
                }

                if(parseInt(value) > (parseInt(currentEnd)-this.allowedSize[this.state.size].width))
                {
                    value = (parseInt(currentEnd)-this.allowedSize[this.state.size].width);
                }
            }

            if('currentEnd' === type)
            {
                if(parseInt(value) < currentStart+this.getSingleStepsWidth() || parseInt(value) < currentStart || '' === value || parseInt(value) > (parseInt(currentEnd)+this.getSingleStepsWidth()))
                {
                    value = currentStart+this.getSingleStepsWidth();
                }
    
                if((parseInt(value) > max || parseInt(value) < currentStart+this.getSingleStepsWidth()))
                {
                    value = max;
                }
            }
        }


        if('float' === format)
        {
            if('currentStart' === type)
            {
                if('' === value || parseFloat(value) < parseFloat(min))
                {
                    value = parseFloat(this.state.min);
                }

                if(parseFloat(value) > (parseFloat(currentEnd)-this.allowedSize[this.state.size].width))
                {
                    value = (parseFloat(currentEnd)-this.allowedSize[this.state.size].width);
                }
            }

            if('currentEnd' === type)
            {
                if(parseFloat(value) < parseFloat(currentStart-this.getSingleStepsWidth()) || parseInt(value) < currentStart || '' === value )
                {
                    value = parseFloat(currentStart+(this.allowedSize[this.state.size].width)).toFixed(toFixed);
                }
    
                if(parseFloat(value) > parseFloat(max) || parseFloat(value) < currentStart+(this.allowedSize[this.state.size].width))
                {
                    value = parseFloat(max).toFixed(toFixed);
                }
            }

            value = parseFloat(value).toFixed(toFixed);
        }


        this.setState({
            [type]: this.FormatNumer(value)
        }, () => {
            this.slide(type);
        });
    }

    /**
     * 
     * @param {KeyPressEvent} e 
     * 
     * @return {void}
     */
    handleKeyDown(e)
    {
        if('Enter' === keyPressed(e))
        {
            this.callback();
        }
    }

    /**
     * @param {string} v 
     * @return {string}
     */
    getFormatted(v)
    {
        if(undefined == v || null == v || isNaN(v))
        {
            return '';
        }

        const { format } = this.state;

        if('float' == format)
        {
            v = parseFloat(v).toFixed(this.state.toFixed);
        }

        if('integer' === format)
        {
            v = parseInt(v);
            v = JSON.stringify(v);
        }

        return v;
    }

    /**
     * @return {HTMLElement}
     */
    getMinMaxJsxStart()
    {
        const { minInputProps, callbackOnEnter, minMaxInput, minMaxInputAutoWidth, currentStart } = this.state;

        if(!minMaxInput)
        {
            return (
                <span className='min user-select-none'>
                    {
                        currentStart
                    }
                </span>
            );
        }

        return (
            <span className='min min-input user-select-none'>
                <input 
                    type='text'
                    value={currentStart}
                    onChange={ (e) => this.handleChange(e, 'currentStart') }
                    onBlur={ (e) => this.handleBlur(e, 'currentStart') }
                    {...(callbackOnEnter) && { onKeyDown: (e) => this.handleKeyDown(e, 'start') }}
                    {...minInputProps}
                    {...(minMaxInputAutoWidth) && { style: { width: `${this.getFormatted(currentStart).length*10}px` } }}
                />
            </span>
        );
    }

    /**
     * @return {HTMLElement}
     */
    getMinMaxJsxEnd()
    {
        const { maxInputProps, callbackOnEnter, minMaxInput, minMaxInputAutoWidth, currentEnd } = this.state;

        if(!minMaxInput)
        {
            return (
                <span className='max user-select-none'>
                    {
                        currentEnd
                    }
                </span>
            );
        }

        return (
            <span className='max max-input user-select-none'>
                <input 
                    type='text'
                    value={currentEnd}
                    onChange={ (e) => this.handleChange(e, 'currentEnd') }
                    onBlur={ (e) => this.handleBlur(e, 'currentEnd') }
                    {...(callbackOnEnter) && { onKeyDown: (e) => this.handleKeyDown(e, 'end') }}
                    {...maxInputProps}
                    {...(minMaxInputAutoWidth) && { style: { width: `${this.getFormatted(currentEnd).length*10}px` } }}
                />
            </span>
        );
    }

    /**
     * @return {HTMLElement}
     */
    getMinMaxJsx()
    {
        return (
            <span className='min-max'>
                {
                    this.getMinMaxJsxStart()
                }
                {
                    this.getMinMaxJsxEnd()
                }
            </span>
        );
    }

    /**
     * @return {HTMLElement}
     */
    render() 
    {
        const { addClass, defaultClass, id, size, minMaxY, minMaxDisplay, backgroundLine, backgroundMinMax } = this.state;

        const bgLine = {};
        if(backgroundLine)
        {
            bgLine.background = `${backgroundLine}`; 
        }

        const bgMinMax = {};
        if(backgroundMinMax)
        {
            bgMinMax.background = `${backgroundMinMax}`;
        }

        return (
            <span
                key={`range-${this.state.uuid}`}
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
                ref={ x => this.setReference(x, 'range') }
            >
                {
                    'top' === minMaxY && minMaxDisplay && this.getMinMaxJsx()
                }
                <span
                    key={`range-line-${this.state.uuid}`}
                    className={`line line-${size}`}
                    ref={ x => this.setReference(x, 'line') }
                    {...(!this.state.disableLineClick) && { onClick: (e) => this.handleLineClick(e) }}
                    style={
                        {
                            height: `${this.allowedSize[size].lineHeight}px`,
                            ...bgLine
                        }
                    }
                >
                    <span
                        className={`start start-${size} user-select-none`}
                        key={`range-start-${this.state.uuid}`}
                        ref={ x => this.setReference(x, 'start') }
                        onMouseDown={ (e) => this.handleMouseDown('start') }
                        onTouchStart={ (e) => this.handleTouchStart('start') }
                        style={
                            {
                                transform: `translate3d(${this.state.start}px,0,0)`,
                                width: `${this.allowedSize[size].width}px`,
                                height: `${this.allowedSize[size].height}px`,
                                top: `${this.allowedSize[size].top}px`,
                                ...bgMinMax
                            }
                        }
                    >
                    </span>
                    <span
                        className={`end end-${size} user-select-none`}
                        key={`range-end-${this.state.uuid}`}
                        ref={ x => this.setReference(x, 'end') }
                        onMouseDown={ (e) => this.handleMouseDown('end') }
                        onTouchStart={ (e) => this.handleTouchStart('end') }
                        style={
                            {
                                transform: `translate3d(-${this.state.end}px,0,0)`,
                                width: `${this.allowedSize[size].width}px`,
                                height: `${this.allowedSize[size].height}px`,
                                top: `${this.allowedSize[size].top}px`,
                                ...bgMinMax
                            }
                        }
                    >
                    </span>
                </span>
                {
                    'bottom' === minMaxY && minMaxDisplay && this.getMinMaxJsx()
                }
            </span>
        );
    }
}

export default Range;
