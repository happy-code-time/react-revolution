import React from 'react';
import isArray from '../../_Functions/isArray';
import isObject from '../../_Functions/isObject';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class ContainerCompact extends React.Component {
    constructor(props) {
        super(props);
        this.resizeView = this.resizeView.bind(this);
        this.setLocationChecker = this.setLocationChecker.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            mounted: false,
            href: window.location.href,
            isMinified: true,
            showSidebar: false,
            hideSidebar: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ContainerCompact',
            id: isString(props.id) ? props.id : '',
            hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 1024,

            headerProps: isObject(props.headerProps) ? props.headerProps : {},
            headerData: props.headerData ? props.headerData : '',
            headerHeight: props.headerHeight && typeof 8 === typeof props.headerHeight ? props.headerHeight : 80,

            contentProps: isObject(props.contentProps) ? props.contentProps : {},
            contentData: props.contentData ? props.contentData : '',

            sidebarProps: isObject(props.sidebarProps) ? props.sidebarProps : {},
            sidebarData: props.sidebarData ? props.sidebarData : '',
            sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,

            align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',

            callbackShow: props.callbackShow && typeof function () { } == typeof props.callbackShow ? props.callbackShow : undefined,
            callbackShowProps: props.callbackShowProps,

            callbackHide: props.callbackHide && typeof function () { } == typeof props.callbackHide ? props.callbackHide : undefined,
            callbackHideProps: props.callbackHideProps,

            minifySidebarOn: isArray(props.minifySidebarOn) ? props.minifySidebarOn : [],
            locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,

        };

        this.locationCheckInterval = null;
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
            'id',
            'hideAt',
            'headerProps',
            'headerData',
            'contentProps',
            'contentData',
            'align',
            'sidebarProps',
            'sidebarData',
            'sidebarWidth',
            'callbackShow',
            'callbackShowProps',
            'callbackHide',
            'callbackHideProps',
            'minifySidebarOn',
            'locationInterval',
            'headerHeight'
        ], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 1024,
                
                headerProps: isObject(props.headerProps) ? props.headerProps : {},
                headerData: props.headerData ? props.headerData : '',
                headerHeight: props.headerHeight && typeof 8 === typeof props.headerHeight ? props.headerHeight : 80,

                contentProps: isObject(props.contentProps) ? props.contentProps : {},
                contentData: props.contentData ? props.contentData : '',

                sidebarProps: isObject(props.sidebarProps) ? props.sidebarProps : {},
                sidebarData: props.sidebarData ? props.sidebarData : '',
                sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,

                align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',

                callbackShow: props.callbackShow && typeof function () { } == typeof props.callbackShow ? props.callbackShow : undefined,
                callbackShowProps: props.callbackShowProps,

                callbackHide: props.callbackHide && typeof function () { } == typeof props.callbackHide ? props.callbackHide : undefined,
                callbackHideProps: props.callbackHideProps,

                minifySidebarOn: isArray(props.minifySidebarOn) ? props.minifySidebarOn : [],
                locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,
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

        this.setState({
            mounted: true
        }, this.resizeView);
    }

    componentWillUnmount() {
        this.setLocationChecker(false);
        window.removeEventListener('resize', this.resizeView);
        window.removeEventListener('focus', this.handleFocus);
        window.removeEventListener('blur', this.handleBlur);
    }

    componentDidUpdate() {
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
                this.resizeView();
            }
        }, this.state.locationInterval);
    }

    callbackShow() {
        const { callbackShow, callbackShowProps } = this.state;

        if (callbackShow) {
            (callbackShow)(callbackShowProps);
        }
    }

    callbackHide() {
        const { callbackHide, callbackHideProps } = this.state;

        if (callbackHide) {
            (callbackHide)(callbackHideProps);
        }
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

    resizeView() 
    {
        // If the container should be fullscreen on selected locations
        if (this.checkSidebarOn()) {
            clearTimeout(this.animationTimeoutCloseIcon);

            if (false == this.state.isMinified) {
                return this.setState({
                    isMinified: true,
                    href: window.location.href
                });
            }

            return this.setState({ href: window.location.href });
        }

        const { hideAt } = this.state;
        const documentWidth = document.documentElement.getBoundingClientRect().width;

        /**
         * Maxify the sidebar
         */
        if (documentWidth >= hideAt) {

            return this.setState({
                isMinified: false,
                href: window.location.href
            }, this.callbackShow);
        }

        /**
         * Hide the sidebar
         */
        if (documentWidth < hideAt) {
            return this.setState({
                isMinified: true,
                href: window.location.href
            }, this.callbackHide);
        }
    }

    render() {
        const { addClass, defaultClass, id, headerData, headerProps, contentData, contentProps, align, sidebarProps } = this.state;
        const direction = ['left', 'right'].includes(align) ? align : 'left';
        const constainerStyle = {};
        constainerStyle['--rr-container-compact-width'] = `${this.state.sidebarWidth}px`;
        constainerStyle['--rr-container-compact-headerHeight'] = `${this.state.headerHeight}px`;

        return (
            <div
                {...isString(id) && '' !== id && { id: id } }
                className={`${defaultClass} ${direction} ${addClass} ${!this.state.mounted ? 'td0' : ''}`}
                style={constainerStyle}
            >
                <div
                    className={`area-header`}
                    {...(isObject(headerProps)) && { ...headerProps }}
                >
                    {
                        headerData
                    }
                </div>
                {
                    !this.state.isMinified &&
                    <div
                        className={`area-sidebar`}
                        {...(isObject(sidebarProps)) && { ...sidebarProps }}
                    >
                        {
                            this.state.sidebarData
                        }
                    </div>
                }
                <div
                    className={`area-content ${this.state.isMinified ? 'w-100' : ''}`}
                    {...(isObject(contentProps)) && { ...contentProps }}
                >
                    {
                        contentData
                    }
                </div>
            </div>
        );
    }
}

export default ContainerCompact;
