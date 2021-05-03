import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import LiveGenerationSteps from './LiveGenerationSteps';

class Step extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            // current step
            step: 0,
            currentError: '',
            // user data
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Step',
            id: isString(props.id) ? props.id : '',
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            next: props.next && typeof '8' === typeof props.next ? props.next : 'Next',
            previous: props.previous && typeof '8' === typeof props.previous ? props.previous : 'Previous',
            submit: props.submit && typeof '8' === typeof props.submit ? props.submit : 'Submit',
            callbackCheck: typeof true == typeof props.callbackCheck && true === props.callbackCheck ? true : false,
            callbackCheckNavigate: typeof true == typeof props.callbackCheckNavigate && true === props.callbackCheckNavigate ? true : false,
            progressBar: typeof true == typeof props.progressBar && true === props.progressBar ? true : false,
            iconStep: typeof true == typeof props.iconStep && true === props.iconStep ? true : false,
            errorDataInside: typeof true == typeof props.errorDataInside && true === props.errorDataInside ? true : false,
            errorAlignTop: typeof true == typeof props.errorAlignTop && true === props.errorAlignTop ? true : false,
            liveGeneration: typeof true == typeof props.liveGeneration && true === props.liveGeneration ? true : false,
            iconBg: props.iconBg && typeof '8' === typeof props.iconBg ? props.iconBg : 'rgb(71, 180, 118)',
            progressBgBlank: props.progressBgBlank && typeof '8' === typeof props.progressBgBlank ? props.progressBgBlank : 'rgba(71, 180, 118, 0.9)',
            progressBgStripe: props.progressBgStripe && typeof '8' === typeof props.progressBgStripe ? props.progressBgStripe : 'rgb(71, 180, 118)',
            progressBgSize: props.progressBgSize && typeof 8 == typeof props.progressBgSize ? props.progressBgSize : 30,
            buttonsBg: props.buttonsBg && typeof '8' === typeof props.buttonsBg ? props.buttonsBg : 'rgb(71, 180, 118', 
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'liveGeneration', 'iconBg', 'buttonsBg', 'progressBgSize', 'progressBgBlank', 'progressBgStripe',  'errorDataInside', 'errorAlignTop', 'id', 'data', 'next', 'previous', 'submit', 'progressBar', 'iconStep', 'callbackCheck', 'submitCallback', 'callbackCheckNavigate'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Step',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                next: props.next && typeof '8' === typeof props.next ? props.next : 'Next',
                previous: props.previous && typeof '8' === typeof props.previous ? props.previous : 'Previous',
                submit: props.submit && typeof '8' === typeof props.submit ? props.submit : 'Submit',
                progressBar: typeof true == typeof props.progressBar && true === props.progressBar ? true : false,
                iconStep: typeof true == typeof props.iconStep && true === props.iconStep ? true : false,
                callbackCheck: typeof true == typeof props.callbackCheck && true === props.callbackCheck ? true : false,
                callbackCheckNavigate: typeof true == typeof props.callbackCheckNavigate && true === props.callbackCheckNavigate ? true : false,
                errorDataInside: typeof true == typeof props.errorDataInside && true === props.errorDataInside ? true : false,
                errorAlignTop: typeof true == typeof props.errorAlignTop && true === props.errorAlignTop ? true : false,
                liveGeneration: typeof true == typeof props.liveGeneration && true === props.liveGeneration ? true : false,
                iconBg: props.iconBg && typeof '8' === typeof props.iconBg ? props.iconBg : 'rgb(71, 180, 118)',
                progressBgBlank: props.progressBgBlank && typeof '8' === typeof props.progressBgBlank ? props.progressBgBlank : 'rgba(71, 180, 118, 0.9)',
                progressBgStripe: props.progressBgStripe && typeof '8' === typeof props.progressBgStripe ? props.progressBgStripe : 'rgb(71, 180, 118)',
                progressBgSize: props.progressBgSize && typeof 8 == typeof props.progressBgSize ? props.progressBgSize : 30,
                buttonsBg: props.buttonsBg && typeof '8' === typeof props.buttonsBg ? props.buttonsBg : 'rgb(71, 180, 118', 
            };
        }

        return null;
    }

    getHeadersJsx() {
        const { data, step, iconStep, iconBg } = this.state;
        const liWidth = (1 == data.length) ? 100 : Math.ceil(100 / data.length - 1);
        const marginXUl = (1 == data.length) ? 0 : Math.ceil((100 - (liWidth * (data.length - 1))) / 2);
        const marginXLi = (1 == data.length) ? 0 : Math.ceil(marginXUl / (data.length - 1));
        let inlineStyle = {
            width: `calc(${liWidth}% + ${marginXLi}px)`
        };

        let iconColor = {
            '--stripes-filled':  iconBg,
        };

        return (
            <ul>
                {data.map((o, index) => {
                    const { icon, text } = o;
                    const cls = `step ${step >= index ? 'step-filled' : ''} ${step === index ? 'step-active' : ''} ${iconStep ? 'cursor-pointer' : ''}`;

                    if(step >= index){
                        inlineStyle = {
                            '--stripes-filled':  iconBg,
                            width: inlineStyle.width
                        }
                    };

                    return (
                        <li
                            key={`step-${index}`}
                            className={cls}
                            style={inlineStyle}
                            {...((iconStep) && { onClick: (e) => this.slide(step, index) })}
                        >
                            <div className={`${step >= index ? 'icon-filled' : 'icon-not-filled'} ${step === index ? 'icon-active' : ''}`}>
                                <span className="icon" style={iconColor}>{icon && icon}</span>
                            </div>
                            <div className={`${step >= index ? 'text-filled' : 'text-not-filled'} ${step === index ? 'text-active' : ''}`}>
                                <span className="text" style={iconColor}>{text && text}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    getCurrentStepJsx() {
        const { data, step, liveGeneration } = this.state;

        /**
         * Current state code generated
         */
        if (data && data.length && undefined !== data[step] && !liveGeneration) {
            return data[step].data;
        }

        return null;
    }

    async checkSubmit() {
        const { callbackCheckNavigate } = this.state;
        const { callback, callbackProps, onError, onErrorProps, submit } = this.state.data[this.state.data.length - 1];

        let allowedToSetStep = true;
        
        if(callback){
            allowedToSetStep = await (callback)(callbackProps);
        }
        
        /**
         * Current check returned false (navigate the user to the wrong page)
         */
        if (typeof false == typeof allowedToSetStep && false == allowedToSetStep && callbackCheckNavigate) {

            if (onError && typeof function(){} == typeof onError) {
                const currentError = await (onError)(onErrorProps).then(r => r).catch(e => '');
                return this.setState({
                    currentError,
                    step: this.state.data.length - 1,
                });
            }
            else {
                return this.setState({
                    step: this.state.data.length - 1,
                    currentError: ''
                });
            }
        }

        if (submit && typeof function(){} == typeof submit) {
            return this.setState({
                currentError: ''
            }, (submit)());
        }
    }

    async checkStep(currentStep, nextStep) {
        const { data, callbackCheckNavigate } = this.state;
        let allowedToSetStep = false;

        let current = currentStep;
        let end = nextStep;

        const check = () => {
            const { callback, callbackProps, onError, onErrorProps } = data[current];

            if (!callback) {

                if (end > current) {
                    current += 1;
                    return check();
                }

                if (end == current) {
                    return this.setState({
                        step: current,
                        currentError: ''
                    });
                }
            }
            else {
                
                // Go to the last step without an check
                if (end == current) {
                    return this.setState({
                        step: nextStep,
                        currentError: ''
                    });
                }

                (async () => {
                    allowedToSetStep = await (callback)(callbackProps);

                    /**
                     * Current check returned false (navigate the user to the wrong page)
                     */
                    if (typeof false == typeof allowedToSetStep && false == allowedToSetStep && callbackCheckNavigate) {

                        if (onError && typeof function(){} == typeof onError) {
                            const currentError = await (onError)(onErrorProps).then(r => r).catch(e => '');
                            return this.setState({
                                currentError,
                                step: current,
                            });
                        }
                        else {
                            return this.setState({
                                step: current,
                                currentError: ''
                            });
                        }
                    }
                    /**
                     * Last step, all previously checks returned true
                     */
                    if (typeof true == typeof allowedToSetStep && true == allowedToSetStep && end == current) {
                        return this.setState({
                            step: nextStep,
                            currentError: ''
                        });
                    }
                    /**
                     * Current check returned true, process further
                     */
                    if (typeof true == typeof allowedToSetStep && true == allowedToSetStep && end > current) {
                        current += 1;
                        return check();
                    }
                })();
            }
        };

        check();
    }

    slide(currentStep, nextStep) {
        const { data, callbackCheck } = this.state;

        if (undefined !== data[currentStep]) {
            const { callback, callbackProps } = data[currentStep];

            /**
             * Ignore check for itself
             */
            if (currentStep == nextStep) {
                return;
            }

            /**
             * Ignore check for passed items
             */
            if (nextStep < currentStep) {
                return this.setState({
                    step: nextStep,
                    currentError: ''
                });
            }

            if (callbackCheck && callback) {
                return this.checkStep(currentStep, nextStep);
            }

            if (callback) {
                (callback)(callbackProps);
            }

            this.setState({
                step: nextStep,
                currentError: ''
            });
        }
    }

    getActionButtonsJsx() {
        const { step, data, next, previous, submit, buttonsBg } = this.state;

        const bgStyle = {
            '--buttons-bg' : buttonsBg
        };

        /**
         * Step: first
         */
        if (0 == step && 1 < data.length) {
            return (
                <div className="flex justify-content-between">
                    <span></span>
                    <button className="btn-next" style={bgStyle} onClick={() => this.slide(step, step + 1)}>
                        {next}
                    </button>
                </div>
            );
        }

        /**
         * Step: first & last
         */
        if (step === data.length - 1 && 1 == data.length) {
            return (
                <div className="flex justify-content-between">
                    <span></span>
                    <button className="btn-submit" style={bgStyle} onClick={() => this.checkSubmit()}>
                        {submit}
                    </button>
                </div>
            );
        }

        /**
         * Step: last
         */
        if (step === data.length - 1) {
            return (
                <div className="flex justify-content-between">
                    <button className="btn-previous" style={bgStyle} onClick={() => this.slide(step, step - 1)}>
                        {previous}
                    </button>
                    <button className="btn-next" style={bgStyle} onClick={() => this.checkSubmit()}>
                        {submit}
                    </button>
                </div>
            );
        }

        /**
         * Step: x
         */
        return (
            <div className="flex justify-content-between">
                <button className="btn-previous" style={bgStyle} onClick={() => this.slide(step, step - 1)}>
                    {previous}
                </button>
                <button className="btn-next" style={bgStyle} onClick={() => this.slide(step, step + 1)}>
                    {next}
                </button>
            </div>
        );
    }

    getProgressBarJsx() {
        let { step, data, progressBgBlank, progressBgStripe, progressBgSize } = this.state;
        step += 1;
        let progress = ((100 / data.length - 1) * step);

        if (data.length === step) {
            progress = 100;
        }
       
        const stripes = {
            width: `${progress}%`,
            backgroundImage: `linear-gradient(
                135deg,
                ${progressBgStripe} 25%,
                ${progressBgBlank} 25%,
                ${progressBgBlank} 50%,
                ${progressBgStripe} 50%,
                ${progressBgStripe} 75%,
                ${progressBgBlank} 75%,
                ${progressBgStripe} 100%
            )`,
            backgroundSize: `${progressBgSize}px ${progressBgSize}px`
        }

        return (
            <div className="progress-bar">
                <span className="bar">
                    <span className="progress stripes animated" style={stripes}></span>
                </span>
            </div>
        );
    }

    render() {
        const { defaultClass, addClass, id, data, progressBar, currentError, errorDataInside, errorAlignTop, liveGeneration } = this.state;

        if (!data.length) {
            return null;
        }

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                <div className="header">{this.getHeadersJsx()}</div>
                {
                    progressBar &&
                    <div className="progress-bar-wrapper">
                        {
                            this.getProgressBarJsx()
                        }
                    </div>
                }
                {
                    !errorDataInside && currentError && errorAlignTop &&
                    <span className="error">
                        {
                            currentError
                        }
                    </span>
                }
                <div className="content">
                    {
                        errorDataInside && currentError && errorAlignTop &&
                        <span className="error">
                            {
                                currentError
                            }
                        </span>
                    }
                    {
                        !liveGeneration && this.getCurrentStepJsx()
                    }
                    {
                        liveGeneration && <LiveGenerationSteps data={this.state.data} step={this.state.step} />
                    }
                    {
                        errorDataInside && currentError && !errorAlignTop &&
                        <span className="error">
                            {
                                currentError
                            }
                        </span>
                    }
                </div>
                {
                    !errorDataInside && currentError && !errorAlignTop &&
                    <span className="error">
                        {
                            currentError
                        }
                    </span>
                }
                <div className="footer">{this.getActionButtonsJsx()}</div>
            </div>
        );
    }
}

export default Step;
