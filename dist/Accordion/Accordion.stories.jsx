import {
	AccordionContainer,
	AccordionTitle,
	AccordionContent,
} from './Accordion'
import { Trigger } from '@intouchg/components'
const description = `
This component uses react-spring for physics-based easing \n
https://github.com/pmndrs/react-spring \n
https://react-spring.io/
`
export default {
	title: 'Accordion',
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
	<div css={{ padding: 16, maxWidth: 800 }}>
		<Trigger {...args}>
			<AccordionContainer id="1">
				<AccordionTitle>Lorem ipsum dolor sit amet?</AccordionTitle>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Praesent gravida sodales ante, in vulputate metus rutrum et.
					Mauris sem lorem, sodales vel consectetur a, consectetur ut
					nibh. Praesent vestibulum eros et libero feugiat mollis.
				</AccordionContent>
			</AccordionContainer>

			<AccordionContainer id="2">
				<AccordionTitle>Lorem ipsum dolor sit amet?</AccordionTitle>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Praesent gravida sodales ante, in vulputate metus rutrum et.
					Mauris sem lorem, sodales vel consectetur a, consectetur ut
					nibh. Praesent vestibulum eros et libero feugiat mollis.
				</AccordionContent>
			</AccordionContainer>

			<AccordionContainer id="3">
				<AccordionTitle>Lorem ipsum dolor sit amet?</AccordionTitle>
				<AccordionContent>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Praesent gravida sodales ante, in vulputate metus rutrum et.
					Mauris sem lorem, sodales vel consectetur a, consectetur ut
					nibh. Praesent vestibulum eros et libero feugiat mollis.
				</AccordionContent>
			</AccordionContainer>
		</Trigger>
	</div>
)
Story.storyName = 'Accordion'
Story.args = {
	defaultActiveIds: ['1'],
	allowMultiActive: true,
	allowNoneActive: true,
}
