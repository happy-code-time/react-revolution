const isString = (str) => {
    
    if(undefined === str || null === str || typeof '' !== typeof str){
        return false;
    }

    return true;
}

export default isString;