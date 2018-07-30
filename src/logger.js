const chalk = require('chalk');

const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

module.exports = {
    log,
    error,
    warning
}