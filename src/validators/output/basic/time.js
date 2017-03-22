var utils = require('../../../utils');

var time = function(type,context,schema,path,isParentArray){
    var error = [];

    if(!(schema.options && schema.options.hidden) && !schema.hasOwnProperty('displayTitle') && !isParentArray){
		error.push({
			message :"type boolean should have 'displayTitle' key.",
			path    :path
		})
	}

    return error;
}

module.exports = time;