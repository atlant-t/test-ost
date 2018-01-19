!function f() {
	new Storage
}();

function Storage() {
	var safe = this;
	window.addEventListener('message', function(e) {
		if (e.origin !== 'http://localhost:3000') return;

		var result = {};
		result._id  = e.data._id;
		result.data = safe[e.data.command](e.data.data);

		e.source.postMessage(result, e.origin);
	});
}
Storage.prototype.setLocalStorage = function(data) {
	for (var key in data) {
		if (!data.hasOwnProperty(key)) continue;

		var value = data[key]
		if (typeof value !== 'string')
			value = JSON.stringify(value);

		localStorage.setItem(key, value);
		return 'written'
	}
}
Storage.prototype.removeLocalStorage = function(data) {
	for (var key of data) {
		if (typeof key !== 'string') continue;

		localStorage.removeItem(key);
		return 'removed'
	}
}
