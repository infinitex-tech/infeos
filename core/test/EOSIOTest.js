const EOSIOAccount = require('./../eosio_wrappers/account/EOSIOAccount');
const infeos_config = require('./../config/infeos_config.json');

const assert = require('assert');

class EOSIOTest {

    constructor() {
        this.deployerAccount = new EOSIOAccount(infeos_config.account.name, infeos_config.account.permissions.system, infeos_config.account.permissions.system);
    }

    /**
     * Execute and expect action to throw
     * @param {*} action Action which will be executed (promise)
     * @param {*} eosioAssertType Type of the EOSIO Assert message. By default it's "eosio_assert_message_exception"
     */
    async expectThrow(action, message, eosioAssertType = 'eosio_assert_message_exception') {
        try {
            await action();
        } catch (error) {
            
            return;
        }
    
        assert.fail(message);
    }
}

module.exports = EOSIOTest;