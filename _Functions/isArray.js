import isObject from "./isObject";

const isArray = (array) => 
{    
    if(typeof [] !== typeof array || undefined === array || null === array || isObject(array) || '[object Array]' !== Object.prototype.toString.call(array))
    {
        return false;
    }

    try{

        if(array.length)
        {

            for(let x = 0; x <= array.length-1; x++)
            {
                array[x];
                break;
            }
        }
    }
    catch(e){
        return false;
    }

    return true;
}

export default isArray;