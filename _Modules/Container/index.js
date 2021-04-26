import React from 'react';
import isArray from '../../_Functions/isArray';
import PropsCheck from '../internalFunctions/PropsCheck';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.getClassNamesContent = this.getClassNamesContent.bind(this);
        this.getClassNamesSidebar = this.getClassNamesSidebar.bind(this);
        this.sideBar = this.sideBar.bind(this);
        this.resizeView = this.resizeView.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setLocationChecker = this.setLocationChecker.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            /**
             * App
             */
            isMin: (typeof true == typeof props.isMin) ? props.isMin : false,
            isMax: (typeof true == typeof props.isMax) ? props.isMax : false,
            isHidden: (typeof true == typeof props.isHidden) ? props.isHidden : true,
            isHiddenClass: 'closed', // default - Mobile first rule
            href: window.location.href, // current href
            forceHidingSidebar: {
                isHiddenClass: 'closed',
                isMax: false,
                isMin: false,
                isHidden: true,
            },
            animation: false, // set zIndex on sidebar (header data should not overlap the sidebar)
            displaySidebarCloseIcon: false,
            mounted: false,
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-container',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
            maxifyAt: (typeof 8 == typeof props.maxifyAt) ? props.maxifyAt : 1024,
            minifyAt: (typeof 8 == typeof props.minifyAt) ? props.minifyAt : 820,
            hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 768,
            displayMinifyMaxifyIcon: (typeof true == typeof props.displayMinifyMaxifyIcon) ? props.displayMinifyMaxifyIcon : false,
            headerProps: (props.headerProps && typeof {} == typeof props.headerProps) ? props.headerProps : {},
            headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : '',
            contentProps: (props.contentProps && typeof {} == typeof props.contentProps) ? props.contentProps : {},
            contentData: props.contentData ? props.contentData : '',
            footerData: props.footerData ? props.footerData : '',
            footerProps: (props.footerProps && typeof {} == typeof props.footerProps) ? props.footerProps : {},
            closeMenuHtml: props.closeMenuHtml ? props.closeMenuHtml : '',
            toggleMenuHtml: props.toggleMenuHtml ? props.toggleMenuHtml : '',
            minifySidebarOn: props.minifySidebarOn && typeof [] == typeof props.minifySidebarOn && props.minifySidebarOn.length ? props.minifySidebarOn : [],
            align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
            headerDataRight: (typeof true == typeof props.headerDataRight) ? props.headerDataRight : false,
            animationDuration: (typeof 8 == typeof props.animationDuration && 0 < props.animationDuration) ? props.animationDuration : 0,
            sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,
            sidebarMinWidth: (typeof 8 == typeof props.sidebarMinWidth && 0 < props.sidebarMinWidth) ? props.sidebarMinWidth : 50,
            locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,
        };

        this.nodeSideBar = React.createRef();
        this.containesOldStaffHolder = undefined;
        this.animationDurationClearTimeout = undefined;
        this.locationCheckInterval = undefined;        
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'moduleSidebar', 'minifyAt', 'animationDuration', 'maxifyAt', 'hideAt', 'displayMinifyMaxifyIcon', 'headerProps', 'headerData', 'contentProps', 'contentData', 'footerData', 'footerProps', 'closeMenuHtml', 'toggleMenuHtml', 'minifySidebarOn', 'align', 'headerDataRight', 'sidebarWidth', 'sidebarMinWidth', 'locationInterval'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-container',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
                maxifyAt: (typeof 8 == typeof props.maxifyAt) ? props.maxifyAt : 1024,
                minifyAt: (typeof 8 == typeof props.minifyAt) ? props.minifyAt : 820,
                hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 768,
                displayMinifyMaxifyIcon: (typeof true == typeof props.displayMinifyMaxifyIcon) ? props.displayMinifyMaxifyIcon : false,
                headerProps: (props.headerProps && typeof {} == typeof props.headerProps) ? props.headerProps : {},
                headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : '',
                contentProps: (props.contentProps && typeof {} == typeof props.contentProps) ? props.contentProps : {},
                contentData: props.contentData ? props.contentData : '',
                footerData: props.footerData ? props.footerData : '',
                footerProps: (props.footerProps && typeof {} == typeof props.footerProps) ? props.footerProps : {},
                closeMenuHtml: props.closeMenuHtml ? props.closeMenuHtml : '',
                toggleMenuHtml: props.toggleMenuHtml ? props.toggleMenuHtml : '',
                minifySidebarOn: props.minifySidebarOn && typeof [] == typeof props.minifySidebarOn && props.minifySidebarOn.length ? props.minifySidebarOn : [],
                align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
                headerDataRight: (typeof true == typeof props.headerDataRight) ? props.headerDataRight : false,
                animationDuration: (typeof 8 == typeof props.animationDuration && 0 < props.animationDuration) ? props.animationDuration : 0,
                sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,
                sidebarMinWidth: (typeof 8 == typeof props.sidebarMinWidth && 0 < props.sidebarMinWidth) ? props.sidebarMinWidth : 50,
                locationInterval: props.locationInterval && typeof 8 === typeof props.locationInterval ? props.locationInterval : 500,
            };
        }

        return null;
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeView);
        window.addEventListener('mousedown', this.handleClick);
        window.addEventListener('focus', this.handleFocus);
        window.addEventListener('blur', this.handleBlur);
        this.setLocationChecker();

        setTimeout( () => {
            this.setState({
                mounted: true
            }, this.resizeView);
        }, this.state.animationDuration);
    }

    componentWillUnmount() {
        this.setLocationChecker(false);
        window.removeEventListener('resize', this.resizeView);
        window.removeEventListener('mousedown', this.handleClick);
        window.removeEventListener('focus', this.handleFocus);
        window.removeEventListener('blur', this.handleBlur);
    }

    componentDidUpdate()
    {
        if (isArray(this.state.minifySidebarOn) && 0 === this.state.minifySidebarOn.length) {
            return this.setLocationChecker();
        }

        this.setLocationChecker(true);
    }

    handleFocus(){
        this.setLocationChecker();
    }

    handleBlur(){
        this.setLocationChecker(false);
    }

    setLocationChecker(init = true) 
    {
        clearInterval(this.locationCheckInterval);

        if(!init){
            return;
        }

        this.locationCheckInterval = setInterval( () => {
            if(this.state.href !== window.location.href)
            {
                this.handleLocationChange();
            }
        }, this.state.locationInterval);
    }

    handleLocationChange(){
        const d = this.state.isHidden ? this.state.forceHidingSidebar : {};
        return this.setState({
            ...d,
            href: window.location.href
        }, () => {
            this.resizeView(undefined, false, true)
        });
    }

    handleClick(e) {
        const { isHidden, href, isHiddenClass, forceHidingSidebar } = this.state;

        /**
         * Hide opened hidden sidebar on location change
         */
        if (e && this.nodeSideBar && this.nodeSideBar.current && !this.nodeSideBar.current.contains(e.target)) {
            setTimeout(() => {
                if (isHidden && 'opened' == isHiddenClass) {
                    return this.setState(forceHidingSidebar);
                }
            }, 100);
        }

        setTimeout(() => {
            // If is hidden, persist hidden values
            if (href !== window.location.href && isHidden) {
                this.setState(this.state.forceHidingSidebar, this.resizeView);
            }
            // If is not hidden, execute resize callback
            if (href !== window.location.href && !isHidden) {
                this.setState({ href: window.location.href }, (e) => this.resizeView(e, true));
            }
        }, 300);
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

    resizeView(e, persistCurrentSelection = false, isInterval = false) {
        const { forceHidingSidebar } = this.state;

        // If the container should be fullscreen on selected locations
        if (this.checkSidebarOn()) {
            return this.setState(forceHidingSidebar);
        }

        /**
         * Chandle location change detected by the interval and (re)attach the resize values
         */
        if (isInterval && this.containesOldStaffHolder) {
            const { isMax, isMin, isHidden, isHiddenClass } = this.containesOldStaffHolder;
            return this.setState({ isMax, isMin, isHidden, isHiddenClass, href: window.location.href });
        }

        if (persistCurrentSelection) {
            return null;
        }

        this.resize();
    }

    resize()
    {
        const documentWidth = document.documentElement.getBoundingClientRect().width;

        // If the container should be fullscreen on selected locations
        if (this.checkSidebarOn()) {
            return this.setState(forceHidingSidebar);
        }

        /**
         * Maxify the sidebar
         */
        let data = {};

        if (documentWidth >= this.state.maxifyAt) {

            if(true == this.state.isMax){
                return;
            }

            data = {
                isMax: true,
                isMin: false,
                isHidden: false,
                isHiddenClass: '',
            };
            this.containesOldStaffHolder = data;
            return this.setState({...data});
        }

        /**
         * Hide the sidebar
         */
        if (documentWidth <= this.state.hideAt) {

            if(true == this.state.isHidden){
                return;
            }

            data = {
                isMax: false,
                isMin: false,
                isHidden: true,
                isHiddenClass: 'closed',
            };
            this.containesOldStaffHolder = data;
            return this.setState({...data});
        }

        /**
         * Minify the sidebar
         */
        if (documentWidth <= this.state.minifyAt) {

            if(true == this.state.isMin){
                return;
            }

            data = {
                isMax: false,
                isMin: true,
                isHidden: false,
                isHiddenClass: '',
            };
            this.containesOldStaffHolder = data;
            this.setState({...data});
        }
    }

    /**
     * Get class names for the main sidebar
     */
    getClassNamesSidebar() {
        const { isMin, isHidden } = this.state;

        if (isHidden) {
            return 'SideBar SideBar-hidden';
        }

        if (isMin) {
            return 'SideBar SideBar-min';
        }

        return 'SideBar';
    }

    /**
     * Get class names for the content
     */
    getClassNamesContent() {
        const { isMin, isHidden } = this.state;

        if (isHidden) {
            return 'Content Content-hidden';
        }

        if (isMin) {
            return 'Content Content-min';
        }

        return 'Content';
    }

    /**
     * Toggle the main sidebar
     * if the user clicks the menu icon
     */
    sideBar() {
        const { isMin, isHidden, isHiddenClass, animationDuration } = this.state;

        const setCache = () => {
            const { isMin, isMax, isHidden, isHiddenClass } = this.state;
            this.containesOldStaffHolder = { isMin, isMax, isHidden, isHiddenClass };

            // Animation false = to remove the zIndex class 
            clearTimeout(this.animationDurationClearTimeout);
            this.animationDurationClearTimeout = setTimeout( () => {
                this.setState({
                    animation: false
                });
            }, animationDuration);
        };

        if (isHidden) {

            if ('closed' == isHiddenClass) {
                return this.setState({
                    isHiddenClass: 'opened',
                    isMax: false,
                    isMin: false,
                    isHidden: true,
                    animation: true
                }, setCache);
            }
            else {
                return this.setState({
                    isHiddenClass: 'closed',
                    isMax: false,
                    isMin: false,
                    isHidden: true,
                    animation: true
                }, setCache);
            }
        }

        if (isMin) {
            this.setState({
                isMax: true,
                isMin: false,
                isHidden: false,
                animation: true
            }, setCache);
        }
        else {
            this.setState({
                isMin: true,
                isMax: false,
                isHidden: false,
                animation: true
            }, setCache);
        }
    }

    render() {
        const { addClass, defaultClass, id, moduleSidebar, toggleMenuHtml, animation, closeMenuHtml, animationDuration, isHidden, isHiddenClass, headerData, headerProps, contentData, contentProps, displayMinifyMaxifyIcon, footerData, footerProps, headerDataRight, align } = this.state;
        const sidebarClassNames = `${this.getClassNamesSidebar()} ${isHiddenClass}`;
        const contentClassNames = this.getClassNamesContent();
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        const constainerStyle = {};
        constainerStyle['--rr-container-sidebar-width'] = `${this.state.sidebarWidth}px`;
        constainerStyle['--rr-container-sidebar-width-hidden'] = `-${this.state.sidebarWidth}px`;
        constainerStyle['--rr-container-sidebar-min-width'] = `${this.state.sidebarMinWidth}px`;

        return (
            <div 
                id={id} 
                className={`${defaultClass} ${direction} ${animation ? 'zIndex' : ''} ${!animationDuration || !this.state.mounted ? 'td0' : ''} ${addClass}`}
                style={constainerStyle}
            >
                <div
                    ref={this.nodeSideBar}
                    className={sidebarClassNames}
                >
                    {
                        isHidden && !animation && 'closed' !== isHiddenClass &&
                        <span
                            className='close-side-bar action-icon'
                            onClick={ () => this.sideBar()}
                        >
                            {
                                closeMenuHtml
                            }
                        </span>
                    }
                    {
                        moduleSidebar && 'closed' !== isHiddenClass && moduleSidebar
                    }
                </div>
                <div className={contentClassNames} {...contentProps}>
                    <div className={`data-header`} {...headerProps}>
                        {
                            !headerDataRight && headerData && headerData
                        }
                        {
                            displayMinifyMaxifyIcon &&
                            <span
                                className='minify-menu'
                                onClick={e => this.sideBar()}
                            >
                                {
                                    toggleMenuHtml
                                }
                            </span>
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

export default Container;
