const isBoolean = (bool) => {
    
    if(undefined === bool || null === bool || typeof true !== typeof bool){
        return false;
    }

    return true;
}

export default isBoolean;