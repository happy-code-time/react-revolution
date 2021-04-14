const isNumber = (nr) => {
    
    if(undefined === nr || null === nr || typeof 8 !== typeof nr){
        return false;
    }

    return true;
}

export default isNumber;