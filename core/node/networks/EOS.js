const shell = require('shelljs');
const path = require('path');
const EOSIO_Node = require('./EOSIO_Node');

const infeos_config = require('./../../config/infeos_config.json');

const containerName = infeos_config.docker.EOS.containerName;
const nodeosEndpoint = `http://127.0.0.1:${infeos_config.network.nodeosPort}`;
const keosdEndpoint = `http://127.0.0.1:${infeos_config.network.keosdPort}`;

module.exports = class EOS extends EOSIO_Node {

    constructor() {
        super();
    }

    createWallet(walletName) {
        super.createWallet(walletName);

        let isDarwin = true;

        if (process.platform !== 'darwin') {
            isDarwin = false;
        }

        let createWalletScript = path.join(__dirname, '/./../../scripts/wallet/create_wallet.sh');
        shell.exec(`sh ${createWalletScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${walletName} ${isDarwin}`);
    }

    importKey(walletName, key, silent = 'no') {
        super.importKey(walletName, key);

        let isDarwin = true;

        if (process.platform !== 'darwin') {
            isDarwin = false;
        }

        let importKeyScript = path.join(__dirname, '/./../../scripts/wallet/import_key.sh');
        shell.exec(`sh ${importKeyScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${key} ${walletName} ${silent} ${isDarwin}`);
    }

    /**
     * Creates a new account. We use "eosio" as the creator of the new account
     * @param {string} accountName Name of the new account
     * @param {string} ownerPublicKey The public key used for Owner permission
     * @param {string} activePublicKey The public key used for Active permission
     */
    createAccount(accountName, ownerPublicKey, activePublicKey, silent = 'no') {
        super.createAccount(accountName, ownerPublicKey, activePublicKey);

        let isDarwin = true;

        if (process.platform !== 'darwin') {
            isDarwin = false;
        }

        let createAccountScript = path.join(__dirname, '/./../../scripts/account/create_account.sh');
        shell.exec(`sh ${createAccountScript} ${containerName} ${nodeosEndpoint} ${keosdEndpoint} ${accountName} ${ownerPublicKey} ${activePublicKey} ${silent} ${isDarwin}`);
    }
}