function f() {
	var data = parseStr(location.search);

	let formElem = document.querySelector('#form')
	let form = new ProductForm(formElem, generateOption(data));
	log(form.getSetting());

	document.addEventListener('change', (event) => {
		if (event.target.form && event.target.form === formElem) {
			log(form.getSetting());
		}
	});
}

class ProductForm {
	constructor(form, setting) {
		this._element = form;
		if (setting) this.setSetting(setting);
	}
	getSetting() {
		let field = this._element.elements,
			setting = {};
		for (var i = 0; i < field.length; i++) {
			let name, value;
			name = field[i].getAttribute('name')
			if (field[i] instanceof HTMLInputElement) {
				if (field[i].checked) {
					if (!setting[name]) setting[name] = [];
					setting[name].push(field[i].getAttribute('value'));
				}
			} else if (field[i] instanceof HTMLSelectElement) {
				let selectedList = field[i].selectedOptions;
				if (selectedList.length && !setting[name]) setting[name] = [];
				for (var n = 0; n < selectedList.length; n++) {
					setting[name].push(selectedList[n].getAttribute('value'));
				}
			}
		}
		return setting
	}
	setSetting(setting) {
		let values;
		for (var key in setting) {
			if (!setting.hasOwnProperty(key)) continue;
			values = setting[key]
			if (!(values instanceof Array)) values = [values]
			for (let val of values) {
				let elem = this._findElement(key, val)
				this._check(elem, true);
			}
		}
	}
	_check(element, toggleTo) {
		if (element instanceof HTMLInputElement) {
			element.checked = toggleTo
		} else if (element instanceof HTMLOptionElement) {
			element.selected = toggleTo;
		}
	}
	_findElement(key, value) {
		let keyField = this._element.elements[key];
		if (keyField instanceof RadioNodeList) {
			for (let elem of keyField) {
				if (elem instanceof HTMLSelectElement) {
					let option = this._getOption(value, elem);
					if (option) return option;
				}
				if (elem.getAttribute('value') === value)
					return elem;
			}
		}
		let elem = keyField
		if (elem instanceof HTMLSelectElement) {
			let option = this._getOption(value, elem);
			if (option) return option;
		}
		if (elem.getAttribute('value') === value)
			return elem;
	}
	_getOption(opt, select) {
		for (let optElem of select) {
			if (optElem.getAttribute('value') === opt)
				return optElem;
		}
	}
}

function generateOption(data) {
	let option = {};
	if (!data) return;
	for (var i = 0; i < data.length; i++) {
		option[data[i][0]] = data[i].slice(1)
	}
	return option
}

function parseStr(str) {
	var result = [];
	var reg = /\??([^=]*)=([^&]*)[&]?/g;
	var i;
	while (i = reg.exec(str)) {
		result.push([i[1]].concat(decodeURIComponent(i[2]).split(',')));
	}
	return result.length ? result : null;
}

function log(setting) {
	let result = [],
		resultStr;
	for (var key in setting) {
		if (!setting.hasOwnProperty(key)) continue;
		if (key === 'sale') continue;
		result.push(key + '=' + setting[key].map(k => encodeURIComponent(k)).join(','));
	}
	resultStr = result.length ? '?' + result.join('&') : '';
	console.log(location.origin + location.pathname + resultStr);
}

document.addEventListener('DOMContentLoaded', f);
