import isObject from "./isObject";

const copyObject = (object, ignoreKeys = []) => {

    if(!isObject(object)){
        return {};
    }

    const keys = Object.keys(object);

    for(let x = 0; x <= keys.length-1; x++){

        if(!ignoreKeys.includes(keys[x])){
            newObject[keys[x]] = object[keys[x]];
        }
    }

    return newObject;
};

export default copyObject;