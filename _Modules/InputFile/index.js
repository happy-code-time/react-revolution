import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';

class InputFile extends React.Component 
{
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSingleFile = this.handleSingleFile.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
        this.calculatedFileSize = this.calculatedFileSize.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            /**
             * App
             */
            file: {},
            fileName: '',
            fileSize: 0,
            calculatedFileSize: 0,
            fileType: '',
            hiddenInputStyle: {
                display: 'none',
                opacity: 0,
                width: 0,
                height: 0,
                overflow: 'hidden'
            },
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'InputFile',
            id: isString(props.id) ? props.id : '',
            allowedFileSize: props.allowedFileSize,
            allowedFileSizeDescriptor: props.sizeDescriptor,
            allowedFiles: props.allowedFiles,
            label: (props.label && typeof '8' == typeof props.label) ? props.label : '',
            readFileCallback: (props.readFileCallback && typeof function(){} == typeof props.readFileCallback) ? props.readFileCallback : undefined,
            errorCallback: (props.errorCallback && typeof function(){} == typeof props.errorCallback) ? props.errorCallback : undefined,
            inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
            errorCallbackCustomData: props.errorCallbackCustomData ? props.errorCallbackCustomData : undefined,
            multiple: (typeof true == typeof props.multiple) ? props.multiple : false,
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass',  'id', 'label', 'errorCallback', 'readFileCallback', 'inputPlaceholder', 'errorCallbackCustomData', 'multiple'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                label: (props.label && typeof '8' == typeof props.label) ? props.label : '',
                readFileCallback: (props.readFileCallback && typeof function(){} == typeof props.readFileCallback) ? props.readFileCallback : undefined,
                errorCallback: (props.errorCallback && typeof function(){} == typeof props.errorCallback) ? props.errorCallback : undefined,
                inputPlaceholder: (props.inputPlaceholder && typeof '8' == typeof props.inputPlaceholder) ? props.inputPlaceholder : '',
                errorCallbackCustomData: props.errorCallbackCustomData ? props.errorCallbackCustomData : undefined,
                multiple: (typeof true == typeof props.multiple) ? props.multiple : false
            };
        }

        return null;
    }

    /**
     * Handle file upload
     */
    handleFileUpload(e) {
        e.preventDefault();
        const files = e.target.files;
        this.handleSingleFile(files);
    }

    handleSingleFile(files) {
        const { readFileCallback, errorCallbackCustomData } = this.state;

        if (files) {

            for (let x = 0; x <= files.length - 1; x++) {
                const file = files[x];

                try {
                    const { type } = file;

                    if (this.validateObjectValues(file) && readFileCallback) {
                        (readFileCallback)(file, type);
                    }
                }
                catch (error) {
                    this.errorCallback(error, errorCallbackCustomData);
                }
            }
        }
    }

    validateObjectValues(object) {
        const { name, size, type } = object;
        const calculatedFileSize = this.calculatedFileSize(size);

        const { allowedFileSize, allowedFiles, errorCallbackCustomData } = this.state;
        let isFileValid = true;

        if (!name) {
            this.errorCallback('empty_filename', errorCallbackCustomData);
            isFileValid = false;
        }
        if (!size) {
            this.errorCallback('empty_filecontent', errorCallbackCustomData);
            isFileValid = false;
        }
        if (!type) {
            this.errorCallback('unrecognized_filetype', errorCallbackCustomData);
            isFileValid = false;
        }
        if (calculatedFileSize <= allowedFileSize) {
            this.errorCallback('maximum_filesize_reached', errorCallbackCustomData);
            isFileValid = false;
        }

        if (!allowedFiles.includes(type)) {
            this.errorCallback('unsupported_filetype', errorCallbackCustomData);
            isFileValid = false;
        }

        return isFileValid;
    }


    calculatedFileSize(size) {
        const { allowedFileSizeDescriptor } = this.state;
        let calculatedFileSize = 0;

        switch (allowedFileSizeDescriptor.toUpperCase()) {
            case 'B': {
                calculatedFileSize = size;
                break;
            }
            case 'KB': {
                calculatedFileSize = (size * 1024);
                break;
            }
            case 'MB': {
                calculatedFileSize = (size * 1024 * 1024);
                break;
            }
            case 'GB': {
                calculatedFileSize = (size * 1024 * 1024 * 1024);
                break;
            }
            case 'TB': {
                calculatedFileSize = (size * 1024 * 1024 * 1024 * 1024);
                break;
            }
            case 'PT': {
                calculatedFileSize = (size * 1024 * 1024 * 1024 * 1024 * 1024);
                break;
            }
            default: {
                calculatedFileSize = size;
                break;
            }
        }
        return calculatedFileSize;
    }

    /**
     * Error messages callback
     */
    errorCallback(errorCode, customData = undefined) {
        const { errorCallback } = this.state;

        if (errorCallback) {
            (errorCallback)(errorCode, customData);
        }
    }

    handleClick() {
        if (this.inputNode) {
            this.inputNode.click();
        }
    }

    render() {
        const { addClass, label, inputPlaceholder, defaultClass, id, multiple, hiddenInputStyle } = this.state;
        const props = {
            multiple: multiple ? multiple : '',
            style: hiddenInputStyle
        };

        return (
            <div className={`${defaultClass} ${addClass}`} {...isString(id) && '' !== id && { id: id } }>
                <input
                    ref={node => this.inputNode = node}
                    type="file"
                    onChange={(e) => this.handleFileUpload(e)}
                    placeholder={inputPlaceholder}
                    type='file'
                    name='files[]'
                    {...props}
                />
                <label 
                    className="label" 
                    htmlFor="files"
                    onClick={() => this.handleClick()}
                >
                    {
                        label
                    }
                </label>
            </div>
        );
    }
}

export default InputFile;