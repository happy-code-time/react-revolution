import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isArray from '../functions/isArray';
import isBoolean from '../functions/isBoolean';
import isNotEmptyArray from '../functions/isNotEmptyArray';
import isNumber from '../functions/isNumber';
import uuid from '../functions/uuid';

interface IMenutItem {
    attr: { [key: string]: any };
    text: any;
    children: any[]; 
    toggled: boolean;
    unique: string; 
    isChild: boolean; 
    nestedCount: number;
    href: string;
    data: any;
};

const attachUid = (data, isChild: boolean = false, l = 0) => {
    l += 1;

    for (let x = 0; x < data.length; x++) {
        
        if(undefined === data[x].unique){
            data[x].unique = uuid();
        }

        if(isChild){
            data[x].isChild = true;
        }

        data[x].nestedCount = l;

        if (isNotEmptyArray(data[x].children)) {
            attachUid(data[x].children, true, l);
        }
    }

    return data;
};

class Accordion extends React.Component< { [key: string]: any }, { [key: string]: any }> {
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
            data: isArray(props.data) && props.data.length ? attachUid(props.data) : [],
            reactRouter: isBoolean(props.reactRouter) ? props.reactRouter : false,
            header: props.header ? props.header : '',
            footer: props.footer ? props.footer : '',
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
        if (PropsCheck(['data'], props, state)) {
            return {
                data: isArray(props.data) && props.data.length ? attachUid(props.data) : [],
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
            v.push(<div key={`${uuid()}`} className='pl-2'></div>);
        }

        return v;
    }

    getDiv(o: IMenutItem){
        const { text, data, children, toggled, unique, nestedCount } = o;

        return (
            <div
                className='w-100 flex position-relative'
                {...(toggled) && { className: 'toggled w-100 flex position-relative' }}
                {...(isArray(children) && 0 !== children.length) && { onClick: () => this.toggle(unique) }}
            >
                {
                    0 !== nestedCount && 
                    <div className='flex'>
                        {
                            this.getNestedPadding(nestedCount)
                        }
                    </div>
                }
                <div className='w-100'>
                    {
                        text
                    }
                </div>
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

        const { uid } = this.state;
        const v = [];

        data.map((o: IMenutItem, i: number) => {
            const { attr, text, children, toggled } = o;

            v.push(
                <div 
                    {...attr} 
                    key={`accordion-entry-${text}-${uid}-${i}`}
                    className='w-100 my-1'
                >
                    {
                        this.getDiv(o)
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
                <div className='position-absolute w-100' style={{ top: '-200vH', zIndex: -1, left: '-200vw', opacity: -1 } }>
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

        const { uid, toggledItem } = this.state;
        const v = [];

        data.map((o: IMenutItem, i: number) => {
            const { attr, text, children, toggled, unique } = o;
            
            v.push(
                <div
                    {...attr}
                    key={`accordion-entry-${text}-${uid}-${i}`}
                    className='w-100 my-1'
                >
                    {
                        this.getDiv(o)
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
        });

        return (
            <div className='w-100'>
                {
                    v
                }
            </div>
        );
    }

    render() {
        const { header, footer, tmp } = this.state;

        return (
            <div
                className='Accordion w-100'
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

export default Accordion; 