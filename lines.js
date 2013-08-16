var split = require('split');
var through = require('through');
var toggle = true;

var write = function (line) {
	if (toggle) {
		this.queue(line.toString().toLowerCase());
		toggle = !toggle;
	}
	else {
		this.queue(line.toString().toUpperCase());
		toggle = !toggle;
	}
	this.queue('\n');
};

var tr = through(write);

process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);


