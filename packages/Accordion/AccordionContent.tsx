import { useSpring, animated } from 'react-spring'
import { Trigger } from '@intouchg/components'
import { useMeasure } from '@intouchg/hooks'

const AnimatedContent = ({
	active,
	...props
}: { active: boolean } & React.ComponentProps<'div'>) => {
	const [ref, size] = useMeasure<HTMLDivElement>()
	const styles = useSpring({ height: active ? size.height : 0 })

	return (
		<animated.div
			style={{
				overflow: 'hidden',
				willChange: 'height',
				...styles,
			}}
		>
			<div ref={ref} {...props} />
		</animated.div>
	)
}

const AccordionContent = ({
	id,
	...props
}: { id: string } & React.ComponentProps<'div'>) => (
	<Trigger id={id}>
		{({ active }) => <AnimatedContent active={active} {...props} />}
	</Trigger>
)

export { AccordionContent }
