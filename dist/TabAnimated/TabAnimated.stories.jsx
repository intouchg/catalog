import { TabAnimatedTitle, TabAnimatedContent } from './TabAnimated'
import { Trigger } from '@intouchg/components'
const description = `
This component uses react-spring for physics-based easing \n
https://github.com/pmndrs/react-spring \n
https://react-spring.io/
`
export default {
	title: 'TabAnimated',
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
				<TabAnimatedTitle id="1">Tab 1</TabAnimatedTitle>
				<TabAnimatedTitle id="2">Tab 2</TabAnimatedTitle>
				<TabAnimatedTitle id="3">Tab 3</TabAnimatedTitle>
			</div>

			<div css={{ maxWidth: 800, position: 'relative' }}>
				<TabAnimatedContent id="1">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore.
				</TabAnimatedContent>
				<TabAnimatedContent id="2">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco
					laboris nisi ut aliquip ex ea commodo consequat.
				</TabAnimatedContent>
				<TabAnimatedContent id="3">
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur deserunt
					laborum.
				</TabAnimatedContent>
			</div>
		</Trigger>
	</div>
)
Story.storyName = 'TabAnimated'
Story.args = {
	defaultActiveIds: ['1'],
	allowMultiActive: false,
	allowNoneActive: false,
}
