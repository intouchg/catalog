import { DragList } from './DragList'
const description = `
This component uses react-spring for physics-based easing and @use-gesture/react for gesture controls \n
https://github.com/pmndrs/react-spring \n
https://react-spring.io/ \n
https://github.com/pmndrs/use-gesture \n
https://use-gesture.netlify.app/
`
export default {
	title: 'DragList',
	component: DragList,
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
		<DragList {...args} />
	</div>
)
Story.storyName = 'DragList'
Story.args = {
	data: [
		{
			person: 'Tom',
			background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
		},
		{
			person: 'Erin',
			background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		},
		{
			person: 'Claudia',
			background: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
		},
		{
			person: 'Scott',
			background: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
		},
	],
	nameKey: 'person',
	listItemHeight: 80,
	listItemPadding: 16,
}
