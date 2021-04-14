import React from 'react';
import uuid from '../../_Functions/uuid';
import PropsCheck from '../internalFunctions/PropsCheck';

class Suggestions extends React.Component {
    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
        this.setValue = this.setValue.bind(this);
        this.callbackEsc = this.callbackEsc.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.setFocusUpdater = this.setFocusUpdater.bind(this);
        this.setArrow = this.setArrow.bind(this);
        this.setMouseMoved = this.setMouseMoved.bind(this);
        this.setReferenceNode = this.setReferenceNode.bind(this);

        this.state = {
            /**
             * App
             */
            selected: [],
            selectedDataForCallback : [],
            selectedArrow: null,
            isLoading: false,
            plainValue: '',
            outSideClicked: false,
            clickEventAllreadyHandled: false,
            suggestions: [],
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-suggestions',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            callback: props.callback && typeof function () { } === typeof props.callback ? props.callback : undefined,
            callbackProps: props.callbackProps,
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            suggestionsToFilter: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            multiple: (typeof true == typeof props.multiple) ? props.multiple : true,
            sortSelected: (props.sortSelected && typeof '8' == typeof props.sortSelected) ? props.sortSelected : undefined,
            sortSuggestions: (props.sortSuggestions && typeof '8' == typeof props.sortSuggestions) ? props.sortSuggestions : undefined,
            inputPlaceholder: (props.placeholder && typeof '8' == typeof props.placeholder) ? props.placeholder : '',
            searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
            removeChar: props.removeChar ? props.removeChar : 'x',
            removeCharLeft: (typeof true == typeof props.removeCharLeft) ? props.removeCharLeft : false,
            singleLiHeight: props.singleLiHeight && typeof 8 === typeof props.singleLiHeight ? props.singleLiHeight : 40,
            dataOnEmpty: props.dataOnEmpty ? props.dataOnEmpty : '',
            allowTyping: (typeof true == typeof props.allowTyping) ? props.allowTyping : true,
            inputValue: (props.inputValue && typeof '8' == typeof props.inputValue) ? props.inputValue : '',
            prevInputValue: (props.inputValue && typeof '8' == typeof props.inputValue) ? props.inputValue : '',
            inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
            inputEmpty: (typeof true == typeof props.inputEmpty) ? props.inputEmpty : false,
            suggestionsEmpty: (typeof true == typeof props.suggestionsEmpty) ? props.suggestionsEmpty : false,
        };

        this.availableSorts = ['asc', 'desc'];
        this.mouseMoved = false;
        this.inputRef = React.createRef();
        this.referenceNode = React.createRef();
        this.setMouseMovedTimeout = null;
    }
    
    componentDidMount() {
        this.setFocusUpdater(true);
        document.addEventListener('mousedown', this.handleMouseDown);

        if(this.state.inputValue){
            this.setState({
                plainValue: this.state.inputValue
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);

        if (this.referenceNode && this.referenceNode.current) {
            this.referenceNode.current.removeEventListener('mousemove', this.setMouseMoved);
        }
    }

    componentDidUpdate() {
        if (this.referenceNode && this.referenceNode.current) {
            this.referenceNode.current.removeEventListener('mousemove', this.setMouseMoved);
            this.referenceNode.current.addEventListener('mousemove', this.setMouseMoved);
        }
    }

    setReferenceNode(node){
        this.referenceNode = node;
    }

    setMouseMoved() {
        this.mouseMoved = true;
        clearTimeout(this.setMouseMovedTimeout);

        this.setMouseMovedTimeout = setTimeout(() => {
            this.mouseMoved = false;
        }, 300);
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'placeholder', 'inputEmpty', 'suggestionsEmpty', 'inputType', 'callback', 'callbackProps', 'data', 'multiple', 'sortSelected', 'sortSuggestions', 'searchSensitive', 'removeChar', 'removeCharLeft', 'singleLiHeight', 'dataOnEmpty', 'clickEventAllreadyHandled', 'allowTyping'], props, state)) {

            if(state.prevInputValue !== props.inputValue){
                return {
                    prevInputValue: (props.inputValue && typeof '8' == typeof props.inputValue) ? props.inputValue : '',
                    plainValue: (props.inputValue && typeof '8' == typeof props.inputValue) ? props.inputValue : '',
                };
            }

            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-suggestions',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                callback: props.callback && typeof function () { } === typeof props.callback ? props.callback : undefined,
                callbackProps: props.callbackProps,
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                suggestionsToFilter: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                multiple: (typeof true == typeof props.multiple) ? props.multiple : true,
                sortSelected: (props.sortSelected && typeof '8' == typeof props.sortSelected) ? props.sortSelected : undefined,
                sortSuggestions: (props.sortSuggestions && typeof '8' == typeof props.sortSuggestions) ? props.sortSuggestions : undefined,
                inputPlaceholder: (props.placeholder && typeof '8' == typeof props.placeholder) ? props.placeholder : '',
                searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
                removeChar: props.removeChar ? props.removeChar : 'x',
                removeCharLeft: (typeof true == typeof props.removeCharLeft) ? props.removeCharLeft : false,
                singleLiHeight: props.singleLiHeight && typeof 8 === typeof props.singleLiHeight ? props.singleLiHeight : 40,
                dataOnEmpty: props.dataOnEmpty ? props.dataOnEmpty : '',
                allowTyping: (typeof true == typeof props.allowTyping) ? props.allowTyping : true,
                inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
                inputEmpty: (typeof true == typeof props.inputEmpty) ? props.inputEmpty : false,
                suggestionsEmpty: (typeof true == typeof props.suggestionsEmpty) ? props.suggestionsEmpty : false,
            };
        }

        return null;
    }

    setFocusUpdater(usercallback = false) {
        let timeout = usercallback ? 100 : 0;

        setTimeout(() => {

            if (this.inputNode) {
                const val = this.inputNode.value || this.inputNode.defaultValue;

                this.setState({
                    plainValue: val
                }, () => {

                    if (usercallback) {
                        this.callback();
                    }
                });
            }
        }, timeout);
    }

    /**
     * Hide data div
     * while user not inside it
     * @param {React.MouseEvent|any} e
     */
    handleMouseDown(e) {
        if (this.referenceNode && !this.referenceNode.contains(e.target)) {
            this.setState({
                suggestions: [],
                setArrow: null,
                outSideClicked: true,
                clickEventAllreadyHandled: false
            });
        }
    }

    /**
     * On state change callback
     */
    callback() {
        const { callback, callbackProps, plainValue, selected } = this.state;

        if (callback) {
            (callback)(callbackProps, plainValue, selected);
        }
    }

    /**
     * Esc callback
     */
    callbackEsc() {
        this.setState({
            suggestions: [],
            setArrow: null,
            clickEventAllreadyHandled: false
        });
    }

    /**
     * Set value on change input field
     */
    setValue(e) {
        let val = e.target.value;

        if (this.state.allowOnlyAZ) {
            val = val.replace(/[^a-zA-Z ]/gmi, '');
            val = val.trim();
        }

        this.setState({
            plainValue: val,
            clickEventAllreadyHandled: false
        }, () => {

            if ('' == this.state.plainValue) {
                return this.setState({
                    isLoading: false,
                    suggestions: [],
                    clickEventAllreadyHandled: false
                }, this.showSuggestions);
            }

            this.showSuggestions();
        });
    }

    /**
     * Show suggestion if the user has favourites
     */
    showSuggestions(isClickEvent = false) {

        if(isClickEvent && this.state.clickEventAllreadyHandled){
            return;
        }

        let clickEventAllreadyHandled = isClickEvent ? true : false;
        const filteredSuggestions = [];
        let { suggestionsToFilter, plainValue, sortSuggestions, searchSensitive } = this.state;

        /**
         * Sort if user wish
         */
        if (sortSuggestions && this.availableSorts.includes(sortSuggestions)) {
            if ('asc' == sortSuggestions) {
                suggestionsToFilter.sort((a, b) => a.text > b.text ? 1 : -1);
            }
            if ('desc' == sortSuggestions) {
                suggestionsToFilter.sort((a, b) => a.text > b.text ? -1 : 1);
            }
        }

        // User have some input
        if (plainValue.length) {

            for (let x = 0; x <= suggestionsToFilter.length - 1; x++) {

                if (typeof {} == typeof suggestionsToFilter[x] && undefined !== suggestionsToFilter[x].key) {
                    const val = suggestionsToFilter[x].key;

                    // searchSensitive
                    if (searchSensitive && -1 !== val.indexOf(plainValue)) {
                        filteredSuggestions.push(suggestionsToFilter[x]);
                    }

                    // Not-searchSensitive
                    if (!searchSensitive && -1 !== val.toLowerCase().indexOf(plainValue.toLowerCase())) {
                        filteredSuggestions.push(suggestionsToFilter[x]);
                    }
                }
            }
        }
        // On click event without any data
        else {
            clickEventAllreadyHandled = true;

            for (let x = 0; x <= suggestionsToFilter.length - 1; x++) {

                if (typeof {} == typeof suggestionsToFilter[x] && undefined !== suggestionsToFilter[x].key) {
                    filteredSuggestions.push(suggestionsToFilter[x]);
                }
            }
        }

        if (filteredSuggestions.length) {
            this.setState({
                suggestions: filteredSuggestions,
                outSideClicked: false,
                clickEventAllreadyHandled,
            }, this.callback);
        }
        else {
            this.setState({
                suggestions: [],
                outSideClicked: false,
                clickEventAllreadyHandled,
            }, this.callback);
        }
    }

    /**
     * Append choosed user
     */
    toggleSelection(suggestionObject, selectedArrow) {
        let { selected, sortSelected } = this.state;
        const f = selected.filter( o => o.key === suggestionObject.key);

        if (0 === f.length) {

            if(!this.state.multiple){
                selected = [];
            }

            selected.push(suggestionObject);
        }
        else {
            selected = selected.filter( o => o.key !== suggestionObject.key);
        }

        /**
         * Sort if user wish
         */
        if (sortSelected && this.availableSorts.includes(sortSelected)) {
            if ('asc' == sortSelected) {
                selected.sort( (a, b) => {

                    if(a.text < b.text){
                        return -1;
                    }

                    if(a.text > b.text){
                        return 1;
                    }

                    return 0;
                });
            }
            if ('desc' == sortSelected) {
                selected.sort( (a, b) => {

                    if(a.text < b.text){
                        return 1;
                    }

                    if(a.text > b.text){
                        return -1;
                    }

                    return 0;
                });
            }
        }

        this.setState({
            selected,
            clickEventAllreadyHandled: false,
            selectedArrow,
            plainValue: this.state.inputEmpty ? '' : this.state.plainValue,
            suggestions: this.state.suggestionsEmpty ? [] : this.state.suggestions
        }, () => {

            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus();
            }

            this.callback();

        });
    }

    handleKeyDown(event) {
        event.persist();

        if (event.key === 'Escape') {
            return this.callbackEsc();
        }

        if(!this.state.allowTyping){
            return;
        }

        let { selectedArrow, suggestions, singleLiHeight } = this.state;

        if (null == selectedArrow && event.key === 'ArrowDown') {
            selectedArrow = -1;
        }

        if (event.key === 'Enter' && -1 !== selectedArrow && null !== selectedArrow && undefined !== suggestions[selectedArrow]) {
            return this.toggleSelection(suggestions[selectedArrow], selectedArrow);
        }

        if (event.key === 'ArrowDown' && suggestions.length) {
            selectedArrow += 1;

            if (selectedArrow >= suggestions.length - 1) {
                selectedArrow = suggestions.length - 1;
            }
        }

        if (event.key === 'ArrowUp' && suggestions.length) {
            selectedArrow -= 1;

            if (selectedArrow <= 0) {
                selectedArrow = 0;
            }
        }

        if (!suggestions.length) {
            selectedArrow = null;
        }

        this.setState({
            selectedArrow,
            clickEventAllreadyHandled: false
        }, () => {
            if (this.suggestionsHolder) {
                const { selectedArrow } = this.state;
                const height = this.suggestionsHolder.getBoundingClientRect().height;

                if (event.key === 'ArrowDown' && (selectedArrow * singleLiHeight) + (singleLiHeight * 2) > height) {
                    return this.suggestionsHolder.scrollTop = this.suggestionsHolder.scrollTop + singleLiHeight;
                }

                if (event.key === 'ArrowUp' && this.suggestionsHolder.scrollTop > selectedArrow * singleLiHeight - singleLiHeight) {
                    this.suggestionsHolder.scrollTop = this.suggestionsHolder.scrollTop - singleLiHeight;
                }
            }
        });
    }

    setArrow(index) {
        const { selectedArrow } = this.state;

        if (selectedArrow !== index && this.mouseMoved) {
            this.setState({
                selectedArrow: index,
                clickEventAllreadyHandled: false
            }, () => {
                if (this.inputRef && this.inputRef.current) {
                    this.inputRef.current.focus();
                }
            });
        }
    }

    render() {
        const { addClass, selected, defaultClass, id, props, suggestions, plainValue, inputPlaceholder, inputType, selectedArrow, loading, isLoading, removeChar, removeCharLeft, dataOnEmpty, outSideClicked } = this.state;

        return (
            <div className={`${defaultClass} ${addClass}`} id={id}>
                <div className="input" ref={this.setReferenceNode}>
                    {
                        0 !== selected.length &&
                        <div className="choosed">
                            {
                                selected.map( (o, i)  => {
                                    const removeData = (
                                        <div
                                            onClick={(e) => this.toggleSelection(o, i)}
                                            className="suggestion-remove"
                                        >
                                            {
                                                removeChar
                                            }
                                        </div>
                                    );

                                    return (
                                        <div
                                            key={uuid()}
                                            className="suggestion flex"
                                        >
                                            {
                                                removeCharLeft && removeData
                                            }
                                            <div className='suggestion-text'>
                                                {
                                                    o.text
                                                }
                                            </div>
                                            {
                                                !removeCharLeft && removeData
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <input
                        {...props}
                        ref={this.inputRef}
                        type={inputType}
                        value={plainValue}
                        placeholder={inputPlaceholder}
                        onClick={ (e) => this.showSuggestions(true)}
                        {...(this.state.allowTyping) && { onChange : (e) => this.setValue(e)} }
                        onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                    {
                        loading && isLoading &&
                        <div className="loading-area">
                            {
                                loading
                            }
                        </div>
                    }
                    {
                        suggestions && 0 !== suggestions.length &&
                        <div className="suggestions-area">
                            <ul className="ul">
                                <span className="suggestions" ref={node => this.suggestionsHolder = node}>
                                    {
                                        suggestions.map((suggestionObject, i) => {

                                            let liClassname = selected.filter(o => o.key === suggestionObject.key).length ? 'selected' : ''

                                            if (null !== selectedArrow && undefined !== suggestions[selectedArrow] && selectedArrow == i) {
                                                liClassname = `${liClassname} active`;
                                            }

                                            return (
                                                <li
                                                    className={liClassname}
                                                    key={uuid()}
                                                    onClick={(e) => this.toggleSelection(suggestionObject, i)}
                                                    onMouseEnter={() => this.setArrow(i)}
                                                >
                                                    {
                                                        suggestionObject.text
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </span>
                            </ul>
                        </div>
                    }
                    {
                        '' !== plainValue && suggestions && 0 == suggestions.length && dataOnEmpty && !outSideClicked && 
                        <div className="suggestions-area">
                            <div className='suggestions-empty' ref={this.referenceNode}>
                                {
                                    dataOnEmpty
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Suggestions;