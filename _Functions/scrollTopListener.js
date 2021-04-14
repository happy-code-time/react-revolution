var globalRemoveListenerRemoveListener = false;

class ScrollToTop 
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
        this.setScrollTopInterval = this.setScrollTopInterval.bind(this);

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
            return this.setScrollTopInterval(null, 0);
        }

        const currentScrollTop = document.documentElement.scrollTop;
        const intervalTime = parseFloat(currentScrollTop / time);
        this.setScrollTopInterval(currentScrollTop, intervalTime);
    }

    /**
     * Clear exsisting interval
     */
    clearScrollTopInterval(){
        clearInterval(this.scrollTopInterval)
    }

    /**
     * Main scroll to top interval
     */
    setScrollTopInterval(currentScrollTop, intervalTime){

        if(!globalRemoveListenerRemoveListener){
            this.clearScrollTopInterval();
        }

        if(0 == intervalTime){
            return document.documentElement.scrollTop = 0;
        }

        if(this.getScrollBehavior()){
            document.documentElement.scrollTop = 0;

            return setTimeout( () => {
                this.cutStringFromAttributeValue(document.documentElement, 'style', `scroll-behavior: ${this.getScrollBehavior()};`);
            }, 500);
        }

        this.scrollTopInterval = setInterval( () => {
            currentScrollTop -= 5;
            
            if(-50 >= currentScrollTop){
                this.cutStringFromAttributeValue(document.documentElement, 'style', `scroll-behavior: ${this.getScrollBehavior()};`);
                this.clearScrollTopInterval();
            }

            document.documentElement.scrollTop = currentScrollTop;

        }, intervalTime);
    }

    /**
     * Main scroll to top initializer
     */
    scrollTop(){
        if(this.isWindowAvailable()){

            clearInterval(this.clickLocationInterval);
            let count = 0;

            this.clickLocationInterval = setInterval( () => {
                
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
    const scrollToTop = new ScrollToTop();

    if(time && typeof 8 == typeof time && !globalRemoveListenerRemoveListener){
        scrollToTop.setScrollTime(time);
    }

    if(scrollBehavior && typeof '8' == typeof scrollBehavior && !globalRemoveListenerRemoveListener){
        scrollToTop.setScrollBehavior(scrollBehavior);
    }

    const clickListener = () => {
        scrollToTop.scrollTop();
    };

    const checker = setInterval( () => {
        if(globalRemoveListenerRemoveListener){
            document.documentElement.removeEventListener('click', clickListener, false);            
            clearInterval(checker);
        }
    }, 5000);

    if(document.documentElement && globalRemoveListenerRemoveListener){
        return document.documentElement.removeEventListener('click', clickListener, false);
    }

    if(document.documentElement){
        scrollToTop.setCurrentHref(window.location.href);
        document.documentElement.removeEventListener('click', clickListener, false);
        document.documentElement.addEventListener('click', clickListener, false);
    }

};

export default scrollTopListener;