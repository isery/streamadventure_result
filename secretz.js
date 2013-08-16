var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var parser = tar.Parse();
var through = require('through');

parser.on('entry', function (entry) {
	if (entry.type != 'File') {
		return;
	}
	var hash = crypto.createHash('md5', { encoding: 'hex' });
	var end = function () {
		this.queue(' ' + entry.path + '\n')
	}
	entry.pipe(hash).pipe(through(null, end)).pipe(process.stdout);
});

var decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);

process.stdin.pipe(decrypt).pipe(zlib.createGunzip()).pipe(parser);
