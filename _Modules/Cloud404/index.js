import React from 'react';
import { Link } from 'react-router-dom';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Cloud404 extends React.Component 
{
    constructor(props) {
        super(props);

        this.state = {
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Cloud404',
            id: isString(props.id) ? props.id : '',
            reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
            bad: typeof true == typeof props.bad ? props.bad : false,
        }
    }

    callback(e) {
        const { link } = this.state;

        if(link){
            const { callback } = link;

            if (callback && typeof function(){} == typeof callback) {
                (callback)(e);
            }
        }
    }

    render() {
        const { reactRouter, text404, text1, text2, bad, addClass, defaultClass, id, link } = this.state;
        const { href, text, props } = link;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                <div className="holder-404">
                    <div className="cloud cloud-1">

                    </div>
                    <div className="cloud cloud-2">

                    </div>
                    {
                        true == bad &&
                        <div className="cloud cloud-3 bad-cloud-3">
                            <div className="bolt bolt-1">
                                <div className="bolt-part-1">
                                    <div className="bolt-part-2">
                                        <div className="bolt-part-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bolt bolt-2">
                                <div className="bolt-part-1">
                                    <div className="bolt-part-2">
                                        <div className="bolt-part-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        false == bad &&
                        <div className="cloud cloud-3">

                        </div>
                    }
                    <div className="cloud cloud-4">

                    </div>
                    {
                        true == bad &&
                        <div className="cloud cloud-5 bad-cloud-5">
                            <div className="bolt bolt-3">
                                <div className="bolt-part-1">
                                    <div className="bolt-part-2">
                                        <div className="bolt-part-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bolt bolt-4">
                                <div className="bolt-part-1">
                                    <div className="bolt-part-2">
                                        <div className="bolt-part-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        false == bad &&
                        <div className="cloud cloud-5">

                        </div>
                    }
                    <div className="cloud cloud-6">

                    </div>
                </div>
                <div className="content-404">
                    <div className="text-404">
                        {
                            text404
                        }
                    </div>
                    <hr />
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
export default Cloud404;