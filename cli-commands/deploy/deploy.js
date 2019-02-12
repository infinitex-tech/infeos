const fs = require('fs');
const logger = require('./../../utils/logger/logger').logger;

const buildDirectory = './build';
const deployerFilePath = 'deployment/deploy.js';

const createBuildFolder = () => {
	if (!fs.existsSync(buildDirectory)) {
		fs.mkdirSync(buildDirectory);
	}
}

const deploySmartContract = () => {
	logger.logInfo('===============> Deploying EOS smart contract');

	const deployerFile = `${process.cwd()}/${deployerFilePath}`;
	const deployerModule = require(deployerFile);

	deployerModule.run();
}

const run = async () => {

	try {
		createBuildFolder();
		deploySmartContract();
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};