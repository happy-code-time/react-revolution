const isString = (str) => 
{    
    if(undefined === str || null === str || typeof '' !== typeof str || '[object String]' !== Object.prototype.toString.call(str))
    {
        return false;
    }

    return true;
}

export default isString;