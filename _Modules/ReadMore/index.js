import React from 'react';
import internalUuid from '../internalFunctions/internalUuid';
import PropsCheck from '../internalFunctions/PropsCheck';

class ReadMore extends React.Component 
{
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
            addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
            defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-read-more',
            id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
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
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass', 'defaultClass', 'id', 'animation', 'toggleForwards', 'toggleBackwards', 'data', 'dataToggle'], props, state)) {            
            return {
                moduleStyle: (typeof true == typeof props.moduleStyle) ? props.moduleStyle : false,
                globalStyle: (typeof true == typeof props.globalStyle) ? props.globalStyle : false,
                addClass: (props.addClass && typeof '8' == typeof props.addClass) ? props.addClass : '',
                defaultClass: (props.defaultClass && typeof '8' == typeof props.defaultClass) ? props.defaultClass : 'rr-read-more-callback',
                id: (props.id && typeof '8' == typeof props.id) ? props.id : '',
                animation: (props.animation && typeof '8' == typeof props.animation) ? props.animation : undefined,
                toggleForwards: props.toggleForwards ? props.toggleForwards : '...',
                toggleBackwards: props.toggleBackwards ? props.toggleBackwards : undefined,
                data: props.data ? props.data : '',
                dataToggle: props.dataToggle ? props.dataToggle : '',
            };
        }

        return null;
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
                className={`${defaultClass} ${addClass}`}
                id={id}
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
                        onClick={(e) => this.toggle(e)}
                    >
                        {
                            toggleForwards
                        }
                    </span>
                }
                {
                    dataToggle && toggled &&
                    <span
                        key={internalUuid()}
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
                        onClick={(e) => this.toggle(e)}
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