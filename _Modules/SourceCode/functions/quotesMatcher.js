const quotesMatcher = (characters, lines) => {

    if(characters && -1 !== characters.indexOf('\'')){
        const prev = characters.substring(0, characters.indexOf('\''));
    
        if(prev){
            lines.push(
                {
                    className: '',
                    data: prev
                }
            );
        }
    
        lines.push(
            {
                className: 'quote quote-single',
                data: '\''
            }
        );
    
        characters = characters.substring(prev.length+1, characters.length);
    }

    return {
        characters,
        lines
    };
};

export default quotesMatcher;
