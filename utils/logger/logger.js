const colors = require('./../colors/colors');

const info = colors.info;
const warning = colors.warning;
const error = colors.error;
const success = colors.success;

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
	
	logSuccess(arg) {
		console.log(success(arg));
	}
}

const logger = new Logger();

module.exports = {
	logger
};
