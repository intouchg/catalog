import { TabTitle, TabContent } from './Tab'
import { Trigger } from '@intouchg/components'
const description = `
This component uses react-spring for physics-based easing \n
https://github.com/pmndrs/react-spring \n
https://react-spring.io/
`
export default {
	title: 'Tab',
	component: Trigger,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
}
export const Story = (args) => (
	<div css={{ padding: 16, maxWidth: 800, minHeight: 160 }}>
		<Trigger {...args}>
			<div css={{ marginBottom: 16 }}>
				<TabTitle id="1">Tab 1</TabTitle>
				<TabTitle id="2">Tab 2</TabTitle>
				<TabTitle id="3">Tab 3</TabTitle>
			</div>

			<div css={{ maxWidth: 800, position: 'relative' }}>
				<TabContent id="1">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore.
				</TabContent>
				<TabContent id="2">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco
					laboris nisi ut aliquip ex ea commodo consequat.
				</TabContent>
				<TabContent id="3">
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur deserunt
					laborum.
				</TabContent>
			</div>
		</Trigger>
	</div>
)
Story.storyName = 'Tab'
Story.args = {
	defaultActiveIds: ['1'],
	allowMultiActive: false,
	allowNoneActive: false,
}
