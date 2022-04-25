import React from 'react';
import PropsCheck from '../functions/PropsCheck';

export default class BoxVertical extends React.Component< { [key: string]: any }, { [key: string]: any }> {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
     static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['data'], props, state)) {
            return {
                data: props.data,
            };
        }

        return null;
     }

    render() {
        return (
            <div className='BoxVertical w-100 p-3'>
                <div className='bg-white-light border border-radius'>
                    {
                        this.state.data
                    }
                </div>
            </div>
        )
    }
}
