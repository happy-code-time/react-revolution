import React from 'react';
import isArray from '../../_Functions/isArray';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isBoolean from '../../_Functions/isBoolean';


class ContainerPopup extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.resizeView = this.resizeView.bind(this);
        this.setLocationChecker = this.setLocationChecker.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            /**
             * App
             */
            isHidden: (typeof true == typeof props.isHidden) ? props.isHidden : true,
            href: window.location.href, // current href
            forceHidingSidebar: {
                isHidden: true,
            },
            animation: false, // set zIndex on sidebar (header data should not overlap the sidebar)
            isHiddenSidebar: false,
            hiddenBackwards: false,
            hiddenForwards: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ContainerPopup',
            id: isString(props.id) ? props.id : '',
            moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
            hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 1024,
            headerProps: (props.headerProps && typeof {} == typeof props.headerProps) ? props.headerProps : {},
            headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : '',
            contentProps: (props.contentProps && typeof {} == typeof props.contentProps) ? props.contentProps : {},
            contentData: props.contentData ? props.contentData : '',
            footerData: props.footerData ? props.footerData : '',
            footerProps: (props.footerProps && typeof {} == typeof props.footerProps) ? props.footerProps : {},
            toggleMenuHtml: props.toggleMenuHtml ? props.toggleMenuHtml : '',
            minifySidebarOn: props.minifySidebarOn && typeof [] == typeof props.minifySidebarOn && props.minifySidebarOn.length ? props.minifySidebarOn : [],
            align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
            headerDataRight: (typeof true == typeof props.headerDataRight) ? props.headerDataRight : false,
            animationDuration: (typeof 8 == typeof props.animationDuration && 0 < props.animationDuration) ? props.animationDuration : 0,
            sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,
            locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,
            minifySidebarOnSwap: isBoolean(props.minifySidebarOnSwap) ? props.minifySidebarOnSwap : false,
        };

        this.locationCheckInterval = undefined;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([
                'addClass', 
                'defaultClass', 
                'id', 
                'moduleSidebar', 
                'animationDuration', 
                'hideAt', 
                'headerProps', 
                'headerData', 
                'contentProps', 
                'contentData', 
                'footerData', 
                'footerProps', 
                'toggleMenuHtml', 
                'minifySidebarOn', 
                'align', 
                'headerDataRight', 
                'sidebarWidth', 
                'locationInterval',
                'minifySidebarOnSwap',
            ], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ContainerPopup',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
                hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 1024,
                headerProps: (props.headerProps && typeof {} == typeof props.headerProps) ? props.headerProps : {},
                headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : '',
                contentProps: (props.contentProps && typeof {} == typeof props.contentProps) ? props.contentProps : {},
                contentData: props.contentData ? props.contentData : '',
                footerData: props.footerData ? props.footerData : '',
                footerProps: (props.footerProps && typeof {} == typeof props.footerProps) ? props.footerProps : {},
                toggleMenuHtml: props.toggleMenuHtml ? props.toggleMenuHtml : '',
                minifySidebarOn: props.minifySidebarOn && typeof [] == typeof props.minifySidebarOn && props.minifySidebarOn.length ? props.minifySidebarOn : [],
                align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
                headerDataRight: (typeof true == typeof props.headerDataRight) ? props.headerDataRight : false,
                animationDuration: (typeof 8 == typeof props.animationDuration && 0 < props.animationDuration) ? props.animationDuration : 0,
                sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,
                locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,
                minifySidebarOnSwap: isBoolean(props.minifySidebarOnSwap) ? props.minifySidebarOnSwap : false,
            };
        }

        return null;
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeView);
        window.addEventListener('focus', this.handleFocus);
        window.addEventListener('blur', this.handleBlur);
        this.resizeView();
        this.setLocationChecker();
    }

    componentWillUnmount() {
        this.setLocationChecker(false);
        window.removeEventListener('resize', this.resizeView);
        window.removeEventListener('focus', this.handleFocus);
        window.removeEventListener('blur', this.handleBlur);
    }

    componentDidUpdate(){
        if (isArray(this.state.minifySidebarOn) && 0 === this.state.minifySidebarOn.length) {
            return this.setLocationChecker();
        }

        this.setLocationChecker(true);
    }

    handleFocus() {
        this.setLocationChecker();
    }

    handleBlur() {
        this.setLocationChecker(false);
    }

    setLocationChecker(init = true) {
        clearInterval(this.locationCheckInterval);

        if (!init) {
            return;
        }

        this.locationCheckInterval = setInterval(() => {

            if (this.state.href !== window.location.href) {
                return this.setState({ 
                    isHidden: true,
                    href: window.location.href,
                    animation: true,
                    hiddenForwards: true,
                    isHiddenSidebar:false
                }, () => {
                    
                    this.resizeView();

                    setTimeout( () => {
                        this.setState({ 
                            isHiddenSidebar: true, 
                            animation: false,
                            hiddenBackwards: false,
                            hiddenForwards: false
                        });
                    }, this.state.animationDuration);
                });
            }
        }, this.state.locationInterval);
    }

    checkSidebarOn()
    {
        const { minifySidebarOn } = this.state;

        // If the container should be fullscreen on selected locations
        if (isArray(minifySidebarOn) && minifySidebarOn.length) {
            
            if (minifySidebarOn.includes(window.location.href) || minifySidebarOn.includes(window.location.hash)) 
            {
                return true;
            }
        } 

        return false;
    }

    resizeView() {
        const { hideAt, animationDuration } = this.state;

        const forceHidingSidebar = () => {
            
            if(!this.state.isHidden)
            {
                this.setState({ 
                    href: window.location.href,
                    isHidden: true, 
                    animation: true,
                    hiddenBackwards: true,
                    isHiddenSidebar:false
                }, () => {
                    setTimeout( () => {
                        this.setState({ 
                            isHiddenSidebar: true, 
                            animation: false,
                            hiddenBackwards: false,
                            hiddenForwards: false
                        });
                    }, this.state.animationDuration);
                });
            }
        };

        const { minifySidebarOn, minifySidebarOnSwap } = this.state;

        // If the container should be fullscreen on selected locations
        if (!minifySidebarOnSwap && this.checkSidebarOn()) {
            return forceHidingSidebar();
        }

        /**
         * Swap logic
         */
        if (minifySidebarOnSwap && (!minifySidebarOn.includes(window.location.href) && !minifySidebarOn.includes(window.location.hash))) {
            return forceHidingSidebar();
        }

        const documentWidth = document.documentElement.getBoundingClientRect().width;

        /**
         * Maxify the sidebar
         */
        if (documentWidth >= hideAt) {
            return this.setState({ 
                isHidden: false, 
                animation: true,
                hiddenForwards: true,
                isHiddenSidebar:false
            }, () => {
                setTimeout( () => {
                    this.setState({ 
                        isHiddenSidebar: false, 
                        animation: false,
                        hiddenBackwards: false,
                        hiddenForwards: false
                    });
                }, animationDuration);
            });
        }

        /**
         * Hide the sidebar
         */
        if (documentWidth < hideAt) {
            return this.setState({ 
                isHidden: true, 
                animation: true,
                hiddenBackwards: true,
                isHiddenSidebar:false
            }, () => {
                setTimeout( () => {
                    this.setState({ 
                        isHiddenSidebar: true, 
                        animation: false,
                        hiddenBackwards: false,
                        hiddenForwards: false
                    });
                }, animationDuration);
            });
        }
    }

    render() {
        const { addClass, defaultClass, id, moduleSidebar, toggleMenuHtml, animation, animationDuration, isHidden, isHiddenSidebar, hiddenBackwards, hiddenForwards, headerData, headerProps, contentData, contentProps, footerData, footerProps, headerDataRight, align } = this.state;
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        const constainerStyle = {};
        constainerStyle['--rr-container-sidebar-width'] = `${this.state.sidebarWidth}px`;
        constainerStyle['--rr-container-sidebar-width-hidden'] = `-${this.state.sidebarWidth}px`;

        return (
            <div
                {...isString(id) && '' !== id && { id: id } }
                className={`${defaultClass} ${direction} ${animation ? 'zIndex' : ''} ${!animationDuration ? 'td0' : ''} ${addClass}`}
                style={constainerStyle}
            >
                {
                    !isHiddenSidebar &&
                    <div className={`area-sidebar ${!isHidden && hiddenForwards ? 'area-sidebar-show' : ''} ${isHidden && hiddenBackwards ? 'area-sidebar-hide' : ''}`}>
                        {
                            moduleSidebar && moduleSidebar
                        }
                    </div>
                }
                <div 
                    className={`area-content ${isHidden ? 'area-content-hidden' : ''} ${!isHidden && hiddenForwards ? 'area-content-show' : ''} ${isHidden && hiddenBackwards ? 'area-content-hide' : ''}`} 
                    {...contentProps}
                >
                    <div className={`data-header`} {...headerProps}>
                        {
                            !headerDataRight && headerData && headerData
                        }
                        {
                            isHidden && toggleMenuHtml && toggleMenuHtml
                        }
                        {
                            headerDataRight && headerData && headerData
                        }
                    </div>
                    {
                        contentData &&
                        <div className='data-content'>
                            {
                                contentData
                            }
                        </div>
                    }
                    {
                        footerData &&
                        <div
                            className='data-footer'
                            {...footerProps}
                        >
                            {
                                footerData
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ContainerPopup;
