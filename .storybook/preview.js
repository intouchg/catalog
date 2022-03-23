import { Global } from '@intouchg/components'
import { useEffect, useState } from 'react'

const GlobalStyles = () => (
	<Global reset style={{ body: { fontFamily: 'sans-serif' } }} />
)

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		source: { type: 'code' },
	},
}

export const decorators = [
	(Story) => (
		<>
			<GlobalStyles />
			<div style={{ margin: 32 }}>
				<Story />
			</div>
		</>
	),
]
