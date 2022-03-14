import {
	AccordionContainer,
	AccordionTitle,
	AccordionContent,
} from './Accordion'
import { Triggers } from '@intouchg/components'
export default {
	title: 'Example/Accordion',
	component: Triggers,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
}
const Template = (args) => (
	<Triggers {...args}>
		<AccordionContainer>
			<AccordionTitle id="1">Lorem ipsum dolor sit amet?</AccordionTitle>
			<AccordionContent id="1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Praesent gravida sodales ante, in vulputate metus rutrum et.
				Mauris sem lorem, sodales vel consectetur a, consectetur ut
				nibh. Praesent vestibulum eros et libero feugiat mollis. Sed
				finibus quam non tortor commodo, in egestas libero elementum.
				Maecenas sit amet elit venenatis nisi consectetur faucibus.
				Suspendisse eget sodales leo. Curabitur non egestas magna, ac
				accumsan dui. Pellentesque porttitor euismod dui, et congue sem
				tincidunt sed. Vivamus ac dapibus ex.
			</AccordionContent>
		</AccordionContainer>
	</Triggers>
)
export const MainTest = Template.bind({})
