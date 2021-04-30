import React from 'react';
import isArray from '../../_Functions/isArray';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class ContainerSidebar extends React.Component {
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
            isHidden: (typeof true == typeof props.isHidden) ? props.isHidden : true,
            isHiddenClass: 'closed', // default - Mobile first rule
            href: window.location.href, // current href
            forceHidingSidebar: {
                isHiddenClass: 'closed',
                isHidden: true,
            },
            animation: false, // set zIndex on sidebar (header data should not overlap the sidebar)
            isHiddenSidebar: false,
            hiddenBackwards: false,
            hiddenForwards: false,
            mounted: false,
            executeHidden: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ContainerSidebar',
            id: isString(props.id) ? props.id : '',
            moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
            closeMenuHtml: props.closeMenuHtml ? props.closeMenuHtml : '',
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
        };

        this.nodeSideBar = React.createRef();
        this.containesOldStaffHolder = undefined;
        this.animationDurationClearTimeout = undefined;
        this.locationCheckInterval = undefined;
        this.animationTimeoutCloseIcon = undefined;
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'moduleSidebar', 'closeMenuHtml', 'animationDuration', 'hideAt', 'headerProps', 'headerData', 'contentProps', 'contentData', 'footerData', 'footerProps', 'toggleMenuHtml', 'minifySidebarOn', 'align', 'headerDataRight', 'sidebarWidth', 'locationInterval'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                moduleSidebar: (props.moduleSidebar && typeof {} == typeof props.moduleSidebar) ? props.moduleSidebar : '',
                hideAt: (typeof 8 == typeof props.hideAt) ? props.hideAt : 1024,
                headerProps: (props.headerProps && typeof {} == typeof props.headerProps) ? props.headerProps : {},
                headerData: (props.headerData && typeof {} == typeof props.headerData) ? props.headerData : '',
                contentProps: (props.contentProps && typeof {} == typeof props.contentProps) ? props.contentProps : {},
                contentData: props.contentData ? props.contentData : '',
                footerData: props.footerData ? props.footerData : '',
                closeMenuHtml: props.closeMenuHtml ? props.closeMenuHtml : '',
                footerProps: (props.footerProps && typeof {} == typeof props.footerProps) ? props.footerProps : {},
                toggleMenuHtml: props.toggleMenuHtml ? props.toggleMenuHtml : '',
                minifySidebarOn: props.minifySidebarOn && typeof [] == typeof props.minifySidebarOn && props.minifySidebarOn.length ? props.minifySidebarOn : [],
                align: (props.align && typeof '8' == typeof props.align) ? props.align : 'left',
                headerDataRight: (typeof true == typeof props.headerDataRight) ? props.headerDataRight : false,
                animationDuration: (typeof 8 == typeof props.animationDuration && 0 < props.animationDuration) ? props.animationDuration : 0,
                sidebarWidth: (typeof 8 == typeof props.sidebarWidth && 0 < props.sidebarWidth) ? props.sidebarWidth : 250,
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

    componentDidUpdate(){
        this.setLocationChecker(true);
    }

    handleFocus(){
        this.setLocationChecker();
    }

    handleBlur(){
        this.setLocationChecker(false);
    }

    setLocationChecker(init = true) {
        clearInterval(this.locationCheckInterval);

        if(!init){
            return;
        }

        this.locationCheckInterval = setInterval( () => {
            if(this.state.href !== window.location.href){
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

            if(this.checkSidebarOn())
            {
                return this.resizeView(undefined, false, true)
            }

            this.resize();
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

    resizeView(e, persistCurrentSelection = false, isInterval = false) 
    {
        // If the container should be fullscreen on selected locations
        if (this.checkSidebarOn()) {
            clearTimeout(this.animationTimeoutCloseIcon);
            return this.setState(this.state.forceHidingSidebar);
        }

        /**
         * Chandle location change detected by the interval and (re)attach the resize values
         */
        if (isInterval && this.containesOldStaffHolder) {
            const { isHidden, isHiddenClass } = this.containesOldStaffHolder;
            return this.setState({ isHidden, isHiddenClass });
        }

        if (persistCurrentSelection) {
            return null;
        }

        this.resize();
    }

    resize(){

        if (this.checkSidebarOn()) {
            clearTimeout(this.animationTimeoutCloseIcon);
            return this.setState(this.state.forceHidingSidebar);
        }

        const { hideAt, animationDuration } = this.state;
        const documentWidth = document.documentElement.getBoundingClientRect().width;

        /**
         * Maxify the sidebar
         */
        let data = {};

        if (documentWidth >= hideAt) {
            data = {
                isHidden: false,
                isHiddenClass: '',
            };
            this.containesOldStaffHolder = data;
            clearTimeout(this.animationTimeoutCloseIcon);

            return this.setState({
                ...data,
            });
        }

        /**
         * Hide the sidebar
         */
        if (documentWidth < hideAt) {
            data = {
                isHidden: true,
                isHiddenClass: 'closed',
                executeHidden: false
            };
            this.containesOldStaffHolder = data;

            clearTimeout(this.animationTimeoutCloseIcon);
            return this.setState({
                ...data,
                animation: true // hide close icon on minified sidebar
            }, () => {
                this.animationTimeoutCloseIcon = setTimeout( () => {
                    this.setState({
                        animation: false,
                        executeHidden: true
                    });
                }, animationDuration);
            });
        }
    }

    /**
     * Get class names for the main sidebar
     */
    getClassNamesSidebar() {
        const { isHidden } = this.state;

        if (isHidden) {
            return `area-sidebar area-sidebar-hidden`;
        }

        return `area-sidebar`;
    }

    /**
     * Get class names for the content
     */
    getClassNamesContent() {
        const { isHidden } = this.state;

        if (isHidden) {
            return `area-content area-content-hidden`;
        }

        return `area-content`;
    }

    /**
     * Toggle the main sidebar
     * if the user clicks the menu icon
     */
    sideBar() {
        const { isHidden, isHiddenClass, animationDuration } = this.state;

        const setCache = (executeHidden = null) => {
            const { isHidden, isHiddenClass } = this.state;
            this.containesOldStaffHolder = { isHidden, isHiddenClass };

            // Animation false = to remove the zIndex class 
            clearTimeout(this.animationDurationClearTimeout);
            this.animationDurationClearTimeout = setTimeout( () => {
                this.setState({
                    animation: false,
                    executeHidden: typeof true == typeof executeHidden ? executeHidden : this.state.executeHidden
                });
            }, animationDuration);
        };

        if (isHidden) {

            if ('closed' == isHiddenClass) {
                return this.setState({
                    isHiddenClass: 'opened',
                    isHidden: true,
                    animation: true
                }, setCache);
            }
            else {
                return this.setState({
                    isHiddenClass: 'closed',
                    isHidden: true,
                    animation: true,
                    executeHidden: false
                }, () => {
                    setCache(true);
                });
            }
        }

        this.setState({
            isHidden: false,
            animation: true
        }, setCache);
    }

    render() {
        const { addClass, defaultClass, id, moduleSidebar, toggleMenuHtml, animation, animationDuration, closeMenuHtml, isHidden, isHiddenClass, headerData, headerProps, contentData, contentProps, footerData, footerProps, headerDataRight, align } = this.state;
        const sidebarClassNames = `${this.getClassNamesSidebar()} ${isHiddenClass}`;
        const contentClassNames = this.getClassNamesContent();
        const direction = ['left', 'right'].includes(align) ? align : 'left';

        const constainerStyle = {};
        constainerStyle['--rr-container-sidebar-width'] = `${this.state.sidebarWidth}px`;
        constainerStyle['--rr-container-sidebar-width-hidden'] = `-${this.state.sidebarWidth}px`;

        return (
            <div 
                {...isString(id) && '' !== id && { id: id } } 
                className={`${defaultClass} ${direction} ${animation ? 'zIndex' : ''} ${!animationDuration || !this.state.mounted ? 'td0' : ''} ${addClass}`}
                style={constainerStyle}
            >   
                {
                    this.state.mounted &&
                    <div
                        ref={this.nodeSideBar}
                        className={sidebarClassNames}
                    >
                        {
                            this.state.executeHidden && isHidden &&
                            <span
                                className='close-side-bar action-icon'
                                onClick={e => this.sideBar()}
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
                }
                <div className={contentClassNames} {...contentProps}>
                    <div className={`data-header`} {...headerProps}>
                        {
                            !headerDataRight && headerData && headerData
                        }
                        {
                            isHidden && 
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

export default ContainerSidebar;
