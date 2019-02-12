const EOSJS_Instance = require('./utils/eosio_utils/EOSJS_Instance');
const infeos_config = require('./core/config/infeos_config.json');

module.exports = (() => {

    let defaults = {
        endpoint: `http://127.0.0.1:${infeos_config.network.nodeosPort}`,
        privateKey: infeos_config.account.permissions.system.privateKey
    }

    let init = (endpoint = defaults.endpoint, privateKey = defaults.privateKey) => {
    
        EOSJS_Instance.init([endpoint,[privateKey]]);

        const EOSIONetwork = require('./core/node/EOSIONetwork');
        const EOSIODeployer = require('./core/deployer/EOSIODeployer');

        const EOSIOAccount = require('./core/eosio_wrappers/account/EOSIOAccount');
        const EOSIOAccountManager = require('./core/eosio_wrappers/account/EOSIOAccountManager');

        const EOSIOContract = require('./core/eosio_wrappers/contract/EOSIOContract');
        const EOSIOAction = require('./core/eosio_wrappers/action/EOSIOAction');

        const EOSIOTest = require('./core/test/EOSIOTest');

        return {
            EOSIONetwork: EOSIONetwork,
            EOSIODeployer: EOSIODeployer,
            EOSIOAccount: EOSIOAccount,
            EOSIOAccountManager: EOSIOAccountManager,
            EOSIOContract: EOSIOContract,
            EOSIOAction: EOSIOAction,
            EOSIOTest: EOSIOTest,
            EOSIOApi: EOSJS_Instance.getInstance().EOSApi
        }
    }
    
    return {
        init: init
    }
})();