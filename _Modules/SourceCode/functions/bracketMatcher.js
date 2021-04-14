const bracketMatcher = (characters, lines) => {

    if(characters && -1 !== characters.indexOf('{')){
        const prev = characters.substring(0, characters.indexOf('{'));

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
                className: 'bracket bracket-left bracket-type-3',
                data: '{'
            }
        );

        characters = characters.substring(characters.indexOf('{')+1, characters.length);
    }

    if(characters && -1 !== characters.indexOf('}')){
        const prev = characters.substring(0, characters.indexOf('}'));

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
                className: 'bracket bracket-right bracket-type-3',
                data: '}'
            }
        );

        characters = characters.substring(characters.indexOf('}')+1, characters.length);
    }


    if(characters && -1 !== characters.indexOf('[')){
        const prev = characters.substring(0, characters.indexOf('['));

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
                className: 'bracket bracket-left bracket-type-2',
                data: '['
            }
        );

        characters = characters.substring(characters.indexOf('[')+1, characters.length);
    }

    if(characters && -1 !== characters.indexOf(']')){
        const prev = characters.substring(0, characters.indexOf(']'));

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
                className: 'bracket bracket-right bracket-type-2',
                data: ']'
            }
        );

        characters = characters.substring(characters.indexOf(']')+1, characters.length);
    }

    if(characters && -1 !== characters.indexOf('(')){
        const prev = characters.substring(0, characters.indexOf('('));

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
                className: 'bracket bracket-left bracket-type-1',
                data: '('
            }
        );

        characters = characters.substring(characters.indexOf('(')+1, characters.length);
    }

    if(characters && -1 !== characters.indexOf(')')){
        const prev = characters.substring(0, characters.indexOf(')'));

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
                className: 'bracket bracket-right bracket-type-1',
                data: ')'
            }
        );

        characters = characters.substring(characters.indexOf(')')+1, characters.length);
    }
    
    return {
        characters, 
        lines
    };
};

export default bracketMatcher;