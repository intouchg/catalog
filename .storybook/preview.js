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
			<Global reset style={{ body: { fontFamily: 'sans-serif' } }} />
			<div style={{ margin: 32 }}>
				<Story />
			</div>
		</>
	),
]
