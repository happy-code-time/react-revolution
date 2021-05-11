const isObject = (object) => 
{     
    if(typeof {} !== typeof object || null === object || undefined === object || '[object Object]' !== Object.prototype.toString.call(object))
    {
        return false;
    }

    let keys = [];

    try{
        keys = Object.getOwnPropertyNames(object);
    }
    catch(e){
        return false;
    }

    return true;
}

export default isObject;