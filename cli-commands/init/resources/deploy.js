const infeos = require('infeos').init();
const config = require('./../config/infeos_config.json');

/**
 * We execute the deploy file each time we run a 'infeos run'
 * Please setup you initial data that need to be executed during deployment: deploying contracts, seeding data, etc
 */
const deploy = async () => {
    /**
     * We use the same account created earlier for deployment of our master smart contract
     */
    let accountDeployer = new infeos.EOSIOAccount(config.account.name, config.account.permissions.system, config.account.permissions.system);

    let universeContract = new infeos.EOSIODeployer(config.masterContract, accountDeployer, true);
    let universeContractInstance = await universeContract.deploy();
};

module.exports = {
    run: deploy
};