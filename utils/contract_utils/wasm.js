const fs = require('fs');

class Wasm {

	constructor(contractName) {
        this.contractName = contractName;
	}

	getWasmPath() {
        return `${process.cwd()}/build/${this.contractName}.wasm`;
    }

    getWasmAsHex() {
        return fs.readFileSync(this.getWasmPath()).toString(`hex`)
    }
}

module.exports = Wasm;
