import { useSpring, useTransition, animated } from 'react-spring'
import { useTrigger } from '@intouchg/components'
export const TabAnimatedTitle = ({ id, ...props }) => {
	const { active, toggleActive } = useTrigger(id)
	const [spring] = useSpring(
		{
			transform: `scale3d(${active ? '1.2, 1.2, 1.2' : '1, 1, 1'})`,
		},
		[active]
	)
	return (
		<animated.button
			onClick={toggleActive}
			style={spring}
			css={{
				marginRight: 16,
				color: 'white',
				background: 'coral',
				border: 0,
			}}
		>
			<span
				{...props}
				css={{
					display: 'block',
					padding: 12,
					textAlign: 'left',
				}}
			/>
		</animated.button>
	)
}
export const TabAnimatedContent = ({ id, ...props }) => {
	const { active } = useTrigger(id)
	const transition = useTransition(active, {
		from: { x: '-10%', opacity: 0 },
		enter: { x: '0%', opacity: 1 },
		leave: { x: '10%', opacity: 0 },
	})
	return transition(
		(styles, active) =>
			active && (
				<animated.div
					style={{
						position: 'absolute',
						...styles,
					}}
				>
					<div {...props} />
				</animated.div>
			)
	)
}
