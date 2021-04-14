import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import copyArray from '../internalFunctions/copyArray';
import internalUuid from '../internalFunctions/internalUuid';

class DragDropList extends React.Component {

    constructor(props) {
        super(props);
        this.refNode = React.createRef();
        this.buildDragDropItems = this.buildDragDropItems.bind(this);
        this.rebuildData = this.rebuildData.bind(this);
        /**
         * Drag Drop
         */
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
            /**
             * App
             */
            dragging: false,
            singleDraggingEntry: undefined,
            overLiIndex: undefined,
            sourceIndex: undefined,
            isDropping: false,
            allowedPositions: ['top', 'bottom', 'auto'],
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-drag-drop-list',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: (props.data && typeof [] == typeof props.data) ? props.data : [],
            mediaBreak: props.mediaBreak && typeof 8 == typeof props.mediaBreak ? props.mediaBreak : undefined,
            callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
            callbackProps: props.callbackProps ? props.callbackProps : undefined,
            callbackAllowDrop: (props.callbackAllowDrop && typeof function(){} == typeof props.callbackAllowDrop) ? props.callbackAllowDrop : undefined,
            callbackAllowDropProps: props.callbackAllowDropProps ? props.callbackAllowDropProps : undefined,
            placeholder: props.placeholder ? props.placeholder : undefined,
            areaProps: (props.areaProps && typeof {} == typeof props.areaProps) ? props.areaProps : {},
            dropLoading: props.dropLoading ? props.dropLoading : undefined,
            placeholderPosition: (typeof '8' == typeof props.placeholderPosition) ? props.placeholderPosition : 'auto',
            lineNumber: (typeof true == typeof props.lineNumber) ? props.lineNumber : false,
            lineNumberChar: (typeof '8' == typeof props.lineNumberChar) ? props.lineNumberChar : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'data', 'placeholder', 'areaProps', 'callbackAllowDrop', 'callbackAllowDropProps', 'dropLoading', 'placeholderPosition', 'lineNumber', 'lineNumberChar'], props, state)) {

            if (props.callback && 'function' == props.callback && props.data !== state.data) {
                return {
                    data: props.data
                };
            }

            if (props.callback && 'function' !== props.callback && props.data !== state.data) {
                return {
                    data: state.data
                };
            }

            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-drag-drop-list',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: (props.data && typeof [] == typeof props.data) ? props.data : [],
                callback: (props.callback && typeof function(){} == typeof props.callback) ? props.callback : undefined,
                callbackProps: props.callbackProps ? props.callbackProps : undefined,
                placeholder: props.placeholder ? props.placeholder : undefined,
                areaProps: (props.areaProps && typeof {} == typeof props.areaProps) ? props.areaProps : {},
                callbackAllowDrop: (props.callbackAllowDrop && typeof function(){} == typeof props.callbackAllowDrop) ? props.callbackAllowDrop : undefined,
                callbackAllowDropProps: props.callbackAllowDropProps ? props.callbackAllowDropProps : undefined,
                dropLoading: props.dropLoading ? props.dropLoading : undefined,
                placeholderPosition: (typeof '8' == typeof props.placeholderPosition) ? props.placeholderPosition : 'auto',
                lineNumber: (typeof true == typeof props.lineNumber) ? props.lineNumber : false,
                lineNumberChar: (typeof '8' == typeof props.lineNumberChar) ? props.lineNumberChar : '',
            };
        }

        return null;
    }

    componentDidMount() {
        this.attachHandleClick();

        const { placeholderPosition } = this.state;

        if ('auto' == placeholderPosition) {
            this.attachHandleMouseMove();
        }
    }

    componentWillUnmount() {
        this.removeHandleClick();
        this.removeHandleMouseMove();
    }

    attachHandleClick() {
        this.removeHandleClick();
        document.addEventListener('click', this.handleClick);
    }

    removeHandleClick() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        if (this.refNode && this.refNode.current && !this.refNode.current.contains(event.target)) {
            this.cancleDragStatus();
        }
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
        else if (event.pageY > this.oldY) {
            this.mouseMove = 'bottom';
        }

        this.oldY = event.pageY;
    }

    checkObjectProps(object) {
        let props = {};

        try {
            Object.keys(object);
            props = object;
        }
        catch (e) {
            props = {};
        }

        return props;
    }

    cancleDragStatus() {
        this.setState({
            dragging: false,
            singleDraggingEntry: undefined,
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

    onDragStart(e, index, unique, singleDraggingEntry) {
        e.dataTransfer.setData('text/plain', unique);

        this.setState({
            singleDraggingEntry,
            sourceIndex: index
        });
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.persist();

        if (e.dataTransfer.getData('text')) {
            const { callbackAllowDrop } = this.state;

            if (callbackAllowDrop) {

                this.setState({
                    isDropping: true
                }, async () => {
                    const uniqueKey = e.dataTransfer.getData('text');
                    const allow = await this.callbackAllowDrop(uniqueKey);

                    if (allow) {
                        this.rebuildData(uniqueKey);
                    }
                    else {
                        this.cancleDragStatus();
                    }
                })
            }
            else {
                this.rebuildData(e.dataTransfer.getData('text'));
            }
        }
        else {
            this.cancleDragStatus();
        }
    }

    buildDragDropItems() {
        const { data, dragging, overLiIndex, placeholder, sourceIndex, isDropping, dropLoading, lineNumber, lineNumberChar } = this.state;
        let { areaProps, placeholderPosition } = this.state;
        areaProps = (areaProps && typeof {} == typeof areaProps) ? areaProps : {};

        if (!this.state.allowedPositions.includes(placeholderPosition)) {
            placeholderPosition = 'auto';
        }

        const childs = [];

        if (data && data.length) {

            for (let x = 0; x <= data.length - 1; x++) {
                const unique = `${this.uniqueAreaId}-drag-drop-entry-${x}`;
                const singleEntry = data[x];
                const props = (singleEntry.props && typeof {} == typeof singleEntry.props) ? singleEntry.props : {};
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
                            className='single-entry placeholder'
                            onDragStart={(e) => this.onDragStart(e, x, unique, singleEntry)}
                            onDragOver={(e) => this.onDragOver(e, x)}
                            onDragEnter={(e) => this.onDragEnter(e, x)}
                            onDragLeave={(e) => this.onDragLeave(e)}
                            draggable='false'
                        >
                            {
                                placeholder
                            }
                        </li>
                    );
                }

                if ('top' == placeholderPosition && placeholderJsx) {
                    childs.push(placeholderJsx);
                }

                childs.push(
                    <li
                        key={unique}
                        className={`single-entry`}
                        onDragStart={(e) => this.onDragStart(e, x, unique, singleEntry)}
                        onDragOver={(e) => this.onDragOver(e, x)}
                        onDragEnter={(e) => this.onDragEnter(e, x)}
                        onDragLeave={(e) => this.onDragLeave(e)}
                        draggable='true'
                        {...props}
                    >
                        {
                            lineNumber &&
                            <span className='line-number'>
                                {
                                    (x+1)
                                }
                                {
                                    lineNumberChar && `${lineNumberChar} `
                                }
                            </span>
                        }
                        {
                            singleEntry.text && 
                            <span className='line-data'>
                                {
                                    singleEntry.text
                                }
                            </span>
                        }
                    </li>
                );

                if ('bottom' == placeholderPosition && placeholderJsx) {
                    childs.push(placeholderJsx);
                }
            }
        }

        return (
            <ul
                className='box'
                {...areaProps}
                onDrop={(e) => this.handleDrop(e)}
            >
                {
                    childs
                }
                {
                    isDropping && dropLoading &&
                    <div className="drop-loading">
                        {
                            dropLoading
                        }
                    </div>
                }
            </ul>
        );
    }

    rebuildData(uniqueKey) {
        const lastMove = this.mouseMove;
        const { data, overLiIndex, sourceIndex, callback, callbackProps, singleDraggingEntry } = this.state;
        let { placeholderPosition } = this.state;

        if (!this.state.allowedPositions.includes(placeholderPosition)) {
            placeholderPosition = 'auto';
        }

        if (data && data.length) {
            const newData = [];
            let oldData = [];
            oldData = copyArray(JSON.parse(JSON.stringify(data)), oldData);

            const details = {
                sourceIndex,
                targetIndex: overLiIndex,
                item: singleDraggingEntry
            };

            /**
             * New sort
             */
            for (let x = 0; x <= data.length - 1; x++) {
                const unique = `${this.uniqueAreaId}-drag-drop-entry-${x}`;

                if ((x == overLiIndex && 'top' == placeholderPosition) || ('auto' == placeholderPosition && x == overLiIndex && 'top' == lastMove)) {
                    newData.push(singleDraggingEntry);
                }

                if (unique !== uniqueKey) {
                    newData.push(data[x]);
                }

                if ((x == overLiIndex && 'bottom' == placeholderPosition) || ('auto' == placeholderPosition && x == overLiIndex && 'bottom' == lastMove)) {
                    newData.push(singleDraggingEntry);
                }
            }

            this.setState({
                data: newData,
                singleDraggingEntry: '',
                dragging: false,
                sourceIndex: undefined,
                overLiIndex: undefined,
                isDropping: false
            }, () => {
                if (callback) {
                    (callback)(oldData, this.state.data, details, callbackProps);
                }
            });
        }
        else {
            this.cancleDragStatus();
        }
    }

    callbackAllowDrop(uniqueKey) {
        return new Promise(async (resolve) => {

            try {
                const { data, overLiIndex, sourceIndex, singleDraggingEntry, callbackAllowDrop, callbackAllowDropProps } = this.state;

                if (data && data.length) {
                    const newData = [];
                    let oldData = [];
                    oldData = copyArray(JSON.parse(JSON.stringify(data)), oldData);

                    const details = {
                        sourceIndex,
                        targetIndex: overLiIndex,
                        item: singleDraggingEntry
                    };

                    /**
                     * New sort
                     */
                    for (let x = 0; x <= data.length - 1; x++) {
                        const unique = `${this.uniqueAreaId}-drag-drop-entry-${x}`;

                        if (x == overLiIndex) {
                            newData.push(singleDraggingEntry);
                            details.sourceIndex = x;
                        }

                        if (unique !== uniqueKey) {
                            newData.push(data[x]);
                        }
                    }

                    const response = await (callbackAllowDrop)(oldData, newData, details, callbackAllowDropProps).then(a => a).catch(e => false);

                    if (typeof true == typeof response) {
                        resolve(response);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            }
            catch (e) {
                resolve(false);
            }
        });
    }

    render() {
        const { addClass, defaultClass, id } = this.state;

        return (
            <div
                className={`${defaultClass} ${addClass}`}
                id={id}
                ref={this.refNode}
            >
                {
                    this.buildDragDropItems()
                }
            </div>
        );
    }
};

export default DragDropList;