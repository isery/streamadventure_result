var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var parser = tar.Parse();
var through = require('through');

parser.on('entry', function (entry) {
	if (entry.type != 'File') {
		return;
	}
	var md5Hash = crypto.createHash('md5', { encoding: 'hex' });
	var write = function () {
		this.queue(md5Hash.update(entry));
	}
	var end = function () {
		this.queue(' ' + entry.path + '\n')
	}
	entry.pipe(through(write,null)).pipe(through(null, end)).pipe(process.stdout);
})

var decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);

process.stdin.pipe(decrypt).pipe(zlib.createGunzip()).pipe(parser);
