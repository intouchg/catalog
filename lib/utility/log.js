const chalk = require('chalk')

const logError = (message) => {
	console.log(chalk.red('\nERROR: ' + message))
	process.exit(1)
}

const logWarning = (message) => {
	console.log(chalk.orange('WARNING: ' + message))
}

const logSuccess = (message) => {
	console.log(chalk.green('\nSUCCESS: ' + message))
}

module.exports = { logError, logWarning, logSuccess }
