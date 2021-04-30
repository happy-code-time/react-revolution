import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Table extends React.Component 
{

    constructor(props) {
        super(props);
        this.buildData = this.buildData.bind(this);
        this.resize = this.resize.bind(this);

        this.state = {
            /**
             * App
             */
            dataJsx: [],
            isMinified: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Table',
            id: isString(props.id) ? props.id : '',
            title: (props.title && typeof [] == typeof props.title) ? props.title : undefined,
            data: (props.data && typeof [] == typeof props.data) ? props.data : undefined,
            mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
            keysToRead: (props.keysToRead && typeof [] == typeof props.keysToRead) ? props.keysToRead : undefined,
            titleOnMinified: (typeof true == typeof props.titleOnMinified) ? props.titleOnMinified : true,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'data', 'mediaBreak', 'title', 'keysToRead', 'titleOnMinified'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                title: (props.title && typeof [] == typeof props.title) ? props.title : undefined,
                data: (props.data && typeof [] == typeof props.data) ? props.data : undefined,
                mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
                keysToRead: (props.keysToRead && typeof [] == typeof props.keysToRead) ? props.keysToRead : undefined,
                dataJsx: state.dataJsx,
                titleOnMinified: (typeof true == typeof props.titleOnMinified) ? props.titleOnMinified : true,
            };
        }

        return null;
    }

    componentDidMount() {
        const { mediaBreak } = this.state;

        this.buildData();

        if (mediaBreak) {
            window.addEventListener('resize', this.resize);
            this.resize();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
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

    buildData() {
        const { data, isMinified, title, keysToRead, titleOnMinified } = this.state;
        const dataJsx = [];
        const clsCardsHolder = `${isMinified ? 'flex-column isMinified' : 'flex-row'}`;

        if (data && data.length) {
            const titleJsx = [];

            if (title && title.length) {

                title.map((value, i) => {
                    if (value && typeof '8' == typeof value) {
                        titleJsx.push(
                            <span
                                key={internalUuid()}
                                className={`span span-${i + 1}`}
                            >
                                {
                                    value
                                }
                            </span>
                        );
                    }
                });

                if (titleJsx.length) {
                    dataJsx.push(
                        <li
                            key={internalUuid()}
                            className={`${clsCardsHolder} title`}
                        >
                            {
                                titleJsx
                            }
                        </li>
                    );
                }
            }

            data.map(object => {

                if (keysToRead && keysToRead.length) {
                    let dataInsideJsx = [];

                    keysToRead.map((key, i) => {

                        if (undefined !== object[key]) {
                            const value = object[key] ? object[key] : '';

                            if (isMinified && titleOnMinified && title && 0 !== title.length && undefined !== title[i]) {
                                dataInsideJsx.push(
                                    <span key={internalUuid()} className="span-title">
                                        {
                                            title[i]
                                        }
                                    </span>
                                );
                            }
                            dataInsideJsx.push(
                                <span
                                    key={internalUuid()}
                                    className={`span span-${i + 1}`}>
                                    {
                                        value
                                    }
                                </span>
                            );
                        }
                    });

                    if (dataInsideJsx && dataInsideJsx.length) {

                        dataJsx.push(
                            <li
                                key={internalUuid()}
                                className={clsCardsHolder}
                            >
                                {
                                    dataInsideJsx
                                }
                            </li>
                        );

                        dataInsideJsx = [];
                    }
                }
            });

            this.setState({ dataJsx });
        }
    }

    render() {
        const { addClass, defaultClass, id, dataJsx } = this.state;

        return (
            <ul className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    dataJsx && dataJsx.length && dataJsx.map(i => i)
                }
            </ul>
        );
    }
}

export default Table;
