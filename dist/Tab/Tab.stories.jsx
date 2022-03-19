import { TabTitle, TabContent } from './Tab'
import { Trigger } from '@intouchg/components'
export default {
	title: 'Tab',
	component: Trigger,
}
export const Tab = (args) => (
	<div css={{ padding: 16, maxWidth: 800 }}>
		<Trigger {...args}>
			<div css={{ marginBottom: 16 }}>
				<TabTitle id="1">Tab 1</TabTitle>
				<TabTitle id="2">Tab 2</TabTitle>
				<TabTitle id="3">Tab 3</TabTitle>
			</div>

			<TabContent id="1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Praesent gravida sodales ante, in vulputate metus rutrum et.
				Mauris sem lorem, sodales vel consectetur a, consectetur ut
				nibh. Praesent vestibulum eros et libero feugiat mollis.
			</TabContent>
			<TabContent id="2">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Praesent gravida sodales ante, in vulputate metus rutrum et.
				Mauris sem lorem, sodales vel consectetur a, consectetur ut
				nibh. Praesent vestibulum eros et libero feugiat mollis.
			</TabContent>
			<TabContent id="3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Praesent gravida sodales ante, in vulputate metus rutrum et.
				Mauris sem lorem, sodales vel consectetur a, consectetur ut
				nibh. Praesent vestibulum eros et libero feugiat mollis.
			</TabContent>
		</Trigger>
	</div>
)
Tab.args = {
	defaultActiveIds: ['1'],
	allowMultiActive: false,
	allowNoneActive: false,
}
