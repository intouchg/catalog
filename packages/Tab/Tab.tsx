import { useTrigger } from '@intouchg/components'
import { useSpring, animated } from 'react-spring'

export const TabTitle = ({
	id,
	...props
}: { id: string } & React.ComponentProps<'span'>) => {
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
				background: 'royalblue',
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

export const TabContent = ({
	id,
	...props
}: { id: string } & React.ComponentProps<'div'>) => {
	const { active } = useTrigger(id)

	if (!active) return null

	return (
		<div css={{ position: 'absolute' }}>
			<div {...props} />
		</div>
	)
}
