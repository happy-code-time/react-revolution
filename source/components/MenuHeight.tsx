import React from 'react';

import { Link } from 'react-router-dom';
import PropsCheck from '../functions/PropsCheck';
import isArray from '../functions/isArray';
import isBoolean from '../functions/isBoolean';
import isNumber from '../functions/isNumber';
import isString from '../functions/isString';
import _uuid from '../functions/uuid';

interface SP {
    [key: string]: any;
};

interface IMenutItem {
    attr: { [key: string]: any };
    text: any;
    icon: any;
    children: any[]; 
    toggled: boolean;
    unique: string; 
    isChild: boolean; 
    nestedCount: number;
    type: string;
    href: string;
};

const buildDropDownStructure = (data = [], isChild: boolean = false, l = 0) => {
    l += 1;
    /**
     * Get unique id for the single menu element
     */
    const choosedIds = [];

    const getUuid = () => {
        const uuidItem = `${_uuid()}`;
       
        if(choosedIds.includes(uuidItem)){
            getUuid();
        }

        return uuidItem;
    };

    /**
     * Main attaching functionality
     */
    if(data && data.length){

        for(let x = 0; x <= data.length-1; x++){
            if(undefined == data[x].uuid){
                data[x].unique = `${getUuid()}`;
            }
            if(undefined == data[x].toggled){
                data[x].toggled = false;
            }
            if(isChild){
                data[x].isChild = true;
            }
            
            data[x].nestedCount = l;

            if(isArray(data[x].children) && data[x].children.length){
                buildDropDownStructure(data[x].children, true, l);
            }
        }
    }

    return data;
};

export default class MenuHeight extends React.Component<SP, SP>
{
    private action: string;
    private tmpRef: any;
    private togglingRef: any;
    private match: {};
    private menuRef: any;

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.resize = this.resize.bind(this);

        this.state = {
            /**
             * RR
             */
            tmp: '',
            toggledItem: '',
            isAnimating: false,
            /**
             * User
             */
            data: isArray(props.data) && props.data.length ? buildDropDownStructure(props.data) : [],
            reactRouter: isBoolean(props.reactRouter) ? props.reactRouter : false,
            direction: isString(props.direction) && ['left', 'right'].includes(props.direction) ? props.direction : 'left',
            header: props.header ? props.header : '',
            footer: props.footer ? props.footer : '',
            dropDownIcon: props.dropDownIcon ? props.dropDownIcon : '',
            animationTime: isNumber(props.animationTime) && 0 <= props.animationTime ? props.animationTime : 300,
        };

        this.action = '';
        this.tmpRef = null;
        this.togglingRef = null;
        this.menuRef = null;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'reactRouter', 'direction', 'header', 'footer', 'dropDownIcon', 'animationTime'], props, state)) {
            return {
                reactRouter: isBoolean(props.reactRouter) ? props.reactRouter : false,
                direction: isString(props.direction) && ['left', 'right'].includes(props.direction) ? props.direction : 'left',
                header: props.header ? props.header : '',
                footer: props.footer ? props.footer : '',
                dropDownIcon: props.dropDownIcon ? props.dropDownIcon : '',
                animationTime: isNumber(props.animationTime) && 0 <= props.animationTime ? props.animationTime : 300,
            };
        }

        return null;
    }

    componentDidMount(): void {

        this.setListener(true);
    }

    componentWillUnmount(): void {
        this.setListener(false);
    }

    setListener(attach: boolean){
        document.documentElement.removeEventListener('resize', this.resize);

        if(attach){
            document.documentElement.addEventListener('resize', this.resize);
        }
    }

    resize(){
        if(this.menuRef){
            this.menuRef.style.minHeight = `${this.menuRef.getBoundingClientRect().height}px`;
        }
    }

    toggleMenuEntry(unique: string, data: any = this.state.data): any[] {
        for (let x = 0; x < data.length; x++) {
            if (data[x].unique === unique) {
                if (!data[x].toggled) {
                    data[x].toggled = true;
                } else {
                    data[x].toggled = false;
                }
            }
            if (isArray(data[x].children) && data[x].children.length) {
                this.toggleMenuEntry(unique, data[x].children);
            }
        }

        return data;
    }

    executeAction(unique: string, data: any = this.state.data): void {
        for (let x = 0; x < data.length; x++) {
            if (data[x].unique === unique) {
                this.action = data[x].toggled ? 'hide' : 'show';
                break;
            }
            if (isArray(data[x].children) && data[x].children.length) {
                this.executeAction(unique, data[x].children);
            }
        }
    }

    setMatch(unique: string, data: any = this.state.data): void {
        for (let x = 0; x < data.length; x++) {
            if (data[x].unique === unique) {
                this.match = data[x];
                break;
            }
            if (isArray(data[x].children) && data[x].children.length) {
                this.setMatch(unique, data[x].children);
            }
        }
    }

    toggle(unique: string) {
        const { animationTime } = this.state;
        this.action = '';
        this.executeAction(unique);
        /**
         * Action that will be executed
         */
        if ('show' == this.action) {
            const d = this.toggleMenuEntry(unique);
            this.setMatch(unique, d);

            this.setState({
                toggledItem: unique,
            }, () => {
                this.setState({
                    tmp: this.fakeMenuJsx([this.match]),
                    data: d,
                    isAnimating: true
                }, () => {
                    const height = this.tmpRef.getBoundingClientRect().height;

                    this.togglingRef.animate(
                        [
                            {
                                height: `0px`
                            },
                            {
                                height: `${height}px`
                            }
                        ],
                        animationTime
                    );

                    setTimeout( () => {
                        this.setState({
                            isAnimating: false
                        });
                    }, animationTime);
                });
            })
        }
        if ('hide' == this.action) {
            this.setMatch(unique);

            this.setState({
                toggledItem: unique
            }, () => {
                this.setState({
                    tmp: this.fakeMenuJsx([this.match]),
                    isAnimating: true
                }, () => {
                    const d = this.toggleMenuEntry(unique);

                    if (!this.tmpRef || !this.togglingRef) {
                        return this.setState({
                            tmp: '',
                            data: d,
                            isAnimating: false
                        });
                    }

                    const height = this.tmpRef.getBoundingClientRect().height;

                    this.togglingRef.animate(
                        [
                            {
                                height: `${height}px`
                            },
                            {
                                height: `0px`
                            }
                        ],
                        animationTime
                    );

                    setTimeout( () => {
                        this.setState({
                            isAnimating: false,
                            data: d
                        });
                    }, animationTime-20);
                });
            });
        }
    }

    getNestedPadding(nestedCount): JSX.Element[] {
        const v = [];

        for (let x = 0; x < nestedCount; x++) {
            v.push(<div key={`${_uuid()}`} className='px-2'></div>);
        }

        return v;
    }

    getLink(o: IMenutItem){
        const { dropDownIcon } = this.state;
        const { text, icon, children, toggled, unique, nestedCount, href } = o;

        return (
            <Link
                className='menu-height-entry flex w-100 py-2 position-relative border-radius'
                {...(toggled) && { className: 'menu-height-entry toggled flex w-100 py-2 position-relative' }}
                {...(isArray(children) && 0 !== children.length) && { onClick: () => this.toggle(unique) }}
                to={href}
            >
                {
                    0 !== nestedCount && this.getNestedPadding(nestedCount)
                }
                {
                    icon &&
                    <span className='menu-height-icon my-auto mr-4'>
                        {
                            icon
                        }
                    </span>
                }
                {
                    text &&
                    <span className='menu-height-text my-auto'>
                        {
                            text
                        }
                    </span>
                }
                {
                    isArray(children) && 0 !== children.length && dropDownIcon &&
                    <span className='menu-height-icon-drop-down position-absolute right'>
                        {
                            dropDownIcon
                        }
                    </span>
                }
            </Link>
        );
    }
    getHref(o: IMenutItem){
        const { dropDownIcon } = this.state;
        const { text, icon, children, toggled, unique, nestedCount, href } = o;

        return (
            <a
                className='menu-height-entry flex w-100 py-2 position-relative border-radius'
                {...(toggled) && { className: 'menu-height-entry toggled flex w-100 py-2 position-relative' }}
                {...(isArray(children) && 0 !== children.length) && { onClick: () => this.toggle(unique) }}
                href={href}
            >
                {
                    0 !== nestedCount && this.getNestedPadding(nestedCount)
                }
                {
                    icon &&
                    <span className='menu-height-icon my-auto mr-4'>
                        {
                            icon
                        }
                    </span>
                }
                {
                    text &&
                    <span className='menu-height-text my-auto'>
                        {
                            text
                        }
                    </span>
                }
                {
                    isArray(children) && 0 !== children.length && dropDownIcon &&
                    <span className='menu-height-icon-drop-down position-absolute right'>
                        {
                            dropDownIcon
                        }
                    </span>
                }
            </a>
        );
    }
    getDiv(o: IMenutItem){
        const { dropDownIcon } = this.state;
        const { text, icon, children, toggled, unique, nestedCount } = o;

        return (
            <div
                className='menu-height-entry flex w-100 py-2 position-relative border-radius'
                {...(toggled) && { className: 'menu-height-entry toggled flex w-100 py-2 position-relative' }}
                {...(isArray(children) && 0 !== children.length) && { onClick: () => this.toggle(unique) }}
            >
                {
                    0 !== nestedCount && this.getNestedPadding(nestedCount)
                }
                {
                    icon &&
                    <span className='menu-height-icon my-auto mr-2'>
                        {
                            icon
                        }
                    </span>
                }
                {
                    text &&
                    <span className='menu-height-text my-auto'>
                        {
                            text
                        }
                    </span>
                }
                {
                    isArray(children) && 0 !== children.length && dropDownIcon &&
                    <span className='menu-height-icon-drop-down position-absolute right'>
                        {
                            dropDownIcon
                        }
                    </span>
                }
            </div>
        );
    }

    /**
     * #######################################################
     * ###################### FAKE MENU ######################
     * #######################################################
     */
    fakeMenuJsx(data: any[] = this.state.data, isNested: boolean = false): JSX.Element | [] {
        if (!isArray(data) || 0 === data.length) { return []; }

        const { uid, isReactRouter } = this.state;
        const v = [];

        data.map((o: IMenutItem, i: number) => {
            const { attr, text, children, toggled } = o;

            const isDiv = (isArray(children) && 0 !== children.length);
            const isLink = (!isArray(children) || 0 === children.length) && isReactRouter;
            const isHref = (!isArray(children) || 0 === children.length) && !isReactRouter;

            v.push(
                <div {...attr} key={`menu-height-entry-${text}-${uid}-${i}`}className='w-100'>
                    {
                        isDiv && this.getDiv(o)
                    }
                    {
                        isLink && this.getLink(o)
                    }
                    {
                        isHref && this.getHref(o)
                    }
                    {
                        toggled &&
                        <div className='menu-height-children' {...(!isNested) && { ref: x => this.tmpRef = x }}>
                            {
                                this.fakeMenuJsx(children, true)
                            }
                        </div>
                    }
                </div>
            );
        });

        if(!isNested){
            return (
                <div className='position-fixed' style={{ top: '200vH', zIndex: -1, left: '200vw', opacity: 0 } }>
                    {
                        v
                    }
                </div>
            );
        }

        return (
            <div className='menu-height-data'>
                {
                    v
                }
            </div>
        );
    }

    menuJsx(data: any[] = this.state.data): JSX.Element | [] {
        if (!isArray(data) || 0 === data.length) {
            return [];
        }

        const { uid, isReactRouter, toggledItem } = this.state;
        const v = [];

        data.map((o: IMenutItem, i: number) => {
            const { attr, text, children, toggled, unique, type } = o;
            
            const isDiv = (isArray(children) && 0 !== children.length);
            const isLink = (!isArray(children) || 0 === children.length) && isReactRouter;
            const isHref = (!isArray(children) || 0 === children.length) && !isReactRouter;

            if('separator' === type){
                v.push(
                    <div
                        {...attr}
                        key={`menu-height-entry-${text}-${uid}-${i}`}
                        className='w-100 menu-height-separator py-4 devider font-bold color-white'
                    >
                        {
                            text
                        }
                    </div>
                );
            }
            else {
                v.push(
                    <div
                        {...attr}
                        key={`menu-height-entry-${text}-${uid}-${i}`}
                        className='w-100 my-1'
                    >
                    {
                        isDiv && this.getDiv(o)
                    }
                    {
                        isLink && this.getLink(o)
                    }
                    {
                        isHref && this.getHref(o)
                    }
                        {
                            toggled &&
                            <div
                                className='menu-height-children text-overflow overflow-hidden'
                                {...(toggledItem === unique) && { ref: x => this.togglingRef = x }}
                            >
                                {
                                    this.menuJsx(children)
                                }
                            </div>
                        }
                    </div>
                );   
            }
        });

        return (
            <div className='menu-height-data'>
                {
                    v
                }
            </div>
        );
    }

    render() {
        const { header, footer, align, tmp } = this.state;
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        return (
            <div
                {...('left' === direction) && { className: 'MenuHeight left p-0' }}
                {...('right' === direction) && { className: 'MenuHeight right p-0' }}
                ref={ x => this.menuRef = x}
            >
                {
                    header && header
                }
                {
                    this.menuJsx()
                }
                {
                    footer && footer
                }
                {
                    tmp && tmp
                }
            </div>
        )
    }
}
