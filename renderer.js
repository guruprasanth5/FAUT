var pug = require('pug');
let fileManager = require('./src/fileManager');

var valuesFunc = pug.compileFile('templates/values.pug')
var triggerInfoFunc = pug.compileFile('templates/triggerinfo.pug')
var actionInfoFunc = pug.compileFile('templates/actioninfo.pug')

var renderValues = function (data, path) {
    var htmlString = valuesFunc(data);
    return fileManager.writeFile(path, htmlString)
}

var renderTriggerInfo = function (data, path) {
    var htmlString = triggerInfoFunc(data);
    return fileManager.writeFile(path, htmlString)
}

var renderActionInfo = function (data, path) {
    var htmlString = actionInfoFunc(data);
    return fileManager.writeFile(path, htmlString)
}

module.exports = {
    renderValues: renderValues,
    renderTriggerInfo: renderTriggerInfo,
    renderActionInfo: renderActionInfo
}
