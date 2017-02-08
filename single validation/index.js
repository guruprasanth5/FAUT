var ngrok = require('ngrok');
var app = require('express')();
var bodyParser = require('body-parser')
var config = require('../config');
var validateHelper = require('./validationHelper');


ngrok.connect(config.port, function (err, url) {
    if (err) {
        console.log('Error ', err)
        return;
    }
    console.log('ngrok url', url)

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.post('/', function (req, res) {
        var body = req.body;
        var errors = validateBody(body);
        if(errors.length){
            return res.status(400).send({errors:errors});
        }

        if(body.type === 'trigger'){
            validateHelper.validateTrigger(body).then(function(){
                res.status(200).send('done');
            },function(err){
                res.status(400).send(err);
            });
        }else{
            validateHelper.validateAction(body).then(function(){
                res.status(200).send('done');
            },function(err){
                res.status(400).send(err);
            });
        }
    })

    app.listen(config.port, function (err) {
        console.log('App listening on ', config.port);
    })

});

function validateBody(body){
    var errors = [];
    if(!body.name){
        errors.push('"name" key is missing.')
    }
    if(!body.type){
        errors.push('"type" key is missing')
    }else if(['trigger','action'].indexOf(body.type) === -1){
        errors.push('invalid "type"')
    }else if(body.type === 'trigger' && !body.event){
        errors.push('"type" trigger should have a "event" key')
    }

    if(!body.output){
        errors.push('"output" key is missing')
    }

    return errors;
}
/**
 * {
 *      name:'box',
 *      type:'trigger'/'action',
 *      event:'new_folder',
 *      output:{{$a1}}
 * }
 */
