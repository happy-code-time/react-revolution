
const tagMatcher = (characters, lines, nextCharacter) => {
    /**
     * Unknown tag name check
     * - possible match for </custom-tag-name>
     */
    if (0 === characters.indexOf('</') && '>' == nextCharacter) {
        lines.push(
            {
                data: '<',
                className: 'tag-start'
            }
        );
        lines.push(
            {
                data: '/',
                className: 'slash'
            }
        );
        lines.push(
            {
                data: characters.substring(2, characters.length),
                className: 'tag-name'
            }
        );
        characters = '';
    }

    if ('>' == characters.substring(characters.length - 1, characters.length) && !nextCharacter && -1 == characters.indexOf('<')) {

        if ('=' == characters.substring(0, characters.length - 1)) {
            lines.push(
                {
                    data: '=',
                    className: 'equal'
                }
            );
            lines.push(
                {
                    data: '>',
                    className: 'tag-end'
                }
            );
        }
        else {
            lines.push(
                {
                    data: characters.substring(0, characters.length - 1),
                    className: 'tag-name'
                }
            );
            lines.push(
                {
                    data: '>',
                    className: 'tag-end'
                }
            );
        }
        characters = '';
    }

    /**
     * Unknown tag name check
     * - possible match for <custom-tag-name> without props
     */
    if ('<' == characters.charAt(0) && !nextCharacter) {
        lines.push(
            {
                data: '<',
                className: 'tag-start'
            }
        );

        if ('>' == characters.substring(characters.length - 1, characters.length)) {
            lines.push(
                {
                    data: characters.substring(1, characters.length - 1),
                    className: 'tag-name'
                }
            );
            lines.push(
                {
                    data: '>',
                    className: 'tag-end'
                }
            );
            characters = '';
        }
        else {
            lines.push(
                {
                    data: characters.substring(1, characters.length),
                    className: 'tag-name'
                }
            );
            characters = '';
        }
    }

    if ('<' == characters.charAt(0) && '>' == characters.charAt(characters.length - 1)) {
        lines.push(
            {
                data: '<',
                className: 'tag-start'
            }
        );
        lines.push(
            {
                data: characters.substring(1, characters.length - 1),
                className: 'tag-name'
            }
        );
        lines.push(
            {
                data: '>',
                className: 'tag-end'
            }
        );
        characters = '';
    }

    if (-1 !== characters.indexOf('<') && '>' == characters.charAt(characters.length - 1)) {

        lines.push(
            {
                data: '<',
                className: 'tag-start'
            }
        );
        lines.push(
            {
                data: characters.substring(characters.indexOf('<') + 1, characters.length - 1),
                className: 'tag-name'
            }
        );
        lines.push(
            {
                data: '>',
                className: 'tag-end'
            }
        );
        characters = '';
    }

    if (-1 !== characters.indexOf('</') && '>' == characters.charAt(characters.length - 1)) {
        lines.push(
            {
                data: characters.substring(0, characters.indexOf('</') + 1),
                className: 'not-filtered-data'
            }
        );
        lines.push(
            {
                data: '</',
                className: 'tag-start'
            }
        );
        lines.push(
            {
                data: characters.substring(characters.indexOf('</') + 2, characters.length - 1),
                className: 'tag-name'
            }
        );
        lines.push(
            {
                data: '>',
                className: 'tag-end'
            }
        );
        characters = '';
    }

    /**
     * Tag check
     * Check if is closing tag, and the closing tag are pushed previously 
     */
    if ('>' == characters) {
        lines.push(
            {
                data: '>',
                className: 'tag-end'
            }
        );
        characters = '';
    }


    return {
        characters,
        lines
    }
};

export default tagMatcher;