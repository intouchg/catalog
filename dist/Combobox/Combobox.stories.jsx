import { Combobox } from './Combobox'
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
}
export const Story = (args) => (
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
