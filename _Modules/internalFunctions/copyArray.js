const copyArray = (srcArray, targetArray = []) => {

    for(let x = 0; x <= srcArray.length-1; x++){
        const singleData = srcArray[x];
        targetArray.push(singleData);
    }

    return targetArray;
};

export default copyArray;