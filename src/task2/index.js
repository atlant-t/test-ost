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
		result.push([i[1]].concat(i[2].split(',')));
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
	var element = document.querySelectorAll('#form').elements;
	var keys = {};
	var result = [];
	for (var i = 0; i < element.length; i++) {
		var name, value;
		name = element[i].getAttribute('name')
			|| element[i].parentElement.getAttribute('name');
		if (element[i] instanceof HTMLInputElement) {
			if (element[i].checked) {
				if (!keys[name]) keys[name] = [];
				keys[name].push(element[i].getAttribute('value'));
			}
		} else if (element[i] instanceof HTMLOptionElement) {
			if (element[i].selected) {
				if (!keys[name]) keys[name] = [];
				keys[name].push(element[i].getAttribute('value'));
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

document.addEventListener('DOMContentLoaded', f);
