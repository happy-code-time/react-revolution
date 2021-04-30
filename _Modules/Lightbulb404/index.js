import React from 'react';
import { Link } from 'react-router-dom';
import isString from '../../_Functions/isString';

class Lightbulb404 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /**
             * App
             */
            active: true,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Lightbulb404',
            id: isString(props.id) ? props.id : '',
            reactRouter: this.props.reactRouter ? this.props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
            bad: typeof true == typeof props.bad ? props.bad : false,
        }
    }

    callback(e) {
        const { link } = this.state;

        if (link) {
            const { callback } = link;

            if (callback && typeof function(){} == typeof callback) {
                (callback)(e);
            }
        }
    }

    toggleLight(offButton) {

        if (offButton) {
            this.setState({
                active: false
            });
        }

        if (!offButton) {
            this.setState({
                active: true
            });
        }
    }

    render() {
        const { active, reactRouter, link, text404, text1, text2, bad, addClass, defaultClass, id } = this.state;
        const { href, text, props } = link;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div className='holder-404'>
                    <div className="content-404">
                        <div className="container">
                            <div className="text-404">
                                {
                                    text404
                                }
                            </div>

                            <hr />

                            <div className="lightbulb-holder">
                                <div className='base'></div>
                                <div className={`lightbulb-${active ? 'on' : 'off'}`}></div>
                            </div>

                            <div className="buttons-container">
                                <div className="buttons">

                                    <div
                                        className={true == active ? 'on active' : 'on'}
                                        onClick={() => this.toggleLight(false)}
                                    >
                                    </div>

                                    <div
                                        className={false == active ? 'off active' : 'off'}
                                        onClick={() => this.toggleLight(true)}
                                    >
                                    </div>
                                </div>
                            </div>

                            <div className="text-1">
                                {
                                    text1
                                }
                            </div>
                            <div className="text-2">
                                {
                                    text2
                                }
                                {
                                    !active &&
                                    <div className=''>

                                    </div>
                                }
                            </div>
                            {
                                href && typeof '8' == typeof href && true == reactRouter &&
                                <Link
                                    className="button-navigation"
                                    to={href}
                                    {...props}
                                    onClick={(e) => this.callback(e)}
                                >
                                    {
                                        text
                                    }
                                </Link>
                            }
                            {
                                href && typeof '8' == typeof href && false === reactRouter &&
                                <a
                                    className="button-navigation"
                                    href={href}
                                    {...props}
                                    onClick={(e) => this.callback(e)}
                                >
                                    {
                                        text
                                    }
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default Lightbulb404;