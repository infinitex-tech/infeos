const fs = require('fs');
const path = require('path');

class Wasm {

	constructor(contractName) {
        this.contractName = contractName;
	}

	getWasmPath() {
        return path.normalize(`${process.cwd()}/build/${this.contractName}.wasm`);
    }

    getWasmAsHex() {
        return fs.readFileSync(this.getWasmPath()).toString(`hex`)
    }
}

module.exports = Wasm;
