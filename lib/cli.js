#!/usr/bin/env node

const { program } = require('commander')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const glob = require('glob')
const { logError } = require('./utility/log')
const validateComponentName = require('./utility/validateComponentName')
const promptForComponentName = require('./utility/promptForComponentName')
const downloadAndExtractFiles = require('./utility/downloadAndExtractFiles')
const findPackageJsonPath = require('./utility/findPackageJsonPath')
const installPeerDeps = require('./utility/installPeerDeps')
const pkg = require('../package.json')

program
	.name('npx @intouchg/catalog')
	.argument('[clone-path]', 'Path to clone into')
	.option('-c, --component <name>', 'Component name to clone')
	.option('-t, --typescript', 'Clone TypeScript components')
	.parse(process.argv)

console.log(
	`\nINFO: Cloning components from ${chalk.cyan(
		`@intouchg/catalog@${pkg.version}`
	)}`
)

const cloneDirPathArg = program.args[0] || ''
const cloneDirPath = path.join(process.cwd(), cloneDirPathArg)

if (fs.existsSync(cloneDirPath) && !fs.lstatSync(cloneDirPath).isDirectory())
	logError('Clone path is not a directory: ' + cloneDirPath)

const options = program.opts()
const usingTypescript = options.typescript
let componentName = options.component

;(async () => {
	if (!componentName)
		componentName = (await promptForComponentName()).componentName

	const { version } = validateComponentName(componentName)

	console.log(
		`INFO: Cloning component ${chalk.cyan(`${componentName} (${version})`)}`
	)

	console.log(`INFO: Cloning into path ${chalk.cyan(cloneDirPath)}`)

	const tempCloneDirPath = path.join(cloneDirPath, 'intouchg-catalog-temp')
	fs.mkdirSync(tempCloneDirPath, { recursive: true })

	await downloadAndExtractFiles(
		componentName,
		'master',
		tempCloneDirPath,
		usingTypescript
	)

	const cloneRootPackageJsonPath = `${tempCloneDirPath}/rootPackage.json`
	const clonePackageJsonPath = `${tempCloneDirPath}/package.json`
	const yarnLockPath = `${tempCloneDirPath}/yarn.lock`

	const cloneRootPackageJson = require(cloneRootPackageJsonPath)
	const clonePackageJson = require(clonePackageJsonPath)

	fs.rmSync(cloneRootPackageJsonPath)
	fs.rmSync(clonePackageJsonPath)

	if (fs.existsSync(yarnLockPath)) fs.rmSync(yarnLockPath)

	glob.sync(`${tempCloneDirPath}/**/*`)
		.map((filepath) => {
			if (filepath.includes('.stories.')) fs.rmSync(filepath)
			else return filepath.replace('intouchg-catalog-temp/', '')
		})
		.forEach((filepath) => {
			if (
				filepath &&
				fs.existsSync(filepath) &&
				!fs.lstatSync(filepath).isDirectory()
			) {
				fs.rmSync(tempCloneDirPath, { recursive: true })
				logError(
					'Copy failed, file would be overwritten by download at path ' +
						filepath
				)
			}
		})

	fs.cpSync(tempCloneDirPath, cloneDirPath, { recursive: true })
	fs.rmSync(tempCloneDirPath, { recursive: true })

	console.log('INFO: Successfully downloaded and extracted component')

	const localPackageJsonPath = findPackageJsonPath()

	installPeerDeps(localPackageJsonPath, {
		...(cloneRootPackageJson?.peerDependencies || {}),
		...(clonePackageJson?.peerDependencies || {}),
	})
})()
