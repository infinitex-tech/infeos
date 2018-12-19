const colors = require('./../colors/colors');

const info = colors.info;
const warning = colors.warning;
const error = colors.error;

class Logger {

	constructor() {
	}

	log(arg) {
		console.log(arg);
    }
    
    logInfo(arg) {
		console.log(info(arg));
	}

	logWarning(arg) {
		console.log(warning(arg));
	}

	logError(arg) {
		console.log(error(arg));
    }
}

const logger = new Logger();

module.exports = {
	logger
};