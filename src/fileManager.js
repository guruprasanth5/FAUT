let fs = require('fs');
let utils = require('./utils');

var writeFile = function (filePath, data, resolve, reject) {
    let dataToWrite = (typeof (data) === 'string' ? data : JSON.stringify(data, null, 2));
    fs.writeFile(filePath, dataToWrite, 'utf8', (err) => {
        if (err) reject(err);
        resolve('It\'s saved!');
    });
}

var createFolder = function (dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

module.exports = {
    writeFile: utils.promiseCreate(writeFile),
    createFolder:createFolder
}