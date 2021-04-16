class UrlExtractor {

    /**
     * Loop trought splitted paths by delimiters
     */
    loopTroughtChilds(string, delimiter, object, ignoreNullValues) {
        var kvPairs = [];
        var splitedByDelimiter = string.split(delimiter);

        /**
         * Single path with childs
         */
        if (splitedByDelimiter.length > 1) {

            for (var n = 0; n <= splitedByDelimiter.length - 1; n++) {
                var item = splitedByDelimiter[n];

                if (item) {
                    /**
                     * Key value check
                     */
                    var keyValues = item.split('&');

                    for (var k = 0; k <= keyValues.length - 1; k++) {
                        var pair = keyValues[k];
                        var kv = pair.split('=');

                        /**
                         * Single key
                         */
                        var key = kv[0] ? kv[0] : null;

                        if (key && 'hash' == object.name) {
                            key = key.replace('#', '');
                        }

                        /**
                         * Single value
                         */
                        var value = kv[1] ? kv[1] : null;

                        if (null == value) {
                            if (!ignoreNullValues) {
                                kvPairs.push({
                                    key,
                                    value,
                                    pair
                                });
                            }
                        }
                        else {
                            kvPairs.push({
                                key,
                                value,
                                pair
                            });
                        }
                    }
                }
            }
        }
        return kvPairs;
    }

    extract(hashRouter) {
        var Location = window.location;

        var href = {
            name: 'href',
            origin: Location.href,
            paths: []
        };

        var search = {
            name: 'search',
            origin: Location.search,
            paths: []
        };

        var hash =
        {
            name: 'hash',
            origin: Location.hash,
            paths: []
        };

        var itemsToLoop = [href, search, hash];
        var pathsData = {
            href,
            search,
            hash
        };

        for (var x = 0; x <= itemsToLoop.length - 1; x++) {
            var object = itemsToLoop[x];

            if (object.origin && object.origin.length) {

                var singlePathItems = object.origin.split('/');

                /**
                 * Loop trought splitted paths
                 */
                if (singlePathItems && singlePathItems.length) {

                    for (var i = 0; i <= singlePathItems.length - 1; i++) {
                        var singlePath = singlePathItems[i];

                        if (singlePath) {
                            var path = singlePath;

                            if ('hash' == object.name && i == singlePathItems.length - 1) {
                                path = path.split('#');

                                if (path && path.length) {
                                    path = path[0];
                                }
                            }

                            if ('href' == object.name) {
                                path = path.split('?');

                                if (path && path.length) {
                                    path = path[0];

                                    var extractPathFromHash = path.split('#');

                                    if (extractPathFromHash && extractPathFromHash.length > 1) {
                                        path = extractPathFromHash[0];
                                    }
                                }
                            }

                            if(path){
                                if (-1 !== path.indexOf('http:') || -1 !== path.indexOf('https:')) {
                                    pathsData[object.name].protocol = `${path}//`;
                                }
                                else if (-1 !== path.indexOf('www.') || (2 == i && 'href' == object.name)) {
                                    pathsData[object.name].domain = hashRouter ? `${path}/#/` : path;
                                }
                                else {
                                    pathsData[object.name].paths.push(
                                        {
                                            path,
                                            keyValues: this.loopTroughtChilds(singlePath, '?', object, false)
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }


        /**
         * Returning structure are:
         * 
            {
                "path": {
                    "name": "path",
                    "origin": "https://www.example.com/path/to/target-78367?data1=1111111&data2=222222",
                    "paths": [
                        {
                            "path": "https:",
                            "keyValues": []
                        },
                        {
                            "path": "www.example.com",
                            "keyValues": []
                        },
                        {
                            "path": "neubau",
                            "keyValues": []
                        },
                        {
                            "path": "garbsen-bosse-see",
                            "keyValues": []
                        },
                        {
                            "path": "eigentmswohnung-78367",
                            "keyValues": [
                                {
                                    "key": "eigentmswohnung-78367",
                                    "value": null,
                                    "pair": "eigentmswohnung-78367"
                                },
                                {
                                    "key": "data1",
                                    "value": "1111111",
                                    "pair": "data1=1111111"
                                },
                                {
                                    "key": "data2",
                                    "value": "222222",
                                    "pair": "data2=222222"
                                }
                            ]
                        }
                    ]
                }
            }
         */
        return pathsData;
    }
}

const urlExtract = (hashRouter) => {
    const extractor = new UrlExtractor();
    return extractor.extract(hashRouter);
};

export default urlExtract;