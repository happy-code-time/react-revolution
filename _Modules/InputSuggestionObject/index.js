import React from 'react';
import uuid from '../../_Functions/uuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class InputSuggestionObject extends React.Component 
{

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
        this.callbackPromise = this.callbackPromise.bind(this);

        this.state = {
            /**
             * App
             */
            suggestions: [],
            selectedArrow: null,
            isLoading: false,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'InputSuggestionObject',
            id: isString(props.id) ? props.id : '',
            plainValue: (props.value && typeof '8' == typeof props.value) ? props.value : '',
            callback: isFunction(props.callback) ? props.callback : undefined,
            callbackSelection: (props.callbackSelection && typeof function(){} == typeof props.callbackSelection) ? props.callbackSelection : undefined,
            selected: (props.selected && typeof [] == typeof props.selected) ? props.selected : [],
            suggestionsToFilter: (props.suggestions && typeof [] == typeof props.suggestions) ? props.suggestions : [],
            inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
            props: (props.props && typeof {} == typeof props.props) ? props.props : {},
            inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
            getValueFromCallback: (typeof true == typeof props.getValueFromCallback) ? props.getValueFromCallback : false,
            emptySuggestionAfterSelection: (typeof true == typeof props.emptySuggestionAfterSelection) ? props.emptySuggestionAfterSelection : true,
            sortSelected: (props.sortSelected && typeof '8' == typeof props.sortSelected) ? props.sortSelected : undefined,
            sortSuggestions: (props.sortSuggestions && typeof '8' == typeof props.sortSuggestions) ? props.sortSuggestions : undefined,
            searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
            loading: props.loading ? props.loading : undefined,
            applySelected: (typeof true == typeof props.applySelected) ? props.applySelected : true,
            singleLiHeight: props.singleLiHeight && typeof 8 === typeof props.singleLiHeight ? props.singleLiHeight : 40,
        };

        this.availableSorts = ['asc', 'desc'];
        this.mouseMoved = false;
        this.inputRef = React.createRef();
        this.refNodeUl = React.createRef();
        this.setMouseMovedTimeout = null;
    }

    componentDidMount() {
        this.setFocusUpdater(true);
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);

        if(this.refNodeUl && this.refNodeUl.current){
            this.refNodeUl.current.removeEventListener('mousemove', this.setMouseMoved);
        }
    }

    componentDidUpdate(){
        if(this.refNodeUl && this.refNodeUl.current){
            this.refNodeUl.current.removeEventListener('mousemove', this.setMouseMoved);
            this.refNodeUl.current.addEventListener('mousemove', this.setMouseMoved);
        }
    }

    setMouseMoved(){
        this.mouseMoved = true;
        clearTimeout(this.setMouseMovedTimeout);
        
        this.setMouseMovedTimeout = setTimeout( () => {
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
        if (PropsCheck(['addClass', 'defaultClass', 'singleLiHeight',  'id','value', 'suggestions', 'suggestionsToFilter', 'inputPlaceholder', 'props', 'inputType', 'applySelected', 'emptySuggestionAfterSelection', 'sortSelected', 'sortSuggestions', 'searchSensitive', 'callback', 'callbackSelection', 'selected', 'loading'], props, state)) {
            const getValueFromCallback = (typeof true == typeof props.getValueFromCallback) ? props.getValueFromCallback : false;

            if (getValueFromCallback) {
                return {
                    defaultClass: isString(props.defaultClass) ? props.defaultClass : 'InputSuggestionObject',
                    addClass: isString(props.addClass) ? props.addClass : '',
                    suggestionsToFilter: (props.suggestions && typeof [] == typeof props.suggestions) ? props.suggestions : [],
                    plainValue: props.value,
                    inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                    props: (props.props && typeof {} == typeof props.props) ? props.props : {},
                    inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
                    getValueFromCallback: (typeof true == typeof props.getValueFromCallback) ? props.getValueFromCallback : false,
                    emptySuggestionAfterSelection: (typeof true == typeof props.emptySuggestionAfterSelection) ? props.emptySuggestionAfterSelection : true,
                    sortSelected: (props.sortSelected && typeof '8' == typeof props.sortSelected) ? props.sortSelected : undefined,
                    sortSuggestions: (props.sortSuggestions && typeof '8' == typeof props.sortSuggestions) ? props.sortSuggestions : undefined,
                    searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
                    callback: isFunction(props.callback) ? props.callback : undefined,
                    callbackSelection: (props.callbackSelection && typeof function(){} == typeof props.callbackSelection) ? props.callbackSelection : undefined,
                    loading: props.loading ? props.loading : undefined,
                    applySelected: (typeof true == typeof props.applySelected) ? props.applySelected : true,
                    singleLiHeight: props.singleLiHeight && typeof 8 === typeof props.singleLiHeight ? props.singleLiHeight : 40,
                }
            }

            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'InputSuggestionObject',
                suggestionsToFilter: (props.suggestions && typeof [] == typeof props.suggestions) ? props.suggestions : [],
                plainValue: state.plainValue,
                inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                props: (props.props && typeof {} == typeof props.props) ? props.props : {},
                inputType: (props.inputType && typeof '8' == typeof props.inputType) ? props.inputType : 'text',
                getValueFromCallback: (typeof true == typeof props.getValueFromCallback) ? props.getValueFromCallback : false,
                emptySuggestionAfterSelection: (typeof true == typeof props.emptySuggestionAfterSelection) ? props.emptySuggestionAfterSelection : true,
                sortSelected: (props.sortSelected && typeof '8' == typeof props.sortSelected) ? props.sortSelected : undefined,
                sortSuggestions: (props.sortSuggestions && typeof '8' == typeof props.sortSuggestions) ? props.sortSuggestions : undefined,
                searchSensitive: (typeof true == typeof props.searchSensitive) ? props.searchSensitive : true,
                callback: isFunction(props.callback) ? props.callback : undefined,
                callbackSelection: (props.callbackSelection && typeof function(){} == typeof props.callbackSelection) ? props.callbackSelection : undefined,
                loading: props.loading ? props.loading : undefined,
                applySelected: (typeof true == typeof props.applySelected) ? props.applySelected : true,
                singleLiHeight: props.singleLiHeight && typeof 8 === typeof props.singleLiHeight ? props.singleLiHeight : 40,
            };
        }

        return null;
    }

    setFocusUpdater(usercallback = false) {
        let timeout = usercallback ? 100 : 0;

        setTimeout(() => {
            const { getValueFromCallback } = this.state;

            if (this.inputNode) {
                const val = this.inputNode.value || this.inputNode.defaultValue;

                this.setState({
                    plainValue: val
                }, () => {

                    if (usercallback) {
                        if (getValueFromCallback) {
                            this.callback(val);
                        }
                        else {
                            this.callback();
                        }
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
        if (this.refNodeUl && this.refNodeUl.current && !this.refNodeUl.current.contains(e.target)) {
            this.setState({
                suggestions: [],
                setArrow: null
            });
        }
    }

    /**
     * On state change callback
     */
    callback(val = null) {
        const { getValueFromCallback, callback, plainValue } = this.state;

        if (callback) {

            if (getValueFromCallback) {
                (callback)(val);
            }
            else {
                (callback)(plainValue);
            }
        }
    }

    callbackPromise(val = null){
        const { getValueFromCallback, callback, plainValue } = this.state;

        return new Promise( async (resolve, reject) => {
            if (callback) {

                if (getValueFromCallback) {
                    await (callback)(val)
                    .then( r => {
                        resolve(true);
                    })
                    .catch( r => {
                        resolve(true);
                    });
                }
                else {
                    await (callback)(plainValue)
                    .then( r => {
                        resolve(true);
                    })
                    .catch( r => {
                        resolve(true);
                    });
                }
            }
            else{
                resolve(true);
            }
        });
    }

    /**
     * Esc callback
     */
    callbackEsc() {
        this.setState({
            suggestions: [],
            setArrow: null
        });
    }

    /**
     * Set value on change input field
     */
    setValue(e) {
        const { getValueFromCallback, loading, isLoading } = this.state;
        let val = e.target.value;

        if (this.state.allowOnlyAZ) {
            val = val.replace(/[^a-zA-Z ]/gmi, '');
            val = val.trim();
        }

        if (getValueFromCallback) {

            if('' == val){
                return this.setState({
                    isLoading: false,
                    suggestions: []
                });
            }

            if(loading && !isLoading){
                clearTimeout(this.timeout);

                return this.timeout = setTimeout( () => {
                    this.setState({
                        isLoading: true,
                        suggestions: []
                    }, async () => {
                        await this.callbackPromise(val)
                        .then( () => {
                            this.setState({
                                isLoading: false,
                                suggestions: []
                            }, this.showSuggestions)
                        })
                        .catch( () => {
                            this.setState({
                                isLoading: false,
                                suggestions: []
                            }, this.showSuggestions)
                        })
                    })
                }, 200);
            }
            else{
                this.callback(val);
                this.showSuggestions();
            }
        }
        else {

            this.setState({
                plainValue: val,
                isLoading: true,
                suggestions: []
            }, () => {

                if('' == this.state.plainValue){ 
                    return this.setState({
                        isLoading: false,
                        suggestions: []
                    });
                }

                if(loading && !isLoading){
                    clearTimeout(this.timeout);

                    return this.timeout = setTimeout( () => {
                        this.callbackPromise()
                        .then( () => {
                            this.setState({
                                isLoading: false,
                                suggestions: []
                            }, this.showSuggestions)
                        })
                        .catch( () => {
                            this.setState({
                                isLoading: false,
                                suggestions: []
                            }, this.showSuggestions)
                        });
                    }, 200);
                }
                else{
                    this.callback();
                    this.showSuggestions();
                }
            });
        }
    }

    /**
     * Show suggestion if the user has favourites
     */
    showSuggestions() {
        const filteredSuggestions = [];
        let { suggestionsToFilter, plainValue, sortSuggestions, searchSensitive, isLoading, loading } = this.state;

        /**
         * Sort if user wish
         */
        if (sortSuggestions && this.availableSorts.includes(sortSuggestions)) {
            if ('asc' == sortSuggestions) {
                suggestionsToFilter.sort( (a, b) => a.text > b.text ? 1 : -1);
            }
            if ('desc' == sortSuggestions) {
                suggestionsToFilter.sort( (a, b) => a.text > b.text ? -1 : 1);
            }
        }

        if (plainValue.length) {

            for (let x = 0; x <= suggestionsToFilter.length - 1; x++) {
                const { text } = suggestionsToFilter[x];

                if (text && typeof '7' == typeof text && !searchSensitive && -1 !== text.toLowerCase().indexOf(plainValue.toLowerCase())) {
                    filteredSuggestions.push(suggestionsToFilter[x]);
                }

                if (text && typeof '7' == typeof text && searchSensitive && -1 !== text.indexOf(plainValue)) {
                    filteredSuggestions.push(suggestionsToFilter[x]);
                }
            }

            if (filteredSuggestions.length) {
                const data = [];
                const indexes = [];

                /**
                 * Get unique email addresses
                 */
                for (let x = 0; x <= filteredSuggestions.length - 1; x++) {
                    const { text } = filteredSuggestions[x];

                    if (!data.includes(text)) {
                        data.push(filteredSuggestions[x]);
                        indexes.push(x);
                    }
                }

                /**
                 * Add items by getted indexes of parent element: filteredSuggestions
                 */
                const removedDupplicates = [];

                for (let x = 0; x <= indexes.length - 1; x++) {
                    removedDupplicates.push(filteredSuggestions[indexes[x]]);
                }

                this.setState({
                    suggestions: loading ? (isLoading ? [] : removedDupplicates) : removedDupplicates,
                });
            }
            else {
                this.setState({
                    suggestions: [],
                });
            }
        }
        else {
            this.setState({
                suggestions: [],
            });
        }
    }

    /**
     * Append choosed user
     */
    toggleSelection(object, selectedArrow) {
        let { selected, callbackSelection, emptySuggestionAfterSelection, sortSelected, plainValue, applySelected } = this.state;

        const { text } = object;

        if (text) {
            let included = false;

            selected.map( obj => {
                const textToMatch = obj.text;

                if(textToMatch && textToMatch == text){
                    included = true;
                }
            });

            if (!included) {
                selected.push(object);
            }
            else {
                selected = selected.filter(entry => entry.text !== text);
            }

        }

        /**
         * Sort if user wish
         */
        if (sortSelected && this.availableSorts.includes(sortSelected)) {
            if ('asc' == sortSelected) {
                selected.sort( (a, b) => a.text > b.text ? 1 : -1);
            }
            if ('desc' == sortSelected) {
                selected.sort( (a, b) => a.text > b.text ? -1 : 1);
            }
        }

        if (callbackSelection) {
            (callbackSelection)(selected);
        }

        this.setState({
            selected: applySelected ? selected : [],
            plainValue: emptySuggestionAfterSelection ? '' : plainValue,
            selectedArrow
        }, () => {
            
            if (emptySuggestionAfterSelection) {
                this.setState({
                    filter: '',
                    suggestions: [],
                    setArrow: null
                });
            }

            if(this.inputRef && this.inputRef.current){
                this.inputRef.current.focus();
            }

        });
    }

    handleKeyDown(event) {
        let { selectedArrow, suggestions, plainValue } = this.state;
        event.persist();

        if (null == selectedArrow && event.key === 'ArrowDown') {
            selectedArrow = -1;
        }

        if (event.key === 'Escape') {
            return this.callbackEsc();
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

        if ('' == plainValue || !suggestions.length) {
            selectedArrow = null;
        }

        this.setState({
            selectedArrow
        }, () => {
            if (this.suggestionsHolder) {
                const { selectedArrow } = this.state;
                const singleLiHeight = 40;
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

        if(selectedArrow !== index && this.mouseMoved){
            this.setState({ 
                selectedArrow: index 
            }, () => {
                if(this.inputRef && this.inputRef.current){
                    this.inputRef.current.focus();
                }
            });
        }
    }

    render() {
        const { addClass, selected, defaultClass, id, props, suggestions, plainValue, inputPlaceholder, inputType, selectedArrow, isLoading, loading } = this.state;

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                <div className="input">
                    {
                        0 !== selected.length &&
                        <div className="choosed">
                            {
                                selected.map( (data, i) => {
                                    const { text } = data;

                                    if (text) {
                                        return (
                                            <div
                                                key={uuid()}
                                                className="item ff-title"
                                            >
                                                <div
                                                    onClick={(e) => this.toggleSelection(data, i)}
                                                    className="remove">
                                                    x
                                            </div>
                                                {
                                                    text
                                                }
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    }
                    <input
                        ref={this.inputRef}
                        type={inputType}
                        value={plainValue}
                        onChange={(e) => this.setValue(e)}
                        placeholder={inputPlaceholder}
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        {...props}
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
                        '' !== plainValue && suggestions && 0 !== suggestions.length &&
                        <div className="suggestions-area">
                            <ul
                                className="ul"
                                ref={this.refNodeUl}
                            >
                                <span className="suggestions" ref={node => this.suggestionsHolder = node}>
                                    {
                                        suggestions.map((suggestion, i) => {
                                            let liClassname = selected.includes(suggestion) ? 'active' : ''

                                            if (null !== selectedArrow && undefined !== suggestions[selectedArrow] && selectedArrow == i) {
                                                liClassname = `${liClassname} selected`;
                                            }

                                            const { jsx, text } = suggestion;

                                            if (jsx) {
                                                return (
                                                    <li
                                                        className={liClassname}
                                                        key={uuid()}
                                                        onClick={(e) => this.toggleSelection(suggestion, i)}
                                                        onMouseOver={() => this.setArrow(i)}
                                                    >
                                                        {
                                                            jsx
                                                        }
                                                    </li>
                                                )
                                            }

                                            if (text) {
                                                return (
                                                    <li
                                                        className={liClassname}
                                                        key={uuid()}
                                                        onClick={(e) => this.toggleSelection(suggestion, i)}
                                                        onMouseOver={() => this.setArrow(i)}
                                                    >
                                                        {
                                                            text
                                                        }
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </span>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default InputSuggestionObject;