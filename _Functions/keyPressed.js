import isString from './isString';
import isNumber from './isNumber';

const keyPressed = (e) => 
{
    if(!e)
    {
        return '';
    }

    const eventKey = e.key;
    const eventKeyCode = e.keycode;

    if(!isString(eventKey) && !isNumber(eventKeyCode))
    {
        return '';
    }

    const supportedKkeys = {
        'Enter': {
            name: 'Enter',
            code: 13
        },
        'ArrowDown': {
            name: 'ArrowDown', 
            code: 40
        },
        'ArrowUp': {
            name: 'ArrowUp',
            code: 38
        },
        'Escape' : {
            name: 'Escape',
            code: 27
        }
    };

    const keys = Object.getOwnPropertyNames(supportedKkeys);

    if(keys.includes(eventKey))
    {
        return supportedKkeys[eventKey].name;
    }

    for(let x = 0; x <= keys.length-1; x++)
    {
        if(supportedKkeys[keys[x]].name === eventKey || supportedKkeys[keys[x]].code === eventKeyCode)
        {
            return supportedKkeys[keys[x]].name;
        }
    }

    return '';
};

export default keyPressed;