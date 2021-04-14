import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';

class CardsScroll extends React.Component 
{
    
    constructor(props) {
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.removeScrollEvent = this.removeScrollEvent.bind(this);
        this.resize = this.resize.bind(this);
        this.rerenderItems = this.rerenderItems.bind(this);

        this.state = {
            /**
             * App
             */
            dataJsx: [],
            start: 0,
            end: props.defaultItems && typeof 8 == typeof props.defaultItems ? props.defaultItems : 3,
            isMinified: false,
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-cards-scroll',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            itemsPerLine: props.itemsPerLine && typeof 8 == typeof props.itemsPerLine ? props.itemsPerLine : 3,
            defaultItems: props.defaultItems && typeof 8 == typeof props.defaultItems ? props.defaultItems : 3,
            data: props.data && typeof [] == typeof props.data ? props.data : [],
            mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
            minify: typeof 8 == typeof props.minify ? props.minify : 0,
        };
    }

    componentDidMount(){
        const { mediaBreak } = this.state;

        if (this.cardsReference) {
            this.cardsReference.removeEventListener('scroll', this.scrollEvent);
            this.cardsReference.addEventListener('scroll', this.scrollEvent);
        }

        this.loadMore();
        
        if(mediaBreak){
            window.addEventListener('resize', this.resize);
            this.resize();
        }
    }

    componentWillUnmount(){
        this.removeScrollEvent();
        
        const { mediaBreak } = this.state;

        if(mediaBreak){
            window.removeEventListener('resize', this.resize);
        }
    }

    resize(){
        const { mediaBreak, isMinified } = this.state;
        /**
         * Media break
         */
        if(document.documentElement.getBoundingClientRect().width <= mediaBreak){
            if(!isMinified){
                this.setState({ 
                    isMinified: true 
                }, this.rerenderItems);
            }
        }
        /**
         * Default
         */
        else{
            if(isMinified){
                this.setState({ 
                    isMinified: false 
                }, this.rerenderItems);
            }
        }
    }
    
    removeScrollEvent(){
        if (this.cardsReference) {
            this.cardsReference.removeEventListener('scroll', this.scrollEvent);
        }
    }

    loadMore(isScrollEvent = false){
        let { data, dataJsx, itemsPerLine, isMinified, start, end } = this.state;
        const clsCardsHolder = `cards-group flex ${isMinified ? 'flex-column isMinified' : 'flex-row'}`;

        let singleLines = [];
        let c = 0;

        data = data.slice(start, end);

        if(isScrollEvent){
            /**
             * No more items to load
             */
            if(0 == data.length && this.cardsReference){
                return this.removeScrollEvent();
            }
        }

        for(let x = 0; x <= data.length-1; x++){
            const { title, content, footer } = data[x];
            c++;

            singleLines.push(
                <div key={internalUuid()} className="card flex flex-column">
                    {
                        title && 
                        <div className="title">
                            {
                                title
                            }
                        </div>
                    }
                    {
                        content && 
                        <div className="content">
                            {
                                content
                            }
                        </div>
                    }
                    {
                        footer && 
                        <div className="footer">
                            {
                                footer
                            }
                        </div>
                    }
                </div>
            );

            if(c == itemsPerLine){

                dataJsx.push(
                    <div key={internalUuid()} className={`cards-group ${clsCardsHolder}`}>
                        {
                            singleLines
                        }
                    </div>
                );

                singleLines = [];
                c = 0;
            }
        }

        if(singleLines.length){
            dataJsx.push(
                <div key={internalUuid()} className={`cards-group ${clsCardsHolder}`}>
                    {
                        singleLines
                    }
                </div>
            );
        }

        this.setState({ 
            dataJsx,
            start: end,
            end: end+itemsPerLine
        }, () => {
            if(0 == start){
                this.resize();
            }
        });
    }

    rerenderItems(){
        const { data, start, itemsPerLine, isMinified } = this.state;
        const clsCardsHolder = `cards-group flex ${isMinified ? 'flex-column isMinified' : 'flex-row'}`;

        let newDataJsx = [];
        let singleLines = [];
        let c = 0;

        for(let x = 0; x <= data.length-1; x++){

            if(x >= start){
                break;
            }

            const { title, content, footer } = data[x];
            c++;

            singleLines.push(
                <div key={internalUuid()} className="card flex flex-column">
                    {
                        title && 
                        <div className="title">
                            {
                                title
                            }
                        </div>
                    }
                    {
                        content && 
                        <div className="content">
                            {
                                content
                            }
                        </div>
                    }
                    {
                        footer && 
                        <div className="footer">
                            {
                                footer
                            }
                        </div>
                    }
                </div>
            );

            if(c == itemsPerLine){

                newDataJsx.push(
                    <div key={internalUuid()} className={`cards-group ${clsCardsHolder}`}>
                        {
                            singleLines
                        }
                    </div>
                );

                singleLines = [];
                c = 0;
            }
        }

        if(singleLines.length){
            newDataJsx.push(
                <div key={internalUuid()} className={`cards-group ${clsCardsHolder}`}>
                    {
                        singleLines
                    }
                </div>
            );
        }

        this.setState({ 
            dataJsx: newDataJsx 
        });
    }

    scrollEvent(e){
        const { minify } = this.state;
        const min = parseInt(minify);

        if(this.cardsReference){
            /**
             * Bottom reached
             */ 
            if (this.cardsReference.offsetHeight + this.cardsReference.scrollTop >= this.cardsReference.scrollHeight - min) {
                this.loadMore(true); 
            }
        }
    }

    
    render() {
        const { addClass, dataJsx, defaultClass, id } = this.state;

        return (
            <div 
                ref={ node => this.cardsReference = node}
                className={`${defaultClass} ${addClass}`}
                id={id}
            >
                {
                    dataJsx
                }
            </div>
        );
    }
}

export default CardsScroll;
