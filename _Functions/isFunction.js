const isFunction = (fn) => {
    
    if(undefined === fn || null === fn || typeof function(){} !== typeof fn){
        return false;
    }

    return true;
}

export default isFunction;