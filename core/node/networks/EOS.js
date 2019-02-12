const shell = require('shelljs');
const path = require('path');
const EOSIO_Node = require('./EOSIO_Node');

const infeos_config = require('./../../config/infeos_config.json');

const containerName = infeos_config.docker.EOS.containerName;
const nodeosEndpoint = `http://127.0.0.1:8888`;
const keosdEndpoint = `http://127.0.0.1:4949`;

module.exports = class EOS extends EOSIO_Node {

    constructor() {
        super();
    }

    createWallet(walletName) {
        super.createWallet(walletName);

        let createWalletScript = path.join(__dirname, '/./../../scripts/wallet/create_wallet.sh');
        shell.exec(`sh ${createWalletScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${walletName}`);
    }

    importKey(walletName, key, silent = 'no') {
        super.importKey(walletName, key);

        let importKeyScript = path.join(__dirname, '/./../../scripts/wallet/import_key.sh');
        shell.exec(`sh ${importKeyScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${key} ${walletName} ${silent}`);
    }

    /**
     * Creates a new account. We use "eosio" as the creator of the new account
     * @param {string} accountName Name of the new account
     * @param {string} ownerPublicKey The public key used for Owner permission
     * @param {string} activePublicKey The public key used for Active permission
     */
    createAccount(accountName, ownerPublicKey, activePublicKey, silent = 'no') {
        super.createAccount(accountName, ownerPublicKey, activePublicKey);

        let createAccountScript = path.join(__dirname, '/./../../scripts/account/create_account.sh');
        shell.exec(`sh ${createAccountScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${accountName} ${ownerPublicKey} ${activePublicKey} ${silent}`);
    }
}