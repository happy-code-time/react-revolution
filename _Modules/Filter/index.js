import React from 'react';
import isArray from '../../_Functions/isArray';
import isString from '../../_Functions/isString';
import isBoolean from '../../_Functions/isBoolean';
import isFunction from '../../_Functions/isFunction';
import PropsCheck from '../internalFunctions/PropsCheck';
import isObject from '../../_Functions/isObject';
import isNumber from '../../_Functions/isNumber';
import uuid from '../../_Functions/uuid';

class Filter extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.refNode = React.createRef();

        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.attachHandleKeyDown = this.attachHandleKeyDown.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            /**
             * App
             */
            current: [],
            uuid: `${uuid()}`,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'rr-filter',
            id: isString(props.id) ? props.id : '',
            data: isArray(props.data) ? props.data : [],
            reset: isBoolean(props.reset) ? props.reset : true,
            disabled: isBoolean(props.disabled) ? props.disabled : true,
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps,
            supportKeyDown: isBoolean(props.supportKeyDown) ? props.supportKeyDown : true,
            dummy: isObject(props.dummy) ? props.dummy : {},
        };

        this.arrowBehaviorActive = false;
        this.resetArrowBehavior();
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) 
    {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'data', 'reset', 'disabled', 'callback', 'callbackProps', 'supportKeyDown', 'dummy'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'rr-filter',
                id: isString(props.id) ? props.id : '',
                data: isArray(props.data) ? props.data : [],
                reset: isBoolean(props.reset) ? props.reset : true,
                disabled: isBoolean(props.disabled) ? props.disabled : true,
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps,
                supportKeyDown: isBoolean(props.supportKeyDown) ? props.supportKeyDown : true,
                dummy: isObject(props.dummy) ? props.dummy : {},
            };
        }

        return null;
    }

    /**
     * @return void
     */
    componentDidMount() 
    {
        this.attachHandleClick();
        this.attachHandleKeyDown();

        const { current } = this.state;

        this.state.data.map(() =>
            current.push(
                this.getEmptyOption()
            )
        );

        this.setState({ current });
    }

    /**
     * @return void
     */
    componentWillUnmount() 
    {
        this.attachHandleClick(false);
        this.attachHandleKeyDown(false);
    }

    /**
     * @return void
     */
    callback() 
    {
        const { current, callback, callbackProps } = this.state;

        if (callback) {
            (callback)(current, callbackProps);
        }
    }

    /**
     * 
     * @param boolean reAttach 
     * 
     * @return void
     */
    attachHandleClick(reAttach = true) 
    {
        document.removeEventListener('click', this.handleClick);

        if (reAttach) {
            document.addEventListener('click', this.handleClick);
        }
    }

    /**
     * 
     * @param boolean reAttach 
     * 
     * @return void|null
     */
    attachHandleKeyDown(reAttach = true) 
    {

        if(!this.state.supportKeyDown)
        {
            return;
        }

        document.removeEventListener('keydown', this.handleKeyDown);

        if (reAttach) {
            document.addEventListener('keydown', this.handleKeyDown);
        }
    }

    /**
     * @param MouseEvent event 
     * 
     * @return void
     */
    handleClick(event) 
    {
        if (this.refNode && this.refNode.current && !this.refNode.current.contains(event.target)) 
        {
            this.toggle(-1, false);
        }
    }

    /**
     * @param number parentLoopIndex 
     * @param number childrenLoopIndex
     * @param bool empty
     * 
     * @return void
     */
    select(parentLoopIndex, childrenLoopIndex, empty) 
    {
        const { current, data } = this.state;

        for (let x = 0; x <= current.length - 1; x++) {

            if (x == parentLoopIndex) {

                if (empty) {
                    current[x].selected = -1;
                    current[x].selectedText = '';
                    this.resetArrowBehavior();
                }
                else {
                    current[x].selected = childrenLoopIndex;
                    current[x].selectedText = data[x].options[childrenLoopIndex].text;
                    this.setArrowChild(childrenLoopIndex);
                }
            }
        }

        this.setState({ current }, () => {
            this.toggle(parentLoopIndex);

            if (this.state.reset) {
                this.reset(parentLoopIndex);
            }
            else {
                this.callback();
            }
        });
    }

    /**
     * @param int parentLoopIndex 
     * 
     * @return void
     */
    reset(parentLoopIndex) 
    {
        const { current } = this.state;

        for (let x = 0; x <= current.length - 1; x++) {

            if (x > parentLoopIndex) {
                current[x] = this.getEmptyOption();
            }
        }

        this.setState({ current }, this.callback);
    }

    /**
     * @return {}
     */
    getEmptyOption() 
    {
        return {
            selected: -1,
            selectedText: '',
            show: false,
        };
    }

    /**
     * 
     * @param array{text: string} option 
     * @param number parentLoopIndex 
     * @param number childrenLoopIndex
     * @param { selected: int, selectedTet: string, show: bool } activeObject
     * @return jsx
     */
    getOptionJsx(option, parentLoopIndex, childrenLoopIndex, activeObject) 
    {
        const { text, empty } = option;
        const { selected } = activeObject;

        return (
            <li
                key={`${parentLoopIndex}-option-${childrenLoopIndex}`}
                value={text}
                className={`li ${childrenLoopIndex === selected ? 'selected' : ''} ${empty ? 'empty' : ''} ${childrenLoopIndex === this.getArrowChild() && parentLoopIndex === this.getArrowParent() ? 'arrow-selected' : ''}`}
                {...(childrenLoopIndex !== selected) && {
                    onClick: () => this.select(parentLoopIndex, childrenLoopIndex, empty)
                }}
                onMouseOver={() => this.setArrowChild(childrenLoopIndex)}
            >
                {
                    text
                }
            </li>
        );
    }

    /**
     * 
     * @param Event keyboardEvent 
     * 
     * @return void
     */
    handleKeyDown(keyboardEvent) 
    {
        if(!this.arrowBehaviorActive)
        {
            return;
        }

        let { current, data } = this.state;

        if (!isNumber(this.getArrowParent()) || !isArray(current) || !current.length) {
            return;
        }

        const options = isObject(data[this.getArrowParent()]) && isArray(data[this.getArrowParent()].options) ? data[this.getArrowParent()].options : [];

        if (!options.length) {
            return;
        }

        const Enter = ['Enter', 13];
        const ArrowDown = ['ArrowDown', 40];
        const ArrowUp = ['ArrowUp', 38];
        const Escape = ['Escape', 27];

        const supported = [...Enter, ...ArrowDown, ...ArrowUp, ...Escape];

        if ((keyboardEvent.key || keyboardEvent.keycode) && (supported.includes(keyboardEvent.key) || supported.includes(keyboardEvent.keycode))) 
        {
            const eKey = keyboardEvent.key;
            const eKeyCode = keyboardEvent.keycode;

            let selected = this.getArrowChild();

            /**
             * Arrow down
             */
            if (ArrowDown.includes(eKey) || ArrowDown.includes(eKeyCode)) 
            {
                selected += 1;

                if (selected >= options.length) {
                    selected = 0;
                }

                this.setArrowChild(selected);

                return this.forceUpdate();
            }

            /**
             * Arrow up
             */
            if (ArrowUp.includes(eKey) || ArrowUp.includes(eKeyCode)) 
            {
                selected -= 1;

                if (selected < 0) {
                    selected = options.length-1;
                }

                this.setArrowChild(selected);

                return this.forceUpdate();
            }

            /**
             * Enter
             */
            if (Enter.includes(eKey) || Enter.includes(eKeyCode)) 
            {

                if(isObject(data[this.getArrowParent()]) && isArray(data[this.getArrowParent()].options) && isObject(data[this.getArrowParent()].options[selected]))
                {
                    const { empty } = data[this.getArrowParent()].options[selected];

                    this.select(
                        this.getArrowParent(),
                        this.getArrowChild(),
                        empty
                    );
                }
            }

            /**
             * Escape
             */
            if (Escape.includes(eKey) || Escape.includes(eKeyCode)) 
            {
                this.toggle(-1, false);
                this.resetArrowBehavior();
            }
        }
    }

    /**
     * 
     * @param int parentLoopIndex 
     * @param boolean isClickEvent 
     * 
     * @return void
     */
    toggle(parentLoopIndex, isClickEvent = true) 
    {
        this.resetArrowBehavior();

        const { current } = this.state;

        for (let x = 0; x <= current.length - 1; x++) {

            if (x == parentLoopIndex && isClickEvent) {
                current[x].show = !current[x].show;

                /**
                 * Arrow support
                 */
                if (true === current[x].show && this.state.supportKeyDown) {
                    this.serArrowParent(parentLoopIndex);

                    if(isObject(current[this.getArrowParent()]) && isNumber(current[this.getArrowParent()].selected)){
                        this.setArrowChild(current[this.getArrowParent()].selected);
                    }
                }
            }
            else {
                current[x].show = false;
            }
        }

        this.setState({ current });
    }

    /**
     * 
     * @param array c 
     * @param int i 
     * 
     * @return bool
     */
    allowToogle(c, i) 
    {
        if (!this.state.disabled || i === 0 || c && c[i - 1] && -1 !== c[i - 1].selected) {
            return true;
        }

        return false;
    }

    /**
     * 
     * @return jsx
     */
    getFilterJsx() 
    {
        const { current, dummy } = this.state;
        let jsx = [];

        this.state.data.map((o, parentLoopIndex) => {
            let { options, arrow } = o;

            if (!isArray(options)) 
            {
                options = [];
            }

            if (!isObject(arrow)) 
            {
                arrow = {};
            }

            let { char, direction } = arrow;

            if (!isString(direction) || !['right', 'left'].includes(direction)) 
            {
                direction = 'right';
            }

            const parentKey = `filter-${parentLoopIndex}`;
            const jsxOptions = [];

            o.options.map((option, childrenLoopIndex) =>
                jsxOptions.push(
                    this.getOptionJsx(
                        option,
                        parentLoopIndex,
                        childrenLoopIndex,
                        current[parentLoopIndex] ? current[parentLoopIndex] : this.getEmptyOption()
                    )
                )
            );

            const title = current && current[parentLoopIndex] && current[parentLoopIndex].selectedText ? current[parentLoopIndex].selectedText : o.text;

            jsx.push(
                <span
                    key={parentKey}
                    className='dropdown'
                >
                    <span
                        className='placeholder user-select-none'
                        {...(this.allowToogle(current, parentLoopIndex)) && {
                            onClick: () => this.toggle(parentLoopIndex)
                        }}
                    >
                        {
                            'left' === direction && char &&
                            <span className='icon icon-left'>
                                {
                                    char
                                }
                            </span>
                        }
                        <span
                            className={`text ${current && current[parentLoopIndex] && current[parentLoopIndex].selectedText ? '' : 'dimmed'}`}
                        >
                            {
                                title && title
                            }
                        </span>
                        {
                            'right' === direction && char &&
                            <span className='icon icon-right'>
                                {
                                    char
                                }
                            </span>
                        }
                    </span>
                    {
                        current && current[parentLoopIndex] && current[parentLoopIndex].show &&
                        <div className={`wrapper`}>
                            <ul className='ul'>
                                {
                                    jsxOptions
                                }
                            </ul>
                        </div>
                    }
                </span>
            )
        });

        /**
         * Create dummy placeholders
         */
        if(isObject(dummy) && isNumber(dummy.count) && 0 < dummy.count)
        {
            let { count, placeholders } = dummy;

            if(!isNumber(count) || 0 > count)
            {
                count = 0;
            }
    
            if(!isArray(placeholders) || 0 === placeholders.length)
            {
                placeholders = [];
            }
    
            if(count && (jsx.length-1) < count && placeholders.length)
            {
                for(let x = jsx.length-1; x < count; x++)
                {
                    // Is placeholder available, if not then choose the last available item
                    const obj = isObject(placeholders[x]) ? placeholders[x] : placeholders[placeholders.length-1];
                    let { arrow, placeholder } = obj;
    
                    if(!isObject(arrow))
                    {
                        arrow = {};
                    }
    
                    let { char, direction } = arrow;
    
                    if (!isString(direction) || !['right', 'left'].includes(direction)) {
                        direction = 'right';
                    }
    
                    jsx.push(
    
                        <span
                            key={`custom-placeholder-${x}-${this.state.uuid}`}
                            className='dropdown'
                        >
                            <span className='placeholder user-select-none'>
                                {
                                    'left' === direction && char &&
                                    <span className='icon icon-left'>
                                        {
                                            char
                                        }
                                    </span>
                                }
                                <span
                                    className={`text dimmed`}
                                >
                                    {
                                        placeholder && placeholder
                                    }
                                </span>
                                {
                                    'right' === direction && char &&
                                    <span className='icon icon-right'>
                                        {
                                            char
                                        }
                                    </span>
                                }
                            </span>
                        </span>
                    );
                }
            }

            const verified = [];

            for(let x = 0; x <= jsx.length-1; x++)
            {
                if(x >= count)
                {
                    break;
                }
    
                verified.push(jsx[x]);
            }
    
            jsx = verified;
        }

        return jsx;
    }

    /**
     * @param int child 
     * 
     * @return void
     */
     setArrowChild(child) {
        this.arrowBehaviorActive = true;
        this[this.currentSelectedChild] = child;
    }

    /**
     * @return int
     */
    getArrowChild() {
        return this[this.currentSelectedChild];
    }

    /**
     * @param int parent 
     * 
     * @return void
     */
    serArrowParent(parent) {
        this.arrowBehaviorActive = true;
        this[this.currentOpenedParent] = parent;
    }

    /**
     * @return int
     */
    getArrowParent() {
        return this[this.currentOpenedParent];
    }

    /**
     * @return void
     */
    resetArrowBehavior() {
        this.arrowBehaviorActive = false;

        if(!isString(this.currentOpenedParent))
        {
            this.currentOpenedParent = `current-opened-parent-${uuid()}`;
        }

        if(!isString(this.currentSelectedChild))
        {
            this.currentSelectedChild = `current-selected-child-${uuid()}`;
        }

        this[this.currentOpenedParent] = 0;
        this[this.currentSelectedChild] = 0;
    }

    render() 
    {
        const { addClass, defaultClass, id } = this.state;

        return (
            <span
                id={id}
                className={`${defaultClass} ${addClass}`}
                ref={this.refNode}
            >
                {
                    this.getFilterJsx()
                }
            </span>
        );
    }
}

export default Filter;
