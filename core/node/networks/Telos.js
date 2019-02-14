const EOSIO_Node = require('./EOSIO_Node');

module.exports = class Telos extends EOSIO_Node {

    constructor() {
    }

    createWallet(walletName) {
        super.createWallet(walletName);

        throw new Error('Not yet implemented');
    }

    importKey(walletName, key, silent = 'no') {
        super.importKey(walletName, key);

        throw new Error('Not yet implemented');
    }

    /**
     * Creates a new account. We use "eosio" as the creator of the new account
     * @param {string} accountName Name of the new account
     * @param {string} ownerPublicKey The public key used for Owner permission
     * @param {string} activePublicKey The public key used for Active permission
     */
    createAccount(accountName, ownerPublicKey, activePublicKey, silent = 'no') {
        super.createAccount(accountName, ownerPublicKey, activePublicKey);

        throw new Error('Not yet implemented');
    }
}