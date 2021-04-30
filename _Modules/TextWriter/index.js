import React from 'react';
import isString from '../../_Functions/isString';
import internalUuid from '../internalFunctions/internalUuid';

class TextWriter extends React.Component 
{

    constructor(props) {
        super(props);
        this.setText = this.setText.bind(this);

        this.state = {
            /**
             * App
             */
            written: [],
            internalUuid: `${internalUuid()}`,
            /**
             * User
             */
            moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
            globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'TextWriter',
            id: isString(props.id) ? props.id : '',
            text: (props.text && props.text.length) ? props.text : '',
            speed: (props.speed && typeof 8 == typeof props.speed) ? props.speed : 300,
            pipeDisplay: (typeof true == typeof props.pipeDisplay) ? props.pipeDisplay : true,
            pipeChar: props.pipeChar ? props.pipeChar : '|',
            pipeSite: (props.pipeSite && typeof '8' == typeof props.pipeSite) ? props.pipeSite : 'right',
            pipePersist: (typeof true == typeof props.pipePersist) ? props.pipePersist : false,
            replaces: (props.replaces && typeof [] == typeof props.replaces) ? props.replaces : undefined,
            timeout: (props.timeout && typeof 8 == typeof props.timeout) ? props.timeout : 0
        };
    }

    componentDidMount() {
        const { written, text, timeout } = this.state;

        setTimeout(() => {
            this.setText(written, text);
        }, timeout);
    }

    writerPromise(char) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(char);
            }, 1);
        });
    }

    removerPromise(written) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(written);
            }, 1);
        });
    }

    setText(written, text) {
        const { speed, pipePersist, replaces } = this.state;
        const splitted = text.split('');
        let count = -1;

        const runIntervaller = (splitted) => {
            this.writerInterval = setInterval(async () => {
                count++;

                if (count > splitted.length - 1) {
                    clearInterval(this.writerInterval);

                    if (replaces && replaces.length) {
                        this.runReplacer();
                    }
                    else {
                        setTimeout(() => {
                            this.setState({
                                pipeDisplay: pipePersist
                            });
                        }, speed);
                    }
                }

                await this.writerPromise(splitted[count]).then(char => {
                    written.push(char);

                    this.setState({
                        written
                    });
                });

            }, speed);
        }

        runIntervaller(splitted);
    }

    runReplacer() {
        let { replaces, pipePersist, speed, internalUuid } = this.state;
        let replacesDone = 0;

        const runReplacer = () => {
            let { written } = this.state;
            let { from, to, replace } = replaces[replacesDone];

            this.removeIntervaller = setInterval(async () => {

                if (from > to) {
                    clearInterval(this.removeIntervaller);
                    /**
                     * Remove empty string added by the module
                     */
                    const newString = [];

                    for (let x = 0; x <= written.length - 1; x++) {
                        if (internalUuid !== written[x]) {
                            newString.push(written[x]);
                        }
                    }

                    this.setState({
                        written: newString
                    }, () => {
                        /**
                         * Its time to add the replacement string
                         */
                        if (replace && replace.length) {
                            const { written } = this.state;
                            const prev = written.slice(0, from);
                            const next = written.slice(from, to);
                            const last = written.slice(to, written.length - 1);

                            if (last[0] && ' ' == last[0]) {
                                last[0] = '';
                            }

                            let count = -1;
                            const splitted = replace.split('');
                            const newString = [];

                            this.writerInterval = setInterval(async () => {
                                count++;

                                if (count > splitted.length - 1) {
                                    clearInterval(this.writerInterval);
                                    replacesDone += 1;

                                    if (undefined !== replaces[replacesDone]) {
                                        runReplacer();
                                    }
                                    else {
                                        setTimeout(() => {
                                            this.setState({
                                                pipeDisplay: pipePersist
                                            });
                                        }, speed);
                                    }
                                }

                                await this.writerPromise(splitted[count]).then(char => {
                                    newString.push(char);

                                    this.setState({
                                        written: [...prev, ...newString, ...next, ...last]
                                    });
                                });

                            }, speed);
                        }
                    });
                }
                else {
                    written[to] = internalUuid;
                    this.setState({ written });
                }

                to -= 1;

            }, speed);
        }

        runReplacer();
    }

    render() {
        const { addClass, defaultClass, id, internalUuid, written, pipeDisplay, pipeChar, pipeSite } = this.state;

        return (
            <span className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                {
                    'left' == pipeSite && pipeDisplay &&
                    <span className="pipe">
                        {
                            pipeChar
                        }
                    </span>
                }
                {
                    written.map(i => {
                        if (internalUuid !== i) {
                            return i
                        }
                    })
                }
                {
                    'right' == pipeSite && pipeDisplay &&
                    <span className="pipe">
                        {
                            pipeChar
                        }
                    </span>
                }
            </span>
        );
    }
}

export default TextWriter;
