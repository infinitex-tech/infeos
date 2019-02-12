const { EOSApi } = require('./../../../utils/eosio_utils/EOSJS_Instance').getInstance();

class EOSIOAction {

    constructor() {
    }

    async executeAction(account, actionName, authorization, data, broadcast = true, sign = true, blocksBehind = 3, expireSeconds = 30) {
        let response = await EOSApi.transact({
            actions: [{
                account: account,
                name: actionName,
                authorization: authorization,
                data: data
            }]
        }, 
        {
            broadcast: broadcast,
            sign: sign,
            blocksBehind: blocksBehind,
            expireSeconds: expireSeconds
        });

        return response;
    }

    async executeMultipleActions(actionCollections, broadcast = true, sign = true, blocksBehind = 3, expireSeconds = 30) {
        let response = await EOSApi.transact({
            actions: actionCollections
        }, 
        {   
            broadcast: broadcast,
            sign: sign,
            blocksBehind: blocksBehind,
            expireSeconds: expireSeconds
        });

        return response;
    }
}

module.exports = EOSIOAction;