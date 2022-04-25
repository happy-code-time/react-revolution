const propsMatcher = (characters, lines, nextCharacter, attribute) => {
    /**
     * Check if is attribute or string assigment
     * as variable
     * 
     * (attribute) href="fsdfdsfdfsd"
     * (variable) x="dsadasdsadsa"
     */
    let value = characters.substring(0, characters.indexOf('='));

    if (1 !== characters.indexOf('="') && '"' == nextCharacter && 'start' !== attribute && '' !== value) {
        attribute = 'start';

        lines.push({
            data: value,
            className: 'attribute-name'
        });

        lines.push({
            data: '=',
            className: 'equal attribute-equal'
        });

        lines.push({
            data: '"',
            className: 'quote quote-double quote-double-start'
        });

        characters = '';
    }

    /**
     * Example text: re a bug in some browsers where doing "Select ="" (CTRL+A and CMD+A) s
     * 
     * catching here: "Select ="" <- catching closing last tag
     */
    if ('"' == characters && undefined == nextCharacter) {
        attribute = 'end';

        lines.push({
            data: '"',
            className: 'quote quote-double quote-double-end'
        });

        characters = '';
    }

    /**
     * If the attribute process started but not finished
     * and is a space between props
     */
    if (undefined == nextCharacter && 'start' == attribute && '"' !== characters.substring(characters.length - 1, characters.length)) {

        /**
         * If the value has a quoute on the first place
         * example: <meta name=""viewport" content=""width=device-width, initial-scale=1.0,  maximum-scale=5.0"> 
         * 
         * the: content=" are pushed as parent 
         * 
         * now the value "width=device-width has the 2 quote, we have to ignore this quote
         */
        if ('"' == characters.charAt(0)) {
            characters = characters.substring(1, characters.length);
        }

        lines.push({
            data: characters,
            className: 'attribute-value'
        });

        characters = '';
    }

    /**
     * Catching now values with space
     * 
     * title="David Janitzek"
     * 
     * catching value: Janitzek"
     */
    if ('"' == characters.substring(characters.length - 1, characters.length) && 2 <= characters.length && 'start' == attribute) {
        attribute = 'end';

        if ('"' == characters.charAt(0)) {
            characters = characters.substring(1, characters.length);
        }

        lines.push({
            data: characters.substring(0, characters.length - 1),
            className: 'attribute-value'
        });

        lines.push({
            data: '"',
            className: 'quote quote-double quote-double-end'
        });

        characters = '';
    }

    return {
        characters,
        lines,
        attribute
    }
};

export default propsMatcher;