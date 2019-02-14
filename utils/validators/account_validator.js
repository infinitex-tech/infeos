const Validator = require('./validator');

class AccountValidator extends Validator {

    isValidAccountName(accountName) {
        super.isValidString(accountName);

        let validCharacters = '.12345abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < accountName.length; i++) {
            let letter = accountName[i];

            if (validCharacters.indexOf(letter) === -1) {
                throw new Error(`The account name can only contain the following symbols: ${validCharacters}`);
            }
        }

        if (accountName.length > 12) {
            throw new Error(`The account name must be less than 13 characters. Your name have ${accountName.length} characters`);
        }
    }
}

module.exports = AccountValidator;