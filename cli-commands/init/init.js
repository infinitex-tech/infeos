const fs = require('fs');
const logger = require('./../../utils/logger/logger').logger;

const contractsDirectory = './contracts';
const includeDirectory = './contracts/include';
const includeSubfolderDirectory = `${includeDirectory}/universe`;
const ricardianContractsDirectory = './contracts/rc';
const sourceDirectory = './contracts/src';

const smartContractHeaderDestination = `${includeSubfolderDirectory}/universe.hpp`;
const smartContractImplementationDestination = `${sourceDirectory}/universe.cpp`;
const subSmartContractPlanetImplementationDestination = `${sourceDirectory}/universe.planet.cpp`;
const subSmartContractStarImplementationDestination = `${sourceDirectory}/universe.star.cpp`;
const smartContractAbiDestination = `${sourceDirectory}/universe.abi`;
const ricardianContractDestination = `${ricardianContractsDirectory}/universe_rc.md`;
const typesContractHeaderDestination = `${includeSubfolderDirectory}/types.hpp`;

const testsDirectory = './test';
const configDirectory = './config'

const createContractsFolder = () => {
    logger.logInfo('===============> Creating contracts file structure');
    
	if (!fs.existsSync(contractsDirectory)) {
		fs.mkdirSync(contractsDirectory);
	}
};

const createSubfolders = () => {
	logger.logInfo('===============> Creating subfolders');

	if (!fs.existsSync(includeDirectory)) {
		fs.mkdirSync(includeDirectory);
	}

	if (!fs.existsSync(includeSubfolderDirectory)) {
		fs.mkdirSync(includeSubfolderDirectory);
	}

	if (!fs.existsSync(ricardianContractsDirectory)) {
		fs.mkdirSync(ricardianContractsDirectory);
	}

	if (!fs.existsSync(sourceDirectory)) {
		fs.mkdirSync(sourceDirectory);
	}
}

const copyResourceFiles = (libraryDirectory) => {
	if (fs.existsSync(smartContractHeaderDestination)) {
		throw new Error(`universe.hpp already exists in ${includeDirectory} directory. You've probably already initialized infeos for this project.`);
    }
    
    if (fs.existsSync(smartContractImplementationDestination)) {
		throw new Error(`universe.cpp already exists in ${sourceDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(subSmartContractPlanetImplementationDestination)) {
		throw new Error(`universe.planet.cpp already exists in ${sourceDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(subSmartContractStarImplementationDestination)) {
		throw new Error(`universe.star.cpp already exists in ${sourceDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(smartContractAbiDestination)) {
		throw new Error(`universe.abi already exists in ${sourceDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(typesContractHeaderDestination)) {
		throw new Error(`types.cpp already exists in ${includeSubfolderDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(ricardianContractDestination)) {
		throw new Error(`universe_rc.md already exists in ${ricardianContractsDirectory} directory. You've probably already initialized infeos for this project.`);
	}

    const smartContractHeaderFileSource = `${libraryDirectory}/universe.hpp`;
    const smartContractImplementationFileSource = `${libraryDirectory}/universe.cpp`;
	const subSmartContractPlanetImplementationFileSource = `${libraryDirectory}/universe.planet.cpp`;
	const subSmartContractStarImplementationFileSource = `${libraryDirectory}/universe.star.cpp`;
	const smartContractAbiFileSource = `${libraryDirectory}/universe.abi`;
	const ricardianContractFileSource = `${libraryDirectory}/universe_rc.md`;
	const typesContractHeaderFileSource = `${libraryDirectory}/types.hpp`;

	fs.copyFileSync(smartContractHeaderFileSource, smartContractHeaderDestination);
    fs.copyFileSync(smartContractImplementationFileSource, smartContractImplementationDestination);
	fs.copyFileSync(subSmartContractPlanetImplementationFileSource, subSmartContractPlanetImplementationDestination);
	fs.copyFileSync(subSmartContractStarImplementationFileSource, subSmartContractStarImplementationDestination);
	fs.copyFileSync(smartContractAbiFileSource, smartContractAbiDestination);
	fs.copyFileSync(ricardianContractFileSource, ricardianContractDestination);
	fs.copyFileSync(typesContractHeaderFileSource, typesContractHeaderDestination);
};

const createTestsFolder = () => {
    logger.logInfo('===============> Creating tests file structure');

    if (!fs.existsSync(testsDirectory)) {
		fs.mkdirSync(testsDirectory);
	}
}

const createConfigFolder = () => {
    logger.logInfo('===============> Creating config file structure');

    if (!fs.existsSync(configDirectory)) {
		fs.mkdirSync(configDirectory);
	}
}

const run = async () => {
	const resourceFilesDirectory = `${__dirname}/resource-files`;

	try {
		logger.logInfo('===============> Installing infeos');
        createContractsFolder();
		createSubfolders();
        copyResourceFiles(resourceFilesDirectory);

        createTestsFolder();
		createConfigFolder();
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};