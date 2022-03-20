import { useTransition, animated } from 'react-spring'
import { useTrigger } from '@intouchg/components'

export const TabAnimatedContent = ({
	id,
	...props
}: { id: string } & React.ComponentProps<'div'>) => {
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
