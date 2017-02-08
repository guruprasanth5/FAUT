var utils = require('../../../utils'); 

var type = require('./type');

var validator = function(schema){

	if(utils.is.object(schema)){

		var errors = [];
		if(schema.oneOf){
			errors = errors.concat(type.oneOf(type,schema,schema.oneOf,['oneOf']))
		}
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

	return [];
}

module.exports = validator;