const EOSIOAccount = require('./../eosio_wrappers/account/EOSIOAccount');
const infeos_config = require('./../config/infeos_config.json');

const EOSIOError = require('./EOSIOError');

const assert = require('assert');

class EOSIOTest {

    constructor() {
        this.deployerAccount = new EOSIOAccount(infeos_config.account.name, infeos_config.account.permissions.system, infeos_config.account.permissions.system);

    }

    async expectThrow() {

    }
}

module.exports = EOSIOTest;