import React from 'react';
import { Link } from 'react-router-dom';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import buildDropDownStructure from '../internalFunctions/buildDropDownStructure';

class MenuHeight extends React.Component {
    constructor(props) {
        super(props);
        this.buildDataRecursive = this.buildDataRecursive.bind(this);
        this.toggle = this.toggle.bind(this);
        this.removeClickEvent = this.removeClickEvent.bind(this);
        this.attachClickEvent = this.attachClickEvent.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            /**
             * App
             */
            animation: 'height-auto',
            animationStart: 'animation-height-start',
            animationPersist: 'animation-height-persist',
            animationStop: 'animation-height-stop',
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'MenuHeight',
            id: isString(props.id) ? props.id : '',
            data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
            reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
            dashed: typeof true == typeof props.dashed ? props.dashed : false,
            headData: props.headData ? props.headData : '',
            activeClassName: (props.activeClassName && typeof '8' == typeof props.activeClassName) ? props.activeClassName : 'is-active',
            toggledClassName: (props.toggledClassName && typeof '8' == typeof props.toggledClassName) ? props.toggledClassName : 'is-toggled',
            isActiveTree: (props.isActiveTree && typeof 8 == typeof props.isActiveTree) ? props.isActiveTree : -1,
            forceClose: typeof true == typeof props.forceClose ? props.forceClose : false,
            forceCloseAll: typeof true == typeof props.forceCloseAll ? props.forceCloseAll : false,
            closeOnClickOutside: typeof true == typeof props.closeOnClickOutside ? props.closeOnClickOutside : false,
            align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
            alignIcon: (props.alignIcon && typeof '8' == typeof props.alignIcon) ? props.alignIcon : 'left',
            singleItemsHeight: props.singleItemsHeight && typeof 8 == typeof props.singleItemsHeight ? props.singleItemsHeight : 35,
            animationTime: props.animationTime && typeof 8 == typeof props.animationTime ? props.animationTime : 300,
        };

        this.refNode = React.createRef();
        this.wip = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['data'], props, state)) {
            return {
                data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
            };
        }

        if (PropsCheck([ 'id', 'reactRouter', 'dashed', 'headData', 'activeClassName', 'toggledClassName', 'isActiveTree', 'forceClose', 'forceCloseAll', 'closeOnClickOutside', 'align', 'alignIcon', 'singleItemsHeight', 'animationTime'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
                dashed: typeof true == typeof props.dashed ? props.dashed : false,
                headData: props.headData ? props.headData : '',
                activeClassName: (props.activeClassName && typeof '8' == typeof props.activeClassName) ? props.activeClassName : 'is-active-height',
                toggledClassName: (props.toggledClassName && typeof '8' == typeof props.toggledClassName) ? props.toggledClassName : 'is-toggled',
                isActiveTree: (props.isActiveTree && typeof 8 == typeof props.isActiveTree) ? props.isActiveTree : -1,
                forceClose: typeof true == typeof props.forceClose ? props.forceClose : false,
                forceCloseAll: typeof true == typeof props.forceCloseAll ? props.forceCloseAll : false,
                closeOnClickOutside: typeof true == typeof props.closeOnClickOutside ? props.closeOnClickOutside : false,
                align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
                alignIcon: (props.alignIcon && typeof '8' == typeof props.alignIcon) ? props.alignIcon : 'left',
                singleItemsHeight: props.singleItemsHeight && typeof 8 == typeof props.singleItemsHeight ? props.singleItemsHeight : 35,
                animationTime: props.animationTime && typeof 8 == typeof props.animationTime ? props.animationTime : 300,
            };
        }

        return null;
    }

    componentDidMount() {
        const { closeOnClickOutside } = this.state;

        if (closeOnClickOutside) {
            this.removeClickEvent();
            this.attachClickEvent();
        }
    }

    componentDidUpdate() {
        const { closeOnClickOutside } = this.state;

        if (closeOnClickOutside) {
            this.removeClickEvent();
            this.attachClickEvent();
        }
    }

    componentWillUnmount() {
        const { closeOnClickOutside } = this.state;

        if (closeOnClickOutside) {
            this.removeClickEvent();
        }
    }

    attachClickEvent() {
        document.addEventListener('click', this.handleClickOutside);
    }

    removeClickEvent() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    buildSingleMenuItem(nodeType, cls, unique, icon, text, href, dataChildren, callback, callbackProps, externalLink) {
        const { alignIcon } = this.state;
        const direction = ['left', 'right'].includes(alignIcon) ? alignIcon : 'left';

        if ('link' == nodeType && typeof '8' == typeof href) {
            return (
                <Link
                    to={href}
                    className={cls}
                    {...((dataChildren && dataChildren.length) && { onClick: (e) => this.toggle(unique) })}
                    {...(((!dataChildren || 0 == dataChildren.length) && callback && typeof function(){} == typeof callback) && { onClick: (e) => (callback)(callbackProps) })}
                >
                    {
                        'left' == direction && icon &&
                        <span className='data-icon data-icon-left'>
                            {
                                icon
                            }
                        </span>
                    }
                    <span className='data-text'>
                        {
                            text
                        }
                    </span>
                    {
                        'right' == direction && icon &&
                        <span className='data-icon data-icon-right'>
                            {
                                icon
                            }
                        </span>
                    }
                </Link>
            );
        }

        if (('href' == nodeType && typeof '8' == typeof href) || externalLink && true == externalLink) {
            return (
                <a
                    href={href}
                    className={cls}
                    {...((dataChildren && dataChildren.length) && { onClick: (e) => this.toggle(unique) })}
                    {...(((!dataChildren || 0 == dataChildren.length) && callback && typeof function(){} == typeof callback) && { onClick: (e) => (callback)(callbackProps) })}
                    {...((externalLink && true == externalLink) && { target: '_blank' })}
                >
                    {
                        'left' == direction && icon &&
                        <span className='data-icon data-icon-left'>
                            {
                                icon
                            }
                        </span>
                    }
                    <span className='data-text'>
                        {
                            text
                        }
                    </span>
                    {
                        'right' == direction && icon &&
                        <span className='data-icon data-icon-right'>
                            {
                                icon
                            }
                        </span>
                    }
                </a>
            );
        }

        return (
            <div
                className={cls}
                {...((dataChildren && dataChildren.length) && { onClick: (e) => this.toggle(unique) })}
                {...(((!dataChildren || 0 == dataChildren.length) && callback && typeof function(){} == typeof callback) && { onClick: (e) => (callback)(callbackProps) })}
            >
                {
                    'left' == direction && icon &&
                    <span className='data-icon data-icon-left'>
                        {
                            icon
                        }
                    </span>
                }
                <span className='data-text'>
                    {
                        text
                    }
                </span>
                {
                    'right' == direction && icon &&
                    <span className='data-icon data-icon-right'>
                        {
                            icon
                        }
                    </span>
                }
            </div>
        );
    }

    buildDataRecursive(data = [], isChild = false) {
        const { reactRouter, dashed, activeClassName, toggledClassName, animationTime, singleItemsHeight, animationStart, animationPersist } = this.state;
        const jsx = [];

        if (data && data.length) {
            for (let x = 0; x <= data.length - 1; x++) {
                let { text, toggled, unique, props, classList, classListChildren, href, icon, childrensNestedCount, key, isActive, callback, callbackProps, externalLink } = data[x];

                if (href && typeof '8' == typeof href) {
                    href = href.toLowerCase();
                }

                const dataChildren = data[x].data ? data[x].data : [];

                if (!classList) {
                    classList = '';
                }

                if (!props || typeof props !== typeof {}) {
                    props = {};
                }

                try {
                    Object.keys(props);
                }
                catch (e) {
                    props.style = {};
                }

                let nodeType = 'div';

                if (reactRouter && dataChildren && 0 == dataChildren.length) {
                    nodeType = 'link';
                }

                if (!reactRouter && dataChildren && 0 == dataChildren.length) {
                    nodeType = 'href';
                }

                const cls = `text ${isChild ? 'child' : ''} ${isActive ? activeClassName : ''} ${toggled ? toggledClassName : ''} ${dataChildren && 0 !== dataChildren.length ? 'hasChildren' : ''}`;
                const dataLink = this.buildSingleMenuItem(nodeType, cls, unique, icon, text, href, dataChildren, callback, callbackProps, externalLink);
                let inlineStyle = {
                    style : {}
                };

                /**
                 * Animation start
                 */
                let mainCount = 0;

                const getMaxDataChildren = (data = [], count = 0) => {

                    if(data && data.length){
                
                        for(let x = 0; x <= data.length-1; x++){
                            count += 1;
                            if(data[x].data && typeof [] == typeof data[x].data && data[x].data.length && data[x].toggled){
                                return getMaxDataChildren(data[x].data, count);
                            }
                        }
                    }
                
                    return count;
                };

                mainCount = getMaxDataChildren(dataChildren, mainCount);

                if(toggled && (-1 !== classList.indexOf('parent-toggling') || -1 !== classList.indexOf('parent-toggling-back'))){
                    inlineStyle.style.maxHeight = `${(mainCount*singleItemsHeight)}px`;
                    inlineStyle.style.transitionDuration = `${animationTime}ms`;
                }

                /**
                 * Animation persist after timeout
                 */
                if(toggled && classListChildren == animationPersist && dataChildren && typeof [] == typeof dataChildren && dataChildren.length){
                    inlineStyle = {};
                }

                /**
                 * Animation stop
                 */
                if(toggled && classListChildren == animationStart && dataChildren && typeof [] == typeof dataChildren && dataChildren.length){
                    inlineStyle.style.transitionDuration = `${animationTime}ms`;
                }

                /**
                 * Animation remove
                 */
                if(!toggled && dataChildren && typeof [] == typeof dataChildren && dataChildren.length){
                    inlineStyle = {};
                }

                if(props && props.style && typeof {} == typeof props.style){
                    try{
                        Object.keys(props.style);
                        props.style = {...props.style};
                    }
                    catch(e){
                        props.style = {};
                    }
                }

                jsx.push(
                    <div
                        key={key}
                        className={`single-entry ${classList} ${(dataChildren && 0 !== dataChildren.length) ? 'parent' : ''}`}
                        {...props}
                    >
                        {
                            dataLink
                        }
                        {
                            toggled && dataChildren && 0 !== dataChildren.length &&
                            <div 
                                className={`children ${classListChildren} ${dashed ? 'dashed' : `children-n-${childrensNestedCount}`}`}
                                {...inlineStyle}
                            >
                                {
                                    this.buildDataRecursive(dataChildren, true)
                                }
                            </div>
                        }
                    </div>
                )
            }
        }

        return jsx;
    }

    /**
     * Recursive loop to change the 
     * toggled key to the oposite oolean value
     * @param {string} uniqueId 
     */
    toggle(uniqueId) {

        if(this.wip){
            return;
        }

        this.wip = true;
        const { data, forceClose, forceCloseAll, toggledClassName, activeClassName, animationStart, animationPersist, animationStop, animationTime } = this.state;

        /**
         * Find the First item of the top, of the nested tree
         * @param o 
         */
        const findTheTopOfTree = (o) => {
            if (o.parentElement) {
                return findTheTopOfTree(o.parentElement)
            }
            else {
                return o;
            }
        };

        /**
         * Toggle all opened menu items back with an animation if provided
         * @param {string} parentUuid (do not close the current toggled tree)
         */
        const forceCloseToggledMenuItems = (parentUuid) => {
            let allowSetState = false;

            for (let x = 0; x <= data.length - 1; x++) {
                const object = data[x];
                const root = findTheTopOfTree(object);

                const forceClose = (o) => {

                    if (parentUuid !== root.unique) {
                        if (o.isParent && true == o.toggled) {
                            o.classList = `${o.classList}`;
                            o.classListChildren = animationStop;
                            allowSetState = false;

                            setTimeout(() => {
                                o.toggled = false;
                                o.classList = '';
                                allowSetState = true;
                                o.classListChildren = '';

                                if (allowSetState) {
                                    this.setState({ data });
                                }
                            }, animationTime);
                        }

                        if (forceCloseAll && o.data && typeof [] === typeof o.data && o.data.length) {
                            for (let x = 0; x <= o.data.length - 1; x++) {
                                forceClose(o.data[x]);
                            }
                        }
                    }
                };

                forceClose(root);
            }
        };

        let target = undefined;

        /**
         * Attach active class recursively
         * @param {number} object 
         */
        const attachActiveClass = ((object) => {
            const { isActiveTree } = this.state;
            let innerLoop = 1;

            const attachClass = (o) => {

                if (true == o.toggled && (innerLoop <= isActiveTree || -1 == isActiveTree)) {
                    o.isActive = true;
                    innerLoop += 1;
                }

                if (o.parentElement) {
                    attachClass(o.parentElement);
                }
            };

            attachClass(object);
        });

        for (let x = 0; x <= data.length - 1; x++) {

            const getTarget = (current) => {
                let { unique, data } = current;
                const dataChildren = data;

                if (unique == uniqueId && undefined == target) {
                    target = current;
                }

                if (dataChildren && typeof [] == typeof dataChildren && 0 !== dataChildren.length) {
                    for (let i = 0; i <= dataChildren.length - 1; i++) {
                        dataChildren[i].isActive = false;
                        getTarget(dataChildren[i]);
                    }
                }
            };

            data[x].isActive = false;
            getTarget(data[x]);
        }

        /**
         * If is not matched unique item, then close other toggled items
         */
        if (forceClose) {
            const root = findTheTopOfTree(target);
            forceCloseToggledMenuItems(root.unique);
        }

        this.setState({
            data
        }, () => {
            /**
             * Current clicked element
             */
            if (target) {

                const { toggled } = target;
                const dataChildren = target.data && typeof [] == typeof target.data && target.data.length ? target.data : undefined;

                /**
                 * Close entry
                 */
                if (toggled) {
                    attachActiveClass(target);
                    target.classList = `${target.classList} parent-toggling-back ${toggledClassName}-back ${activeClassName}-back`;
                    target.classListChildren = animationStop;
                    target.isActive = false;

                    return this.setState({
                        data
                    }, () => {
                        setTimeout(() => {
                            target.classList = ''; // No animation to perform
                            target.toggled = false; // Set toggle to false after the animation has been done
                            target.classListChildren = '';
                            this.wip = false;

                            this.setState({
                                data
                            });

                        }, animationTime);
                    });
                }

                /**
                 * Open entry- Entry with childrens
                 */
                if (dataChildren) {
                    attachActiveClass(target);
                    target.toggled = true;
                    target.isActive = true;
                    target.classList = `parent-toggling`;
                    target.classListChildren = animationStart;

                    this.setState({
                        data
                    }, () => {
                        setTimeout(() => {
                            target.classList = `parent-toggled`;
                            target.classListChildren = animationPersist;
                            this.wip = false;
                            
                            this.setState({
                                data
                            });

                        }, animationTime);
                    });
                }
                else{
                    attachActiveClass(target);
                    this.wip = false;

                    this.setState({
                        data
                    });
                }
            }
        });
    }

    /**
     * Toggle all opened menu items back with an animation if provided
     */
    handleClickOutside(event) {

        if (this.refNode && this.refNode.current && this.refNode.current.contains(event.target)) {
            return null;
        }

        const { data, animationStop, animationTime, toggledClassName, activeClassName } = this.state;

        for (let x = 0; x <= data.length - 1; x++) {

            const forceClose = (o) => {
                const { toggled } = o;

                if (toggled) {
                    o.classList = `${o.classList} ${toggledClassName}-back ${activeClassName}-back parent-toggling-back`;
                    o.classListChildren = animationStop;
                    o.isActive = false;

                    this.setState({
                        data
                    }, () => {
                        setTimeout(() => {
                            o.classList = ''; // No animation to perform
                            o.toggled = false; // Set toggle to false after the animation has been done
                            o.classListChildren = '';

                            this.setState({
                                data
                            });

                        }, animationTime);
                    });
                }

                if (o.data && typeof [] === typeof o.data && o.data.length) {
                    for (let x = 0; x <= o.data.length - 1; x++) {
                        forceClose(o.data[x]);
                    }
                }
            };

            forceClose(data[x]);
        }
    };

    render() {
        const { addClass, defaultClass, id, data, headData, align } = this.state;
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        return (
            <div
                ref={this.refNode}
                className={`${defaultClass} ${direction} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                {
                    headData && headData
                }
                {
                    this.buildDataRecursive(data)
                }
            </div>
        )
    }
}

export default MenuHeight;