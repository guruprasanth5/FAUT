let is = {
	object: function (instance) {
		return (typeof (instance) === 'object' && !Array.isArray(instance) && instance !== undefined && instance !== null)
	},

	array: function (instance) {
		return (typeof (instance) === 'object' && Array.isArray(instance))
	},

	string: function (instance) {
		return (typeof (instance) === 'string')
	},

	boolean: function (instance) {
		return (instance === true || instance === false);
	},

	number: function (instance) {
		return (typeof (instance) === 'number');
	},

	integer: function (instance) {
		return (is.number(instance) && (instance % 1 === 0));
	},

	undefinedOrNull: function (instance) {
		return (instance === undefined || instance === null)
	}
}

let promiseCreate = function (cb) {

	return function () {
		var args = Array.prototype.slice.call(arguments);
		var self = this;
		return new Promise(function (resolve, reject) {
			cb.apply(self, args.concat([resolve, reject]))
		})
	}
}

module.exports = {
	is,
	promiseCreate:promiseCreate
}