export default (element = null, addXAxisPixel = 0) => {

    if(!element){
        return false;
    }

    try{
        return element.getBoundingClientRect().top + addXAxisPixel <= (window.innerHeight || document.documentElement.clientHeight);
    }
    catch(e){
        return false;
    }
};
