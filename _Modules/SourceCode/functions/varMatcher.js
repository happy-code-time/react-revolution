const varMatcher = (characters, lines) => {
    
    if(characters && '=' == characters.charAt(characters.length-1)){
        
        lines.push(
            {
                className: 'var',
                data: characters.substring(0, characters.length-1)
            }
        );

        lines.push(
            {
                className: 'var-equal equal',
                data: '='
            }
        );

        characters = '';
    }
    
    return {
        characters, 
        lines
    };
};

export default varMatcher;