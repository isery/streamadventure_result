var http = require('http');
var through = require('through');

var write = function (buffer) {
	this.queue(buffer.toString().toUpperCase());
};

var tr = through(write);

var server = http.createServer(function (request, response) {
	if (request.method == 'POST') {
		request.pipe(tr).pipe(response);
	}
})
server.listen(8000);