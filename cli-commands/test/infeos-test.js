var Mocha = require("mocha");
var chai = require("chai");
var originalRequire = require("original-require");

// chai.use(require("./assertions"));

const createMocha = (config, files) => {
	var mocha = new Mocha(config);

	files.forEach(file => {
		mocha.addFile(file);
	});

	return mocha;
}

const runMocha = async (mocha) => {
	return new Promise((resolve, reject) => {
		mocha.run(failures => {
			process.exitCode = failures ? -1 : 0;
			if (failures) {
				reject()
			} else {
				resolve()
			}
		});
	})
}

const setJSTestGlobals = () => {
	global.assert = chai.assert;
	global.expect = chai.expect;
}

const run = async (files) => {
	var mochaConfig = { 'useColors': true, 'timeout': 15000 };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	setJSTestGlobals();

	await runMocha(mocha);
};

module.exports = {
	run
};