const fs = require('fs');
const path = require('path');
const logger = require('./../../utils/logger/logger').logger;

const defaultSetupNodeFilePath = '/config/node_config.js';
const configIniFilePath = 'config/config.ini';

const shell = require('shelljs');

const runLocal = () => {
	copyConfigIniFile();

	const startScriptPath = path.join(__dirname, '/../../core/scripts/start.sh');

	let dockerContainerName = 'dev_EOS_node';
	let dockerImageName = 'infinitexlabs/eos-dev-infeos:v1.6.0';
	let nodeosPort = 8888;
	let nodeosEnvironment = 'main';

	shell.exec(`sh ${startScriptPath} ${dockerContainerName} ${dockerImageName} ${nodeosPort} ${nodeosEnvironment} &`);
};

const runTestnet = () => {
	throw new Error("Not yet implemented");
};

const runMainnet = () => {
	throw new Error("Not yet implemented");
}

const setupNode = () => {
	const nodeConfigFile = path.join(process.cwd(), defaultSetupNodeFilePath); // use path
	const nodeConfig = require(nodeConfigFile);

	nodeConfig.run();
}

const runNode = () => {
	runLocal();
	setupNode();
}

const copyConfigIniFile = () => {
	let configIniFile = `${process.cwd()}/${configIniFilePath}`;
	let configFolderPath = path.join(__dirname, '/../../core/scripts/config');
	let mainConfigFolderPath = path.join(configFolderPath, '/main');

	if (!fs.existsSync(configFolderPath)) {
		fs.mkdirSync(configFolderPath);
	}

	if (!fs.existsSync(mainConfigFolderPath)) {
		fs.mkdirSync(mainConfigFolderPath);
	}

	let configIniFileDestination = path.join(mainConfigFolderPath, '/config.ini');
	fs.copyFileSync(configIniFile, configIniFileDestination);
}

const run = async () => {
	try {
		runNode();
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};