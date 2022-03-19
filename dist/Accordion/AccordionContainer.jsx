import { Children, isValidElement, cloneElement } from 'react'
const AccordionContainer = ({ id, children, ...props }) => (
	<div
		{...props}
		css={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			marginBottom: 16,
			background: 'white',
			border: '3px solid royalblue',
			borderRadius: 8,
			overflow: 'hidden',
		}}
	>
		{Children.toArray(children).map((child) => {
			if (!isValidElement(child)) return child
			return cloneElement(child, { id })
		})}
	</div>
)
export { AccordionContainer }
