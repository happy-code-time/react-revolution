const objectPropertyMatcher = (characters, lines) => {
    
    if(characters && ':' == characters.charAt(characters.length-1)){
        
        lines.push(
            {
                className: 'object-property',
                data: characters.substring(0, characters.length-1)
            }
        );

        lines.push(
            {
                className: 'colon',
                data: ':'
            }
        );

        characters = '';
    }
    
    return {
        characters, 
        lines
    };
};

export default objectPropertyMatcher;