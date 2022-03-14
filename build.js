#!/usr/bin/env node

const glob = require('glob')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const filepaths = glob.sync(`${__dirname}/packages/*`)

const packageErrors = []

const packagesData = filepaths.map((filepath) => {
	const errors = []

	if (!fs.lstatSync(filepath).isDirectory()) {
		errors.push('Packages must be directories but found a file instead')
	}

	const packageJsonPath = `${filepath}/package.json`

	if (!fs.existsSync(packageJsonPath)) {
		errors.push('Packages must have a package.json')
	}

	const {
		name,
		description,
		version,
		dependencies,
	} = require(packageJsonPath)
	const { name: packageDirectoryName } = path.parse(filepath)

	if (!name) {
		errors.push('Packages must have a name in package.json')
	}

	if (name !== packageDirectoryName) {
		errors.push(
			'Package name in package.json must match package directory name'
		)
	}

	if (!description) {
		errors.push('Packages must have a description in package.json')
	}

	if (!version) {
		errors.push('Packages must have a version in package.json')
	}

	if (dependencies && Object.keys(dependencies).length) {
		errors.push(
			'Packages must not have dependencies, only devDependencies and peerDependencies'
		)
	}

	const jsFiles = glob.sync(`${filepath}/*.js?x`)

	if (jsFiles.length) {
		errors.push('Packages must not contain JavaScript files')
	}

	const tsFiles = glob.sync(`${filepath}/*.!(stories.)ts?(x)`)

	if (!tsFiles.length) {
		errors.push('Packages must contain at least one TypeScript file')
	}

	if (
		tsFiles.includes(`${filepath}/index.tsx`) ||
		tsFiles.includes(`${filepath}/index.ts`)
	) {
		errors.push('Packages must not use index.tsx or index.ts files')
	}

	const storyFiles = glob.sync(`${filepath}/*.stories.ts?(x)`)

	if (!storyFiles.length) {
		errors.push(
			'Packages must contain at least one TypeScript Storybook story file'
		)
	}

	if (errors.length) packageErrors.push({ name, filepath, errors })

	return { name, version, description }
})

if (packageErrors.length) {
	console.log(chalk.red('ERROR: Failed to validate component packages'))
	packageErrors.forEach(({ name, filepath, errors }) => {
		console.log(`\nErrors in package ${name} at path ${filepath}:`)
		errors.forEach((error) => console.log(`  * ${error}`))
	})
	console.log('\n')
	process.exit(1)
}

fs.writeFileSync(
	`${__dirname}/metadata.json`,
	JSON.stringify(packagesData, null, '\t')
)

const packageJsons = glob.sync(`${__dirname}/packages/**/package.json`)

packageJsons.forEach((filepath) => {
	fs.cpSync(
		filepath,
		filepath.replace(`${__dirname}/packages`, `${__dirname}/dist`)
	)
})
