import isArray from "./isArray";

const copyArray = (srcArray, targetArray = []) => {

    if(!isArray(srcArray))
    {
        return [];
    }
    
    if(!isArray(targetArray))
    {
        targetArray = [];
    }

    for(let x = 0; x <= srcArray.length-1; x++){
        const singleData = srcArray[x];
        targetArray.push(singleData);
    }

    return targetArray;
};

export default copyArray;