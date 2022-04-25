import React from 'react';

import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import uuid from '../functions/uuid';

class ReadMore extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            /**
             * App
             */
            classList: '',
            toggled: false,
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ReadMore',
            
            animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
            toggleForwards: props.toggleForwards ? props.toggleForwards : '...',
            toggleBackwards: props.toggleBackwards ? props.toggleBackwards : undefined,
            data: props.data ? props.data : '',
            dataToggle: props.dataToggle ? props.dataToggle : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass', 'defaultClass',  'id', 'animation', 'toggleForwards', 'toggleBackwards', 'data', 'dataToggle'], props, state)) {            
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'ReadMore',
                
                style: (typeof true == typeof props.style) ? props.style : true,
                
                
                animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
                toggleForwards: props.toggleForwards ? props.toggleForwards : '...',
                toggleBackwards: props.toggleBackwards ? props.toggleBackwards : undefined,
                data: props.data ? props.data : '',
                dataToggle: props.dataToggle ? props.dataToggle : '',
            };
        }

        return null;
    }

    componentDidMount(): void {

    }

    toggle() {
        const { animation, toggled } = this.state;
        let { classList } = this.state;

        if(animation && !toggled){
            
            this.setState({
                classList: `toggling animation-${animation}`,
                toggled: true
            });
            
            return setTimeout( () => {
                this.setState({
                    classList: `toggled animation-${animation}`,
                });
            }, 300);
        }

        if(animation && toggled){
            
            this.setState({
                classList: `${classList} animation-${animation}-back`
            });
            
            return setTimeout( () => {
                this.setState({
                    toggled: false
                });
            }, 300);
        }
        
        this.setState({
            toggled: !this.state.toggled,
            classList: ''
        });

    }

    render() {
        const { addClass, defaultClass, id, data, dataToggle, toggled, toggleForwards, toggleBackwards, classList } = this.state;

        return (
            <span
                className=''
                
            >
                {
                    data &&
                    <span className="text">
                        {
                            data
                        }
                    </span>
                }
                {
                    !toggled && toggleForwards &&
                    <span
                        className='toggle-forwards'
                        onClick={(e) => this.toggle()}
                    >
                        {
                            toggleForwards
                        }
                    </span>
                }
                {
                    dataToggle && toggled &&
                    <span
                        key={uuid()}
                        className={classList}
                    >
                        {
                            dataToggle
                        }
                    </span>
                }
                {
                    toggled && toggleBackwards &&
                    <span
                        className='toggle-back'
                        onClick={(e) => this.toggle()}
                    >
                        {
                            toggleBackwards
                        }
                    </span>
                }
            </span>
        );
    }
}

export default ReadMore;