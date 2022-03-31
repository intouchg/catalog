import { Calendar } from './Calendar'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
A simple calendar with no external libraries
`

export default {
	title: 'Calendar',
	component: Calendar,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof Calendar>

export const Story: ComponentStory<typeof Calendar> = (args) => (
	<div css={{ padding: 16, maxWidth: 800 }}>
		<Calendar {...args} />
	</div>
)

Story.storyName = 'Calendar'
