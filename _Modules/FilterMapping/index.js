import React from 'react';
import isArray from '../../_Functions/isArray';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import isBoolean from '../../_Functions/isBoolean';
import PropsCheck from '../internalFunctions/PropsCheck';
import isObject from '../../_Functions/isObject';
import isNumber from '../../_Functions/isNumber';
import uuid from '../../_Functions/uuid';

class FilterMapping extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.refNode = React.createRef();
        this.setArrowChildren = this.setArrowChildren.bind(this);
        
        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.attachHandleKeyDown = this.attachHandleKeyDown.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            /**
             * App
             */
            selections: [],
            uuid: `${uuid()}`,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'FilterMapping',
            id: isString(props.id) ? props.id : '',
            data: isObject(props.data) ? props.data : {},
            mapping: isObject(props.mapping) ? props.mapping : {},
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
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'data', 'mapping', 'callback', 'callbackProps', 'supportKeyDown', 'dummy'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: isObject(props.data) ? props.data : {},
                mapping: isObject(props.mapping) ? props.mapping : {},
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
    componentDidMount() {
        this.attachHandleClick();
        this.attachHandleKeyDown();

        const { selections } = this.state;

        selections.push(
            this.getEmptyOption()
        );

        this.setState({ selections });
    }

    /**
     * @return void
     */
    callback() {
        const { selections, callback, callbackProps } = this.state;

        if (callback) {
            const tmp = [];

            for (let x = 0; x <= selections.length - 1; x++) {
                if (isObject(selections[x]) && isString(selections[x].selectedText) && '' !== selections[x].selectedText) {
                    const { selectedText, selectedChild, selectedParent, target } = selections[x];

                    tmp.push(
                        {
                            text: selectedText,
                            parent: selectedParent,
                            child: selectedChild,
                            target
                        }
                    );
                }
            }

            (callback)(tmp, callbackProps);
        }
    }

    /**
     * @return void
     */
    componentWillUnmount() {
        this.attachHandleClick(false);
    }

    /**
     * 
     * @param boolean reAttach 
     * 
     * @return void
     */
    attachHandleClick(reAttach = true) {
        document.removeEventListener('click', this.handleClick);

        if (reAttach) {
            document.addEventListener('click', this.handleClick);
        }
    }

    /**
     * @param MouseEvent event 
     * 
     * @return void
     */
    handleClick(event) 
    {
        if (this.refNode && this.refNode.current && !this.refNode.current.contains(event.target)) {
            this.toggle(-1, false);
        }
    }

    /**
     * 
     * @param boolean reAttach 
     * 
     * @return void|null
     */
    attachHandleKeyDown(reAttach = true) {

        if (!this.state.supportKeyDown) {
            return;
        }

        document.removeEventListener('keydown', this.handleKeyDown);

        if (reAttach) {
            document.addEventListener('keydown', this.handleKeyDown);
        }
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

        let { selections } = this.state;

        if (!isNumber(this.getArrowParent()) || !isArray(selections) || !selections.length) {
            return;
        }

        let options = selections.filter( o => o.selectedParent === this.getArrowParent());

        if(isArray(options))
        {
            options = options[0].options;
        }

        if (!options.length) {
            return;
        }

        const Enter = ['Enter', 13];
        const ArrowDown = ['ArrowDown', 40];
        const ArrowUp = ['ArrowUp', 38];
        const Escape = ['Escape', 27];

        const supported = [...Enter, ...ArrowDown, ...ArrowUp, ...Escape];

        if ((keyboardEvent.key || keyboardEvent.keycode) && (supported.includes(keyboardEvent.key) || supported.includes(keyboardEvent.keycode))) {
            const eKey = keyboardEvent.key;
            const eKeyCode = keyboardEvent.keycode;

            let selected = this.getArrowChild();

            /**
             * Arrow down
             */
            if (ArrowDown.includes(eKey) || ArrowDown.includes(eKeyCode)) {
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
            if (ArrowUp.includes(eKey) || ArrowUp.includes(eKeyCode)) {
                selected -= 1;

                if (selected < 0) {
                    selected = options.length - 1;
                }

                this.setArrowChild(selected);

                return this.forceUpdate();
            }

            /**
             * Enter
             */
            if (Enter.includes(eKey) || Enter.includes(eKeyCode)) {

                this.select(
                    this.getArrowParent(),
                    this.getArrowChild(),
                    options[selected],
                    options
                );
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
     * @param int childrenLoopIndex 
     * @param object option 
     * @param array allOptions 
     * 
     * @return void
     */
    select(parentLoopIndex, childrenLoopIndex, option, allOptions) 
    {
        let { selections } = this.state;
        const { empty, text, mapping } = option;
        const tmp = [];
        this.resetArrowBehavior();

        // Change targets behavior
        if (empty) {
            selections[parentLoopIndex] = this.getEmptyOption();
        }
        if (!empty) {
            selections[parentLoopIndex].selectedParent = parentLoopIndex;
            selections[parentLoopIndex].selectedChild = childrenLoopIndex;
            selections[parentLoopIndex].selectedText = text;
            selections[parentLoopIndex].mapping = mapping;
            selections[parentLoopIndex].target = option;
            selections[parentLoopIndex].options = allOptions;
            this.setArrowChild(childrenLoopIndex);
        }

        // Reset everythink after target
        for (let x = 0; x <= parentLoopIndex; x++) {

            if (isObject(selections[x])) {
                tmp.push(selections[x]);
            }
        }

        this.setState({
            selections: tmp
        }, () => {
            this.toggle(parentLoopIndex, false, allOptions);
            this.callback();
        });
    }

    /**
     * @param int|null parentLoopIndex
     * @param array allOptions
     * 
     * @return {}
     */
    getEmptyOption(parentLoopIndex = null, allOptions = []) {
        return {
            selectedParent: null !== parentLoopIndex ? parentLoopIndex : -1,
            selectedChild: -1,
            selectedText: '',
            show: false,
            mapping: [],
            target: {},
            options: isArray(allOptions) ? allOptions : []
        };
    }

    /**
     * 
     * @param int parentLoopIndex 
     * @param boolean isClickEvent 
     * @param array allOptions
     * 
     * @return void
     */
    toggle(parentLoopIndex, isClickEvent = true, allOptions = []) {
        const { selections } = this.state;
        this.resetArrowBehavior();

        if (0 === selections.filter(o => o.selectedParent === parentLoopIndex).length) {
            selections.push(
                this.getEmptyOption(
                    parentLoopIndex,
                    allOptions
                )
            );
        }

        for (let x = 0; x <= selections.length - 1; x++) {

            if (x == parentLoopIndex && isClickEvent) {
                selections[x].show = !selections[x].show;

                /**
                 * Arrow support
                 */
                 if (true === selections[x].show && this.state.supportKeyDown) {
                    this.serArrowParent(parentLoopIndex);

                    if(isObject(selections[x]) && isNumber(selections[x].selectedChild)){
                        this.setArrowChild(selections[x].selectedChild);
                    }
                }
            }
            else {
                selections[x].show = false;
            }
        }

        this.setState({ selections });
    }

    /**
     * 
     * @param array c 
     * @param int i 
     * 
     * @return bool
     */
    allowToogle(c, i) {
        if (i === 0 || c && c[i - 1] && -1 !== c[i - 1].selectedParent) {
            return true;
        }

        return false;
    }

    /**
     * 
     * @param array{text: string} option 
     * @param number parentLoopIndex 
     * @param number childrenLoopIndex
     * @param { selected: int, selectedTet: string, show: bool } activeObject
     * @return jsx
     */
    getOptionJsx(allOptions, option, parentLoopIndex, childrenLoopIndex, activeObject) {
        const { text, empty } = option;
        const { selectedChild } = activeObject;

        return (
            <li
                key={`${parentLoopIndex}-option-${childrenLoopIndex}`}
                value={text}
                className={`li ${childrenLoopIndex === selectedChild ? 'selected' : ''} ${empty ? 'empty' : ''} ${childrenLoopIndex === this.getArrowChild() && parentLoopIndex === this.getArrowParent() ? 'arrow-selected' : ''}`}
                {...(childrenLoopIndex !== selectedChild) && {
                    onClick: () => this.select(parentLoopIndex, childrenLoopIndex, option, allOptions)
                }}
                onMouseOver={() => this.setArrowChildren(childrenLoopIndex)}
            >
                {
                    text
                }
            </li>
        );
    }

    /**
     * @return jsx
     */
    getFilterJsx() {
        const { selections, dummy } = this.state;
        let jsx = [];
        let blockCount = 0;

        const buildItem = (data, count) => {
            let { options, arrow } = data;

            if (!isArray(options)) {
                options = [];
            }

            if (!isObject(arrow)) {
                arrow = {};
            }

            let { char, direction } = arrow;

            if (!isString(direction) || !['right', 'left'].includes(direction)) {
                direction = 'right';
            }

            const parentKey = `filter-${count}`;
            const jsxOptions = [];

            for(let x = 0; x <= options.length-1; x++)
            {
                const option = options[x];

                if (!isObject(option)) {
                    option = {};
                }

                jsxOptions.push(
                    this.getOptionJsx(
                        options,
                        option,
                        count,
                        x,
                        selections[count] ? selections[count] : this.getEmptyOption()
                    )
                )
            }

            const title = selections && selections[count] && selections[count].selectedText ? selections[count].selectedText : data.placeholder;

            jsx.push(
                <span
                    key={parentKey}
                    className='dropdown'
                >
                    <span
                        className='placeholder user-select-none'
                        {...(this.allowToogle(selections, count)) && {
                            onClick: () => this.toggle(count, true, options)
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
                            className={`text ${selections && selections[count] && selections[count].selectedText ? '' : 'dimmed'}`}
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
                        selections && selections[count] && selections[count].show &&
                        <div className={`wrapper`}>
                            <ul
                                className='ul'
                                onKeyDown={(e) => this.handleKeyDown(e, count)}
                            >
                                {
                                    jsxOptions
                                }
                            </ul>
                        </div>
                    }
                </span>
            );
        }

        // Root element
        const { data } = this.state;
        buildItem(data, blockCount);

        // Loop trought selected childs an 
        // the possible mapping array 
        if (selections.length) {

            for (let x = 0; x <= selections.length - 1; x++) {
                const { mapping } = this.state;

                // Has mapping 
                if (isArray(selections[x].mapping)) {

                    for(let v = 0; v <= selections[x].mapping.length-1; v++)
                    {
                        if (isObject(mapping[selections[x].mapping[v]])) {
                            blockCount += 1;
                            buildItem(mapping[selections[x].mapping[v]], blockCount);
                        }
                    }
                }
            }
        }

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
     * 
     * @param int child 
     * 
     * @return void
     */
    setArrowChildren(child) {
        this.setArrowChild(child);
        this.forceUpdate();
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

    render() {
        const { addClass, defaultClass, id } = this.state;

        return (
            <span
                {...isString(id) && '' !== id && { id: id } }
                className={`${defaultClass} ${addClass}`}
                ref={this.refNode}
            >
                {
                    this.getFilterJsx(true)
                }
            </span>
        );
    }
}

export default FilterMapping;
