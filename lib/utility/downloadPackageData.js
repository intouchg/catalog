const { Stream } = require('stream')
const { promisify } = require('util')
const got = require('got')
const tar = require('tar')
const fs = require('fs')
const pkg = require('../../package.json')

const CODELOAD_URL =
	pkg.repository.replace('https://github', 'https://codeload.github') +
	'/tar.gz'

const streamAsync = promisify(Stream.pipeline)

const downloadMetadata = async (branch, cwd) => {
	const archiveUrl = `${CODELOAD_URL}/${branch}`
	const moduleAndBranch = `catalog-${branch}`

	await streamAsync(
		got.stream(archiveUrl),
		tar.extract({ cwd, strip: 1 }, [
			`${moduleAndBranch}/package.json`,
			`${moduleAndBranch}/metadata.json`,
		])
	)

	fs.renameSync(`${cwd}/package.json`, `${cwd}/rootPackage.json`)
}

const downloadComponent = (branch, cwd, componentName, usingTypescript) => {
	const archiveUrl = `${CODELOAD_URL}/${branch}`
	const moduleAndBranch = `catalog-${branch}`
	const componentDir = usingTypescript ? 'packages' : 'dist'

	return streamAsync(
		got.stream(archiveUrl),
		tar.extract({ cwd, strip: 3 }, [
			`${moduleAndBranch}/${componentDir}/${componentName}`,
		])
	)
}

module.exports = { downloadMetadata, downloadComponent }
