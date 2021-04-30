import React from 'react';
import urlExtract from '../../_Functions/urlExtract';
import uuid from '../internalFunctions/internalUuid';
import Menu from '../Menu';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class Breadcrumb extends React.Component 
{
    constructor(props) {
        super(props);

        this.buildBreadcrumbs = this.buildBreadcrumbs.bind(this);

        this.state = {
            /**
             * App
             */
            protocol: '',
            domain: '',
            paths: [],
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Breadcrumb',
            id: isString(props.id) ? props.id : '',
            hashRouter: (typeof true == typeof props.hashRouter) ? props.hashRouter : false,
            domainName: (props.domainName && typeof '8' == typeof props.domainName) ? props.domainName : undefined,
            reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
            moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
            delimiter: (props.delimiter && typeof '8' == typeof props.delimiter) ? props.delimiter : '>',
            overwriteText: typeof true == typeof props.overwriteText ? props.overwriteText : false,
            removeHashFromDomain: typeof true == typeof props.removeHashFromDomain ? props.removeHashFromDomain : false,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass',  'id', 'hashRouter', 'domainName', 'reactRouter', 'moduleMenu', 'delimiter', 'overwriteText', 'removeHashFromDomain'], props, state)) {            
            return {
                moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
                globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                hashRouter: (typeof true == typeof props.hashRouter) ? props.hashRouter : false,
                domainName: (props.domainName && typeof '8' == typeof props.domainName) ? props.domainName : undefined,
                reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
                moduleMenu: (props.moduleMenu && typeof {} == typeof props.moduleMenu) ? props.moduleMenu : undefined,
                delimiter: (props.delimiter && typeof '8' == typeof props.delimiter) ? props.delimiter : '>',
                overwriteText: typeof true == typeof props.overwriteText ? props.overwriteText : false,
                removeHashFromDomain: typeof true == typeof props.removeHashFromDomain ? props.removeHashFromDomain : false,
            };
        }

        return null;
    }

    componentDidMount() {
        this.buildBreadcrumbs();
    }

    buildBreadcrumbs() {
        const { hashRouter } = this.state;

        let extracted = urlExtract(hashRouter);
        extracted = extracted.href;

        this.setState({
            protocol: extracted.protocol,
            domain: extracted.domain,
            paths: extracted.paths,
        });
    }

    buildModuleMenu(moduleMenu, text) {
        if (moduleMenu) {
            const { overwriteText } = this.state;
            const { animation, data, moduleStyle, globalStyle, reactRouter, id, addClass, defaultClass, closeOnClickOutside } = moduleMenu;

            if (data && 0 !== data.length && !overwriteText) {
                data[0].text = text;
            }

            return (
                <Menu
                    {...isString(id) && '' !== id && { id: id } }
                    defaultClass={defaultClass}
                    addClass={addClass}
                    reactRouter={reactRouter}
                    animation={animation}
                    data={data}
                    moduleStyle={moduleStyle}
                    globalStyle={globalStyle}
                    closeOnClickOutside={closeOnClickOutside}
                />
            );
        }

        return '';
    }

    getTag(link = '', text = '', buildMenu = false) {
        const { reactRouter, moduleMenu } = this.state;
        const moduleMenuJsx = this.buildModuleMenu(moduleMenu, text);

        if (reactRouter) {

            if (buildMenu && moduleMenu) {
                return (
                    <span className="menu-span">
                        {
                            moduleMenuJsx
                        }
                    </span>
                );
            }

            return (
                <Link to={link}>
                    {
                        text
                    }
                </Link>
            );
        }

        if (buildMenu && moduleMenu) {
            return (
                <span className="menu-span">
                    {
                        moduleMenuJsx
                    }
                </span>
            );
        }

        return (
            <a href={link}>
                {
                    text
                }
            </a>
        );
    }

    getSingleBreadcrumb(addedPaths, path, isLast) {
        const { delimiter, paths } = this.state;

        if (!isLast && paths.length) {
            const data = [];

            data.push(
                <li key={uuid()} className="single-entry-li">
                    {
                        this.getTag(addedPaths, path, isLast)
                    }
                </li>
            );
            data.push(
                <li key={uuid()} className="single-entry-delimiter">
                    {
                        delimiter
                    }
                </li>
            );

            return data;
        }

        return (
            <li key={uuid()} className="single-entry-li">
                {
                    this.getTag(addedPaths, path, isLast)
                }
            </li>
        );
    }

    render() {
        const { addClass, defaultClass, id, protocol, paths, domainName, hashRouter, removeHashFromDomain } = this.state;
        let { domain } = this.state;
        let domainToDisplay = domain;

        if(removeHashFromDomain && domainToDisplay && typeof '8' == typeof domainToDisplay && domainToDisplay.indexOf('/#/')){
            domainToDisplay = domainToDisplay.replace('/#/', '');
        }

        let addedPaths = `${protocol}${domain}`;

        return (
            <ul className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    protocol && domain &&
                    this.getSingleBreadcrumb(`${protocol}${domain}`, `${domainName ? domainName : `${protocol}${domainToDisplay}`}`, false)
                }
                {
                    paths && 0 !== paths.length &&
                    paths.map((breadcrumb, i) => {
                        const { path } = breadcrumb;

                        if(0 == i){
                            if(hashRouter){
                                addedPaths += path;
                            }
                            else{
                                addedPaths += `/${path}`;
                            }
                        }
                        else{
                            addedPaths += `/${path}`;
                        }

                        const isLast = (i == paths.length - 1) ? true : false;
                        return this.getSingleBreadcrumb(addedPaths, path, isLast)
                    })
                }
            </ul>
        )
    }
}

export default Breadcrumb;