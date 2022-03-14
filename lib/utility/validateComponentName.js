const components = require('../../metadata.json')
const { logError } = require('../utility/log')

const validateComponentName = (componentName) => {
	const componentData = components.find(
		(component) => component.name === componentName
	)

	if (!componentData) {
		logError(`Component with name "${componentName}" not found`)
	}

	return componentData
}

module.exports = validateComponentName
