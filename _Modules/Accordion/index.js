import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import buildDropDownStructure from '../internalFunctions/buildDropDownStructure';

class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.buildDataRecursive = this.buildDataRecursive.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleAllBack = this.toggleAllBack.bind(this);

        this.state = {
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Accordion',
            id: isString(props.id) ? props.id : '',
            data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
            animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
            animationTimeout: (props.animationTimeout && typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 300,
        };

        this.refNode = React.createRef();
        this.intervalToCloseMenu = undefined;
        this.wip = false;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'data', 'id', 'closeOnClickOutside', 'animation', 'animationTimeout'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Accordion',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
                animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
                closeOnClickOutside: typeof true == typeof props.closeOnClickOutside ? props.closeOnClickOutside : false,
                animationTimeout: (props.animationTimeout && typeof 8 == typeof props.animationTimeout) ? props.animationTimeout : 300,
            };
        }

        return null;
    }

    componentDidMount() {
        if (this.state.closeOnClickOutside) {
            document.documentElement.removeEventListener('click', this.handleClick);
            document.documentElement.addEventListener('click', this.handleClick);
        }
    }

    componentDidUpdate() {
        if (this.state.closeOnClickOutside) {
            document.documentElement.removeEventListener('click', this.handleClick);
            document.documentElement.addEventListener('click', this.handleClick);
        }
    }

    componentWillUnmount() {
        if (this.state.closeOnClickOutside) {
            document.documentElement.removeEventListener('click', this.handleClick);
        }
    }


    handleClick(event) {
        if (this.refNode && this.refNode.current && !this.refNode.current.contains(event.target)) {
            this.toggleAllBack();
        }
    }

    buildDataRecursive(data = [], isChild = false) {
        const jsx = [];

        if (data && data.length) {
            for (let x = 0; x <= data.length - 1; x++) {
                let { text, dataToggle, toggled, unique, classList, classListText, props, childrensNestedCount, key, maxheight } = data[x];
                const dataChildren = data[x].data;

                if (!classList) {
                    classList = '';
                }

                if (!classListText) {
                    classListText = '';
                }

                if (!props || typeof props !== typeof {}) {
                    props = {};
                }

                try {
                    Object.keys(props);
                }
                catch (e) {
                    props = {};
                }

                jsx.push(
                    <div
                        {...props}
                        key={key}
                        className={`single-entry ${classList} ${(dataChildren && 0 !== dataChildren.length) ? 'hasChildren' : ''}`}
                        {...(undefined !== maxheight && typeof 8 === typeof maxheight && 'height' == this.state.animation) && {
                            style: {
                                overfow: 'hidden',
                                transitionDuration: '0ms'
                            }
                        }}
                    >
                        {
                            <div
                                className={`text ${isChild ? 'child' : ''} ${(dataChildren && 0 !== dataChildren.length) ? 'hasChildren' : ''} ${(dataToggle) ? 'hasData' : ''}`}
                                onClick={() => this.toggle(unique, key)}
                            >
                                <span className={`single-data ${classListText} ${(toggled && dataChildren && 0 !== dataChildren.length) ? 'is-toggled' : ''} ${(!toggled && dataChildren && 0 !== dataChildren.length) ? 'is-not-toggled' : ''} ${isChild ? 'child' : ''} ${(dataChildren && 0 !== dataChildren.length) ? 'hasChildren' : ''} ${(dataToggle) ? 'hasData' : ''}`}>
                                    {
                                        text
                                    }
                                </span>
                            </div>
                        }
                        {
                            toggled && dataChildren && 0 !== dataChildren.length &&
                            <div
                                id={`${key}`}
                                className={`children children-n-${childrensNestedCount}`}
                                {...(undefined !== maxheight && typeof 8 === typeof maxheight && 'height' == this.state.animation) && {
                                    style: {
                                        height: `${maxheight}px`,
                                        maxHeight: `${maxheight}px`,
                                        overfow: 'hidden',
                                        transitionDuration: '0ms'
                                    }
                                }}
                            >
                                {
                                    this.buildDataRecursive(dataChildren, true)
                                }
                            </div>
                        }
                        {
                            toggled && undefined == dataChildren && dataToggle &&
                            <div
                                className="data static-data"
                                id={`${key}`}
                                {...(undefined !== maxheight && typeof 8 === typeof maxheight && 'height' == this.state.animation) && {
                                    style: {
                                        height: `${maxheight}px`,
                                        maxHeight: `${maxheight}px`,
                                        overfow: 'hidden',
                                        transitionDuration: '0ms'
                                    }
                                }}
                            >
                                {
                                    dataToggle
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
    toggle(uniqueId, keyProvided) {

        if(this.wip){
            return;
        }

        this.wip = true;
        const allowedAnimations = ['height', 'scale', 'opacity'];
        const { data, animationTimeout } = this.state;
        let { animation } = this.state;
        let timeouterForAnimationBack = 0;

        if (!allowedAnimations.includes(animation)) {
            animation = undefined;
        }

        const loop = (datas) => {
            if (datas && datas.length) {
                for (let x = 0; x <= datas.length - 1; x++) {
                    let { unique } = datas[x];
                    const dataChildren = datas[x].data;

                    if (unique == uniqueId) {

                        if (animation) {
                            timeouterForAnimationBack = animationTimeout;
                        }

                        /**
                         * Toogle backwards
                         */
                        if (false == !datas[x].toggled) {
                            datas[x].classList = `${datas[x].classList} ${animation ? `animation-${animation}-back is-toggling-back` : ''}`;
                            datas[x].classListText = `${datas[x].classListText} ${animation ? `is-toggling-back` : ''}`;

                            if ('height' == animation) {
                                const node = document.getElementById(keyProvided);

                                if (node) {

                                    try {
                                        datas[x].maxheight = node.getBoundingClientRect().height;

                                        return this.setState({
                                            data
                                        }, () => {
                                            let max = datas[x].maxheight;
                                            let i = parseInt(datas[x].maxheight / (timeouterForAnimationBack * 100));

                                            clearInterval(this.intervalToCloseMenu);
                                            let add = 1;

                                            const addCount = (d) => {

                                                if (d && typeof [] == typeof d && 0 !== d.length) {

                                                    for (let i = 0; i <= d.length - 1; i++) {

                                                        if (d[i] && d[i].toggled) {
                                                            add += 1;
                                                        }

                                                        if (d[i].data && typeof [] == typeof d[i].data && 0 !== d[i].data.length) {
                                                            addCount(d[i].data);
                                                        }
                                                    }
                                                }
                                            };

                                            addCount(datas[x].data);

                                            this.intervalToCloseMenu = setInterval(() => {
                                                max -= (1 + add);

                                                if (0 > max) {
                                                    datas[x].toggled = false;
                                                    datas[x].classList = '';
                                                    datas[x].classListText = '';
                                                    datas[x].maxheight = undefined;
                                                    clearInterval(this.intervalToCloseMenu);
                                                    this.wip = false;
                                                    return this.setState({ data });
                                                }

                                                datas[x].maxheight = max;
                                                this.setState({ data });

                                            }, i);

                                        });
                                    } catch (e) {
                                        datas[x].maxheight = undefined;
                                    }
                                }
                            }

                            return this.setState({
                                data
                            }, () => {
                                setTimeout(() => {
                                    datas[x].toggled = false;
                                    datas[x].classList = '';
                                    datas[x].classListText = '';
                                    datas[x].maxheight = undefined;

                                    this.setState({ data });
                                    this.wip = false;
                                }, timeouterForAnimationBack);
                            });
                        }

                        /**
                         * Toogle forwards
                         */
                        datas[x].toggled = true;
                        datas[x].classList = `toggling ${animation ? `animation-${animation}` : ''} is-toggling`;
                        datas[x].classListText = `is-toggling`;

                        if ('height' == animation) {
                            timeouterForAnimationBack = timeouterForAnimationBack + 100;
                        }

                        return this.setState({
                            data
                        }, () => {
                            setTimeout(() => {
                                datas[x].classList = `toggled ${animation ? `animation-${animation}` : ''}`;
                                datas[x].classListText = '';
                                datas[x].maxheight = undefined;

                                this.setState({ data });
                                this.wip = false;
                            }, timeouterForAnimationBack);
                        });
                    }

                    if (dataChildren && typeof [] == typeof dataChildren && 0 !== dataChildren.length) {
                        loop(dataChildren);
                    }
                }
            }
        }

        loop(data);
    }

    toggleAllBack() {

        if(this.wip){
            return;
        }

        this.wip = true;
        const allowedAnimations = ['height', 'scale', 'opacity'];
        const { data, animationTimeout } = this.state;
        let { animation } = this.state;
        let timeouterForAnimationBack = 0;

        if (!allowedAnimations.includes(animation)) {
            animation = undefined;
        }

        const loop = (datas, forceClose = false) => {
            if (datas && datas.length) {
                for (let x = 0; x <= datas.length - 1; x++) {
                    const { key } = datas[x];
                    const dataChildren = datas[x].data;

                    if (animation) {
                        timeouterForAnimationBack = animationTimeout;
                    }

                    datas[x].classList = `${datas[x].classList} ${animation ? `animation-${animation}-back is-toggling-back` : ''}`;
                    datas[x].classListText = `${datas[x].classListText} ${animation ? `is-toggling-back` : ''}`;

                    if ('height' == animation && key && !forceClose) {
                        const node = document.getElementById(key);

                        if (node) {

                            try {
                                datas[x].maxheight = node.getBoundingClientRect().height;

                                this.setState({
                                    data
                                }, () => {
                                    let max = datas[x].maxheight;
                                    let i = parseInt(datas[x].maxheight / (timeouterForAnimationBack * 100));

                                    clearInterval(this.intervalToCloseMenu);
                                    let add = 1;

                                    const addCount = (d) => {

                                        if (d && typeof [] == typeof d && 0 !== d.length) {

                                            for (let i = 0; i <= d.length - 1; i++) {

                                                if (d[i] && d[i].toggled) {
                                                    add += 1;
                                                }

                                                if (d[i].data && typeof [] == typeof d[i].data && 0 !== d[i].data.length) {
                                                    addCount(d[i].data);
                                                }
                                            }
                                        }
                                    };

                                    addCount(datas[x].data);

                                    this.intervalToCloseMenu = setInterval(() => {
                                        max -= (1 + add);

                                        if (0 > max) {
                                            datas[x].toggled = false;
                                            datas[x].classList = '';
                                            datas[x].classListText = '';
                                            datas[x].maxheight = undefined;
                                            clearInterval(this.intervalToCloseMenu);
                                            return this.setState({ data });
                                        }

                                        datas[x].maxheight = max;
                                        this.setState({ data });

                                    }, i);

                                });
                            } catch (e) {
                                datas[x].maxheight = undefined;
                            }
                        }
                        else {
                            const toggleEntry = () => {
                                setTimeout(() => {
                                    datas[x].toggled = false;
                                    datas[x].classList = '';
                                    datas[x].classListText = '';

                                    this.setState({
                                        data
                                    });
                                }, timeouterForAnimationBack);
                            }

                            this.setState({
                                data
                            }, toggleEntry);
                        }
                    }
                    else {
                        const toggleEntry2 = () => {
                            setTimeout(() => {
                                datas[x].toggled = false;
                                datas[x].classList = '';
                                datas[x].classListText = '';

                                this.setState({
                                    data
                                });
                            }, timeouterForAnimationBack);
                        }

                        this.setState({
                            data
                        }, toggleEntry2);
                    }
                }

                // Parents are closed, so just close childs - without an animation
                setTimeout( () => {

                    // Force close nested childrens
                    const closeChildrens = (datas) => {

                        for (let x = 0; x <= datas.length - 1; x++) {
                            datas[x].toggled = false;
                            datas[x].classList = '';
                            datas[x].classListText = '';
    
                            if (datas[x].data && typeof [] == typeof datas[x].data && 0 !== datas[x].data.length) {
                                closeChildrens(datas[x].data);
                            }
                        }
                    };

                    // Ignore parents - there are closed by an animation
                    for (let x = 0; x <= data.length - 1; x++) {
                        if (data[x].data && typeof [] == typeof data[x].data && 0 !== data[x].data.length) {
                            closeChildrens(data[x].data);
                        }
                    }

                    closeChildrens(data);
                    this.wip = false;
                    this.setState({ data });

                }, timeouterForAnimationBack);
            }
        }

        loop(data);
    }


    render() {
        const { addClass, data, defaultClass, id } = this.state;

        return (
            <div
                ref={this.refNode}
                className={`${defaultClass} ${addClass}`}
                {...isString(id && '' !== id) && { id: id } }
                tabIndex="0"
            >
                {
                    this.buildDataRecursive(data)
                }
            </div>
        )
    }
}

export default Accordion;