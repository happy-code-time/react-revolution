import React from 'react';
import PropsCheck from '../functions/PropsCheck';

export default class BoxHorizontal extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private ref: any;

    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);

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

    componentDidMount(): void {
        this.setListener(true);
    }

    componentWillUnmount(): void {
        this.setListener(false);
    }

    setListener(attach: boolean): void {
        window.removeEventListener('resize', this.resize);

        if(true === attach){
            window.addEventListener('resize', this.resize);
        }
    }

    resize(e: any){
        
    }

    render() {
        return (
            <div 
                className='BoxHorizontal p-3 h-100 overflow-hidden'
                ref={x => this.ref = x}
            >
                <div className='bg-white-light border border-radius h-100 min-h-100vh'>
                    {
                        this.state.data
                    }
                </div>
            </div>
        )
    }
}
