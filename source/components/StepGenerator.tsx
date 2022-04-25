import React from 'react';

import copyObject from '../functions/copyObject';
import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import uuid from '../functions/uuid';

class StepGenerator extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) 
    {
        super(props);

        this.state = {
            // app
            current: {},
            // user data
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'StepGenerator',
            
            callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            defaultSteps: props.defaultSteps && typeof 8 == typeof props.defaultSteps ? props.defaultSteps : 3,
            addNewStepOn: props.addNewStepOn && typeof 8 == typeof props.addNewStepOn ? props.addNewStepOn : 0,
            addStep: props.addStep ? props.addStep : '',
            removeStep: props.removeStep ? props.removeStep : '',
            stepPrefix: props.stepPrefix ? props.stepPrefix : 'Step',
            displayStepCount: (typeof true == typeof props.displayStepCount) ? props.displayStepCount : false,
            useInput: (typeof true == typeof props.useInput) ? props.useInput : false,
            onEnter: props.onEnter && typeof function () { } == typeof props.onEnter ? props.onEnter : undefined,
            onEnterProps: props.onEnterProps ? props.onEnterProps : undefined,
            onEsc: props.onEsc && typeof function () { } == typeof props.onEsc ? props.onEsc : undefined,
            onEscProps: props.onEscProps ? props.onEscProps : undefined,
            removeStepAlignTop: (typeof true == typeof props.removeStepAlignTop) ? props.removeStepAlignTop : true,
            submit: props.submit ? props.submit : '',
            submitCallback: props.submitCallback && typeof function () { } == typeof props.submitCallback ? props.submitCallback : undefined,
            submitCallbackProps: props.submitCallbackProps ? props.submitCallbackProps : undefined,
            resetOnSubmit: (typeof true == typeof props.resetOnSubmit) ? props.resetOnSubmit : false,
            stepsData: props.stepsData && typeof [] === typeof props.stepsData && props.stepsData.length ? props.stepsData : [],
            newStepData: props.newStepData && typeof function () { } == typeof props.newStepData ? props.newStepData : undefined,
            maxSteps: props.maxSteps && typeof 8 == typeof props.maxSteps ? props.maxSteps : undefined,
            mountCallback: props.mountCallback && typeof function () { } == typeof props.mountCallback ? props.mountCallback : undefined,
            stepRemovedCallback: props.stepRemovedCallback && typeof function () { } == typeof props.stepRemovedCallback ? props.stepRemovedCallback : undefined,
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'maxSteps', 'data', 'stepRemovedCallback',  'id', 'submit', 'resetOnSubmit', 'submitCallback', 'submitCallbackProps', 'useInput', 'removeStepAlignTop', 'stepPrefix', 'displayStepCount', 'addStep', 'removeStep', 'addNewStepOn', 'callback', 'callbackProps', 'defaultSteps', 'stepsData', 'newStepData'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'StepGenerator',
                
                
                callback: props.callback && typeof function () { } == typeof props.callback ? props.callback : undefined,
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                defaultSteps: props.defaultSteps && typeof 8 == typeof props.defaultSteps ? props.defaultSteps : 3,
                addNewStepOn: props.addNewStepOn && typeof 8 == typeof props.addNewStepOn ? props.addNewStepOn : 0,
                addStep: props.addStep ? props.addStep : '',
                removeStep: props.removeStep ? props.removeStep : '',
                stepPrefix: props.stepPrefix ? props.stepPrefix : 'Step',
                displayStepCount: (typeof true == typeof props.displayStepCount) ? props.displayStepCount : false,
                useInput: (typeof true == typeof props.useInput) ? props.useInput : false,
                removeStepAlignTop: (typeof true == typeof props.removeStepAlignTop) ? props.removeStepAlignTop : true,
                submit: props.submit ? props.submit : '',
                submitCallback: props.submitCallback && typeof function () { } == typeof props.submitCallback ? props.submitCallback : undefined,
                submitCallbackProps: props.submitCallbackProps ? props.submitCallbackProps : undefined,
                resetOnSubmit: (typeof true == typeof props.resetOnSubmit) ? props.resetOnSubmit : false,
                stepsData: props.stepsData && typeof [] === typeof props.stepsData && props.stepsData.length ? props.stepsData : [],
                newStepData: props.newStepData && typeof function () { } == typeof props.newStepData ? props.newStepData : undefined,
                maxSteps: props.maxSteps && typeof 8 == typeof props.maxSteps ? props.maxSteps : undefined,
                stepRemovedCallback: props.stepRemovedCallback && typeof function () { } == typeof props.stepRemovedCallback ? props.stepRemovedCallback : undefined,
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            };
        }

        return null;
    }

    componentDidMount(): void {


        if(this.state.data && this.state.data.length){
            const { stepsData, mountCallback } = this.state;

            const setUniqueUuid = (current) => {
                const uid = uuid();

                if(undefined === current[uid]){
                    current[uid] = this.getNewData();

                    return uid;
                }
                
                setUniqueUuid(current);
            }

            const current = {};

            for(let x = 0; x <= this.state.data.length-1; x++){
                let { value } = this.state.data[x];
                const unique = setUniqueUuid(current);

                if(undefined === value){
                    value = '';
                }

                if (stepsData && undefined !== stepsData[x]) {
                    stepsData[x].uuid = unique;
                }

                current[unique].value = value;
                current[unique] = { ...this.state.data[x], ...current[unique] };
            }

            // Return uuids for the developer
            if (stepsData && mountCallback) {
                (mountCallback)(stepsData, 'mount');
            }

            if (stepsData) {
                return this.setState({ current, stepsData });
            }

            return this.setState({ current, stepsData });

        }
        else{
            this.generateDefaultSteps();
        }
    }

    getNewData() {
        return {
            ref: React.createRef(),
            value: '',
        };
    }

    generateDefaultSteps(reset = false) {
        let { current, defaultSteps, stepsData, mountCallback } = this.state;

        if (reset) {
            current = {};
        }

        for (let x = 0; x <= defaultSteps - 1; x++) {
            const i = uuid();

            if (undefined === current[i]) {
                const unique = uuid();
                current[unique] = this.getNewData();

                if (stepsData && undefined !== stepsData[x]) {
                    stepsData[x].uuid = unique;
                }
            }
        }

        // Return uuids for the developer
        if (stepsData && mountCallback && reset) {
            (mountCallback)(stepsData, 'mount');
        }

        if (stepsData) {
            return this.setState({ current, stepsData });
        }

        this.setState({ current });
    }

    addStep(ref = null) {
        const { current, maxSteps } = this.state;

        if (maxSteps && Object.keys(current).length >= maxSteps) {
            return;
        }

        const i = uuid();

        if (undefined !== current[i]) {
            return this.addStep(ref);
        }

        const { newStepData } = this.state;
        current[i] = this.getNewData();

        if (!newStepData) {
            return this.setState({
                current
            }, () => {
                if (ref && ref.current) {
                    ref.current.focus();
                }
            });
        }

        return this.setState({
            current
        }, () => {
            (newStepData)(i);
        });
    }

    removeStep(unique) {
        const { current, stepsData, stepRemovedCallback } = this.state;
        const newObject = {};
        const newUserData = [];
        const currentKeys = Object.keys(current);

        for (let x = 0; x <= currentKeys.length - 1; x++) {
            if (currentKeys[x] !== unique) {
                newObject[currentKeys[x]] = current[currentKeys[x]];
            }
        }

        for (let x = 0; x <= stepsData.length - 1; x++) {
            if (stepsData[x].uuid !== unique) {
                newUserData.push(stepsData[x]);
            }
        }

        if(stepRemovedCallback){
            (stepRemovedCallback)(newUserData, 'remove');
        }

        this.setState({
            current: newObject,
            stepsData: newUserData
        }, () => {
            this.callback();
        });
    }

    getUserCallbackData() {
        const { current, stepsData } = this.state;
        const userCallbackData = [];
        const currentKeys = Object.keys(current);

        for (let x = 0; x <= currentKeys.length - 1; x++) {
            const { value } = current[currentKeys[x]];

            if(value){
                let userProps = {};

                if(stepsData){
                    let currentStepsData = stepsData.filter( o => o.uuid === currentKeys[x]);
                        
                    if(0 !== currentStepsData.length && typeof {} === typeof currentStepsData[0]){
                        userProps = currentStepsData[0];
                    }
                }
    
                const publicData = copyObject(current[currentKeys[x]], ['ref']);
    
                userCallbackData.push(
                    {
                        ...userProps,
                        ...publicData,
                        value,
                        uuid: currentKeys[x],
                    }
                );
            }
        }

        return userCallbackData;
    }

    callback() {
        const { callback, callbackProps } = this.state;

        if (callback) {
            const userCallbackData = this.getUserCallbackData();
            (callback)(callbackProps, userCallbackData);
        }
    }

    handleChange(e, uuid, ref, x) {
        const { current } = this.state;
        current[uuid].value = e.target.value;

        this.setState({
            current
        }, () => {

            if (ref && ref.current) {
                ref.current.focus();
            }

            if (this.state.current[uuid].value) {
                this.handleFocus(x, ref);
            }

            this.callback();
        });
    }

    handleFocus(x, ref) {
        const { current, addNewStepOn } = this.state;
        const currentKeys = Object.keys(current);

        if (0 !== addNewStepOn && x >= currentKeys.length - addNewStepOn) {
            this.addStep(ref);
        }
    }

    handleKeyDown(event) {
        const { onEsc, onEscProps, onEnter, onEnterProps } = this.state;

        if (onEsc && (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 || event.which === 27)) {
            return (onEsc)(onEscProps);
        }

        if (onEnter && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
            return (onEnter)(onEnterProps);
        }
    }

    getCurrentData() {
        const { current, removeStep, stepPrefix, displayStepCount, removeStepAlignTop, defaultSteps, useInput, onEnter, onEsc, stepsData } = this.state;
        const jsx = [];
        const currentKeys = Object.keys(current);

        for (let x = 0; x <= currentKeys.length - 1; x++) {
            const { ref, value } = current[currentKeys[x]];

            const removeJsx = (
                <span
                    className='action action-remove'
                    onClick={() => this.removeStep(currentKeys[x])}
                >
                    {
                        removeStep
                    }
                </span>
            );

            let userCustomData = '';
            let prefix = false;
            let suffix = false;

            if (stepsData) {
                for (let i = 0; i <= stepsData.length - 1; i++) {
                    if (stepsData[i].uuid === currentKeys[x] && typeof {} === typeof stepsData[i]) {
                        try {
                            const { data, top, bottom } = stepsData[x];
                            userCustomData = data;

                            if (typeof true == typeof top && top) {
                                prefix = true;
                            }

                            if (typeof true == typeof bottom && bottom && !prefix) {
                                suffix = true;
                            }
                        }
                        catch (e) {
                            userCustomData = '';
                        }
                    }
                }
            }

            jsx.push(
                <div
                    key={currentKeys[x]}
                    className='single-step'
                >
                    {
                        stepPrefix &&
                        <div className='step-prefix'>
                            {
                                <span className='prefix'>
                                    {
                                        stepPrefix
                                    }
                                </span>
                            }
                            {
                                displayStepCount &&
                                <span className='step-count'>
                                    {
                                        x + 1
                                    }
                                </span>
                            }
                            {
                                removeStepAlignTop && x >= defaultSteps && removeStep && removeJsx
                            }
                        </div>
                    }
                    {
                        !stepPrefix && removeStepAlignTop && x >= defaultSteps && removeStep && removeJsx
                    }
                    {
                        userCustomData && prefix &&
                        <span className='data-prefix'>
                            {
                                userCustomData
                            }
                        </span>
                    }
                    <span className='input-area'>
                        {
                            useInput &&
                            <input
                                type='text'
                                ref={ref}
                                value={value}
                                onChange={(e) => this.handleChange(e, currentKeys[x], ref, x)}
                                {...(onEnter || onEsc) && { onKeyDown: (e) => this.handleKeyDown(e) }}
                            />
                        }
                        {
                            !useInput &&
                            <textarea
                                ref={ref}
                                value={value}
                                onChange={(e) => this.handleChange(e, currentKeys[x], ref, x)}
                                {...(onEnter || onEsc) && { onKeyDown: (e) => this.handleKeyDown(e) }}
                            />
                        }
                    </span>
                    {
                        userCustomData && suffix &&
                        <span className='data-suffix'>
                            {
                                userCustomData
                            }
                        </span>
                    }
                    {
                        !removeStepAlignTop && x >= defaultSteps && removeStep && removeJsx
                    }
                </div>
            );
        }

        return jsx;
    }

    submitSteps() {
        const { submitCallback, submitCallbackProps, resetOnSubmit } = this.state;

        if (submitCallback) {
            const userCallbackData = this.getUserCallbackData();
            (submitCallback)(submitCallbackProps, userCallbackData);

            if (resetOnSubmit) {
                this.generateDefaultSteps(true);
            }
        }
    }

    render() {
        const { defaultClass, addClass, id, addStep, submit, maxSteps, current } = this.state;
        let dispalyAddStep = false;
        
        if(addStep){
            dispalyAddStep = true;
        }

        if(addStep && maxSteps && current && Object.keys(current).length >= maxSteps){
            dispalyAddStep = false;
        }

        return (
            <div className='' >
                {
                    this.getCurrentData()
                }
                {
                    addStep && dispalyAddStep &&
                    <span
                        className='action action-add'
                        onClick={() => this.addStep()}
                    >
                        {
                            addStep
                        }
                    </span>
                }
                {
                    submit &&
                    <span
                        className='action action-submit'
                        onClick={() => this.submitSteps()}
                    >
                        {
                            submit
                        }
                    </span>
                }
            </div>
        );
    }
}

export default StepGenerator;
