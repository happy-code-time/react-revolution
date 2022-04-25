export default (messageKey = '', errorMessage = '', errorCode, disappear = undefined, clearStack = false, persistCurrentMessage = false) => {
    const message = { errorMessage, errorCode, disappear, clearStack, persistCurrentMessage };

    if(messageKey){
        let currentMessages = sessionStorage.getItem(messageKey);

        try{
            if(null !== currentMessages){

                if(undefined !== clearStack && typeof true == typeof clearStack && true == clearStack){
                    return sessionStorage.setItem(messageKey, JSON.stringify([message]));
                }

                const c = JSON.parse(currentMessages);
                c.push(message);
                sessionStorage.setItem(messageKey, JSON.stringify(c));
            }
            else{
                sessionStorage.setItem(messageKey, JSON.stringify([message]));
            }
        }
        catch(e){
            sessionStorage.setItem(messageKey, JSON.stringify([message]));
        }
    }
};
