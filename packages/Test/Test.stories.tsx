import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { Test } from './Test'
import { Apply, Checkbox } from '@intouchg/components'
import styled, { css } from 'styled-components'

export default {
	title: 'Example/Test',
	component: Test,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Test>

const StyledTest = styled(Checkbox)<{ cssStyles: string }>`
	${(props) =>
		css`
			${props.cssStyles}
		`}
`

const Template: ComponentStory<typeof StyledTest> = (args) => (
	<div
		css={`
			display: flex;
			height: 100vh;
			align-items: center;
			justify-content: center;
		`}
	>
		<Apply
			css={`
				margin: 1rem;
			`}
		>
			<StyledTest {...args} />
			<StyledTest disabled {...args} />
			<StyledTest checked {...args} />
			<StyledTest checked disabled {...args} />
		</Apply>
	</div>
)

export const MainTest = Template.bind({})

MainTest.args = {
	cssStyles: `color: red;`,
}
