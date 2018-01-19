class Storage {
	constructor() {
		window.addEventListener('message', event => {
			if (event.origin !== 'http://localhost:3000') return;

			let result = {};
			result._id  = event.data._id;
			result.data = this[event.data.command](event.data.data);

			event.source.postMessage(result, event.origin);
		})
	}
	setLocalStorage(data) {
		for (var key in data) {
			if (!data.hasOwnProperty(key)) continue;

			let value = data[key];
			if (typeof value !== 'string')
				value = JSON.stringify(value);
			localStorage.setItem(key, value);
			return 'written'
		}
	}
	removeLocalStorage (data) {
		for (var key of data) {
			localStorage.removeItem(key);
			return 'removed'
		}
	}
}

!function f() {
	new Storage
}();
