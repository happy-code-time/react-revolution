const isFunction = (fn) => 
{    
    if(undefined === fn || null === fn || typeof function(){} !== typeof fn || '[object Function]' !== Object.prototype.toString.call(fn))
    {
        return false;
    }

    return true;
}

export default isFunction;