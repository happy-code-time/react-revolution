import React from 'react';
import { Link } from 'react-router-dom';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Picture404 extends React.Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.setListeners = this.setListeners.bind(this);
        this.updateTransformations = this.updateTransformations.bind(this);

        this.state = {
            /**
             * App
             */
            transformations: {},
            lFollowX: 0,
            lFollowY: 0,
            friction: 1 / 30,
            x: 0,
            y: 0,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Picture404',
            id: isString(props.id) ? props.id : '',
            reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
            imagePath: props.imagePath && typeof '8' == typeof props.imagePath ? props.imagePath : '',
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass', 'defaultClass',  'id', 'reactRouter', 'link', 'text404', 'text1', 'text2', 'imagePath'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Picture404',
                moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
                globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
                link: props.link && typeof {} == typeof props.link ? props.link : {},
                text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
                text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
                text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
                imagePath: props.imagePath && typeof '8' == typeof props.imagePath ? props.imagePath : '',
            };
        }

        return null;
    }

    componentDidMount() {
        this.setListeners();
        this.animate();
    }

    componentWillUnmount() {
        this.setListeners(false);
    }

    setListeners(attach = true) {
        window.removeEventListener('mousemove', this.updateTransformations);
        window.removeEventListener('click', this.updateTransformations);

        if (attach) {
            window.addEventListener('mousemove', this.updateTransformations);
            window.addEventListener('click', this.updateTransformations);
        }
    }

    animate() {
        let { lFollowX, lFollowY, x, y, friction } = this.state;

        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;

        const translate = `translate(${x}px, ${y}px) scale(1.3)`;

        this.setState({
            transformations: {
                WebitTransform: translate,
                MozTransform: translate,
                transform: translate
            }
        });

        window.requestAnimationFrame(this.animate);
    }

    updateTransformations(e) {
        const lMouseX = Math.max(-100, Math.min(100, document.documentElement.getBoundingClientRect().width / 2 - e.clientX));
        const lMouseY = Math.max(-100, Math.min(100, document.documentElement.getBoundingClientRect().height / 2 - e.clientY));

        this.setState({
            lFollowX: (100 * lMouseX) / 30,
            lFollowY: (100 * lMouseY) / 30
        });
    }

    render() {
        const { transformations, imagePath, reactRouter, defaultClass, addClass, id, link, text404, text1, text2 } = this.state;
        const { href, text, props } = link;

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                <div className="page">
                    <div className="content">
                        <h1>
                            {
                                text404
                            }
                        </h1>
                        <br/>
                        <h2>
                            {
                                text1
                            }
                        </h2>
                        <br/>
                        <p>
                            {
                                text2
                            }
                        </p>
                        <br/>
                        {
                            reactRouter &&
                            <Link to={href} {...props}>
                                {
                                    text
                                }
                            </Link>
                        }
                        {
                            !reactRouter &&
                            <a href={href} {...props}>
                                {
                                    text
                                }
                            </a>
                        }
                    </div>
                    <div className="image-container">
                        <img style={transformations} src={imagePath} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Picture404;
