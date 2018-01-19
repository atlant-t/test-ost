function f() {
	var frame = document.querySelector('#frame');

	frame.onload = function() {
		var db = new Database(frame);
		db.setLocalStorage({key: 'value'}, function(res) {console.log(res)})
		db.removeLocalStorage(['name'], function(res) {console.log(res)})
	}
}

class Database {
	constructor(frame) {
		this._idCounter = 0;
		this._frame     = frame;
		this._name      = frame.id;
		this._source    = frame.src;
	}
	_generateId() {
		return this._name + '_' + this._idCounter++;
	}
	_send(data, callback) {
		this._frame.contentWindow.postMessage(data, this._source);

		if (callback) {
			let handler = event => {
				if (event.source !== this._frame.contentWindow) return;
				if (event.data._id !== data._id) return;
				window.removeEventListener('message', handler);
				callback(event.data.data);
			}
			window.addEventListener('message', handler)
		}
	}
	setLocalStorage(data, callback) {
		let dataSetLocalStorage = {
			_id: this._generateId(),
			command: 'setLocalStorage',
			data: data
		};
		this._send(dataSetLocalStorage, callback);
	}
	removeLocalStorage(data, callback) {
		var dataRemoveLocalStorage = {
			_id: this._generateId(),
			command: 'removeLocalStorage',
			data: data
		};
		this._send(dataRemoveLocalStorage, callback);
	}
}

document.addEventListener('DOMContentLoaded', f);
