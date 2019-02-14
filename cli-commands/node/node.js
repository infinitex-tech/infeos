const fs = require('fs');
const path = require('path');

const defaultSetupNodeFilePath = path.normalize('/config/node_config.js');
const configIniFilePath = path.normalize('config/config.ini');

const infeos_config = require('./../../core/config/infeos_config.json');

const shell = require('shelljs');

const runLocal = () => {
	copyConfigIniFile();

	let dockerContainerName = infeos_config.docker.EOS.containerName;
	let dockerImageName = infeos_config.docker.EOS.containerImageName;
	let nodeosPort = infeos_config.network.nodeosPort;
	let nodeosEnvironment = 'main';

	if (process.platform !== 'darwin') {
		let startScriptPath = path.join(__dirname, '/../../core/scripts/start_windows.sh');
		shell.exec(`sh ${startScriptPath} ${dockerContainerName} ${dockerImageName} ${nodeosPort} ${nodeosEnvironment} &`);
	} else {
		let startScriptPath = path.join(__dirname, '/../../core/scripts/start.sh');
		shell.exec(`sh ${startScriptPath} ${dockerContainerName} ${dockerImageName} ${nodeosPort} ${nodeosEnvironment} &`);
	}
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
	let configIniFile = path.join(process.cwd(), configIniFilePath);
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