import isArray from "./isArray";
import isObject from "./isObject";

const copyObject = (object, ignoreKeys = []) => 
{
    const newObject = {};

    if(!isObject(object))
    {
        return newObject;
    }

    const keys = Object.keys(object);

    for(let x = 0; x <= keys.length-1; x++)
    {
        if(isArray(ignoreKeys) && ignoreKeys.length && isArray(keys) && keys.length && !ignoreKeys.includes(keys[x]))
        {
            newObject[keys[x]] = object[keys[x]];
        }
    }

    return newObject;
};

export default copyObject;