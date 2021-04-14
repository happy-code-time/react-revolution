const isArray = (array) => {
    let isArray = true;
    
    if(typeof [] !== typeof array || !array){
        isArray = false;
    }

    try{

        if(isArray.length){

            for(let x = 0; x <= isArray.length-1; x++){
                isArray[x];
                break;
            }
        }
    }
    catch(e){
        isArray = false;
    }

    return isArray;
}

export default isArray;