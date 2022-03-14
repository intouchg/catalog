import { useSpring, animated } from 'react-spring'
import { Trigger } from '@intouchg/components'
import { useMeasure } from '@intouchg/hooks'
const AnimatedContent = ({ active, ...props }) => {
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
			<div ref={ref} {...props} />
		</animated.div>
	)
}
const AccordionContent = ({ id, ...props }) => (
	<Trigger id={id}>
		{({ active }) => <AnimatedContent active={active} {...props} />}
	</Trigger>
)
export { AccordionContent }
