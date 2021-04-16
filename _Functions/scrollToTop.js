import isNumber from "./isNumber";
import isString from "./isString";

class ScrollTop 
{
    constructor(){
        this.setScrollTime = this.setScrollTime.bind(this);
        this.getScrollTime = this.getScrollTime.bind(this);
        this.setScrollBehavior = this.setScrollBehavior.bind(this);
        this.getScrollBehavior = this.getScrollBehavior.bind(this);
        this.setCurrentHref = this.setCurrentHref.bind(this);
        this.getCurrentHref = this.getCurrentHref.bind(this);
        this.isWindowAvailable = this.isWindowAvailable.bind(this);
        this.cutStringFromAttributeValue = this.cutStringFromAttributeValue.bind(this);
        this.setScrollBehavior = this.setScrollBehavior.bind(this);
        this.scrollToTopTime = this.scrollToTopTime.bind(this);
        this.clearScrollTopInterval = this.clearScrollTopInterval.bind(this);
        this.setScrollTopInterval = this.setScrollTopInterval.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            scrollBehavior : undefined,
            time: 0,
            currentHref: undefined,
            availableScrollBehaviors : [
                'auto',
                'smooth',
                'inherit',
                'initial',
                'unset'
            ],
            scrollBehavior: undefined
        };

        this.scrollTopInterval = '';
        this.clickLocationInterval = '';
    }

    /**
     * Set scroll time
     * @param {number} time 
     */
    setScrollTime(time)
    {
        this.state.time = time;
    }

    /**
     * Return scroll time
     */
    getScrollTime()
    {
        return this.state.time;
    }

    /**
     * Set scroll time
     * @param {number} time 
     */
    setScrollBehavior(scrollBehavior)
    {
        if(this.state.availableScrollBehaviors.includes(scrollBehavior))
        {
            this.state.scrollBehavior = scrollBehavior;
        }
    }

    /**
     * Return scroll time
     */
    getScrollBehavior()
    {
        return this.state.scrollBehavior;
    }

    /**
     * Set new href
     * @param {string} currentHref 
     */
    setCurrentHref(currentHref)
    {
        this.state.currentHref = currentHref;
    }

    /**
     * Get current window location href
     */
    getCurrentHref()
    {
        return this.state.currentHref;
    }

    /**
     * Check is DOM available
     */
    isWindowAvailable()
    {
        if(window && window.location && undefined !== window.location.href)
        { 
            return true;
        }

        return false;
    }

    cutStringFromAttributeValue(Node = null, attributeName = null, match = null)
    {
        if(!Node || !attributeName || !match){
            return;
        }

        attributeName = attributeName.toLowerCase();
        const attributes = Node.attributes;

        for(let x = 0; x <= attributes.length-1; x++)
        {
            if(attributeName == attributes[x].name &&-1 !== attributes[x].value.indexOf(match))
            {
                /**
                 * Current styles value
                 */
                const styleValue = attributes[x].value;
                /**
                 * Match of scroll behavior text
                 */
                const start = styleValue.indexOf(match);
                const end = start+match.length;
                /**
                 * Style string before and after the match
                 */
                const before = styleValue.substring(0, start);
                const after = styleValue.substring(end, styleValue.length);
                /**
                 * Set new styles value without the scroll behavior
                 */
                attributes[x].value = `${before}${after}`;
                /**
                 * If the value is empty, then remove the style attribute
                 */
                if('' === attributes[x].value)
                {
                    Node.removeAttribute(attributeName);
                }

                break;
            }
        }
    }

    /**
     * Set Scroll behavior as inline style
     */
    setScrollBehavior()
    {
        const scrollBehavior = this.getScrollBehavior();

        if(scrollBehavior)
        {
            document.documentElement.style.scrollBehavior = scrollBehavior;   
        }
    }

    /**
     * Initialise the scroll to top functionality
     */
    scrollToTopTime()
    {
        const time = this.getScrollTime();

        if(!time)
        {
            return this.setScrollTopInterval(0);
        }

        this.setScrollTopInterval(time);
    }

    /**
     * Clear exsisting interval
     */
    clearScrollTopInterval()
    {
        clearInterval(this.scrollTopInterval);
    }

    handleScroll()
    {        
        this.clearScrollTopInterval();
        this.setListener(false);
    }

    setListener(attach = true)
    {
        document.removeEventListener('wheel', this.handleScroll);
        document.removeEventListener('touchmove', this.handleScroll);

        if(attach)
        {
            document.addEventListener('wheel', this.handleScroll); 
            document.addEventListener('touchmove', this.handleScroll);
        }
    }

    /**
     * Main scroll to top interval
     */
    setScrollTopInterval(intervalTime)
    {

        if(0 == intervalTime){
            return document.documentElement.scrollTop = 0;
        }

        if(this.getScrollBehavior())
        {
            document.documentElement.scrollTop = 0;

            return setTimeout( () => 
            {
                this.cutStringFromAttributeValue(document.documentElement, 'style', `scroll-behavior: ${this.getScrollBehavior()};`);
            }, 500);
        }

        this.setListener();

        intervalTime = intervalTime/10;
        let userOnXPosition = document.documentElement.scrollTop;

        if(0 == userOnXPosition)
        {
            return null;
        }

        let pxToAdd = (userOnXPosition / intervalTime);
        this.scrollTopInterval = setInterval( () => 
        {

            userOnXPosition -= (pxToAdd);
            document.documentElement.scrollTop = userOnXPosition;

            if(-10 >= userOnXPosition){
                this.setListener(false);
                return this.clearScrollTopInterval();
            }

        }, 1 );
    }
};

/**
 * Public function
 * @param {number} time 
 */

const scrollToTop = (time = 0, scrollBehavior = '') => 
{
    const scrollTT = new ScrollTop();

    if(isNumber(time))
    {
        scrollTT.setScrollTime(time);
    }

    if(isString(scrollBehavior))
    {
        scrollTT.setScrollBehavior(scrollBehavior);
    }

    scrollTT.scrollToTopTime();

};

export default scrollToTop;