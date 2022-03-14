const { spawnSync } = require('child_process')
const semver = require('semver')
const { logError, logWarning, logSuccess } = require('./log')

const evaluateCloneDependencies = (localDeps, cloneDeps) => {
	const missingDeps = []
	const incompatibleDeps = []
	if (cloneDeps) {
		Object.entries(cloneDeps).forEach(([cloneDep, cloneDepVersion]) => {
			if (!(cloneDep in localDeps))
				missingDeps.push(`${cloneDep}@${cloneDepVersion}`)
			else if (semver.satisfies(localDeps[cloneDep], cloneDepVersion))
				return
			else
				incompatibleDeps.push([
					cloneDep,
					cloneDepVersion,
					localDeps[cloneDep],
				])
		})
	}

	return [missingDeps, incompatibleDeps]
}

const installPeerDeps = (localPackageJsonPath, clonePeerDeps) => {
	const { peerDependencies: localPeerDeps } = require(localPackageJsonPath)

	const [missingClonePeerDeps, incompatibleClonePeerDeps] =
		evaluateCloneDependencies(localPeerDeps, clonePeerDeps)

	if (missingClonePeerDeps.length) {
		console.log('INFO: Installing missing peer dependencies\n')

		const childProcess = spawnSync(
			'yarn',
			['add', ...missingClonePeerDeps],
			{
				shell: true,
				cwd: process.cwd(),
				stdio: 'inherit',
			}
		)

		if (childProcess.status !== 0)
			logError('Failed to install missing peer dependencies')
	}

	incompatibleClonePeerDeps.forEach(
		([dep, expectedVersion, localVersion]) => {
			logWarning(
				`Incompatible peer dependency "${dep}", expected version ${expectedVersion} but found ${localVersion}`
			)
		}
	)

	if (!incompatibleClonePeerDeps.length) {
		logSuccess(
			'Cloned component and installed peer dependencies without issues\n'
		)
	}
}

module.exports = installPeerDeps
