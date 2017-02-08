
var fetch = require('../fetch');
var utils = require('../src/utils');
var _ = require('lodash');
var iterators = require('./iterators');
var schemaOnlyValidator = require('../schemaOnlyValidator');
let fileManager = require('../src/fileManager');
var renderer = require('../renderer');

var validateTrigger = function (body, resolve, reject) {
    fetch.getTriggers()
        .then(function (data) {
            if (data.entity && data.entity.length) {
                var trigger = _.find(data.entity, { name: body.name });
                if (trigger) {
                    verifyTrigger(body, _.cloneDeep(trigger)).then(function (data) {
                        console.log(trigger.title + '-' + body.event + ' Done...!!!');
                        resolve('Exeution Completed')
                    }, function (err) {
                        console.log('Error ', err)
                        reject({ message: 'Exeution Error', errors: err });
                    })
                    return;
                }
            }
            reject({ message: 'Unable to find trigger named ' + body.name })
        }, function (err) {
            console.log('Fetch Error ', err);
            reject({ message: 'Trigger fetch error', errors: err });
        })
}

function verifyTrigger(body, trigger) {
    trigger.mock_data = JSON.parse(trigger.mock_data);
    trigger.input = JSON.parse(trigger.input);
    trigger.output = JSON.parse(trigger.output);
    if (!trigger.output[body.event] || !trigger.mock_data[body.event]) {
        return { message: 'no trigger event ' + body.event + ' found' };
    }
    var displayOutput = iterators.parseOutput(trigger.output[body.event]);

    var outputResult = displayOutput.map(function (obj) {
        var value = iterators.get(body.output, obj.value);
        return {
            value: value,
            displayTitle: obj.displayTitle,
            title: obj.name,
            type: obj.type,
            variable: obj.value
        }
    })
    var date = new Date();
    var resultToWrite = {
        name: trigger.title + '-' + body.event,
        version: trigger.version,
        createdAt: date.toString(),
        result: outputResult
    }
    var resultToRender = {
        parse: function parse(data) {
            return JSON.stringify(data)
        },
        html: { title: 'Trigger Values For '+trigger.title + '-' + body.event },
        data:resultToWrite
    }

    var sov = schemaOnlyValidator.runSingleTrigger(trigger, body.event, 'singleRunResult/trigger/');
    var dtv = fileManager.writeFile('singleRunResult/trigger/' + trigger.title + '/values-' + body.event + '.json', resultToWrite);
    var rtv = renderer.renderValues(resultToRender,'singleRunResult/trigger/' + trigger.title + '/values-' + body.event + '.html')

    return Promise.all([sov, dtv, rtv])
}

var validateAction = function (body, resolve, reject) {
    fetch.getAction(body.name)
        .then(function (data) {
            if (data.entity && data.entity.length) {
                var action = _.find(data.entity, { name: body.name });
                if (action) {
                    verifyAction(body, _.cloneDeep(action)).then(function () {
                        console.log(action.label + ' Done...!!!');
                        resolve('Exeution Completed')
                    }, function (err) {
                        console.log('Error ', err)
                        reject({ message: 'Exeution Error', errors: err });
                    })
                    return;
                }
            }
            reject({ message: 'Unable to find Action named ' + body.name })
        }, function (err) {
            console.log('Fetch Error ', err);
            reject({ message: 'Action fetch error', errors: err });
        })
}

function verifyAction(body, action) {
    var displayOutput = iterators.parseOutput(action.output);
    var outputResult = displayOutput.map(function (obj) {
        var value = iterators.get(body.output, obj.value);
        return {
            value: value,
            displayTitle: obj.displayTitle,
            title: obj.name,
            type: obj.type,
            variable: obj.value
        }
    })
    var date = new Date();
    var resultToWrite = {
        name: action.name,
        version: action.version,
        createdAt: date.toString(),
        result: outputResult
    }

    var resultToRender = {
        parse: function parse(data) {
            return JSON.stringify(data)
        },
        html: { title: 'Action Values For '+action.label + '-' + action.name },
        data:resultToWrite
    }

    var sov = schemaOnlyValidator.runSingleAction(action, 'singleRunResult/action/');
    var dtv = fileManager.writeFile('singleRunResult/action/' + action.label + '/values.json', resultToWrite);
    var rtv = renderer.renderValues(resultToRender,'singleRunResult/action/' + action.label + '/values.html')    

    return Promise.all([sov, dtv, rtv])

}

module.exports = {
    validateTrigger: utils.promiseCreate(validateTrigger),
    validateAction: utils.promiseCreate(validateAction)
}