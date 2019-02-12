const WalletValidator = require('./../../../utils/validators/wallet_validator');
const AccountValidator = require('./../../../utils/validators/account_validator');
const Validator = require('./../../../utils/validators/validator');

module.exports = class EOSIO_Node {

	constructor() {
        this.walletValidator = new WalletValidator();
        this.accountValidator = new AccountValidator();
        this.validator = new Validator();
    }
    
    /**
     * Creates a new EOSIO wallet used to store the key-value pairs 
     * @param {string} walletName 
     */
    createWallet(walletName) {
        this.walletValidator.isValidWalletName(walletName);
    }

    importKey(walletName, key) {
        this.walletValidator.isValidWalletName(walletName);
        this.validator.isValidString(key);
    }

    /**
     * Creates a new account. We use "eosio" as the creator of the new account
     * @param {string} accountName Name of the new account
     * @param {string} ownerPublicKey The public key used for Owner permission
     * @param {string} activePublicKey The public key used for Active permission
     */
    createAccount(accountName, ownerPublicKey, activePublicKey) {
        this.accountValidator.isValidAccountName(accountName);
        this.accountValidator.isValidString(ownerPublicKey);
        this.accountValidator.isValidString(activePublicKey);
    }   
}

 