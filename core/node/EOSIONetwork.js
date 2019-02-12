const EOS = require('./networks/EOS');
const Telos = require('./networks/Telos');
const Worbli = require('./networks/Worbli');

class EOSIONetwork {

	constructor(networkName) {
        if (networkName === 'Worbli') {
            return new Worbli();
        } else if (networkName === 'Telos') {
            return new Telos();
        } else {
            return new EOS();
        }
    }    
}

module.exports = EOSIONetwork;

 