/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
'use strict';

var babel = require('@babel/core');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

exports.transformFiles = function(baseDir, fileList, outputDir, options) {
	var pass = true;
	fileList.forEach(function(inFilename) {
		process.stdout.write('.');
		var outFilename = outputDir + '/' + inFilename.replace(baseDir + '/', '');
		outFilename = path.dirname(outFilename) + '/' + path.basename(inFilename, path.extname(inFilename)) + '.js';
		pass = transformOneFile(inFilename, outFilename, options) && pass;
	});
	process.stdout.write('\n');
	return pass;
};

function transformOneFile(inFilename, outFilename, options) {
	try {
		var input = fs.readFileSync(inFilename, { encoding: 'utf8' });
		var output = babel.transform(input, options);
		shell.mkdir('-p', path.dirname(outFilename));
		fs.writeFileSync(outFilename, output.code, { encoding: 'utf8' });
		return true;
	}
	catch(error) {
		console.log('\n' + inFilename + ' failed');
		console.log('line ' + error.loc.line + ', col ' + error.loc.column + ': ' + error.code);
		return false;
	}
}
