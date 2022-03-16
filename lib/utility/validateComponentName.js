const { logError } = require('../utility/log')

const validateComponentName = (componentName, componentsMetadata) => {
	const componentData = componentsMetadata.find(
		(component) => component.name === componentName
	)

	if (!componentData) {
		logError(`Component with name "${componentName}" not found`)
	}

	return componentData
}

module.exports = validateComponentName
