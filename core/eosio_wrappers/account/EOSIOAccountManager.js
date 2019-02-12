let { PrivateKey, randomKey } = require('eosjs-ecc');

const EOSIOAccount = require('./EOSIOAccount');
const EOSIOAction = require('./../action/EOSIOAction');
const EOSIONetwork = require('./../../node/EOSIONetwork');

const infeos_config = require('./../../config/infeos_config.json');

class EOSIOAccountManager {

    constructor() {
    }

    async generateAccounts(accountsCount = 1) {
        let EOSIONode = new EOSIONetwork(infeos_config.network.name.EOS);

        let accounts = [];

        for (let i = 0; i < accountsCount; i++) {
            let ownerPrivateKey = await randomKey();
            let ownerPublicKey = PrivateKey.fromString(ownerPrivateKey).toPublic().toString();
            await EOSIONode.importKey(infeos_config.wallet, ownerPrivateKey, 'yes');

            let activePrivateKey = await randomKey();
            let activePublicKey = PrivateKey.fromString(activePrivateKey).toPublic().toString();
            await EOSIONode.importKey(infeos_config.wallet, activePrivateKey, 'yes');
            
            let ownerKeys = {"PUBLIC_KEY": ownerPublicKey, "PRIVATE_KEY": ownerPrivateKey};
            let activeKeys = {"PUBLIC_KEY": activePublicKey, "PRIVATE_KEY": activePrivateKey};

            let accountName = generateAccountName();
            await EOSIONode.createAccount(accountName, ownerPublicKey, activePublicKey, 'yes');

            let generatedAccount = new EOSIOAccount(accountName, ownerKeys, activeKeys);

            accounts.push(generatedAccount);
        }

        return accounts;
    }
}

module.exports = EOSIOAccountManager;


let generateAccountName = () => {
    var accountName = 'i';
    var validCharacters = '12345abcdefghijklmnopqrstuvwxy';
      
    for (var i = 0; i < 9; i++) {
        accountName += validCharacters.charAt(Math.floor(Math.random() * validCharacters.length));
    }
    
    return accountName;
}

let createAccount = async (accountCreatorName, accountCreatorPermissions, EOSIOAccount) => {
    let actionManager = new EOSIOAction();

    let response = await actionManager.executeAction(accountCreatorName, 'newaccount', accountCreatorPermissions, {
        creator: accountCreatorName,
        name: EOSIOAccount.name,
        owner: {
            threshold: 1,
            keys: [{
                key: EOSIOAccount.keyPairs.owner.publicKey,
                weight: 1
            }],
            accounts: [],
            waits: []
        },
        active: {
            threshold: 1,
            keys: [{
                key: EOSIOAccount.keyPairs.active.publicKey,
                weight: 1
            }],
            accounts: [],
            waits: []
          }
    });

    return response;
}