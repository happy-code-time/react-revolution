import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';

class FullScreenListArray extends React.Component
{
    
    constructor(props){
        super(props);
        this.callback = this.callback.bind(this);
        this.callbackClose = this.callbackClose.bind(this);
        this.setValue = this.setValue.bind(this);
        this.buildListJsx = this.buildListJsx.bind(this);
        this.removeEscEventListener = this.removeEscEventListener.bind(this);
        this.addEscEventListener = this.addEscEventListener.bind(this);
        this.EscListener = this.EscListener.bind(this);
        this.getDefaultClass = this.getDefaultClass.bind(this);

        this.state = {
            /**
             * App
             */
            filteredData: [],
            inputValue: '',
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? this.getDefaultClass(props) : this.getDefaultClass(props),
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            animation: typeof '8' === typeof props.animation ? props.animation.toLowerCase() : '',
            data: (props.data && typeof [] === typeof props.data) ? props.data : [],
            display: typeof true === typeof props.display ? props.display : false,
            lineNumber: typeof true === typeof props.lineNumber ? props.lineNumber : false,
            iconClose: props.iconClose ? props.iconClose : '',
            inputActive: typeof true === typeof props.inputActive ? props.inputActive : false,
            noDataText: (props.noDataText && typeof '8' === typeof props.noDataText) ? props.noDataText : 'No data found',
            inputPlaceholder: (props.inputPlaceholder && typeof '8' === typeof props.inputPlaceholder) ? props.inputPlaceholder : 'Search here...',
            callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
            callbackClose: props.callbackClose && typeof function(){} == typeof props.callbackClose ? props.callbackClose : undefined,
            closeOnCallback: typeof true === typeof props.closeOnCallback ? props.closeOnCallback : false,
            closeOnDimmedClick: typeof true === typeof props.closeOnDimmedClick ? props.closeOnDimmedClick : false,
            closeOnEsc: typeof true === typeof props.closeOnEsc ? props.closeOnEsc : false,
            inputEmptyOnCallback: typeof true === typeof props.inputEmptyOnCallback ? props.inputEmptyOnCallback : false,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['id', 'data', 'display', 'lineNumber', 'iconClose', 'inputActive', 'closeOnDimmed', 'noDataText', 'inputPlaceholder', 'animation', 'callback', 'callbackClose', 'closeOnEsc', 'inputEmptyOnCallback'], props, state)) {
            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: (props.data && typeof [] === typeof props.data) ? props.data : [],
                display: typeof true === typeof props.display ? props.display : false,
                lineNumber: typeof true === typeof props.lineNumber ? props.lineNumber : false,
                iconClose: props.iconClose ? props.iconClose : '',
                inputActive: typeof true === typeof props.inputActive ? props.inputActive : false,
                noDataText: (props.noDataText && typeof '8' === typeof props.noDataText) ? props.noDataText : 'No data found',
                inputPlaceholder: (props.inputPlaceholder && typeof '8' === typeof props.inputPlaceholder) ? props.inputPlaceholder : 'Search here...',
                animation: typeof '8' === typeof props.animation ? props.animation.toLowerCase() : '',
                callback: props.callback && typeof function(){} == typeof props.callback ? props.callback : undefined,
                callbackClose: props.callbackClose && typeof function(){} == typeof props.callbackClose ? props.callbackClose : undefined,
                closeOnCallback: typeof true === typeof props.closeOnCallback ? props.closeOnCallback : false,
                closeOnDimmedClick: typeof true === typeof props.closeOnDimmedClick ? props.closeOnDimmedClick : false,
                closeOnEsc: typeof true === typeof props.closeOnEsc ? props.closeOnEsc : false,
                inputEmptyOnCallback: typeof true === typeof props.inputEmptyOnCallback ? props.inputEmptyOnCallback : false,
            };
        }

        return null;
    }

    /**
     * After mount
     */
    componentDidMount(){
        const { closeOnEsc } = this.state;

        if(closeOnEsc){
            this.addEscEventListener();
        }
    }
    
    /**
     * Before unmount
     */
    componentWillUnmount(){
        const { closeOnEsc } = this.state;

        if(closeOnEsc){
            this.removeEscEventListener();
        }
    }

    getAvailableAnimationTypes(){
        return [
            'scale',
            'top',
            'right',
            'bottom',
            'left'
        ];
    }

    getDefaultClass(props){
        const { defaultClass } = props;
        let { animation } = props;

        if(typeof '8' === typeof props.animation){
            animation = animation.toLowerCase();
        }

        if(!this.getAvailableAnimationTypes().includes(animation)){
            animation = 'none';
        }

        if(props.defaultClass && typeof '8' == typeof props.defaultClass){
            return `${defaultClass} ${animation ? `${animation}` : ''}`;
        }

        return `rr-full-screen-list-array ${animation ? `${animation}` : ''}`;
    }

    /**
     * After state change
     * and rerendered
     */
    componentDidUpdate(){
        const { display, closeOnEsc } = this.state;

        if(closeOnEsc){
            this.removeEscEventListener();
        }

        if(display){

            if(closeOnEsc){
                this.addEscEventListener();
            }

            if(this.FullSceenListNode){
                this.FullSceenListNode.click();
            }
        }
    }

    /**
     * Add - On "ESC" key press listenere
     */
    addEscEventListener(){
        window.addEventListener("keydown", this.EscListener, false);
    }

    /**
     * Remove - On "ESC" key press listenere
     */
    removeEscEventListener(){
        window.removeEventListener("keydown", this.EscListener, false);
    }

    /**
     * On "ESC" key press
     */
    EscListener(event){
        if(event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27) {
            this.removeEscEventListener();
            this.callbackClose();
        }
    }

    callbackClose(isDimmed = false){
        const { defaultClass, callbackClose, closeOnDimmedClick, closeOnCallback, inputEmptyOnCallback, inputValue, filteredData } = this.state;
        let { animation } = this.state;
        let timeouter = 0;

        if(isDimmed && !closeOnDimmedClick){
            return null;
        }
        
        if(!this.getAvailableAnimationTypes().includes(animation)){
            animation = 'none';
        }

        if(animation && 'none' !== animation){
            timeouter = 300;
        }

        this.setState({
            defaultClass: `${defaultClass} ${animation ? `${animation}-back` : ''}`,
        }, () => {
            setTimeout( () => {

                if(callbackClose){
                    (callbackClose)();
                }

                this.setState({
                    defaultClass: this.getDefaultClass(this.props),
                    display: closeOnCallback ? false : true,
                    inputValue: inputEmptyOnCallback ? '' : inputValue,
                    filteredData: inputEmptyOnCallback ? [] : filteredData
                });

            }, timeouter);
        });
    }

    /**
     * User custom callback to 
     * return the value of 
     * the clicked li item
     * @param event 
     */
    callback(event, entry){
        const { closeOnCallback, inputEmptyOnCallback, inputValue, filteredData } = this.state;
        const { callback } = this.props;

        if(callback && typeof function(){} == typeof callback){

            (callback)(event, entry);

            if(closeOnCallback){
                return this.callbackClose();
            }
            else{
                this.setState({
                    display: closeOnCallback ? false : true,
                    inputValue: inputEmptyOnCallback ? '' : inputValue,
                    filteredData: inputEmptyOnCallback ? [] : filteredData
                });
            }
        }
    }

    /**
     * Set input value
     * @param event 
     */
    setValue(event){
        this.setState({
            inputValue: event.target.value
        }, () => {
            const { data, inputValue } = this.state;

            this.setState({
                filteredData: data.filter( entry => -1 !== entry.toLowerCase().indexOf(inputValue.toLowerCase()))
            });
        });
    }

    /**
     * Main li list builder
     * @param array 
     */
    buildListJsx(array){
        const { lineNumber } = this.state;

        return array.map( (entry, index) => {
            return (
                <li key={internalUuid()} className="li" onClick={ (e) => this.callback(e, entry)}>
                    {
                        lineNumber &&
                        <span className="index">
                            {
                                index+1
                            }
                        </span>
                    }
                    <span className="text">
                        {
                            entry
                        }
                    </span>
                </li>
            )
        });
    }

    render(){
        const { addClass, defaultClass, iconClose, data, display, filteredData, inputActive, inputValue, noDataText, inputPlaceholder, id } = this.state;

        if(!display){
            return null;
        }

        return (
            <div 
                ref={ (node) => this.FullSceenListNode = node }
                className={`${defaultClass} ${addClass}`}
                id={id}
            >
                {
                    iconClose &&
                    <span className="span-close" onClick={(e) => this.callbackClose()}>
                        {
                            iconClose
                        }
                    </span>
                }
                <div className='dimmed' onClick={(e) => this.callbackClose(true)}></div>
                <div className="content">
                    {
                        inputActive && <input value={inputValue} placeholder={inputPlaceholder} onChange={(e) => this.setValue(e)}/>
                    }
                    <ul className="ul">
                        {
                            0 !== filteredData.length && this.buildListJsx(filteredData)
                        }
                        {
                            0 === filteredData.length && 0 !== inputValue.length && 
                            <div className="no-data">
                                {
                                    noDataText
                                }
                            </div>
                        }
                        {
                            0 == filteredData.length && 0 == inputValue.length && this.buildListJsx(data)
                        }
                    </ul>
                </div>                
            </div>
        );
    }
}

export default FullScreenListArray;