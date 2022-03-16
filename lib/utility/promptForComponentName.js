const chalk = require('chalk')
const inquirer = require('inquirer')
const { Searcher } = require('fast-fuzzy')
const autocomplete = require('inquirer-autocomplete-prompt')

inquirer.registerPrompt('autocomplete', autocomplete)

const createSearch = (componentsMetadata) => {
	const componentsSearchData = componentsMetadata.map((component) => ({
		...component,
		searchTerm: `${component.name} ${component.description}`,
	}))

	const fuzzySearch = new Searcher(componentsSearchData, {
		keySelector: (component) => component.searchTerm,
	})

	const searchComponents = (answers, input) => {
		input = input || ''
		const searchResults = input
			? fuzzySearch.search(input)
			: componentsMetadata
		return [
			new inquirer.Separator(' '),
			...searchResults.map(({ name, version, description }) => ({
				name: `${chalk.green(name)} (${version})\n  ${description}\n`,
				value: name,
			})),
		]
	}

	return searchComponents
}

const promptForComponentName = async (componentsMetadata) => {
	const searchComponents = createSearch(componentsMetadata)

	console.log(
		`INFO: There are ${chalk.cyan(
			`${componentsMetadata.length} components`
		)} available\n`
	)

	return await inquirer.prompt([
		{
			type: 'autocomplete',
			name: 'componentName',
			message: 'Which component do you want to use?',
			pageSize: 12,
			loop: false,
			prefix: ' ',
			emptyText: '\n  No results...',
			searchText: '\n ',
			source: searchComponents,
		},
	])
}

module.exports = promptForComponentName
