var utils = require('../../../utils');

var array = function(type,context,schema,path,isParentArray){
	
	var error = [];
	if(schema.hasOwnProperty('items')){

		if(utils.is.object(schema.items)){

			if(schema.items.type){
				if(type[schema.items.type]){
					error = error.concat(type[schema.items.type](type,context,schema.items,path.concat(['items']),true))
				}else{
					error.push({
						message :"'items' in type 'array' should have a matching type.",
						path    :path.concat(['items'])
					})
				}
			}
			// else{
			// 	error.push({
			// 		message :"'items' in type 'array' should have a 'type' key.",
			// 		path    :path.concat(['items'])
			// 	})
			// }
		}else{
			error.push({
				message :"'items' in type 'array' should be an object.",
				path    :path
			})	
		}
	}else{
		error.push({
			message :"type array should have 'items' key.",
			path    :path
		})
	}

	if(!schema.hasOwnProperty('displayTitle') && !isParentArray){
		error.push({
			message :"type array should have 'displayTitle' key.",
			path    :path
		})
	}

	return error;
}

module.exports = array;