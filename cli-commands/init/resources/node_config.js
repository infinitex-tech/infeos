const infeos = require('infeos').init();
const config = require('./../config/infeos_config.json');

/**
 * We execute the node configuration file each time we run a node
 */
const nodeConfig = async () => {

    let EOSIONode = new infeos.EOSIONetwork(config.network.name.EOS);

    EOSIONode.createWallet(config.wallet);
    await EOSIONode.importKey(config.wallet, config.account.permissions.system.privateKey);
    await EOSIONode.importKey(config.wallet, config.account.permissions.owner.privateKey);
    await EOSIONode.importKey(config.wallet, config.account.permissions.active.privateKey);
    await EOSIONode.createAccount(config.account.name, config.account.permissions.system.publicKey, config.account.permissions.system.publicKey);

    /**
     * Please setup you initial data below this line
     */
};

module.exports = {
	run: nodeConfig
};