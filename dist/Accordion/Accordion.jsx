import { Children, isValidElement, cloneElement } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTrigger } from '@intouchg/components'
import { useMeasure } from '@intouchg/hooks'
export const AccordionContainer = ({ id, children, ...props }) => (
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
export const AccordionTitle = ({ id, children, ...props }) => {
	const { active, toggleActive } = useTrigger(id)
	const [spring] = useSpring(
		{ transform: `translateX(${active ? 0 : 20}px)` },
		[active]
	)
	return (
		<button
			onClick={toggleActive}
			css={{ border: 0, background: 'pink' }}
			{...props}
		>
			<animated.span
				style={spring}
				css={{
					display: 'block',
					padding: 16,
					textAlign: 'left',
				}}
			>
				{children}
			</animated.span>
		</button>
	)
}
export const AccordionContent = ({ id, ...props }) => {
	const { active } = useTrigger(id)
	const [ref, size] = useMeasure()
	const styles = useSpring({ height: active ? size.height : 0 })
	return (
		<animated.div
			style={{
				overflow: 'hidden',
				willChange: 'height',
				...styles,
			}}
		>
			<div ref={ref}>
				<div {...props} css={{ padding: 16 }} />
			</div>
		</animated.div>
	)
}
