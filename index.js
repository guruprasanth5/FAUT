var exec = require('child_process').exec;
var schemaOnlyValidator = require('./schemaOnlyValidator');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter "1" to validate all triggers \nEnter "2" to validate all actions\nEnter "3" to delete all actions \nEnter "4" to delete all triggers\n', (answer) => {
    // TODO: Log the answer in a database
    // console.log(answer, typeof (answer));
    run(rl, answer);
    // rl.close();
});

function run(rl, answer) {
    switch (answer) {
        case '1':
            rl.close()
            schemaOnlyValidator.validateAllTriggers();
            break;

        case '2':
            rl.close()
            schemaOnlyValidator.validateAllActions();
            break;

        case '3':
            rl.close()
            schemaOnlyValidator.deleteAllActions();
            break;

        case '4':
            rl.close()
            schemaOnlyValidator.deleteAllTriggers();
            break;

        default:
            console.log('Invaid choice. Re-run again.')
            rl.close()
            break;
    }
}


