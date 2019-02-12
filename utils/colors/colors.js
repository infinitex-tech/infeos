const chalk = require('chalk');

const info = chalk.bold.rgb(26, 117, 188);
const warning = chalk.bold.yellow;
const error = chalk.bold.red;
const normal = chalk.black;
const success = chalk.bold.rgb(30, 173, 106);

module.exports = {
    info,
    warning,
    error,
    normal,
    success
}