import { Global } from '@intouchg/components'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

export const decorators = [
	(Story) => (
		<>
			<Global reset />
			<div style={{ margin: '2rem' }}>
				<Story />
			</div>
		</>
	),
]
