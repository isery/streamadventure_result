var concat = require('concat-stream');


var reverse = concat(function(buffer) {
	var data = buffer.toString();
	var reverse = data.split('').reverse().join('');
	console.log(reverse);
});

process.stdin.pipe(reverse);