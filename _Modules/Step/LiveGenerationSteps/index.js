import React from 'react';
import PropsCheck from '../../internalFunctions/PropsCheck';

class LiveGenerationSteps extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: props.data ? props.data : '',
            step: props.step ? props.step : 0,
            liveData: ''
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['data', 'step'], props, state)) {
            return {
                data: props.data ? props.data : '',
                step: props.step ? props.step : 0,
                update: true
            };
        }

        return null;
    }

    componentDidMount() {
        this.liveCodeGeneration();
    }

    componentDidUpdate(){
        if(this.state.update){
            this.liveCodeGeneration();
        }
    }

    liveCodeGeneration(){
        const { data, step } = this.state;
        /**
         * Live code generation - website speedup
         */
        if(data && data.length && undefined !== data[step]) {
            const { liveGeneration, liveGenerationProps } = data[step];

            if (liveGeneration && typeof function(){} == typeof liveGeneration) {
                (async () => {
                    const liveData = await (liveGeneration)(liveGenerationProps).then(r => r).catch(e => '');
                    return this.setState({ liveData, update: false });
                })();
            }
            else{
                this.setState({ update: false, liveData: '' });
            }
        }
        else{
            this.setState({ update: false, liveData: '' });
        }
    }

    render() {
        return this.state.liveData;
    }
};

export default LiveGenerationSteps;