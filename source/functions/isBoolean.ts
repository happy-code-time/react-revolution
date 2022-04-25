export default (bool) => 
{
    if(undefined === bool || null === bool || typeof true !== typeof bool || '[object Boolean]' !== Object.prototype.toString.call(bool))
    {
        return false;
    }

    return true;
}