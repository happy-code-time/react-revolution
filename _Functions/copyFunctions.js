const copyFunctions = (srcObj, targetObj) => {
    const keys = Object.keys(srcObj);

    for(let x = 0; x <= keys.length-1; x++){
        const keyName = keys[x];
        
        targetObj[keyName] = {};

        if(srcObj[keyName] && typeof {} == typeof srcObj[keyName]){
            let sourceKeys = {};

            try{
                sourceKeys = Object.keys(srcObj[keyName]);
            } catch(e){
                sourceKeys = {};
            }

            for(let i = 0; i <= sourceKeys.length-1; i++){

                if('data' == sourceKeys[i]){
                    targetObj[keyName][sourceKeys[i]] = [];    
                }
                
                targetObj[keyName][sourceKeys[i]] = srcObj[keyName][sourceKeys[i]];
            }
        }

    }

    return targetObj;
};

export default copyFunctions;