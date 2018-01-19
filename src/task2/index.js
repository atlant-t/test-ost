function f() {
	var data = parceStr(location.search);

	if (data) {
		for (var i = 0; i < data.length; i++) {
			for (var v = 1; v < data[i].length; v++) {
				check(data[i][0], data[i][v])
			}
		}
	}
	document.querySelector('#form').addEventListener('change', log);
}

function parceStr(str) {
	var result = [];
	var reg = /\??([^=]*)=([^&]*)[&]?/g;
	var i;
	while (i = reg.exec(str)) {
		result.push([i[1]].concat(
			i[2]
			.replace(/%([^;]*);/g, function(str, char) {return decodeChar(+char)})
			.split(',')
		));
	}
	return result.length ? result : null;
}

function check(name, value) {
	var selector = "[name=" + name + "][value='" + value + "']"
			+"," + "[name=" + name + "]>[value='" + value + "']";
	var element = document.querySelector(selector);
	if (!element) {
		console.log("Cannot found element")
	}
	if (element instanceof HTMLInputElement) {
		element.checked = true;
	}
	else if (element instanceof HTMLOptionElement) {
		element.selected = true;
	}
	else {
		console.log("I don't know whot is the element. " + "name" + "=" + value);
	}
}

function log() {
	var element = document.querySelector('#form').elements;
	var keys = {};
	var result = [];
	for (var i = 0; i < element.length; i++) {
		var name, value;
		name = element[i].getAttribute('name')
			|| element[i].parentElement.getAttribute('name');
		if (element[i] instanceof HTMLInputElement) {
			if (element[i].checked) {
				if (!keys[name]) keys[name] = [];
				keys[name].push(element[i].getAttribute('value')
					.replace(/[^\s\w]/g, encodeChar)
				);
			}
		} else if (element[i] instanceof HTMLSelectElement) {
			var selectedList = element[i].selectedOptions;
			if (selectedList.length && !keys[name]) keys[name] = [];
			for (var n = 0; n < selectedList.length; n++) {
				keys[name].push(selectedList[n].getAttribute('value')
					.replace(/[^\s\w]/g, encodeChar)
				);
			}
		}
	}
	for (var key in keys) {
		if (result.hasOwnProperty(key)) continue;
		if (key === 'sale') continue;
		result.push(key + '=' + keys[key].join(','));
	}
	console.log(location.origin + location.pathname + '?' + result.join('&'));
}

function encodeChar(char) {
	return '%' + char.charCodeAt(0) + ';';
}
function decodeChar(code) {
	return String.fromCharCode(code);
}

document.addEventListener('DOMContentLoaded', f);
