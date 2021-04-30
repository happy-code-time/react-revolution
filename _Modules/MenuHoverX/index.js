import React from 'react';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import internalUuid from '../internalFunctions/internalUuid';

class MenuHoverX extends React.Component {
    constructor(props) {
        super(props);
        this.buildRecursive = this.buildRecursive.bind(this);

        this.state = {
            // User
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'MenuHoverX',
            id: isString(props.id) ? props.id : '',
            data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
            direction: (props.direction && typeof '8' == typeof props.direction && ['left', 'right']) ? props.direction : 'right',
            uuid: internalUuid(),
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props
     * @param {object} state
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['addClass', 'id',  'data', 'direction'], props, state)) {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                id: isString(props.id) ? props.id : '',
                data: props.data && typeof [] == typeof props.data && props.data.length ? props.data : [],
                direction: (props.direction && typeof '8' == typeof props.direction && ['left', 'right']) ? props.direction : 'right',
            };
        }

        return null;
    }

    callback(c, a) {
        if (c && typeof function () { } === typeof c) {
            (c)(a);
        }
    }

    buildRecursive(xdata = [], holder, currentCount, isChild = false, uuid = this.state.uuid) {
        const jsx = [];
        holder = 'ul' === holder ? 'ol' : 'ul';

        if (xdata && typeof [] == typeof xdata && xdata.length) {

            for (let x = 0; x <= xdata.length - 1; x++) {
                const { callback, callbackProps, text, data } = xdata[x];

                jsx.push(
                    <li 
                        key={`menu-entry-${holder}-${currentCount+x}-${uuid}`}
                        className={`menu-entry ${!isChild ? 'root-li' : ''} ${data && typeof [] == typeof data && data.length ? 'has-children' : ''}`} 
                    >
                        {
                            text && 
                            <span 
                                className='text' 
                                onClick={() => this.callback(callback, callbackProps)}
                            >
                                {
                                    text
                                }
                            </span>
                        }
                        {
                            this.buildRecursive(data, holder, x, true)
                        }
                    </li>
                );
            }

        }

        if(!jsx.length){
            return null;
        }

        if ('ul' == holder) {
            return (
                <ul className={`${isChild ? 'child' : 'root'}`}>
                    {
                        jsx
                    }
                </ul>
            );
        }

        return (
            <ol className={`${isChild ? 'child' : ''}`}>
                {
                    jsx
                }
            </ol>
        );
    }

    render() {
        const { defaultClass, addClass, id, direction } = this.state;

        return (
            <span
                className={`${defaultClass} ${direction} ${addClass}`}
                {...isString(id) && '' !== id && { id: id } }
            >
                {
                    this.buildRecursive(this.state.data, 'ol', 0, false)
                }
            </span>
        );
    }
}

export default MenuHoverX;
