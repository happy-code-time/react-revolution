import internalUuid from './internalUuid';

const buildDropDownStructure = (data = [], parent = undefined) => {
    /**
     * Get unique id for the single menu element
     */
    const choosedIds = [];

    const getUuid = () => {
        const uuidItem = `${internalUuid()}`;
       
        if(choosedIds.includes(uuidItem)){
            getUuid();
        }

        return uuidItem;
    };

    /**
     * Main attaching functionality
     */
    if(data && data.length){

        for(let x = 0; x <= data.length-1; x++){

            if(undefined == data[x].toggled){
                data[x].toggled = false;
            }

            if(undefined == data[x].uuid){
                data[x].unique = `${getUuid()}`;
            }

            if(undefined == data[x].key){
                data[x].key = data[x].text ? `single-entry-${x}-${getUuid()}` : `${getUuid()}`;
            }

            if(undefined == data[x].classList){
                data[x].classList = '';
            }

            if(undefined == data[x].loopCount){
                data[x].loopCount = 1;
            }

            if(undefined == data[x].isActive){
                data[x].isActive = false;
            }

            if(undefined == data[x].classListChildren){
                data[x].classListChildren = '';
            }

            if(parent && data[x].data && typeof [] == typeof data[x].data && data[x].data.length){
                data[x].childrensNestedCount = parent.childrensNestedCount+1;
            }

            if(!parent){
                data[x].childrensNestedCount = 1;
            }

            data[x].parentElement = parent;

            if(data[x].data && typeof [] == typeof data[x].data && data[x].data.length){
                buildDropDownStructure(data[x].data, data[x]);
                data[x].isParent = true;
            }
            else{
                data[x].isParent = false;
            }
        }
    }

    return data;
};

export default buildDropDownStructure;