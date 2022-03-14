import styled from 'styled-components'
import { Trigger } from '@intouchg/components'
const AnimatedTitle = styled.span`
	color: ${(props) => (props.active ? 'green' : 'red')};
`
const AccordionTitle = ({ id, ...props }) => (
	<Trigger id={id}>
		{({ active, toggleActive }) => (
			<button onClick={toggleActive}>
				<AnimatedTitle active={active} {...props} />
			</button>
		)}
	</Trigger>
)
export { AccordionTitle }
