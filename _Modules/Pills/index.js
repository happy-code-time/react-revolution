import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';

class Pills extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSelection = this.toggleSelection.bind(this);

        this.state = {
            /**
             * App
             */
            unique: `${internalUuid()}`,
            /**
             * User
             */
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-pills',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
            data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
            multiple: typeof true === typeof props.multiple ? props.multiple : true,
            readonly: typeof true === typeof props.readonly ? props.readonly : false, 
        };

        this.availableSorts = ['asc', 'desc'];
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'defaultClass', 'id', 'data', 'multiple', 'readonly'], props, state)) {

            return {
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-pills',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                data: props.data && typeof [] === typeof props.data && props.data.length ? props.data : [],
                multiple: typeof true === typeof props.multiple ? props.multiple : true,
                readonly: typeof true === typeof props.readonly ? props.readonly : false,
            };
        }

        return null;
    }

    componentDidMount(){
        this.pillsStructure(this.state.data, true);
    }

    callback(o){
        const { callback, callbackProps } = o;

        if(callback){
            (callback)(callbackProps, this.state.data.filter( x => x.selected === true));
        }
    }

    pillsStructure(data, setState = false){

        if(data && 0 !== data.length){
            
            /**
             * Main loop
             */
            for(let x = 0; x <= data.length-1; x++){
                
                if(undefined === data[x].selected){
                    data[x].selected = false;
                }

                if(undefined === data[x].index){
                    data[x].index = x;
                }
            }
            
            /**
             * Only for the componentDidMount callback
             */
            if(setState){
                return this.setState({ data });
            }

            return data;
        }

        return [];
    }

    toggleSelection(o, i){
        const { data } = this.state;

        if(!this.state.multiple){
            for(let x = 0; x <= data.length-1; x++){
                data[x].index = x;

                if(x !== i){
                    data[x].selected = false;
                }
            }
        }

        if(!data[i].selected){
            data[i].selected = true;
        }
        else{
            data[i].selected = false;
        }

        this.setState({
            data
        }, () => {
            this.callback(o);
        });
    }

    createPills(data) {

        if(!data || !data.length){
            return null;
        }

        const { readonly, unique } = this.state;

        return data.map( (o, i) => {
            const { text, cls, selected } = o;

            if(!text){
                return null;
            }

            return (
                <span 
                    key={`${i}-${unique}`}
                    className={`pill ${cls ? cls : ''} ${selected ? 'selected' : ''} user-select-none`}
                    {...(!readonly) && { onClick: () => this.toggleSelection(o, i)}}
                    {...(readonly) && { onClick: () => this.callback(o)}}
                >
                    { 
                        text && text
                    }
                </span>
            );
        });
    }

    render() {
        const { addClass, defaultClass, id } = this.state;
        const data = this.pillsStructure(this.state.data);

        return (
            <span className={`${defaultClass} ${addClass}`} id={id}>
                {
                    this.createPills(data)
                }
            </span>
        );
    }
}

export default Pills;