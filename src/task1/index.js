function f() {
	listInputs = document.querySelectorAll(".js_name");
	listInputs.forEach(function(input){
		input.addEventListener('input', inner)
	});
}
function inner(event) {
	var element = event.target,
		value = element.getAttribute('value')
	var setValue = element.value

	if (value !== setValue) {
		element.classList.add('red');
	} else {
		element.classList.remove('red');
	}

	console.log(setValue)
}
document.addEventListener('DOMContentLoaded', f)
