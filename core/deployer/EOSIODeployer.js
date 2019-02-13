const fs = require('fs');
const EOL = require('os').EOL;
const shell = require('shelljs');
const logger = require('../../utils/logger/logger').logger;

const Abi = require('./../../utils/contract_utils/abi');
const Wasm = require('./../../utils/contract_utils/wasm');

const EOSIOAction = require('./../eosio_wrappers/action/EOSIOAction');
const EOSIOContract = require('./../eosio_wrappers/contract/EOSIOContract');

class EOSIODeployer {

	constructor(contractName, EOSIOAccount, shouldGenerateAbi = false) {
        this.contractName = contractName;
        this.EOSIOAccount = EOSIOAccount;
        this.shouldGenerateAbi = shouldGenerateAbi;
    }    

    /**
     * Deploying an EOSIO smart contract
     * @returns { EOSIOContract } EOSIOContract instance of the deployed contract
     */
    async deploy() {
        let abi = new Abi(this.contractName);
        let wasm = new Wasm(this.contractName);

        compileContract.call(this, this.contractName, this.shouldGenerateAbi, abi, wasm);
        let contract = await setContract.call(this, this.EOSIOAccount, this.contractName, abi, wasm);

        return contract;
    }
}

module.exports = EOSIODeployer;

/**
 * Generates WASM & ABI files
 * @param {*} EOSIOContract Contract for which WASM & ABI files will be generated
 * @param {boolean} shouldGenerateAbi Flag for ABI generation
 */
let compileContract = (contractName, shouldGenerateAbi, abi, wasm) => {
    let contractFilePath = `./src/${contractName}.cpp`;
    let generateWasmScript = __dirname + '/./../scripts/contract/compile_contract.sh'; // use path.join()

    shell.exec(`sh ${generateWasmScript} ${wasm.getWasmPath()} ${contractFilePath} ${contractName}.cpp ${shouldGenerateAbi}`);

    logger.logSuccess('=== Successful compilation | Check your build folder ===');

    if (shouldGenerateAbi) {
        checkForEmptyAbi(abi);
    }
}

/**
 * Prepares and deploys the smart contract
 * @param {*} EOSIOAccount Deployer account
 * @param {string} contractName Name of the smart contract
 * @param {*} abi Instance of Abi class
 * @param {*} wasm Instance of Wasm class
 * @returns {*} EOSIOContract instance of the deployed smart contract
 */
let setContract = async (EOSIOAccount, contractName, abi, wasm) => {
    let authorizationData = [EOSIOAccount.basePermissions.active];
    let accountName = EOSIOAccount.name;
    
    let setCodeActionData = { account: accountName, vmtype: 0, vmversion: 0, code: wasm.getWasmAsHex() };
    let setAbiActionData = { account: accountName, abi: abi.getAbiAsHex() };

    let actions = [
        {
            account: 'eosio',
            name: 'setcode',
            authorization: authorizationData,
            data: setCodeActionData
        },
        {
            account: 'eosio',
            name: 'setabi',
            authorization: authorizationData,
            data: setAbiActionData
        }
    ];

    let actionManager = new EOSIOAction();
    await actionManager.executeMultipleActions(actions);

    let contract = new EOSIOContract(contractName, EOSIOAccount);
    
    return contract;
}

/**
 * Check for empty ABI. If the project structure is too complicated --abigen will fail to generate ABI
 * @param {*} EOSIOContract 
 * @see {@link https://developers.eos.io/eosio-home/docs/the-abi}
 */
let checkForEmptyAbi = (abi) => {
    let jsonAbi = abi.getAbiAsObject();
    let abiProperties = ["structs", "types", "actions", "tables", "tables", "ricardian_clauses", "variants", "abi_extensions"];

    let isEmptyAbi = true;
    abiProperties.forEach(property => {
        let collection = jsonAbi[property];

        if (collection.length > 0) {
            isEmptyAbi = false;
        }
    });

    if (isEmptyAbi) {
        logger.logWarning(`${EOL}Warning: Unfortunately, the contract structure is too complicated at this moment for --abigen to generate correct ABI file`);
        logger.logWarning(`Warning: That\'s normal for complex projects. ABI should be created manually. Please refer to https://developers.eos.io/eosio-home/docs/the-abi${EOL}`);
    }
}