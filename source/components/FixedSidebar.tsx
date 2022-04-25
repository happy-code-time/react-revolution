import React from 'react';

import disableHtmlScroll from '../functions/disableHtmlScroll';
import enableHtmlScroll from '../functions/enableHtmlScroll';
import PropsCheck from '../functions/PropsCheck';
import isNotEmptyString from '../functions/isNotEmptyString';
import SvgCloseLine from './Svg/SvgCloseLine';
import SETTINGS from './Settings';
import isNumber from '../functions/isNumber';

interface PropsInterface {
    [key: string]: any;
}

interface StateInterface {
    [key: string]: any;
}

class FixedSidebar extends React.Component<PropsInterface, StateInterface> {
    constructor(props: PropsInterface) {
        super(props);
        this.toggleIsOpen = this.toggleIsOpen.bind(this);
        this.escListener = this.escListener.bind(this);

        this.state = {
            direction: isNotEmptyString(props.direction) && ['left', 'right'].includes(props.direction) ? props.direction : 'right',
            opener: props.opener ? props.opener : '',
            data: props.data ? props.data : '',
            display: isNumber(props.display) ? props.display: -1,
            closing: false,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
     static getDerivedStateFromProps(props, state) {
        if(PropsCheck(['direction', 'opener', 'data', 'display'], props, state)) {
            return {
                direction: isNotEmptyString(props.direction) && ['left', 'right'].includes(props.direction) ? props.direction : 'right',
                opener: props.opener ? props.opener : '',
                data: props.data ? props.data : '',
                display: isNumber(props.display) ? props.display: -1,
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
        document.documentElement.removeEventListener('keydown', this.escListener);

        if(true === attach){
            document.documentElement.addEventListener('keydown', this.escListener);
        }
    }

    escListener(event){
        if(true === this.state.isOpen && (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27)) {
            this.toggleIsOpen(false);
        }
    }

    toggleIsOpen(isOpen) {

        if(false === isOpen){
            enableHtmlScroll();

            return this.setState({
                closing: true
            }, () => {
                setTimeout( () => {
                    this.setState({ 
                        isOpen, 
                        closing: false 
                    });
                }, 300);
            });
        }

        disableHtmlScroll();

        this.setState({ 
            isOpen
        });
    }

    render() {
        const { isOpen, display } = this.state;

        if(-1 !== display && display < document.documentElement.getBoundingClientRect().width){
            return null;
        }

        return (
            <span className='FixedSidebar'>
                <span 
                    className=''
                    onClick={() => this.toggleIsOpen(true)}
                >
                    {
                        this.state.opener
                    }
                </span>
                {
                    isOpen &&
                    <div className='FixedSidebar fixed overflow-hidden z-index-1'>
                        <div 
                            className='position-absolute w-100 h-100 z-index-1 bg-darken-light overlay-wrapper'
                            {...(this.state.closing) && { className: 'position-absolute w-100 h-100 z-index-1 bg-darken-light overlay-wrapper overlay-wrapper-closing' }}
                            onClick={() => this.toggleIsOpen(false)}
                        />
                        <div 
                            {...('left' === this.state.direction && false == this.state.closing) && { className: 'position-absolute bg-white h-100 overflow-auto z-index-2 sidebar-menu sidebar-menu-left' }}
                            {...('right' === this.state.direction && false == this.state.closing) && { className: 'position-absolute bg-white h-100 overflow-auto z-index-2 sidebar-menu sidebar-menu-right' }}
                            {...('left' === this.state.direction && true == this.state.closing) && { className: 'position-absolute bg-white h-100 overflow-auto z-index-2 sidebar-menu sidebar-menu-left sidebar-menu-left-close' }}
                            {...('right' === this.state.direction && true == this.state.closing) && { className: 'position-absolute bg-white h-100 overflow-auto z-index-2 sidebar-menu sidebar-menu-right sidebar-menu-right-close' }}
                        >
                            <span className='d-inline-block w-100'>
                                <span className='absolute-right z-index-2'>
                                    <span 
                                        onClick={() => this.toggleIsOpen(false)}
                                        className='d-inline-block p-3 cursor-pointer border-radius bg-transparent'
                                    >
                                        {
                                            SvgCloseLine(SETTINGS.SVG.WIDTH.L, SETTINGS.SVG.COLOR.GRAY)
                                        }
                                    </span>
                                </span>
                            </span>
                            {
                                this.state.data
                            }
                        </div>
                    </div>
                }
            </span>
        );
    }
}

export default FixedSidebar;
