
let inputSchema = require('./stub/input');
let outputSchema = require('./stub/output');
let mockSchema = require('./stub/mock');

let inputValidator = require('./src/validators/input');
let outputValidator = require('./src/validators/output');
let mockValidator = require('./src/validators/mock');
let fileManager = require('./src/fileManager');
let fetch = require('./fetch');
let batchManager = require('./batchManager');
let utils = require('./src/utils');

let inputResultPath = './result/input.json'
let outputResultPath = './result/output.json'
let mockResultPath = './result/mock.json'

function validateInputSchema(ISchema, inputResultPath, name, version) {
    let date = new Date();

    let dataToWrite = {
        name: name,
        version: version,
        createdAt: date.toString(),
        errors: inputValidator(ISchema)
    }
    return fileManager.writeFile(inputResultPath, dataToWrite)

}

function validateOutputSchema(OSchema, outputResultPath, name, version) {
    let date = new Date();

    let dataToWrite = {
        name: name,
        version: version,
        createdAt: date.toString(),
        errors: outputValidator(OSchema)
    }
    return fileManager.writeFile(outputResultPath, dataToWrite)

}

function validateMockData(OSchema, mockData, mockResultPath, name, version) {
    let date = new Date();
    let outputKeys = Object.keys(OSchema);
    let mockKeys = Object.keys(mockData);

    let errors = validateMockAndOutputKeys(outputKeys, mockKeys);
    return outputKeys.map(function (key) {
        if (!mockData[key]) {
            return;
        }
        let dataToWrite = {
            name: name,
            version: version,
            createdAt: date.toString(),
            errors: errors.concat(mockValidator(OSchema[key], mockData[key]))
        }
        return fileManager.writeFile(mockResultPath + '/mock-' + key + '.json', dataToWrite)
    })

}

function validateMockAndOutputKeys(outputKeys, mockKeys) {
    var errors = [];

    errrors = outputKeys.map(function (key) {
        if (mockKeys.indexOf(key) === -1) {
            return {
                message: "'" + key + "' event is missing in mock data",
                path: []
            }
        }
    })

    errrors = mockKeys.map(function (key) {
        if (outputKeys.indexOf(key) === -1) {
            return {
                message: "'" + key + "' event is missing in output data",
                path: []
            }
        }
    }).concat(errrors);

    return errrors.filter(function (x) { return x; })
}

// validateInputSchema(inputSchema);
// validateOutputSchema(outputSchema);
// validateMockData(outputSchema,mockSchema)

function validateAllTriggers() {
    console.log('Starting All Trigger Validation.')
    fetch.getTriggers()
        .then(function (response) {
            console.log('getTriggers', response.entity.length);

            batchManager(response.entity, 1, validateTrigger)
                .then(function (data) {
                    console.log('over', data);
                });
        }, function (err) {
            console.log('err', err);
        });
}

function validateTrigger(trigger, resolve, reject) {
    var folderPath = 'result/triggers/' + trigger.title;

    console.log('Trigger Title', trigger.title);

    fileManager.createFolder(folderPath);

    let input = typeof (trigger.input) === 'string' ? JSON.parse(trigger.input) : trigger.input;
    var output = typeof (trigger.output) === 'string' ? JSON.parse(trigger.output) : trigger.output;
    var mock = typeof (trigger.mock_data) === 'string' ? JSON.parse(trigger.mock_data) : trigger.mock_data;

    var vip = validateInputSchema(input, folderPath + '/input.json', trigger.title, trigger.version);

    var vop = Object.keys(output).map(function (key) {
        return validateOutputSchema(output[key], folderPath + '/output-' + key + '.json', trigger.title + '-' + key, trigger.version);
    })
    var vmp = validateMockData(output, mock, folderPath, trigger.title, trigger.version);

    Promise.all(vop.concat(vip, vmp))
        .then(function (data) {
            resolve(data)
        })
}

function validateAllActions() {
    console.log('Starting All Action Validation.')

    fetch.getActions()
        .then(function (response) {
            console.log('getTriggers', response.entity.length);
            // response.entity.map(function(trigger){
            batchManager(response.entity, 10, validateAction)
                .then(function (data) {
                    console.log('over', data);
                });
        }, function (err) {
            console.log('err', err);
        });
}

function validateAction(action, resolve, reject) {
    var folderPath = 'result/actions/' + action.name;
    // console.log('Action Title', action.name);

    fileManager.createFolder(folderPath);

    var output = typeof (action.input) === 'string' ? JSON.parse(action.output) : action.output;

    var input = typeof (action.input) === 'string' ? JSON.parse(action.input) : action.input;

    var vip = validateInputSchema(input, folderPath + '/input.json', action.name, action.version);

    var vop = validateOutputSchema(output, folderPath + '/output.json', action.name, action.version);

    Promise.all([vop, vip])
        .then(function (data) {
            resolve(data)
        })
}

function deleteAllTriggers() {

    var path = 'result/triggers/*';
    exec('rm -r ' + path, function (err, stdout, stderr) {
        if (err) {
            return console.log(err)
        }

        console.log('Triggers Deleted Successfully')
    });
}

function deleteAllActions() {

    var path = 'result/actions/*';
    exec('rm -r ' + path, function (err, stdout, stderr) {
        if (err) {
            return console.log(err)
        }

        console.log('Actions Deleted Successfully')
    });
}

function runSingleAction(action,path) {

    var folderPath = path+ action.label;
    // console.log('Action Title', action.name);

    fileManager.createFolder(folderPath);

    var output = typeof (action.input) === 'string' ? JSON.parse(action.output) : action.output;

    var input = typeof (action.input) === 'string' ? JSON.parse(action.input) : action.input;

    var vip = validateInputSchema(input, folderPath + '/input.json', action.name, action.version);

    var vop = validateOutputSchema(output, folderPath + '/output.json', action.name, action.version);

    return Promise.all([vop, vip])
}

function runSingleTrigger(trigger, event, path) {
    var folderPath = path + trigger.title;

    console.log('Trigger Title', trigger.title, folderPath);

    fileManager.createFolder(folderPath);

    let input = typeof (trigger.input) === 'string' ? JSON.parse(trigger.input) : trigger.input;
    var output = typeof (trigger.output) === 'string' ? JSON.parse(trigger.output) : trigger.output;
    var mock = typeof (trigger.mock_data) === 'string' ? JSON.parse(trigger.mock_data) : trigger.mock_data;

    var vip = validateInputSchema(input, folderPath + '/input.json', trigger.title, trigger.version);

    var vop = validateOutputSchema(output[event], folderPath + '/output-' + event + '.json', trigger.title + '-' + event, trigger.version);

    var vmp = validateAndWriteMockErrors(output[event], mock[event], event, folderPath, trigger.title + '-' + event, trigger.version);

    return Promise.all([vop, vip, vmp])
}

function validateAndWriteMockErrors(OSchema, mockData, event, mockResultPath, name, version) {
    var date = new Date();
    let dataToWrite = {
        name: name,
        version: version,
        createdAt: date.toString(),
        errors: mockValidator(OSchema, mockData)
    }
    return fileManager.writeFile(mockResultPath + '/mock-' + event + '.json', dataToWrite)
}

module.exports = {
    validateAllTriggers: validateAllTriggers,
    validateAllActions: validateAllActions,
    deleteAllActions: deleteAllActions,
    deleteAllTriggers: deleteAllTriggers,
    runSingleTrigger: runSingleTrigger,
    runSingleAction:runSingleAction
}

// runSingleTrigger('./src/box-trigger')
// .then(function(data){
//     console.log('sdsd',data)
// },function(err){
//     console.log('err',err)
// })


// validateAllTriggers()
// validateAllActions();