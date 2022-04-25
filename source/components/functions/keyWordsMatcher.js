const keyWordsMatcher = (characters, lines, matcher) => {

    if(matcher){

        for (let x = 0; x <= matcher.length - 1; x++) {

            if(matcher[x]){
                const { words, className } = matcher[x];
    
                if(words && typeof [] == typeof words){
        
                    for (let i = 0; i <= words.length - 1; i++) {
                        
                        if (words[i] === characters) {
        
                            lines.push(
                                {
                                    data: characters,
                                    className
                                }
                            );
            
                            characters = '';
                            break;
                        }
                    }
                }
            }
        }
    }

    return {
        characters,
        lines
    };
};

export default keyWordsMatcher;