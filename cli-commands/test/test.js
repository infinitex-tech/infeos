const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const dir = require('node-dir');
const infeosTest = require('./infeos-test');
const testConfigIniFilePath = 'config/test_config.ini';

const runTestNode = () => {
	throw new Error('Not yet implemented');

	const startScriptPath = path.join(__dirname, '/../../core/scripts/start.sh');

	let dockerContainerName = 'test_EOS_node';
	let dockerImageName = 'infinitexlabs/eos-dev-infeos:latest';
	let nodeosPort = 7777;
	let nodeosEnvironment = 'test';

	shell.exec(`sh ${startScriptPath} ${dockerContainerName} ${dockerImageName} ${nodeosPort} ${nodeosEnvironment}`);
};

const copyTestConfigIniFile = () => {
	let testConfigIniFile = path.join(process.cwd(), testConfigIniFilePath);
	let configFolderPath = path.join(__dirname, '/../../core/scripts/config');
	let testConfigFolderPath = path.join(configFolderPath, '/test');

	if (!fs.existsSync(configFolderPath)) {
		fs.mkdirSync(configFolderPath);
	}

	if (!fs.existsSync(testConfigFolderPath)) {
		fs.mkdirSync(testConfigFolderPath);
	}

	let configIniFileDestination = path.join(testConfigFolderPath, '/test_config.ini');
	fs.copyFileSync(testConfigIniFile, configIniFileDestination);
	fs.renameSync(configIniFileDestination, configIniFileDestination.replace('test_config', 'config'))
}

const getTestFiles = async function (testDirectory) {

	return new Promise((resolve, reject) => {
		dir.files(testDirectory, (error, files) => {
			if (error) {
				reject(new Error(error));

				return;
			}

			files = files.filter(function (file) {
				return file.match(/.*\.(js)$/) != null;
			});

			resolve(files);
		});
	});
}

const run = async (path) => {
	copyTestConfigIniFile();

	if (path.includes('.js')) {
		await infeosTest.run([path]);

		return;
	}

	const files = await getTestFiles(path);
	await infeosTest.run(files);
}

module.exports = {
	run
}