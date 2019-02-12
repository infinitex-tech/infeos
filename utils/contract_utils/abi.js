const fs = require('fs');
const { EOSApi, Serialize } = require('./../eosio_utils/EOSJS_Instance').getInstance();

class Abi {

	constructor(contractName) {
        this.contractName = contractName;
	}

	getAbiPath() {
        return `${process.cwd()}/build/${this.contractName}.abi`;
    }

    getSerializedAbi() {
        let buffer = new Serialize.SerialBuffer({ textEncoder: EOSApi.textEncoder, textDecoder: EOSApi.textDecoder });

        let abi = JSON.parse(fs.readFileSync(this.getAbiPath(), `utf8`));
        let abiDefinition = EOSApi.abiTypes.get(`abi_def`);

        abi = abiDefinition.fields.reduce((acc, { name: fieldName }) => Object.assign(acc, { [fieldName]: acc[fieldName] || [] }), abi);
            
        abiDefinition.serialize(buffer, abi);

        return buffer;
    }

    getAbiAsHex() {
        let serializedAbi = this.getSerializedAbi();

        return Buffer.from(serializedAbi.asUint8Array()).toString(`hex`);
    }

    getAbiAsObject() {
        return JSON.parse(fs.readFileSync(this.getAbiPath()));
    }
}

module.exports = Abi;
