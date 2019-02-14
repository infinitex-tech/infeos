const fs = require('fs');
const path = require('path');

const infeos = require('infeos').init();
const infeosConfigFilePath = path.normalize('config/infeos_config.json');

const buildDirectory = path.normalize('./build');

const compile = (abi) => {
    let contractName = getMasterContractName();

    let contractDeployer = new infeos.EOSIODeployer(contractName, null, abi);
    contractDeployer.compile();
}

const createBuildFolder = () => {
	if (!fs.existsSync(buildDirectory)) {
		fs.mkdirSync(buildDirectory);
	}
}

const getMasterContractName = () => {
    copyInfeosConfigFile();

    let infeosConfig = require('./infeos_config.json');

    return infeosConfig.masterContract;
}

const copyInfeosConfigFile = () => {
	let infeosConfigFile = path.join(process.cwd(), infeosConfigFilePath);
	let configFolderPath = __dirname;

	let infeosConfigFileDestination = path.join(configFolderPath, '/infeos_config.json');
	fs.copyFileSync(infeosConfigFile, infeosConfigFileDestination);
}

const run = async (abi) => {

	try {
        createBuildFolder();
		compile(abi);
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};