import React from 'react';
import { Link } from 'react-router-dom';
import isString from '../../_Functions/isString';

class DarkLine404 extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'DarkLine404',
            id: isString(props.id) ? props.id : '',
            reactRouter: this.props.reactRouter ? this.props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
        };
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

    render() {
        const { reactRouter, link, text404, text1, text2, addClass, defaultClass, id } = this.state;
        const { href, text, props } = link;

        return (
            <div
                ref={this.reference}
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div className="holder-404">
                <div className="danger-line danger-line-1" id="danger-line-1"></div>
                    <div className="danger-line danger-line-2" id="danger-line-2"></div>
                </div>
                <div className="content-404">
                    <div className="text-404">
                        {
                            text404
                        }
                    </div>
                    <div className="hr">
                        <div className="hr-line hr-line-1"></div>
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
        );
    }
};
export default DarkLine404;