const chalk = require('chalk')
const inquirer = require('inquirer')
const { Searcher } = require('fast-fuzzy')
const autocomplete = require('inquirer-autocomplete-prompt')
const components = require('../../metadata.json')

inquirer.registerPrompt('autocomplete', autocomplete)

const componentsSearchData = components.map((component) => ({
	...component,
	searchTerm: `${component.name} ${component.description}`,
}))

const fuzzySearch = new Searcher(componentsSearchData, {
	keySelector: (component) => component.searchTerm,
})

const searchComponents = (answers, input) => {
	input = input || ''
	const searchResults = input ? fuzzySearch.search(input) : components
	return [
		new inquirer.Separator(' '),
		...searchResults.map(({ name, version, description }) => ({
			name: `${chalk.green(name)} (${version})\n  ${description}\n`,
			value: name,
		})),
	]
}

const promptForComponentName = async () => {
	console.log(
		`INFO: There are ${chalk.cyan(
			`${components.length} components`
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
