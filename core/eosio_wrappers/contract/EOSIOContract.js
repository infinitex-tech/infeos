const { EOSRpc } = require('./../../../utils/eosio_utils/EOSJS_Instance').getInstance();

const Abi = require('./../../../utils/contract_utils/abi');
const EOSIOAction = require('./../action/EOSIOAction');

class EOSIOContract {

    constructor(contractName, EOSIOAccount) {
        let abi = new Abi(contractName);

        this.name = contractName;
        this.EOSIOAccount = EOSIOAccount;

        let that = this;
        actionBuilder.call(this, this.EOSIOAccount, abi, that);
    } 
}

module.exports = EOSIOContract;

let actionBuilder = (EOSIOAccount, abi, that) => {
    let actions = abi.getAbiAsObject().actions;
    let structs = Object.assign({}, ...abi.getAbiAsObject().structs.map(struct => ({ [struct['name']]: struct })));
    
    for (let i = 0; i < actions.length; i++) {
        let actionName = actions[i].name;
        
        that[actionName] = async function (...params) {
            let actionParamsCount = structs[actionName].fields.length;
            let actionParams = params.slice(0, actionParamsCount);
            
            let optionals = params[actionParamsCount] instanceof Object ? params[actionParamsCount] : null;

            let account = (optionals && optionals.account instanceof EOSIOAccount) ? optionals.account.name : EOSIOAccount.name;
            let authorization = (optionals && optionals.authorization.actor && optionals.authorization.permission) ? optionals.authorization : EOSIOAccount.basePermissions.active;

            let data = buildDataObject(actionParams, structs[actionName].fields);

            let actionManager = new EOSIOAction();
            let response = await actionManager.executeAction(account, actionName, [authorization], data);

            return response;
        }
    }
}

let buildDataObject = (values, keys) => {
    let data = {};

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i].name;
        data[key] = values[i];
    }

    return data;
}