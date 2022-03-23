const glob = require('glob')

module.exports = {
	stories: [
		'../packages/*/*.stories.mdx',
		'../packages/*/*.stories.@(js|jsx|ts|tsx)',
	],
	staticDirs: glob.sync(__dirname + '/../packages/*/public'),
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: '@storybook/react',
	babel: async (options) => ({
		...options,
		plugins: [...options.plugins, 'babel-plugin-styled-components'],
	}),
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.(glsl|frag|vert)$/,
			use: ['raw-loader'],
		})

		return config
	},
}
