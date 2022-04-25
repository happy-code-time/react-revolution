export default (u: string = window.location.href) => {
    const url = u.split('/');
    const paths = [];
    let search = '';
    let protocol = '';
    let domain = '';
    let generateValidHrefs = '';

    for(let x = 0; x < url.length; x++){
        url[x] = url[x].trim();
    }

    for(let x = 0; x < url.length; x++){
        /**
         * Extract ?
         */
        if(2 === url[x].split('?').length){
            search = url[x];
        } 

        if('' !== url[x]){
            /**
             * Extract protcol
             */
            if('https:' === url[x] || 'http:' === url[x]){
                protocol = url[x].substring(0, url[x].length-2);
            }
            /**
             * Extract protcol
             */
            else if('www.' === url[x].substring(0, 4)){
                domain = url[x];
            }
            else {
                /**
                 * Build valid url to use as link
                 */
                if('' !== protocol && '' !== domain && '' === generateValidHrefs){
                    generateValidHrefs = `${protocol}://${domain}`;
                }

                /**
                 * Remove hash from path name
                 */
                if('#' === url[x].charAt(url[x].length-1)){
                    url[x] = url[x].substring(0, url[x].length-1);
                    /**
                     * if is hash router, then use it
                     */
                    if(-1 === generateValidHrefs.indexOf('#')){
                        generateValidHrefs += `/${url[x]}#/`;
                    }
                } else {
                    generateValidHrefs += `${'/' !== generateValidHrefs.charAt(generateValidHrefs.length-1) ? '/' : ''}${url[x]}`;
                } 

                paths.push(
                    {
                        path: url[x],
                        url: generateValidHrefs
                    }
                );
            }
        }
    }

    const keyValue = [];

    if(0 !== search.length){
        let v = search.substring(1, search.length-1)
        
        if(0 !== v.length){
            v = v.trim();

            if(0 !== v.length){
                const xv = v.split('&');

                for(let x = 0; x < xv.length; x++){
                    if(2 === xv[x].split('=').length){
                        keyValue.push(
                            {
                                key: xv[x].split('=')[0],
                                value: xv[x].split('=')[1]
                            }
                        );
                    }
                }
            }
        }
    }

    return {
        protocol,
        domain,
        paths,
        search,
        keyValue
    }
};
