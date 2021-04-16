import scrollToTop from './scrollToTop';
import isNumber from "./isNumber";
import isString from "./isString";

var globalRemoveListenerRemoveListener = false;

class _ScrollToTop 
{
    constructor(){
        this.setScrollTime = this.setScrollTime.bind(this);
        this.getScrollTime = this.getScrollTime.bind(this);
        this.setScrollBehavior = this.setScrollBehavior.bind(this);
        this.getScrollBehavior = this.getScrollBehavior.bind(this);
        this.setCurrentHref = this.setCurrentHref.bind(this);
        this.getCurrentHref = this.getCurrentHref.bind(this);
        this.isWindowAvailable = this.isWindowAvailable.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
        this.cutStringFromAttributeValue = this.cutStringFromAttributeValue.bind(this);
        this.setScrollBehavior = this.setScrollBehavior.bind(this);
        this.scrollToTopTime = this.scrollToTopTime.bind(this);
        this.clearScrollTopInterval = this.clearScrollTopInterval.bind(this);
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
    setScrollTime(time){
        this.state.time = time;
    }

    /**
     * Return scroll time
     */
    getScrollTime(){
        return this.state.time;
    }

    /**
     * Set scroll time
     * @param {number} time 
     */
    setScrollBehavior(scrollBehavior){

        if(this.state.availableScrollBehaviors.includes(scrollBehavior) && !globalRemoveListenerRemoveListener){
            this.state.scrollBehavior = scrollBehavior;
        }

    }

    /**
     * Return scroll time
     */
    getScrollBehavior(){
        return this.state.scrollBehavior;
    }

    /**
     * Set new href
     * @param {string} currentHref 
     */
    setCurrentHref(currentHref){
        this.state.currentHref = currentHref;
    }

    /**
     * Get current window location href
     */
    getCurrentHref(){
        return this.state.currentHref;
    }

    /**
     * Check is DOM available
     */
    isWindowAvailable(){

        if(window && window.location && undefined !== window.location.href){        
            return true;
        }

        return false;
    }

    cutStringFromAttributeValue(Node = null, attributeName = null, match = null){
        
        if(!Node || !attributeName || !match){
            return;
        }

        attributeName = attributeName.toLowerCase();

        const attributes = Node.attributes;

        for(let x = 0; x <= attributes.length-1; x++){

            if(attributeName == attributes[x].name &&-1 !== attributes[x].value.indexOf(match)){
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
                if('' === attributes[x].value){
                    Node.removeAttribute(attributeName);
                }
                break;
            }
        }
    }

    /**
     * Set Scroll behavior as inline style
     */
    setScrollBehavior(){
        const scrollBehavior = this.getScrollBehavior();

        if(scrollBehavior){
            document.documentElement.style.scrollBehavior = scrollBehavior;   
        }
    }

    /**
     * Initialise the scroll to top functionality
     */
    scrollToTopTime(){
        const time = this.getScrollTime();
        this.clearScrollTopInterval();

        if(!time){
            return scrollToTop(0);
        }

        scrollToTop(time);
    }

    /**
     * Clear exsisting interval
     */
    clearScrollTopInterval(){
        clearInterval(this.scrollTopInterval);
    }

    handleScroll(e)
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
     * Main scroll to top initializer
     */
    scrollTop(attach = true){
        clearInterval(this.clickLocationInterval);
        this.clearScrollTopInterval();

        if(!attach)
        {
            return;
        }

        if(this.isWindowAvailable() && window.location.href !== this.getCurrentHref()){
            let count = 0;

            this.clickLocationInterval = setInterval( () => {

                if(!globalRemoveListenerRemoveListener){
                    this.clearScrollTopInterval();
                }

                if(window.location.href !== this.getCurrentHref()){
                    this.setScrollBehavior();
                    this.setCurrentHref(window.location.href);
                    this.scrollToTopTime();
                    clearInterval(this.clickLocationInterval);
                }

                if(10 <= count){
                    clearInterval(this.clickLocationInterval);
                }

                count++;
            }, 50);
        }
    }
};

/**
 * Public function
 * @param {number} time 
 */

const scrollTopListener = (time = 0, scrollBehavior = '', removeListener = false) => {
    globalRemoveListenerRemoveListener = removeListener;
    const scrollToTop = new _ScrollToTop();

    if(isNumber(time) && 0 < time && !globalRemoveListenerRemoveListener){
        scrollToTop.setScrollTime(time);
    }

    if(isString(scrollBehavior) && '' !== scrollBehavior && !globalRemoveListenerRemoveListener){
        scrollToTop.setScrollBehavior(scrollBehavior);
    }

    const check = setInterval( () =>
    {
        if(globalRemoveListenerRemoveListener){
            return scrollToTop.scrollTop(false);
        }

        if(window.location.href === scrollToTop.getCurrentHref())
        {
            return;            
        }

        scrollToTop.scrollTop(true);

    }, 500);

    if(globalRemoveListenerRemoveListener)
    {
        clearInterval(check);
        scrollToTop.scrollTop(false);
        scrollToTop.setListener(false);
    }
};

export default scrollTopListener;