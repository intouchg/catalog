import { Combobox } from './Combobox'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component uses Downshift for performance and accessibility \n
https://github.com/downshift-js/downshift \n
https://www.downshift-js.com/
`

export default {
	title: 'Combobox',
	component: Combobox,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof Combobox>

export const Story: ComponentStory<any> = (
	args: Partial<
		Omit<React.ComponentProps<typeof Combobox>, 'inputId' | 'labelId'>
	>
) => (
	<div
		css={{
			display: 'grid',
			alignContent: 'start',
			rowGap: 16,
			width: '100%',
			maxWidth: 640,
			minHeight: 320,
		}}
	>
		<label id="person-select-label" htmlFor="person-select-input">
			Search and select a person from the list below:
		</label>
		<Combobox
			data={[
				{ person: 'Ervin Nichols' },
				{ person: 'Sherry Dawkins' },
				{ person: 'Sharon McLain' },
				{ person: 'Kim Gonzalez' },
				{ person: 'David Gonzalez' },
				{ person: 'Billy Shane' },
				{ person: 'Scott Perkins' },
				{ person: 'Charles Jenkins' },
				{ person: 'Anna Adams' },
				{ person: 'Merle Pereira' },
			]}
			nameKey="person"
			placeholder="Search for a person"
			inputId="person-select-input"
			labelId="person-select-label"
			toggleButtonAriaLabel={(isOpen) =>
				isOpen ? 'Close person list' : 'Open person list'
			}
			{...args}
		/>
	</div>
)

Story.storyName = 'Combobox'
