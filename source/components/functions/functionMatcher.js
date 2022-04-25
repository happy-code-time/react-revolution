const functionMatcher = (characters, lines, functionAlreadyStarted) => {
    /**
     * Functions matcher
     */
    if(-1 !== characters.indexOf('(') && -1 !== characters.indexOf(')') && !functionAlreadyStarted){
        const fnName = characters.substring(0, characters.indexOf('('));
        functionAlreadyStarted = true;

        lines.push(
            {
                data: fnName,
                className: 'function-name'
            }
        );
        
        const attr = characters.substring(fnName.length+1, characters.indexOf(')'));

        lines.push(
            {
                data: '(',
                className: 'bracket-left bracket'
            }
        );

        if(attr){
            lines.push(
                {
                    data: attr,
                    className: 'function-arguments'
                }
            );
        }

        lines.push(
            {
                data: ')',
                className: 'bracket-right bracket'
            }
        );

        characters = characters.substring(fnName.length + 1 + attr.length + 1, characters.length);
    }

    return {
        characters, 
        lines
    };
};

export default functionMatcher;