function f() {
	var frame = document.querySelector('#frame');

	frame.onload = function() {
		var db = new Database(frame);
		db.setLocalStorage({key: 'value'}, function(res) {console.log(res)})
		db.removeLocalStorage(['name'], function(res) {console.log(res)})
	}
}

function Database(frame) {
	this._name = frame.id;
	this._source = frame.src;
	this._frame = frame;
}
Database.prototype._idCounter = 0;
Database.prototype._frame;
Database.prototype._source;
Database.prototype._generateId = function() {
	return this._name + '_' + this._idCounter++;
}
Database.prototype._send = function(data, callback) {
	var safe = this;

	this._frame.contentWindow.postMessage(data, this._source);

	if (callback) {
		function handler(e) {
			if (e.source !== safe._frame.contentWindow) return;
			if (e.data._id !== data._id) return;
			window.removeEventListener('message', handler);
			callback(e.data.data);
		}
		window.addEventListener('message', handler)
	}
}
Database.prototype.setLocalStorage = function(data, callback) {
	var dataSetLocalStorage = {
		_id: this._generateId(),
		command: 'setLocalStorage',
		data: data
	};
	this._send(dataSetLocalStorage, callback);
}
Database.prototype.removeLocalStorage = function(data, callback) {
	var dataSetLocalStorage = {
		_id: this._generateId(),
		command: 'removeLocalStorage',
		data: data
	};
	this._send(dataSetLocalStorage, callback);
}

document.addEventListener('DOMContentLoaded', f);
