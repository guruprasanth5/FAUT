var utils = require('../../../utils'); 

var type = require('./type');

var validator = function(schema){

	if(utils.is.object(schema)){

		var errors = [];
		if(schema.type && type[schema.type]){
			errors = errors.concat(type[schema.type](type,schema,schema,[]))
		}else{
			errors = [{
			message:"Schema should have type key.",
			path:[]
		}]
		}
		return errors;

	}else{
		
		return [{
			message:"Schema should be an object.",
			path:[]
		}]
	}
}

module.exports = validator;