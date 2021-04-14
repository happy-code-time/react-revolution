const isObject = (object) => {
    let isObject = true;
    
    if(typeof {} !== typeof object || !object){
        isObject = false;
    }

    let keys = [];

    try{
        keys = Object.keys(object);
    }
    catch(e){
        isObject = false;
    }

    return isObject;
}

export default isObject;