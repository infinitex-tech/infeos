const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const logger = require('./../../utils/logger/logger').logger;

const contractsDirectory = path.normalize('./contracts');
const includeDirectory = path.normalize('./contracts/include');
const includeSubfolderDirectory = path.normalize(`${includeDirectory}/universe`);
const ricardianContractsDirectory = path.normalize('./contracts/rc');
const sourceDirectory = path.normalize('./contracts/src');
const deploymentDirectory = path.normalize('./deployment');
const testsDirectory = path.normalize('./test');
const configDirectory = path.normalize('./config');

/**
 * Includes (Headers)
 */
const smartContractHeaderDestination = path.join(includeSubfolderDirectory, '/universe.hpp');
const typesContractHeaderDestination = path.join(includeSubfolderDirectory, '/types.hpp');

/**
 * Ricardian Contracts
 */
const universeRicardianContractDestination = path.join(ricardianContractsDirectory, '/universe.star_rc.md');
const addPlanetActionRicardianContractDestination = path.join(ricardianContractsDirectory, '/universe.addplanet_rc.md');
const createPlanetActionRicardianContractDestination = path.join(ricardianContractsDirectory, '/universe.createplanet_rc.md');
const createStarActionRicardianContractDestination = path.join(ricardianContractsDirectory, '/universe.createstar_rc.md');

/**
 * EOS Smart Contracts
 */
const smartContractImplementationDestination = path.join(sourceDirectory, '/universe.cpp');
const subSmartContractStarImplementationDestination = path.join(sourceDirectory, '/universe.star.cpp');
const subSmartContractPlanetImplementationDestination = path.join(sourceDirectory, '/universe.planet.cpp');

/**
 * Resource files
 */
const infeosConfigurationFileDestination = path.join(configDirectory, '/infeos_config.json');
const nodeConfigFileDestination = path.join(configDirectory, '/node_config.js');
const configIniFileDestination = path.join(configDirectory, '/config.ini');
const testConfigIniFileDestination = path.join(configDirectory, '/test_config.ini');
const deployFileDestination = path.join(deploymentDirectory, '/deploy.js');

/**
 * Tests files templates
 */

const planetTestFileDestination = path.join(testsDirectory, '/PlanetTests.js');
const starTestFileDestination = path.join(testsDirectory, '/StarTests.js');

const gitIgnoreFileDestination = path.normalize('./.gitignore');
const packageJsonDestination = path.normalize('./package.json');


const createContractsFolder = () => {
	if (!fs.existsSync(contractsDirectory)) {
		fs.mkdirSync(contractsDirectory);
	}
};

const createSubfolders = () => {
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

const createConfigFolder = () => {
	if (!fs.existsSync(configDirectory)) {
		fs.mkdirSync(configDirectory);
	}
}

const createDeploymentFolder = () => {
	if (!fs.existsSync(deploymentDirectory)) {
		fs.mkdirSync(deploymentDirectory);
	}
}

const createTestsFolder = () => {
	if (!fs.existsSync(testsDirectory)) {
		fs.mkdirSync(testsDirectory);
	}
}

const copyResourceFiles = (libraryDirectory) => {
	if (fs.existsSync(infeosConfigurationFileDestination)) {
		throw new Error(`infeos_config.json already exists in ${configDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(nodeConfigFileDestination)) {
		throw new Error(`node_config.js already exists in ${configDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(configIniFileDestination)) {
		throw new Error(`config.ini already exists in ${configDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(testConfigIniFileDestination)) {
		throw new Error(`test_config.ini already exists in ${configDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(deployFileDestination)) {
		throw new Error(`deploy.js already exists in ${deploymentDirectory} directory. You've probably already initialized infeos for this project.`);
	}
	
	const infeosConfigFileSource = path.join(__dirname, './../../core/config/infeos_config.json');
	const nodeConfigFileSource = path.join(libraryDirectory, '/node_config.js');
	const configIniFileSource = path.join(libraryDirectory, '/config.ini');
	const testConfigIniFileSource = path.join(libraryDirectory, '/test_config.ini');
	const deployFileSource = path.join(libraryDirectory, '/deploy.js');

	fs.copyFileSync(infeosConfigFileSource, infeosConfigurationFileDestination);
	fs.copyFileSync(nodeConfigFileSource, nodeConfigFileDestination);
	fs.copyFileSync(configIniFileSource, configIniFileDestination);
	fs.copyFileSync(testConfigIniFileSource, testConfigIniFileDestination);
	fs.copyFileSync(deployFileSource, deployFileDestination);	
};

const copyTemplateFiles = (libraryDirectory) => {
	/**
	 * Smart contracts
	 */
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

	if (fs.existsSync(typesContractHeaderDestination)) {
		throw new Error(`types.cpp already exists in ${includeSubfolderDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(universeRicardianContractDestination)) {
		throw new Error(`universe_rc.md already exists in ${universeRicardianContractDestination} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(addPlanetActionRicardianContractDestination)) {
		throw new Error(`universe.addplanet_rc.md already exists in ${addPlanetActionRicardianContractDestination} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(createPlanetActionRicardianContractDestination)) {
		throw new Error(`universe.createplanet_rc.md already exists in ${createPlanetActionRicardianContractDestination} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(createStarActionRicardianContractDestination)) {
		throw new Error(`universe.createstar_rc.md already exists in ${createStarActionRicardianContractDestination} directory. You've probably already initialized infeos for this project.`);
	}

	const smartContractHeaderFileSource = path.join(libraryDirectory, '/smart_contracts/universe.hpp');
	const smartContractImplementationFileSource = path.join(libraryDirectory, '/smart_contracts/universe.cpp');
	const subSmartContractPlanetImplementationFileSource = path.join(libraryDirectory, '/smart_contracts/universe.planet.cpp');
	const subSmartContractStarImplementationFileSource = path.join(libraryDirectory, '/smart_contracts/universe.star.cpp');
	const typesContractHeaderFileSource = path.join(libraryDirectory, '/smart_contracts/types.hpp');

	const universeRicardianContractFileSource = path.join(libraryDirectory, '/ricardian_contracts/universe_rc.md');
	const addPlanetRicardianContractFileSource = path.join(libraryDirectory, '/ricardian_contracts/universe.addplanet_rc.md');
	const createPlanetRicardianContractFileSource = path.join(libraryDirectory, '/ricardian_contracts/universe.createplanet_rc.md');
	const createStarRicardianContractFileSource = path.join(libraryDirectory, '/ricardian_contracts/universe.createstar_rc.md');

	fs.copyFileSync(smartContractHeaderFileSource, smartContractHeaderDestination);
	fs.copyFileSync(smartContractImplementationFileSource, smartContractImplementationDestination);
	fs.copyFileSync(subSmartContractPlanetImplementationFileSource, subSmartContractPlanetImplementationDestination);
	fs.copyFileSync(subSmartContractStarImplementationFileSource, subSmartContractStarImplementationDestination);
	fs.copyFileSync(typesContractHeaderFileSource, typesContractHeaderDestination);

	fs.copyFileSync(universeRicardianContractFileSource, universeRicardianContractDestination);
	fs.copyFileSync(addPlanetRicardianContractFileSource, addPlanetActionRicardianContractDestination);
	fs.copyFileSync(createPlanetRicardianContractFileSource, createPlanetActionRicardianContractDestination);
	fs.copyFileSync(createStarRicardianContractFileSource, createStarActionRicardianContractDestination);

	/**
	 * Tests files
	 */

	if (fs.existsSync(planetTestFileDestination)) {
		throw new Error(`PlanetTests.js already exists in ${testsDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	if (fs.existsSync(starTestFileDestination)) {
		throw new Error(`StarTests.js already exists in ${testsDirectory} directory. You've probably already initialized infeos for this project.`);
	}

	const planetTestsFileSource = path.join(libraryDirectory, '/tests/PlanetTests.js');
	const starTestsFileSource = path.join(libraryDirectory, '/tests/StarTests.js');

	fs.copyFileSync(planetTestsFileSource, planetTestFileDestination);
	fs.copyFileSync(starTestsFileSource, starTestFileDestination);
};

const createGitIgnoreFile = (libraryDirectory) => {
	if (fs.existsSync(gitIgnoreFileDestination)) {
		return;
	}

	let gitIgnoreFileSource = path.normalize(`${libraryDirectory}/git_ignore.js`);
	fs.copyFileSync(gitIgnoreFileSource, gitIgnoreFileDestination)
}

const copyPackageJsonFile = (libraryDirectory) => {
	if (fs.existsSync(packageJsonDestination)) {
		return;
	}

	const packageJsonFileSource = path.normalize(`${libraryDirectory}/package.json`);

	fs.copyFileSync(packageJsonFileSource, packageJsonDestination);
};

const run = async () => {
	const templateFilesDirectory = path.join(__dirname, '/templates');
	const resourceFilesDirectory = path.join(__dirname, '/resources');

	try {
		logger.logInfo('=== Installing infeos ===');

		logger.logInfo('=== Setting up an EOS project structure ===');
		createContractsFolder();
		createSubfolders();
		createConfigFolder();
		createDeploymentFolder();
		createTestsFolder();
		
		copyResourceFiles(resourceFilesDirectory);
		copyTemplateFiles(templateFilesDirectory);
		createGitIgnoreFile(resourceFilesDirectory);
		copyPackageJsonFile(resourceFilesDirectory);
		const { stdout, stderr } = await exec('npm install infeos');

		logger.logSuccess('=== WooHoo, you\'re ready! Now the EOSIO universe is in your hands! ===\n');

	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = {
	run
};