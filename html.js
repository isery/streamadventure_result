var trumpet = require('trumpet');
var through = require('through');
var trumpet = trumpet();

var write = function (buffer) {
	this.queue(buffer.toString().toUpperCase());
};

var tr = through(write);
var element = trumpet.select('.loud').createStream();
element.pipe(tr).pipe(element);

process.stdin.pipe(trumpet).pipe(process.stdout);