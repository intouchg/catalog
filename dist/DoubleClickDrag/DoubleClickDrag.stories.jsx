import { DoubleClickDrag } from './DoubleClickDrag'
const description = `
This component uses @use-gesture/react for gesture controls and react-spring for physics-based interpolations \n
https://github.com/pmndrs/use-gesture \n
https://use-gesture.netlify.app/ \n
https://github.com/pmndrs/react-spring \n
https://react-spring.io/
`
export default {
	title: 'DoubleClickDrag',
	component: DoubleClickDrag,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
}
export const Story = (args) => (
	<div
		css={{
			width: '100%',
			maxWidth: 600,
			height: '50vh',
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<DoubleClickDrag {...args} />
	</div>
)
Story.storyName = 'DoubleClickDrag'
Story.args = {
	doubleClickLimitInMs: 250,
}
Story.argTypes = {
	doubleClickLimitInMs: {
		control: { type: 'range', min: 10, max: 1000, step: 10 },
	},
}
