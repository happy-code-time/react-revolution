import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import tagMatcher from './functions/tagMatcher';
import propsMatcher from './functions/propsMatcher';
import varMatcher from './functions/varMatcher';
import objectPropertyMatcher from './functions/objectPropertyMatcher';
import functionMatcher from './functions/functionMatcher';
import keyWordsMatcher from './functions/keyWordsMatcher';
import quotesMatcher from './functions/quotesMatcher';
import bracketMatcher from './functions/bracketMatcher';

const defaultSourceCodeSteps = [
    'tags',
    'properties',
    'variables',
    'objectProperty',
    'functions',
    'words',
    'quotes',
    'brackets',
];

class SourceCode extends React.Component {

    constructor(props) {
        super(props);
        this.generateCode = this.generateCode.bind(this);
        this.focusIn = this.focusIn.bind(this);
        this.focusOut = this.focusOut.bind(this);
        this.filterCode = this.filterCode.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            /**
             * App
             */
            lines: [],
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'SourceCode',
            id: isString(props.id) ? props.id : '',
            code: (props.code && typeof '8' == typeof props.code) ? props.code : undefined,
            lineNumber: typeof true === typeof props.lineNumber ? props.lineNumber : false,
            promise: typeof true === typeof props.promise ? props.promise : false,
            promiseLine: props.promiseLine && typeof 8 == typeof props.promiseLine ? props.promiseLine : 1000,
            promiseTime: props.promiseTime && typeof 8 == typeof props.promiseTime ? props.promiseTime : 500,
            matcher: props.matcher && typeof [] == typeof props.matcher ? props.matcher : [],
            inputActive: typeof true === typeof props.inputActive ? props.inputActive : false,
            inputCallback: typeof function(){} == typeof props.inputCallback ? props.inputCallback : undefined,
            inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
            searchSensitive: typeof true === typeof props.searchSensitive ? props.searchSensitive : true,
            lineNumberNewLine: typeof true === typeof props.lineNumberNewLine ? props.lineNumberNewLine : true,
            noDataText: (props.noDataText && typeof '8' == typeof props.noDataText) ? props.noDataText : '',
            sourceCode: props.sourceCode && typeof [] == typeof props.sourceCode ? props.sourceCode : defaultSourceCodeSteps,
            fallbackNoData: props.fallbackNoData ? props.fallbackNoData : '',
            fallbackNoDataSearch: props.fallbackNoDataSearch ? props.fallbackNoDataSearch : '',
        };

        this.inputNode = React.createRef();
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'id', 'code', 'lineNumber', 'promise', 'promiseLine', 'matcher', 'inputActive', 'inputCallback', 'inputPlaceholder', 'searchSensitive', 'promiseTime', 'lineNumberNewLine', 'noDataText', 'sourceCode', 'fallbackNoData', 'fallbackNoDataSearch'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                code: (props.code && typeof '8' == typeof props.code) ? props.code : undefined,
                lineNumber: typeof true === typeof props.lineNumber ? props.lineNumber : false,
                promise: typeof true === typeof props.promise ? props.promise : false,
                promiseLine: props.promiseLine && typeof 8 == typeof props.promiseLine ? props.promiseLine : 1000,
                promiseTime: props.promiseTime && typeof 8 == typeof props.promiseTime ? props.promiseTime : 500,
                matcher: props.matcher && typeof [] == typeof props.matcher ? props.matcher : [],
                inputActive: typeof true === typeof props.inputActive ? props.inputActive : false,
                inputCallback: typeof function(){} == typeof props.inputCallback ? props.inputCallback : undefined,
                inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                searchSensitive: typeof true === typeof props.searchSensitive ? props.searchSensitive : true,
                lineNumberNewLine: typeof true === typeof props.lineNumberNewLine ? props.lineNumberNewLine : true,
                noDataText: (props.noDataText && typeof '8' == typeof props.noDataText) ? props.noDataText : '',
                sourceCode: props.sourceCode && typeof [] == typeof props.sourceCode ? props.sourceCode : defaultSourceCodeSteps,
                fallbackNoData: props.fallbackNoData ? props.fallbackNoData : '',
                fallbackNoDataSearch: props.fallbackNoDataSearch ? props.fallbackNoDataSearch : '',
            };
        }

        return null;
    }

    componentDidUpdate() {
        if (this.isFocus && this.inputNode && this.inputNode.current) {
            this.inputNode.current.focus();
        }
    }

    componentDidMount() {
        const { code } = this.state;

        if (code.length) {
            const data = code.split('\n');
            this.generateCode(data);
        }
    }

    focusIn() {
        this.isFocus = true;
    }

    focusOut() {
        this.isFocus = false;
    }

    /**
     * Set value on change input field
     */
    setValue(e) {
        const { inputCallback } = this.state;

        if (inputCallback) {
            (inputCallback)(e);
        }

        this.setState({
            inputValue: e.target.value,
            lines: []
        }, this.filterCode);
    }

    filterCode() {
        const { searchSensitive, inputValue, code } = this.state;

        if ('' == inputValue) {
            const data = code.split('\n');
            return this.generateCode(data);
        }

        if (code.length) {
            const data = code.split('\n');
            const lines = [];

            if (searchSensitive) {

                for (let x = 0; x <= data.length - 1; x++) {

                    if (data[x] && -1 !== data[x].toLowerCase().indexOf(inputValue.toLowerCase())) {
                        lines.push(data[x]);
                    }

                }
            }

            if (!searchSensitive) {

                for (let x = 0; x <= data.length - 1; x++) {

                    if (data[x] && -1 !== data[x].indexOf(inputValue)) {
                        lines.push(data[x]);
                    }

                }
            }

            this.generateCode(lines);
        }
    }

    async generateCode(code = []) {
        const { promise, promiseLine, promiseTime } = this.state;
        let lines = [];

        if (code) {

            for (let x = 0; x <= code.length - 1; x++) {
                let time = 0;

                if (x !== 0 && x % promiseLine == 0 && promise) {
                    time = promiseTime;
                }

                let data = code[x];

                if ('' == data) {
                    data = '\n';
                }

                let codes = [];

                if (promise) {
                    codes = await this.generateLinePromise(data, time);
                }
                else {
                    codes = this.generateLine(data);
                }

                lines.push(
                    {
                        codes
                    }
                );

                if (promiseTime == time) {

                    this.setState({
                        lines: [...this.state.lines, ...lines]
                    });

                    lines = [];
                }

                if (x == code.length - 1) {

                    this.setState({
                        lines: [...this.state.lines, ...lines]
                    });

                    lines = [];
                }

            }
        }
    }

    generateLinePromise(singleLine = '', time = 0) {
        const { matcher, sourceCode } = this.state;

        return new Promise(resolve => {
            const words = singleLine.split(' ');
            let lines = [];
            let attribute = null;

            for (let x = 0; x <= words.length - 1; x++) {

                const wordChars = words[x].split('');
                let characters = '';

                for (let i = 0; i < wordChars.length; i++) {
                    let nextCharacter = (undefined !== wordChars[i + 1]) ? wordChars[i + 1] : undefined;

                    if ('\t' == wordChars[i]) {
                        lines.push(
                            {
                                className: 'tab',
                                data: '\t'
                            }
                        );
                    }
                    else {
                        characters += wordChars[i];

                        for (let a = 0; a <= sourceCode.length - 1; a++) {

                            if (typeof '8' == typeof sourceCode[a] && defaultSourceCodeSteps.includes(sourceCode[a])) {

                                if ('tags' == sourceCode[a] && characters.length) {
                                    /**
                                     * Tags matcher
                                     */
                                    const tags = tagMatcher(characters, lines, nextCharacter);
                                    characters = tags.characters;
                                    lines = tags.lines;
                                }

                                if ('properties' == sourceCode[a] && characters.length) {
                                    /**
                                     * Tags props
                                     */
                                    const props = propsMatcher(characters, lines, nextCharacter, attribute);
                                    characters = props.characters;
                                    lines = props.lines;
                                    attribute = props.attribute;
                                }

                                if ('variables' == sourceCode[a] && characters.length) {
                                    /**
                                     * Vars matcher
                                     */
                                    const vars = varMatcher(characters, lines);
                                    characters = vars.characters;
                                    lines = vars.lines;
                                }

                                if ('objectProperty' == sourceCode[a] && characters.length) {
                                    /**
                                     * objectProperty matcher
                                     */
                                    const o = objectPropertyMatcher(characters, lines);
                                    characters = o.characters;
                                    lines = o.lines;
                                }

                                if ('functions' == sourceCode[a] && characters.length) {
                                    /**
                                     * Functions matcher
                                     */
                                    const fn = functionMatcher(characters, lines);
                                    characters = fn.characters;
                                    lines = fn.lines;
                                }

                                if ('words' == sourceCode[a] && characters.length) {
                                    /**
                                     * Key-words matcher
                                     */
                                    const custom = keyWordsMatcher(characters, lines, matcher);
                                    characters = custom.characters;
                                    lines = custom.lines;
                                }

                                /**
                                 * Quotes matcher
                                 */
                                if ('quotes' == sourceCode[a] && characters.length) {
                                    const quotes = quotesMatcher(characters, lines);
                                    characters = quotes.characters;
                                    lines = quotes.lines;
                                }

                                if ('brackets' == sourceCode[a] && characters.length) {
                                    /**
                                     * Brackets matcher
                                     */
                                    const fn = bracketMatcher(characters, lines);
                                    characters = fn.characters;
                                    lines = fn.lines;
                                }
                            }

                        }

                    }
                }

                /**
                 * No match
                 */
                if (characters.length) {
                    lines.push(
                        {
                            className: '',
                            data: characters
                        }
                    );
                }

                /**
                 * Add space, becouse the line was splitted by it
                 */
                lines.push(
                    {
                        className: 'space',
                        data: ' '
                    }
                );
            }

            setTimeout(() => {
                resolve(lines);
            }, time);
        });
    }

    generateLine(singleLine = '') {
        const { matcher, sourceCode } = this.state;
        const words = singleLine.split(' ');
        let lines = [];
        let attribute = null;

        for (let x = 0; x <= words.length - 1; x++) {
            let functionAlreadyStarted = false;
            const wordChars = words[x].split('');
            let characters = '';

            for (let i = 0; i < wordChars.length; i++) {
                let nextCharacter = (undefined !== wordChars[i + 1]) ? wordChars[i + 1] : undefined;

                if ('\t' == wordChars[i]) {
                    lines.push(
                        {
                            className: 'tab',
                            data: '\t'
                        }
                    );
                }
                else {
                    characters += wordChars[i];

                    for (let a = 0; a <= sourceCode.length - 1; a++) {

                        if (typeof '8' == typeof sourceCode[a] && defaultSourceCodeSteps.includes(sourceCode[a])) {

                            if ('tags' == sourceCode[a] && characters.length) {
                                /**
                                 * Tags matcher
                                 */
                                const tags = tagMatcher(characters, lines, nextCharacter);
                                characters = tags.characters;
                                lines = tags.lines;
                            }

                            if ('properties' == sourceCode[a] && characters.length) {
                                /**
                                 * Tags props
                                 */
                                const props = propsMatcher(characters, lines, nextCharacter, attribute);
                                characters = props.characters;
                                lines = props.lines;
                                attribute = props.attribute;
                            }

                            if ('variables' == sourceCode[a] && characters.length) {
                                /**
                                 * Vars matcher
                                 */
                                const vars = varMatcher(characters, lines);
                                characters = vars.characters;
                                lines = vars.lines;
                            }

                            if ('objectProperty' == sourceCode[a] && characters.length) {
                                /**
                                 * objectProperty matcher
                                 */
                                const o = objectPropertyMatcher(characters, lines);
                                characters = o.characters;
                                lines = o.lines;
                            }

                            if ('functions' == sourceCode[a] && characters.length) {
                                /**
                                 * Functions matcher
                                 */
                                const fn = functionMatcher(characters, lines, functionAlreadyStarted);
                                characters = fn.characters;
                                lines = fn.lines;
                            }

                            if ('words' == sourceCode[a] && characters.length) {
                                /**
                                 * Key-words matcher
                                 */
                                const custom = keyWordsMatcher(characters, lines, matcher);
                                characters = custom.characters;
                                lines = custom.lines;
                            }

                            /**
                             * Quotes matcher
                             */
                            if ('quotes' == sourceCode[a] && characters.length) {
                                const quotes = quotesMatcher(characters, lines);
                                characters = quotes.characters;
                                lines = quotes.lines;
                            }

                            if ('brackets' == sourceCode[a] && characters.length) {
                                /**
                                 * Brackets matcher
                                 */
                                const fn = bracketMatcher(characters, lines);
                                characters = fn.characters;
                                lines = fn.lines;
                            }
                        }
                    }
                }
            }

            /**
             * No match
             */
            if (characters.length) {
                lines.push(
                    {
                        className: '',
                        data: characters
                    }
                );
            }

            /**
             * Add space, becouse the line was splitted by it
             */
            lines.push(
                {
                    className: 'space',
                    data: ' '
                }
            );
        }

        return lines;
    }

    render() {
        const { addClass, defaultClass, lines, inputActive, inputPlaceholder, searchValue, id, lineNumber, fallbackNoData, lineNumberNewLine, fallbackNoDataSearch } = this.state;
        let emptyLines = 0;

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    inputActive &&
                    <div className="search">
                        <input
                            className="input"
                            type='text'
                            onChange={(e) => this.setValue(e)}
                            value={searchValue}
                            placeholder={inputPlaceholder}
                            onFocus={(e) => this.focusIn()}
                            onBlur={(e) => this.focusOut()}
                            ref={this.inputNode}
                        />
                    </div>
                }
                {
                    lines && 0 !== lines.length &&

                    <ul className='code'>
                        {
                            lines.map((line, index) => {

                                const { codes } = line;
                                const code = [];
                                let onlyEmptyLines = true;

                                if (!lineNumberNewLine) {

                                    codes.map(i => {

                                        const { data } = i;

                                        if ('' !== data.trim()) {
                                            onlyEmptyLines = false;
                                        }

                                    });

                                    if (onlyEmptyLines) {
                                        emptyLines++;

                                        return (
                                            <li
                                                key={internalUuid()}
                                                className='line'
                                            >
                                                <span className='line-code'>
                                                    {
                                                        `\n`
                                                    }
                                                </span>
                                            </li>
                                        );
                                    }
                                }

                                codes.map(i => {
                                    const { className, data } = i;

                                    code.push(
                                        <span
                                            key={internalUuid()}
                                            className={`${className ? className : ''}`}
                                        >
                                            {
                                                data
                                            }
                                        </span>
                                    );
                                });

                                return (
                                    <li
                                        key={internalUuid()}
                                        className='line'
                                    >
                                        {
                                            lineNumber &&
                                            <span className='line-number'>
                                                {
                                                    (index - emptyLines) + 1
                                                }
                                            </span>
                                        }
                                        <span className='line-code'>
                                            {
                                                code
                                            }
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                {
                    0 == lines.length && '' == searchValue && fallbackNoData
                }
                {
                    0 == lines.length && '' != searchValue && fallbackNoDataSearch
                }
            </div>
        );
    }
}
export default SourceCode;
