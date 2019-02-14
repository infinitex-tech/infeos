const fs = require('fs');
const path = require('path');
const logger = require('./../../utils/logger/logger').logger;

const deployerFilePath = path.normalize('deployment/deploy.js');

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
		deploySmartContract();
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};