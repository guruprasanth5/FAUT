var parseOutput = function (schema) {
    var result = [];
    var iteratedData = activityOutputParser(schema);

    var transformedData = iteratedData.map(function (obj) {
        dataTransform(obj, '$actid', result);
    })
    return result;
}

function activityOutputParser(data) {
    let self = this;
    if (typeof (data) === 'string') {
        data = JSON.parse(data);
    }

    if (data.hasOwnProperty('properties') && data.hasOwnProperty('type') && data.type.toLowerCase() === 'object') {
        let arr = [];
        for (let key in data.properties) {
            let hasProperties = data.properties[key].hasOwnProperty('properties') || data.properties[key].hasOwnProperty('items');
            if (!data.properties[key].displayTitle) {
                continue;
            }
            let bucket = {
                title: data.properties[key].title || key,
                type: data.properties[key].type,
                displayTitle: data.properties[key].displayTitle || data.properties[key].title || key,
                child: hasProperties ? activityOutputParser(data.properties[key]) : []
            }
            arr.push(bucket);
        }
        return arr;
    } else if (data.hasOwnProperty('items')) {
        return activityOutputParser(data.items);
    } else if (data.type === 'any') {
        return []
    } else {
        return [];
    }

}



function dataTransform(data, prevId, resultArr, enclose) {
    let pre = '{{', post = '}}';
    if (enclose) {
        pre = enclose.pre;
        post = enclose.post;
    }
    let id = prevId;
    if (data.title) {
        id = prevId + '.' + data.title
    }

    switch (data.type) {
        // case 'any':
        // 	break;
        // case 'array':

        // case 'object':
        // 	if (!data.child.length) {
        // 		let temp = {
        // 			name: data.title,
        // 			displayTitle: data.displayTitle,
        // 			value: pre + id + post,
        // 			type: data.type
        // 		}

        // 		resultArr.push(temp);
        // 	}
        // break;

        default:
            let temp = {
                name: data.title,
                displayTitle: data.displayTitle,
                value: pre + id + post,
                type: data.type
            }

            resultArr.push(temp);
            break;
    }

    if (data.child.length) {
        let idToSend = id;
        if (data.type === 'array') {
            idToSend = id + '[0]'
        }
        data.child.map(function (obj) {
            dataTransform(obj, idToSend, resultArr, enclose)
        })
    }
}

var get = function (data, pathStr) {
    var extractedPath = pathStr.slice(2, pathStr.length - 2);
    var tokens = tokenize(extractedPath);
    tokens = tokens.slice(1, tokens.length);

    return getValue(tokens, data);
}

function tokenize(pathStr) {
    return pathStr.split(/\.|\[|\]/).filter(function (x) {
        return x
    })
}

function getValue(path, data) {
    if (!path.length) {
        return data;
    }

    return getValue(path.slice(1, path.length), catchify(data, path))
}

function catchify(data, path) {
    if(!data && path.length){
        return undefined;
    }
    if (data !== undefined) {
        if (data[path[0]] || data[path[0]] === false || data[path[0]] === 0 || data[path[0]] === null) {
            return data[path[0]];
        }
    }

    return undefined;
}

module.exports = {
    parseOutput: parseOutput,
    get: get

}