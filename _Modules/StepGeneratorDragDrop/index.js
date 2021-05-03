import React from 'react';
import copyObject from '../../_Functions/copyObject';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import internalUuid from '../internalFunctions/internalUuid';

class StepGeneratorDragDrop extends React.Component 
{
    constructor(props) 
    {
        super(props);
        // Drag & Drop
        this.refNode = React.createRef();
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.cancleDragStatus = this.cancleDragStatus.bind(this);
        this.attachHandleClick = this.attachHandleClick.bind(this);
        this.removeHandleClick = this.removeHandleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.attachHandleMouseMove = this.attachHandleMouseMove.bind(this);
        this.removeHandleClick = this.removeHandleClick.bind(this);
        this.setMouseMove = this.setMouseMove.bind(this);
        this.uniqueAreaId = `${internalUuid()}`;
        this.mouseMove = undefined;
        this.oldY = 0;
        
        this.state = {
            // App
            current: {},
            // Drag & Drop
            dragging: false,
            overLiIndex: undefined,
            sourceIndex: undefined,
            isDropping: false,
            allowedPositions: ['top', 'bottom', 'auto'],
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'StepGeneratorDragDrop',
            id: isString(props.id) ? props.id : '',
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
            placeholder: props.placeholder ? props.placeholder : undefined,
            placeholderPosition: (typeof '8' == typeof props.placeholderPosition) ? props.placeholderPosition : 'auto',
            stepsData: props.stepsData && typeof [] === typeof props.stepsData && props.stepsData.length ? props.stepsData : [],
            newStepData: props.newStepData && typeof function () { } == typeof props.newStepData ? props.newStepData : undefined,
            maxSteps: props.maxSteps && typeof 8 == typeof props.maxSteps ? props.maxSteps : undefined,
            mountCallback: props.mountCallback && typeof function () { } == typeof props.mountCallback ? props.mountCallback : undefined,
            stepRemovedCallback: props.stepRemovedCallback && typeof function () { } == typeof props.stepRemovedCallback ? props.stepRemovedCallback : undefined,
            stepReorderCallback: props.stepReorderCallback && typeof function () { } == typeof props.stepReorderCallback ? props.stepReorderCallback : undefined,
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            dragDrop: props.dragDrop ? props.dragDrop : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'addClass', 'defaultClass', 'stepsData', 'stepReorderCallback', 'data', 'dragDrop', 'newStepData', 'maxSteps', 'mountCallback',  'id', 'placeholder', 'placeholderPosition', 'submit', 'resetOnSubmit', 'submitCallback', 'submitCallbackProps', 'useInput', 'removeStepAlignTop', 'stepPrefix', 'displayStepCount', 'addStep', 'removeStep', 'addNewStepOn', 'callback', 'callbackProps', 'defaultSteps'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'StepGeneratorDragDrop',
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
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
                placeholder: props.placeholder ? props.placeholder : undefined,
                placeholderPosition: (typeof '8' == typeof props.placeholderPosition) ? props.placeholderPosition : 'auto',
                stepsData: props.stepsData && typeof [] === typeof props.stepsData && props.stepsData.length ? props.stepsData : [],
                newStepData: props.newStepData && typeof function () { } == typeof props.newStepData ? props.newStepData : undefined,
                maxSteps: props.maxSteps && typeof 8 == typeof props.maxSteps ? props.maxSteps : undefined,
                stepRemovedCallback: props.stepRemovedCallback && typeof function () { } == typeof props.stepRemovedCallback ? props.stepRemovedCallback : undefined,
                stepReorderCallback: props.stepReorderCallback && typeof function () { } == typeof props.stepReorderCallback ? props.stepReorderCallback : undefined,
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                dragDrop: props.dragDrop ? props.dragDrop : '',
            };
        }

        return null;
    }

    componentDidMount() {

        if(this.state.data && this.state.data.length){
            const { stepsData, mountCallback } = this.state;
            
            const setUniqueUuid = (current) => {
                const uuid = `${internalUuid()}`;

                if(undefined === current[uuid]){
                    current[uuid] = this.getNewData();
                    return uuid;
                }
                
                setUniqueUuid(current);
            }

            const current = {};

            for(let x = 0; x <= this.state.data.length-1; x++){
                let { value } = this.state.data[x];

                if(undefined !== value){
                    const unique = setUniqueUuid(current);

                    if (stepsData && undefined !== stepsData[x]) {
                        stepsData[x].uuid = unique;
                    }
    
                    current[unique].value = value;
                    current[unique] = { ...this.state.data[x], ...current[unique] };
                }
            }

            // Return uuids for the developer
            if (stepsData && mountCallback) {
                (mountCallback)(stepsData, 'mount');
            }

            if (stepsData) {
                this.setState({ current, stepsData });
            }
            else{
                this.setState({ current });
            }
        }
        else{
            this.generateDefaultSteps();
        }

        this.attachHandleClick();

        const { placeholderPosition } = this.state;

        if ('auto' == placeholderPosition) {
            this.attachHandleMouseMove();
        }
    }

    attachHandleClick() {
        this.removeHandleClick();
        document.addEventListener('click', this.handleClick);
    }

    removeHandleClick() {
        document.removeEventListener('click', this.handleClick);
    }

    attachHandleMouseMove() {
        this.removeHandleMouseMove();
        document.addEventListener('mousemove', this.setMouseMove);
    }

    removeHandleMouseMove() {
        document.removeEventListener('mousemove', this.setMouseMove);
    }

    setMouseMove(event) {

        if (event.pageY < this.oldY) {
            this.mouseMove = 'top';
        }
        
        if (event.pageY > this.oldY) {
            this.mouseMove = 'bottom';
        }

        this.oldY = event.pageY;
    }

    cancleDragStatus() {
        this.setState({
            dragging: false,
            overLiIndex: undefined,
            sourceIndex: undefined,
            isDropping: false
        });
    }

    onDragOver(e, index) {
        e.preventDefault();
        e.stopPropagation();

        const { overLiIndex } = this.state;

        if (overLiIndex !== index) {
            this.setState({
                overLiIndex: index,
            });
        }
    }

    onDragEnter(e, index) {
        e.preventDefault();
        e.stopPropagation();

        const { overLiIndex } = this.state;

        if (overLiIndex !== index) {
            this.setState({
                dragging: true,
                overLiIndex: index,
            });
        }
    }

    onDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    onDragStart(e, index, unique) {
        e.dataTransfer.setData('text/plain', unique);

        this.setState({
            sourceIndex: index
        });
    }

    handleClick(event) {
        if (this.refNode && this.refNode.current && !this.refNode.current.contains(event.target)) {
            this.cancleDragStatus();
        }
    }

    rebuildData(unique){
        const { current, placeholderPosition, overLiIndex, stepReorderCallback} = this.state;
        let { stepsData } = this.state;
        const temp = [];
        const newData = {};
        const currentKeys = Object.keys(current);
        let saveData = undefined;

        for (let x = 0; x <= currentKeys.length - 1; x++) {
            if(currentKeys[x] === unique){
                saveData = current[currentKeys[x]];
            }
        }

        for (let x = 0; x <= currentKeys.length - 1; x++) {

            if ((x == overLiIndex && 'top' == placeholderPosition) || ('auto' == placeholderPosition && x == overLiIndex && 'top' == this.mouseMove)) {
                temp.push(
                    {
                        key: unique,
                        data: saveData
                    }
                );
            }

            if (currentKeys[x] !== unique) {
                temp.push(
                    {
                        key: currentKeys[x],
                        data: current[currentKeys[x]]
                    }
                );
            }

            if ((x == overLiIndex && 'bottom' == placeholderPosition) || ('auto' == placeholderPosition && x == overLiIndex && 'bottom' == this.mouseMove)) {
                temp.push(
                    {
                        key: unique,
                        data: saveData
                    }
                );
            }
        }

        for(let x = 0; x <= temp.length-1; x++){
            newData[temp[x].key] = temp[x].data;
        }

        if(stepsData && stepsData.length){
            let n = [];
            const k = Object.keys(newData);

            for(let x = 0; x <= k.length-1; x++){

                for(let i = 0; i <= stepsData.length-1; i++){

                    if(stepsData[i].uuid === k[x]){
                        n.push(stepsData[i]);
                    }
                }
            }

            stepsData = n;

            if(stepReorderCallback){
                (stepReorderCallback)(stepsData);
            }
        }
        
        this.setState({
            stepsData,
            current: newData,
            dragging: false,
            sourceIndex: undefined,
            overLiIndex: undefined,
            isDropping: false
        }, this.callback);
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.persist();

        if (e.dataTransfer.getData('text')) {
            return this.rebuildData(e.dataTransfer.getData('text'));
        }

        this.cancleDragStatus();
    }
    
    getNewData() {
        return {
            ref: React.createRef(),
            value: '',
        };
    }

    generateDefaultSteps(reset = false) {
        let { current, defaultSteps, stepsData, mountCallback } = this.state;

        if(reset){
            current = {};
        }

        for (let x = 0; x <= defaultSteps - 1; x++) {
            const i = `${internalUuid()}`;

            if (undefined === current[i]) {
                const unique = `${internalUuid()}`
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

        const i = `${internalUuid()}`;

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

    getUserCallbackData(){
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
            const userCallbackData= this.getUserCallbackData();
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
        const { current, removeStep, dragDrop, stepPrefix, placeholder, overLiIndex, sourceIndex, dragging, displayStepCount, removeStepAlignTop, defaultSteps, useInput, onEnter, onEsc, stepsData } = this.state;
        const jsx = [];
        const currentKeys = Object.keys(current);

        let { placeholderPosition } = this.state;

        if (!this.state.allowedPositions.includes(placeholderPosition)) {
            placeholderPosition = 'auto';
        }

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

            let placeholderJsx = undefined;
            let attachMixedTop = false;
            let attachMixedBottom = false;

            if ('top' == this.mouseMove && 'auto' == placeholderPosition && overLiIndex == x && sourceIndex !== x) {
                attachMixedTop = true;
                placeholderPosition = 'top';
            }

            if ('bottom' == this.mouseMove && 'auto' == placeholderPosition && overLiIndex == x && sourceIndex !== x) {
                attachMixedTop = true;
                placeholderPosition = 'bottom';
            }

            if ((undefined !== overLiIndex && overLiIndex == x && dragging && sourceIndex !== x) || (attachMixedTop || attachMixedBottom)) {
                placeholderJsx = (
                    <li
                        key={internalUuid()}
                        className='single-step placeholder'
                        {...(1 !== currentKeys.length) && {onDragStart: (e) => this.onDragStart(e, x, currentKeys[x])}}
                        {...(1 !== currentKeys.length) && {onDragOver: (e) => this.onDragOver(e, x)}}
                        {...(1 !== currentKeys.length) && {onDragEnter: (e) => this.onDragEnter(e, x)}}
                        {...(1 !== currentKeys.length) && {onDragLeave: (e) => this.onDragLeave(e)}}
                        {...(1 !== currentKeys.length) && {draggable: 'false'}}
                    >
                        {
                            placeholder
                        }
                    </li>
                );
            }

            if ('top' == placeholderPosition && placeholderJsx) {
                jsx.push(placeholderJsx);
            }

            let userCustomData = '';
            let prefix = false;
            let suffix = false;

            if (stepsData) {
                let currentStepsData = stepsData.filter( o => o.uuid === currentKeys[x]);
                    
                if(0 !== currentStepsData.length){
                    currentStepsData = currentStepsData[0];

                    try {
                        const { data, top, bottom } = currentStepsData;
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

            jsx.push(
                <li
                    key={currentKeys[x]}
                    className={`single-step single-step-li ${dragDrop ? 'drag-drop-handler-li' : ''}`}
                    {...(1 !== currentKeys.length && !dragDrop) && {onDragStart: (e) => this.onDragStart(e, x, currentKeys[x])}}
                    {...(1 !== currentKeys.length && !dragDrop) && {onDragOver: (e) => this.onDragOver(e, x)}}
                    {...(1 !== currentKeys.length && !dragDrop) && {onDragEnter: (e) => this.onDragEnter(e, x)}}
                    {...(1 !== currentKeys.length && !dragDrop) && {onDragLeave: (e) => this.onDragLeave(e)}}
                    {...(1 !== currentKeys.length && !dragDrop) && {draggable: 'true'}}
                >
                    {
                        dragDrop && 
                        <span 
                            className='drag-drop-handler'
                            {...(1 !== currentKeys.length) && {onDragStart: (e) => this.onDragStart(e, x, currentKeys[x])}}
                            {...(1 !== currentKeys.length) && {onDragOver: (e) => this.onDragOver(e, x)}}
                            {...(1 !== currentKeys.length) && {onDragEnter: (e) => this.onDragEnter(e, x)}}
                            {...(1 !== currentKeys.length) && {onDragLeave: (e) => this.onDragLeave(e)}}
                            {...(1 !== currentKeys.length) && {draggable: 'true'}}
                        >
                            {
                                dragDrop
                            }
                        </span>
                    }
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
                </li>
            );

            if ('bottom' == placeholderPosition && placeholderJsx) {
                jsx.push(placeholderJsx);
            }
        }

        return jsx;
    }

    submitSteps(){
        const { submitCallback, submitCallbackProps, resetOnSubmit } = this.state;

        if(submitCallback){
            const userCallbackData= this.getUserCallbackData();
            (submitCallback)(submitCallbackProps, userCallbackData);

            if(resetOnSubmit){
                this.generateDefaultSteps(true);
            }
        }
    }

    render() {
        const { defaultClass, addClass, id, addStep, submit, current, maxSteps } = this.state;
        let dispalyAddStep = false;
        
        if(addStep){
            dispalyAddStep = true;
        }

        if(addStep && maxSteps && current && Object.keys(current).length >= maxSteps){
            dispalyAddStep = false;
        }

        return (
            <div 
                ref={this.refNode}
                className={`${defaultClass} ${addClass}`} 
                {...isString(id) && '' !== id && { id: id } }
                onDrop={(e) => this.handleDrop(e)}
            >
                <ul className='steps steps-ul handle-drop' >
                {
                    this.getCurrentData()
                }
                </ul>
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

export default StepGeneratorDragDrop;
