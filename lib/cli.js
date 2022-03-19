#!/usr/bin/env node

const { program } = require('commander')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const glob = require('glob')
const { logError } = require('./utility/log')
const validateComponentName = require('./utility/validateComponentName')
const promptForComponentName = require('./utility/promptForComponentName')
const findPackageJsonPath = require('./utility/findPackageJsonPath')
const installPeerDeps = require('./utility/installPeerDeps')
const {
	downloadMetadata,
	downloadComponent,
} = require('./utility/downloadPackageData')
const pkg = require('../package.json')

program
	.name('npx @intouchg/catalog')
	.argument('[path]', 'Path to download into')
	.option('-c, --component <name>', 'Component name to download')
	.option('-t, --typescript', 'Download TypeScript components')
	.option('-b, --branch', 'Branch to download from')
	.parse(process.argv)

console.log(
	`\nINFO: Downloading components from ${chalk.cyan(
		`@intouchg/catalog@${pkg.version}`
	)}`
)

const cloneDirPathArg = program.args[0] || ''
const cloneDirPath = path.join(process.cwd(), cloneDirPathArg)

if (fs.existsSync(cloneDirPath) && !fs.lstatSync(cloneDirPath).isDirectory())
	logError('Download path is not a directory: ' + cloneDirPath)

const options = program.opts()
const usingTypescript = options.typescript
const branch = options.branch || 'master'
let componentName = options.component

;(async () => {
	const tempCloneDirPath = path.join(cloneDirPath, 'intouchg-catalog-temp')
	fs.mkdirSync(tempCloneDirPath, { recursive: true })

	const cleanup = (message) => {
		if (message) console.log(message)
		if (fs.existsSync(tempCloneDirPath))
			fs.rmSync(tempCloneDirPath, { recursive: true })
	}

	process.on('exit', cleanup)
	process.on('SIGINT', cleanup)
	process.on('SIGUSR1', cleanup)
	process.on('SIGUSR2', cleanup)
	process.on('uncaughtException', cleanup)

	await downloadMetadata(branch, tempCloneDirPath)

	const metadataJsonPath = `${tempCloneDirPath}/metadata.json`
	const componentsMetadata = require(metadataJsonPath)
	fs.rmSync(metadataJsonPath)

	if (!componentName)
		componentName = (await promptForComponentName(componentsMetadata))
			.componentName

	const { version } = validateComponentName(componentName, componentsMetadata)

	console.log(
		`INFO: Downloading component ${chalk.cyan(
			`${componentName} (${version})`
		)}`
	)

	console.log(`INFO: Downloading into path ${chalk.cyan(cloneDirPath)}`)

	await downloadComponent(
		branch,
		tempCloneDirPath,
		componentName,
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
