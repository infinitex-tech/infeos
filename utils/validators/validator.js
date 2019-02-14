class Validator {

    constructor() {

    }

    isValidString(arg) {
        if (arg.length === 0 || arg === '' || arg === undefined || arg === null) {
            throw new Error(`Invalid string`);
        }
    }
    
    isValidNumber(arg) {
        if (arg < 0) {
            throw new Error(`Invalid number. Number should be positive`);
        }
    }
}

module.exports = Validator;