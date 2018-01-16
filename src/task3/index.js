!function f() {
	var counter = 0;
	request(response);
	request(response);
	function response(result) {
		if (++counter === 2) {
			console.log('Оба ответа получено');
		}
	}
}()

function request(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'file1.txt', true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		callback(xhr.responseText);
	}
}
