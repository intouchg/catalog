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
}
const StyledTest = styled(Checkbox)`
	${(props) => css`
		${props.cssStyles}
	`}
`
const Template = (args) => (
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
