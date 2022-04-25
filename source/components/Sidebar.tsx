import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';

class Sidebar extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);

        this.state = {
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Sidebar',
            
            image: (props.image && typeof {} == typeof props.image) ? props.image : undefined,
            moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
            textLong: props.textLong? props.textLong : undefined,
            textShort: props.textShort ? props.textShort : undefined,
            href: (props.href && typeof '8' == typeof props.href) ? props.href : undefined,
            hrefProps: (props.hrefProps && typeof {} == typeof props.hrefProps) ? props.hrefProps : undefined,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass',  'id', 'image', 'moduleMenu', 'textLong', 'textShort', 'href', 'hrefProps'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Sidebar',
                
                
                image: (props.image && typeof {} == typeof props.image) ? props.image : undefined,
                moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
                textLong: props.textLong? props.textLong : undefined,
                textShort: props.textShort ? props.textShort : undefined,
                href: (props.href && typeof '8' == typeof props.href) ? props.href : undefined,
                hrefProps: (props.hrefProps && typeof {} == typeof props.hrefProps) ? props.hrefProps : undefined,
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    render() {
        const { defaultClass, id, addClass, moduleMenu, image, textLong, textShort, href, hrefProps } = this.state;

        return (
            <div className='' >
                <div className="logo-text">
                    {
                        href &&
                        <a
                            href={href}
                            className="logo-text-href flex"
                            {...hrefProps}
                        >
                            {
                                image &&
                                <div className="logo">
                                    {
                                        image
                                    }
                                </div>
                            }
                            <div className="text">
                                {
                                    textLong && typeof '8' == typeof textLong &&
                                    <span className="long">
                                        {
                                            textLong
                                        }
                                    </span>
                                }
                                {
                                    textLong && typeof '8' !== typeof textLong && textLong
                                }
                                {
                                    textShort && typeof '8' == typeof textShort &&
                                    <span className="short">
                                        {
                                            textShort
                                        }
                                    </span>
                                }
                                {
                                    textShort && typeof '8' !== typeof textShort && textShort
                                }
                            </div>
                        </a>
                    }
                    {
                        !href &&
                        <div className="logo-text flex">
                            {
                                image &&
                                <div className="logo">
                                    {
                                        image
                                    }
                                </div>
                            }
                            <div className="text">
                                {
                                    textLong &&
                                    <span className="long">
                                        {
                                            textLong
                                        }
                                    </span>
                                }
                                {
                                    textShort &&
                                    <span className="short">
                                        {
                                            textShort
                                        }
                                    </span>
                                }
                            </div>
                        </div>
                    }
                </div>
                {
                    moduleMenu && moduleMenu
                }
            </div>
        );
    }
}

export default Sidebar;