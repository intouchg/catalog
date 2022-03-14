import styled from 'styled-components'
import { Trigger } from '@intouchg/components'

const AnimatedTitle = styled.span<{ active: boolean }>`
	color: ${(props) => (props.active ? 'green' : 'red')};
`

const AccordionTitle = ({
	id,
	...props
}: { id: string } & React.ComponentProps<typeof AnimatedTitle>) => (
	<Trigger id={id}>
		{({ active, toggleActive }) => (
			<button onClick={toggleActive}>
				<AnimatedTitle active={active} {...props} />
			</button>
		)}
	</Trigger>
)

export { AccordionTitle }
