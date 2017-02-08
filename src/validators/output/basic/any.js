
var any = function(type,context,schema,path,isParentArray){
    var error = [];

    if(!schema.hasOwnProperty('displayTitle') && !isParentArray){
		error.push({
			message :"type any should have 'displayTitle' key.",
			path    :path
		})
	}

    return error;
}

module.exports = any