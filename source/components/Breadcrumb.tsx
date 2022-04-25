import React from 'react';

import isNotEmptyString from '../functions/isNotEmptyString';
import isNotEmptyArray from '../functions/isNotEmptyArray';
import uuid from '../functions/uuid';
import PropsCheck from '../functions/PropsCheck';

interface PropsInterface {
    [key: string]: any;
}

interface StateInterface {
    [key: string]: any;
}

class Breadcrumb extends React.Component<PropsInterface, StateInterface> {
    constructor(props) {
        super(props);
        this.hashchange = this.hashchange.bind(this);

        this.state = {
            /**
             * App
             */
            protocol: '',
            domain: '',
            paths: [],
            search: '',
            keyValue: [],
            /**
             * User
             */
            overWriteDomainName: props.overWriteDomainName  ? props.overWriteDomainName : undefined,
            delimiter: props.delimiter ? props.delimiter : '/',
            lastEntryText: props.lastEntryText,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['overWriteDomainName', 'delimiter', 'lastEntryText'], props, state)) {
            return {
                overWriteDomainName: props.overWriteDomainName,
                delimiter: props.delimiter ? props.delimiter : '/',
                lastEntryText: props.lastEntryText,
            };
        }

        return null;
    }

    componentDidMount(): void {

        this.setListener(true);
        this.extractUrl();
    }

    componentWillUnmount(): void {
        this.setListener(false);
    }

    setListener(attach: boolean){
        window.removeEventListener('hashchange', this.hashchange);

        if(attach){
            window.addEventListener('hashchange', this.hashchange);
        }
    }

    hashchange(){
        this.extractUrl();
    }

    extractUrl(u = window.location.href){
        const url = u.split('/');
        const paths = [];
        let search = '';
        let protocol = '';
        let domain = '';
        let generateValidHrefs = '';

        for(let x = 0; x < url.length; x++){
            url[x] = url[x].trim();
        }

        for(let x = 0; x < url.length; x++){
            /**
             * Extract ?
             */
            if(2 === url[x].split('?').length){
                search = url[x];
            } 

            if('' !== url[x]){
                /**
                 * Extract protcol
                 */
                if('https:' === url[x] || 'http:' === url[x]){
                    protocol = url[x].substring(0, url[x].length-2);
                }
                /**
                 * Extract protcol
                 */
                else if('www.' === url[x].substring(0, 4)){
                    domain = url[x];
                }
                else {
                    /**
                     * Build valid url to use as link
                     */
                    if('' !== protocol && '' !== domain && '' === generateValidHrefs){
                        generateValidHrefs = `${protocol}://${domain}`;
                    }

                    /**
                     * Remove hash from path name
                     */
                    if('#' === url[x].charAt(url[x].length-1)){
                        url[x] = url[x].substring(0, url[x].length-1);
                        /**
                         * if is hash router, then use it
                         */
                        if(-1 === generateValidHrefs.indexOf('#')){
                            generateValidHrefs += `/${url[x]}#/`;
                        }
                    } else {
                        generateValidHrefs += `${'/' !== generateValidHrefs.charAt(generateValidHrefs.length-1) ? '/' : ''}${url[x]}`;
                    } 

                    paths.push(
                        {
                            path: url[x],
                            url: generateValidHrefs
                        }
                    );
                }
            }
        }

        const keyValue = [];

        if(0 !== search.length){
            let v = search.substring(1, search.length-1)
            
            if(0 !== v.length){
                v = v.trim();

                if(0 !== v.length){
                    const xv = v.split('&');

                    for(let x = 0; x < xv.length; x++){
                        if(2 === xv[x].split('=').length){
                            keyValue.push(
                                {
                                    key: xv[x].split('=')[0],
                                    value: xv[x].split('=')[1]
                                }
                            );
                        }
                    }
                }
            }
        }

        this.setState({
            protocol,
            domain,
            paths,
            search,
            keyValue
        });
    }

    getData(data, isLastEntry){
        const { lastEntryText } = this.state;

        if(true == isLastEntry && isNotEmptyString(lastEntryText))
        {
            return lastEntryText;
        }

        return data;
    }

    getSingleBreadCrumb(data, isHome = false, link: string = '', isLastEntry: boolean = false){
        const { protocol, domain, delimiter } = this.state;

        if(true !== isHome && isNotEmptyString(data)){
            data = `${data.charAt(0).toUpperCase()}${data.substring(1, data.length)}`;
        }

        return (
            <li 
                className='flex' 
                key={uuid()}
            >
                {/* Url */}
                <span className='flex px-2'>
                    <a 
                        href={link}
                        {...(true === isHome) && { href: `${protocol}://${domain}` }} 
                        className='d-inline-block text-muted m-auto'
                    >
                        {
                            this.getData(data, isLastEntry)
                        }
                    </a>
                </span>
                {/* Delimiter */}
                {
                    false == isLastEntry &&
                    <span className='flex px-2'>
                        <span className='d-inline-block text-muted m-auto'>
                            {
                                delimiter
                            }
                        </span>
                    </span>
                }
            </li>
        );
    }

    render() {
        const { protocol, domain, paths, search, keyValue, overWriteDomainName } = this.state;

        return (
            <ul className="Breadcrumb flex">
                {
                    isNotEmptyString(protocol) && isNotEmptyString(domain) && overWriteDomainName && this.getSingleBreadCrumb(overWriteDomainName, true, '', false === isNotEmptyArray(paths))
                }
                {
                    isNotEmptyArray(paths) && paths.map( (d, i) => this.getSingleBreadCrumb(d.path, false, d.url, i === paths.length-1))
                }
            </ul>
        );
    }
}

export default Breadcrumb;
