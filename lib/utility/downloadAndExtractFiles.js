const { Stream } = require('stream')
const { promisify } = require('util')
const got = require('got')
const tar = require('tar')
const fs = require('fs')

const streamAsync = promisify(Stream.pipeline)

const downloadAndExtractFiles = async (
	componentName,
	branch,
	extractDirPath,
	usingTypescript
) => {
	const archiveUrl = `https://codeload.github.com/intouchg/catalog/tar.gz/${branch}`

	await streamAsync(
		got.stream(archiveUrl),
		tar.extract({ cwd: extractDirPath, strip: 1 }, [
			`catalog-${branch}/package.json`,
		])
	)

	fs.renameSync(
		`${extractDirPath}/package.json`,
		`${extractDirPath}/rootPackage.json`
	)

	return streamAsync(
		got.stream(archiveUrl),
		tar.extract({ cwd: extractDirPath, strip: 3 }, [
			`catalog-${branch}/${
				usingTypescript ? 'packages' : 'dist'
			}/${componentName}`,
		])
	)
}

module.exports = downloadAndExtractFiles
