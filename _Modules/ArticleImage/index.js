import React from 'react';
import buildDropDownStructure from '../internalFunctions/buildDropDownStructure';
import uuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class ArticleImage extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.buildData = this.buildData.bind(this);
        this.toggleAllBack = this.toggleAllBack.bind(this);
        this.resize = this.resize.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            /**
             * App
             */
            isMinified: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ArticleImage',
            id: isString(props.id) ? props.id : '',
            closeOnClickOutside: typeof true == typeof props.closeOnClickOutside ? props.closeOnClickOutside : false,
            data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
            animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
            itemsPerLine: typeof 8 == typeof props.itemsPerLine ? props.itemsPerLine : 3,
            mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
            toggleOn: (props.toggleOn && typeof '8' == typeof props.toggleOn) ? props.toggleOn : '',
            toggleForwards: props.toggleForwards ? props.toggleForwards : '',
            toggleBackwards: props.toggleBackwards ? props.toggleBackwards : '',
            persist: typeof true == typeof props.persist ? props.persist : false,
        };

        this.refNode = React.createRef();
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass',  'defaultClass', 'id', 'data', 'animation', 'itemsPerLine', 'mediaBreak', 'toggleOn', 'toggleForwards', 'persist', 'toggleBackwards'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ArticleImage',
                moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
                globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                closeOnClickOutside: typeof true == typeof props.closeOnClickOutside ? props.closeOnClickOutside : false,
                data: (props.data && typeof [] == typeof props.data) ? buildDropDownStructure(props.data) : [],
                animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
                itemsPerLine: typeof 8 == typeof props.itemsPerLine ? props.itemsPerLine : 3,
                mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
                toggleOn: (props.toggleOn && typeof '8' == typeof props.toggleOn) ? props.toggleOn : '',
                toggleForwards: props.toggleForwards ? props.toggleForwards : '',
                toggleBackwards: props.toggleBackwards ? props.toggleBackwards : '',
                persist: typeof true == typeof props.persist ? props.persist : false,
            };
        }

        return null;
    }

    componentDidMount() {
        const { mediaBreak } = this.state;

        if (mediaBreak) {
            window.addEventListener('resize', this.resize);
            this.resize();
        }
    }

    componentWillUnmount() {
        const { mediaBreak } = this.state;

        if (mediaBreak) {
            window.removeEventListener('resize', this.resize);
        }
    }

    resize() {
        const { mediaBreak, isMinified } = this.state;

        /**
         * Media break
         */
        if (document.documentElement.getBoundingClientRect().width <= mediaBreak) {
            if (!isMinified) {
                this.setState({
                    isMinified: true
                }, this.buildData);
            }
        }
        /**
         * Default
         */
        else {
            if (isMinified) {
                this.setState({
                    isMinified: false
                }, this.buildData);
            }
        }
    }

    handleBlur(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.toggleAllBack();
        }
    }

    buildData(data) {
        const { itemsPerLine, isMinified, toggleForwards, toggleBackwards } = this.state;
        let { toggleOn, persist } = this.state;
        const clsHolder = `group flex ${isMinified ? 'flex-column isMinified' : 'flex-row'}`;
        const jsx = [];
        let temporary = [];

        if (data && data.length) {

            if (!toggleOn || !['title', 'text'].includes(toggleOn)) {
                toggleOn = 'box';
            }

            for (let x = 0; x <= data.length - 1; x++) {
                let canBeToggled = true;

                let {
                    title, titleProps,
                    text, textProps,
                    image, imageProps, imageData,
                    toggled, unique,
                    classList, href,
                    icon, childrensNestedCount,
                    key, dataToggle, border
                } = data[x];

                if (dataToggle && toggled && persist) {
                    canBeToggled = false;
                }

                if (href && typeof '8' == typeof href) {
                    href = href.toLowerCase();
                }

                if (!classList) {
                    classList = '';
                }

                if (!titleProps || typeof titleProps !== typeof {}) {
                    titleProps = {};
                }

                if (!imageProps || typeof imageProps !== typeof {}) {
                    imageProps = {};
                }

                try {
                    Object.keys(titleProps);
                    Object.keys(imageProps);
                }
                catch (e) {
                    titleProps = {};
                    imageProps = {};
                }

                const rightSite = [];

                if (title) {

                    if (typeof '8' == typeof title) {
                        rightSite.push(
                            <h1
                                key={uuid()}
                                className={`title ${'title' == toggleOn && dataToggle && toggled && persist ? 'data-toggled' : ''}`}
                                {...titleProps}
                                {...(('title' == toggleOn && !toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    title
                                }
                            </h1>
                        );
                    }
                    else {
                        rightSite.push(
                            <div
                                key={uuid()}
                                className={`title ${'title' == toggleOn && dataToggle && toggled && persist ? 'data-toggled' : ''}`}
                                {...titleProps}
                                {...(('title' == toggleOn && !toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    title
                                }
                            </div>
                        );
                    }
                }

                if (text) {

                    if (typeof '8' == typeof title) {
                        rightSite.push(
                            <span
                                key={uuid()}
                                className={`text ${'text' == toggleOn && dataToggle && toggled && persist ? 'data-toggled' : ''}`}
                                {...textProps}
                                {...(('text' == toggleOn && !toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    text
                                }
                            </span>
                        );
                    }
                    else {
                        rightSite.push(
                            <span
                                key={uuid()}
                                className={`text ${'text' == toggleOn && dataToggle && toggled && persist ? 'data-toggled' : ''}`}
                                {...textProps}
                                {...(('text' == toggleOn && !toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    text
                                }
                                {
                                    dataToggle && toggled &&
                                    <span
                                        key={uuid()}
                                        className={classList}
                                    >
                                        {
                                            dataToggle
                                        }
                                    </span>
                                }
                            </span>
                        );
                    }
                }

                let renderBorder = false;
                let style = {};

                if (border && typeof {} == typeof border) {
                    const { site, width, color } = border;

                    if (site && width && color) {

                        if (typeof '8' == typeof site && ['top', 'right', 'bottom', 'left'].includes(site) && typeof 8 == typeof width && typeof '8' == typeof color) {
                            const property = `border${site.charAt(0).toUpperCase()}${site.substring(1, site.length)}`;
                            style[property] = `${width}px solid ${color}`;
                            renderBorder = true;
                        }

                    }
                }

                temporary.push(
                    <div
                        key={key}
                        className={`single-entry ${'box' == toggleOn && dataToggle && toggled && persist ? 'data-toggled' : ''}`}
                        {...(('box' == toggleOn && !toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                    >
                        {
                            renderBorder &&
                            <div
                                className='border'
                                style={style}
                            />
                        }
                        {
                            image && typeof '8' == typeof image &&
                            <div className='image-holder'>
                                <div
                                    className='image'
                                    {...imageProps}
                                    style={
                                        {
                                            backgroundImage: `url(${image})`,
                                        }
                                    }
                                >
                                    {
                                        imageData &&
                                        <div className='image-data'>
                                            {
                                                imageData
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            rightSite && rightSite
                        }
                        {
                            !toggled && toggleForwards &&
                            <span
                                {...((toggleForwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    toggleForwards
                                }
                            </span>
                        }
                        {
                            dataToggle && toggled &&
                            <span
                                key={uuid()}
                                className={classList}
                            >
                                {
                                    dataToggle
                                }
                            </span>
                        }
                        {
                            toggled && toggleBackwards && !persist &&
                            <span
                                {...((toggleBackwards && canBeToggled) && { onClick: (e) => this.toggle(unique) })}
                            >
                                {
                                    toggleBackwards
                                }
                            </span>
                        }
                    </div>
                );

                if (temporary.length == itemsPerLine || temporary.length && x == data.length - 1) {
                    jsx.push(
                        <div
                            key={uuid()}
                            className={clsHolder}
                        >
                            {
                                temporary
                            }
                        </div>
                    );

                    temporary = [];
                }
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
        const allowedAnimations = ['height', 'scale', 'opacity'];
        const { data, persist } = this.state;
        let { animation } = this.state;
        let timeouter = 0;
        let toggled;

        if (!allowedAnimations.includes(animation)) {
            animation = undefined;
        }

        if (data && data.length) {

            for (let x = 0; x <= data.length - 1; x++) {
                let { unique } = data[x];

                if (unique == uniqueId) {

                    if (animation) {
                        timeouter = 300;
                    }

                    if (persist && false == !data[x].toggled) {
                        return null;
                    }

                    toggled = !data[x].toggled;

                    /**
                     * Set only class list on the first step
                     * to execute the animation toggle back functonality
                     */
                    if (false == toggled) {
                        data[x].classList = `${data[x].classList} ${animation ? `animation-${animation}-back` : ''}`;
                    }
                    else {
                        data[x].classList = `toggling ${animation ? `animation-${animation}` : ''}`;
                        data[x].toggled = true;

                        setTimeout(() => {
                            data[x].classList = `toggled ${animation ? `animation-${animation}` : ''}`;
                            this.setState({ data });
                        }, timeouter);
                    }

                    /**
                     * Toggle state can be executed immediately
                     */
                    if (toggled) {
                        this.setState({
                            data
                        });
                    }
                    else {
                        this.setState({
                            data
                        }, () => {
                            /**
                             * After the toggling back animation are executed
                             * then remove the toggled state
                             */
                            setTimeout(() => {
                                data[x].classList = '';
                                data[x].toggled = false;
                                this.setState({ data });
                            }, timeouter);
                        });
                    }

                    break;
                }
            }
        }
    }

    toggleAllBack() {
        const allowedAnimations = ['height', 'scale', 'opacity'];
        const { data, persist } = this.state;
        let { animation } = this.state;
        let timeouter = 0;

        if (!allowedAnimations.includes(animation)) {
            animation = undefined;
        }

        if (data && data.length) {
            for (let x = 0; x <= data.length - 1; x++) {

                if (animation) {
                    timeouter = 300;
                }

                data[x].classList = `${data[x].classList} ${animation ? `animation-${animation}-back` : ''}`;

                const toggleEntry = () => {
                    setTimeout(() => {
                        data[x].toggled = persist ? true : false;
                        data[x].classList = '';

                        this.setState({
                            data
                        });
                    }, timeouter);
                }

                this.setState({
                    data
                }, toggleEntry);
            }
        }
    }

    render() {
        const { addClass, defaultClass, id, data, closeOnClickOutside } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
                {...((true == closeOnClickOutside) && { onBlur: (e) => this.handleBlur(e) })}
                tabIndex="0"
            >
                {
                    this.buildData(data)
                }
            </div>
        )
    }
}

export default ArticleImage;