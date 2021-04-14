const enableHtmlScroll = () => {
    if(null !== document.getElementsByTagName('html') && undefined !== document.getElementsByTagName('html')[0]){
        document.getElementsByTagName('html')[0].removeAttribute('class');
        document.getElementsByTagName('html')[0].removeAttribute('style'); 
    }    
};

export default enableHtmlScroll;