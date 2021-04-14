import React from 'react';
import { Link } from 'react-router-dom';

class Water404 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-water-404',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            reactRouter: this.props.reactRouter ? this.props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
            bad: typeof true == typeof props.bad ? props.bad : false,
            shipName: props.shipName && typeof '8' == typeof props.shipName ? props.shipName : '',
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
        const { reactRouter, link, text404, text1, text2, shipName, bad, addClass, defaultClass, id } = this.state;
        const { href, text, props } = link;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                id={id}
            >
                <div className="holder-404">
                    <div className="water">
                        <div className='box'>
                            <div className="ship-move">
                                <div className="ship">
                                    <p className="ship-name">
                                        {
                                            shipName
                                        }
                                    </p>
                                    <div className="box box-1">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-2">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-3">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-4">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-5">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-6">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-7">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-8">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-9">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="box box-10">
                                        <div className="point-x"></div>
                                        <div className="point-y"></div>
                                    </div>
                                    <div className="ship-bottom">
                                        <div className="spin">
                                            <div className="spin-end">
                                                <div className="spin-1"></div>
                                                <div className="spin-2"></div>
                                            </div>
                                            <span className="air-move">
                                                <div className="air air-1"></div>
                                                <div className="air air-2"></div>
                                                <div className="air air-3"></div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="water-holder">
                                <div className='wave water-1'></div>
                                <div className='wave water-2'></div>
                                <div className='wave water-3'></div>
                                <div className='wave water-4'></div>
                                <div className='wave water-5'></div>
                                <div className='wave water-6'></div>
                                <div className='wave water-7'></div>
                                <div className='wave water-8'></div>
                                <div className='wave water-9'></div>
                                <div className='wave water-10'></div>
                                <div className='wave water-11'></div>
                                <div className='wave water-12'></div>
                                <div className='wave water-13'></div>
                                <div className='wave water-14'></div>
                                <div className='wave water-15'></div>
                                <div className='wave water-16'></div>
                                <div className='wave water-17'></div>
                                <div className='wave water-18'></div>
                                <div className='wave water-19'></div>
                                <div className='wave water-20'></div>
                            </div>
                            <div className="fish">
                                <span className="fish-content">
                                    <div className={true == bad ? 'fish-body bad-fish' : 'fish-body'}>
                                        <div className="eye">
                                            <div className="pupil"></div>
                                        </div>
                                    </div>
                                    <div className={true == bad ? 'fin bad-fin' : 'fin'}></div>
                                    <div className={true == bad ? 'fin fin-bottom bad-fin' : 'fin fin-bottom'}></div>
                                </span>
                            </div>
                            <div className="fish-2">
                                <span className="fish-content">
                                    <div className={true == bad ? 'fish-body fish-body-2 bad-fish' : 'fish-body fish-body-2'}>
                                        <div className="eye">
                                            <div className="pupil"></div>
                                        </div>
                                    </div>
                                    <div className={true == bad ? 'fin fin-2 bad-fin' : 'fin fin-2'}></div>
                                    <div className={true == bad ? 'fin fin-2 fin-bottom bad-fin' : 'fin fin-2 fin-bottom'}></div>
                                </span>
                            </div>
                            <div className="fish-3">
                                <span className="fish-content">
                                    <div className={true == bad ? 'fish-body fish-body-3 bad-fish' : 'fish-body fish-body-3'}>
                                        <div className="eye">
                                            <div className="pupil"></div>
                                        </div>
                                    </div>
                                    <div className={true == bad ? 'fin fin-3 bad-fin' : 'fin fin-3'}></div>
                                    <div className={true == bad ? 'fin fin-3 fin-bottom bad-fin' : 'fin fin-3 fin-bottom'}></div>
                                </span>
                            </div>
                        </div>
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
export default Water404;