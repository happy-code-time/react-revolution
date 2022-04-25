import React from 'react';

import uuid from '../functions/uuid';
import isString from '../functions/isString';
import isFunction from '../functions/isFunction';

class CardScrollCallback extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private loadingAllowed: boolean;
    private cardsReference: any;

    constructor(props) {
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.buildData = this.buildData.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.removeScrollEvent = this.removeScrollEvent.bind(this);
        this.resize = this.resize.bind(this);
        this.attachScrollEvent = this.attachScrollEvent.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.state = {
            /**
             * App
             */
            dataJsx: [],
            loadingData: false,
            isMinified: false,
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'CardScrollCallback',
            
            itemsPerLine: props.itemsPerLine && typeof 8 == typeof props.itemsPerLine ? props.itemsPerLine : 3,
            data: props.data && typeof [] == typeof props.data ? props.data : [],
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            loading: props.loading ? props.loading : '',
            onReject: props.onReject ? props.onReject : '',
            mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
            minify: typeof 8 == typeof props.minify ? props.minify : 0,
            persistReject: (typeof true == typeof props.persistReject) ? props.persistReject : false,
        };

        this.loadingAllowed = true;
    }

    componentDidMount(): void {

        const { data, mediaBreak } = this.state;

        this.attachScrollEvent();
        this.buildData(data);

        if(mediaBreak){
            window.addEventListener('resize', this.resize);
            this.resize();
        }
    }

    componentWillUnmount() {
        this.removeScrollEvent();

        const { mediaBreak } = this.state;

        if(mediaBreak){
            window.removeEventListener('resize', this.resize);
        }
    }

    attachScrollEvent(){
        if (this.cardsReference) {
            this.cardsReference.removeEventListener('scroll', this.scrollEvent);
            this.cardsReference.addEventListener('scroll', this.scrollEvent);
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
                });
            }
        }
        /**
         * Default
         */
        else{
            if(isMinified){
                this.setState({ 
                    isMinified: false 
                });
            }
        }
    }

    removeScrollEvent() {
        if (this.cardsReference) {
            this.cardsReference.removeEventListener('scroll', this.scrollEvent);
        }
    }

    scrollToBottom(){
        if (this.cardsReference) {
            try{
                this.cardsReference.scrollTop = this.cardsReference.getBoundingClientRect().height;
            }
            catch(e){

            }
        }
    }

    loadMore(event) {
        const { callbackProps, persistReject } = this.state;
        let { callback } = this.state;
        let data: any = [];

        if (callback && this.loadingAllowed) {
            this.attachScrollEvent();

            this.setState({
                loadingData: true,
                isError: false
            }, async () => {

                this.scrollToBottom();

                data = await (callback)(event, callbackProps)
                .then( result => result)
                .catch( errorData => {

                    if(!errorData){
                        return undefined;
                    }

                    return this.setState({
                        errorData,
                        isError: true,
                    }, () => {

                        if(persistReject){
                            this.removeScrollEvent();
                            
                            const timeouts = [ 100, 200 ];

                            for(let x = 0; x <= timeouts.length-1; x++){
                                setTimeout( () => {
                                    this.scrollToBottom();
                                }, timeouts[x]);
                            }
                        }
                    });
                });

                if(undefined == data){
                    this.removeScrollEvent();

                    return this.setState({ 
                        loadingData: false,
                        isError: true,
                    }, () => {
                        this.loadingAllowed = true;

                        if(!persistReject){
                            setTimeout( () => {
                                this.attachScrollEvent();
                            }, 500);
                        }
                    });
                }

                /**
                 * No more items to load
                 */
                if (!data || 0 == data.length || 'break' == data) {
                    this.removeScrollEvent();
                    this.setState({ 
                        loadingData: false,
                        isError: false,
                        errorData: undefined
                    });
                }
                else {
                    this.buildData(data);
                    this.removeScrollEvent();
                    this.loadingAllowed = true;
                    this.attachScrollEvent();
                }
            });
        }
        else {
            this.removeScrollEvent();
            this.setState({ 
                loadingData: false,
                isError: false,
                errorData: undefined
            });
        }
    }

    buildData(data = []) {
        let { dataJsx } = this.state;

        for (let x = 0; x <= data.length - 1; x++) {

            const { title, content, footer } = data[x];

            dataJsx.push(
                <div key={uuid()} className="card flex flex-column">
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
        }

        this.setState({
            dataJsx,
            loadingData: false
        });
    }

    scrollEvent(e) {
        const { minify } = this.state;
        const min = parseInt(minify);

        if (this.cardsReference && this.loadingAllowed) {
            /**
             * Bottom reached
             */
            if (this.cardsReference.offsetHeight + this.cardsReference.scrollTop >= this.cardsReference.scrollHeight - min) {
                this.loadMore(e);
                this.loadingAllowed = false;
            }
        }
    }

    returnDataJsx(dataJsx) {
        const { itemsPerLine } = this.state;
        const root = [];
        let cards = [];
        let c = 0;

        for (let x = 0; x <= dataJsx.length - 1; x++) {

            cards.push(dataJsx[x]);
            c++;

            if (c == itemsPerLine) {
                root.push(
                    <div key={uuid()} className='card-group flex'>
                        {
                            cards
                        }
                    </div>
                );
                cards = [];
                c = 0;
            }

        }
        if (cards.length) {
            root.push(
                <div key={uuid()} className='card-group flex'>
                    {
                        cards
                    }
                </div>
            );
        }

        return root;
    }

    renderCards(dataJsx){

        if(dataJsx && typeof [] == typeof dataJsx && dataJsx.length){
            const { dataJsx, itemsPerLine, isMinified } = this.state;
            let cards = [];
            let c = 0;

            return dataJsx.map( (singleCard, loop) => {

                cards.push(singleCard);
                c++;
    
                if (c == itemsPerLine) {
                    let data = cards;
                    c = 0;
                    cards = [];
    
                    return (
                        <div key={`card-group-${loop}`} className={`card-group flex ${isMinified ? 'flex-column' : 'flex-row'}`}>
                            {
                                data
                            }
                        </div>
                    )
                }
    
                if (cards.length && loop == dataJsx.length-1) {
                    let data = cards;
                    c = 0;
                    cards = [];
    
                    return (
                        <div key={`card-group-${loop}`} className={`card-group flex ${isMinified ? 'flex-column' : 'flex-row'}`}>
                            {
                                data
                            }
                        </div>
                    )
                }
            });
        }

        return null;
    }

    render() {
        const { isError, errorData, addClass, dataJsx, defaultClass, loadingData, loading, id, onReject, persistReject } = this.state;
        
        return (
            <div
                ref={node => this.cardsReference = node}
                className=''
                
            >
                {
                    this.renderCards(dataJsx)
                }
                {
                    loadingData && loading
                }
                {
                    isError && errorData && errorData
                }
                {
                    isError && errorData && onReject && persistReject &&
                    <span onClick={ (e) => this.loadMore(e)}>
                        {
                            onReject
                        }
                    </span>
                }
            </div>
        );
    }
}

export default CardScrollCallback;
