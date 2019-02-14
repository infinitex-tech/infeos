const Validator = require('./validator');

class WalletValidator extends Validator {

    isValidWalletName(walletName) {
        super.isValidString(walletName);

        let validCharacters = '.12345abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < walletName.length; i++) {
            let letter = walletName[i];

            if (validCharacters.indexOf(letter) === -1) {
                throw new Error(`The wallet name can only contain the following symbols: ${validCharacters}`);
            }
        }

        if (walletName.length > 12) {
            throw new Error(`The wallet name must be less than 13 characters. Your name have ${walletName.length} characters`);
        }
    }
}

module.exports = WalletValidator;