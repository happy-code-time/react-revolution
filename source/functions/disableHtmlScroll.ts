const disableHtmlScroll = () => {
    if(null !== document.getElementsByTagName('html') && undefined !== document.getElementsByTagName('html')[0]){
        document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }    
};

export default disableHtmlScroll;