const path = require('path')
const fs = require('fs')

const findPackageJson = (filepath = process.cwd()) => {
	const packagePath = path.join(filepath, 'package.json')
	if (packagePath === '/package.json')
		throw Error('No package.json was found in directory tree')
	if (fs.existsSync(packagePath)) return packagePath
	return findPackageJson(path.resolve(filepath, '..'))
}

module.exports = findPackageJson
