import React from 'react';

import isNotEmptyString from '../../functions/isNotEmptyString';
import PropsCheck from '../../functions/PropsCheck';

export default class UiBoxSmall extends React.Component< { [key: string]: any }, { [key: string]: any }> {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            titleData: props.titleData,
            data: props.data,
            color: isNotEmptyString(props.color) && ['black', 'pink', 'green', 'orange', 'white'].includes(props.color) ? props.color : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['title', 'titleData', 'data', 'color'], props, state)) {
            return {
                title: props.title,
                titleData: props.titleData,
                data: props.data,
                color: isNotEmptyString(props.color) && ['black', 'pink', 'green', 'orange', 'white'].includes(props.color) ? props.color : '',
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    render(){
        const { color, title, titleData, data, transparent } = this.state;

        return (
            <div className='position-relative w-100 m-auto bg-transparent ui-box'>
                <div className='ui-box-wrapper'>
                    <div 
                        className='border border-radius box-shadow bg-white py-1 px-2'
                        {...(true === transparent) && { className: 'bg-transparent py-1 px-2' }}
                    >
                        <div className='px-2 flex w-100 justify-content-between'>
                            <div 
                                className='ui-box-title flex border-radius height-max-content bg-ui-box bg-ui-box-blue'
                                {...('black' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-black' }}
                                {...('pink' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-pink' }}
                                {...('green' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-green' }}
                                {...('orange' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-orange' }}
                                {...('white' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-white' }}
                                {...('' === color) && { className: 'ui-box-title flex flex-column w-100 border-radius bg-ui-box bg-ui-box-transparent' }}
                            >
                                {
                                    title && 
                                    <div className='m-auto p-2'>
                                        {
                                            title
                                        }
                                    </div>
                                }
                            </div>
                            {
                                titleData && 
                                <div className='p-2 text-muted text-right flex flex-column'>
                                    <span className='d-inline-block py-1'>
                                        {
                                            titleData
                                        }
                                    </span>
                                </div>
                            }
                        </div>
                        <div className='ui-box-content py-2 flex w-100'>
                            <span className='w-100'>
                                {
                                    data
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
