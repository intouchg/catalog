import { Calendar } from './Calendar'
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
}
export const Story = (args) => (
	<div css={{ padding: 16, maxWidth: 800 }}>
		<Calendar {...args} />
	</div>
)
Story.storyName = 'Calendar'
