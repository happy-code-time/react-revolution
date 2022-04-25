export default (nr) => 
{    
    if(undefined === nr || null === nr || typeof 8 !== typeof nr || '[object Number]' !== Object.prototype.toString.call(nr))
    {
        return false;
    }

    return true;
}