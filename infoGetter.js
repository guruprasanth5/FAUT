var fetch = require('./fetch');
let fileManager = require('./src/fileManager');
var renderer = require('./renderer');
var _ = require('lodash');
var attr = process.argv[2];

if (attr === 'trigger') {
    fetch.getTriggers()
        .then(function (response) {
            var result = triggerIterator(response.entity);
            var date = new Date();
            var resultToWrite = {
                createdAt: date.toString(),
                result: result
            }
            var wrt = fileManager.writeFile('infoResult/triggers.json', resultToWrite)

            var rti = renderer.renderTriggerInfo({data:resultToWrite},'infoResult/triggers.html');

            Promise.all([wrt,rti])
            .then(function () {
                    console.log('Success');
                }, function (err) {
                    console.log('Write error ', err)
                })
        }, function (err) {
            console.log('trigger fetch error ', err);
        })
} else {
    fetch.getActions()
        .then(function (response) {
            var groupedData = _.groupBy(response.entity, function (obj) {
                return obj.tags[0]
            })
            var result = Object.keys(groupedData).map(function (key) {
                var list = groupedData[key].map(function (obj) {
                    return {
                        label: obj.label,
                        name: obj.name
                    }
                })

                return {
                    service:key,
                    actions:list
                }
            })
            var date = new Date();
            var resultToWrite = {
                createdAt: date.toString(),
                result: result
            }
            var wrt = fileManager.writeFile('infoResult/actions.json', resultToWrite)

            var rai = renderer.renderActionInfo({data:resultToWrite},'infoResult/actions.html')

            Promise.all([wrt,rai])
            .then(function () {
                    console.log('Success');
                }, function (err) {
                    console.log('Write error ', err)
                })
        }, function (err) {
            console.log('action fetch error ', err);
        })
}

function triggerIterator(data) {
    return data.map(function (obj) {
        return {
            name: obj.name,
            events: extractEvent(JSON.parse(obj.input))
        }
    })
}

function extractEvent(schema) {
    return schema.oneOf.map(function (obj) {
        return {
            event_name: obj.properties.event.enum[0],
            title: obj.title
        }
    })
}