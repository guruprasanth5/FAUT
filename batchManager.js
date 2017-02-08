var utils = require('./src/utils');


var batch = function (data, size, cb, resolve, reject) {

    var tokenizedData = tokenizer(data,size);

    console.log('Total Batch ',tokenizedData.length)

    executor(tokenizedData,utils.promiseCreate(cb),tokenizedData.length);

}

var tokenizer = function (data, size) {
    var arr = []
    for (var i = 0; i < data.length; i = i + size) {
        arr.push(data.slice(i, size + i))
    }

    return arr;
}

var executor = function(tokenizedData,cb,length){
    var promiseArray = tokenizedData[0].map(function(data){
        return cb(data)
    })

    return Promise.all(promiseArray)
    .then(function(data){
        var restData = tokenizedData.slice(1,tokenizedData.length);
        if(restData.length){
            console.log('Batch ',length - restData.length,' finished.')
            executor(restData,cb,length);
        }else{
            // return data;
        }
    }).catch(function(err){
        console.log(err)
    })
}

module.exports = utils.promiseCreate(batch);