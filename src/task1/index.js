function f() {
	listInputs = document.querySelectorAll(".js_name");
	listInputs.forEach(function(input){
		new NameInput(input);
	});
};

document.addEventListener('DOMContentLoaded', f);

class NameInput {
	constructor(element) {
		this._element     = element;
		this._valideValue = element.getAttribute('value')
		document.addEventListener(
			'input',
			event => {if (event.target == this._element) this._onInput()}
		);
	}
	_onInput(event) {
		if (this._isValidated(this._element.value)) {
			this._element.classList.remove('red');
		} else {
			this._element.classList.add('red');
		}
	}
	_isValidated(str) {
		return str === this._valideValue
	}
};
