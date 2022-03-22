import { Form } from './Form'
const description = `
This component uses native HTML form elements for accessibility \n
https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/ \n
https://www.24a11y.com/2019/select-your-poison/
`
export default {
	title: 'Form',
	component: Form,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
}
export const Story = (args) => <Form {...args} />
Story.storyName = 'Form'
