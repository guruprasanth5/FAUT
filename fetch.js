var Rest = require('rest')
var mime = require('rest/interceptor/mime')
var basicAuth = require('rest/interceptor/basicAuth')
var pathPrefix = require('rest/interceptor/pathPrefix')
var errorCode = require('rest/interceptor/errorCode')
var defaultRequest = require('rest/interceptor/defaultRequest')
var config = require('./config');

let client = Rest.wrap(mime)
    .wrap(pathPrefix, { prefix: config.baseURI })
    .wrap(errorCode);

var Fetch = function (options) {
    let defaults = config.defaultRequestOptions
    client = client.wrap(defaultRequest, defaults);
    if (config.appEnv !== 'prod') {
        client = client.wrap(basicAuth, config.basicAuth)
    }
    return client(options)
}

var getTriggers = function (cb) {
    var apiObj = {
        path: '/alltriggers',
        method: 'GET'
    }

    return Fetch(apiObj)
}

var getActions = function () {
    var apiObj = {
        path: '/activitys',
        method: 'GET'
    }

    return Fetch(apiObj)
}

var getTrigger = function(trigger_name){
    var apiObj = {
        path: '/searchtrigger',
        method: 'POST',
        entity:{
            search:trigger_name
        }
    }

    return Fetch(apiObj)
}

var getAction = function(action_name){
    var apiObj = {
        path: '/searchactivity',
        method: 'POST',
        entity:{
            search:action_name
        }
    }

    return Fetch(apiObj)
}

module.exports = {
    getTriggers: getTriggers,
    getActions: getActions,
    getAction:getAction,
    getTrigger:getTrigger
}