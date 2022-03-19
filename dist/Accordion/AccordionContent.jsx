import { useSpring, animated } from 'react-spring'
import { useTrigger } from '@intouchg/components'
import { useMeasure } from '@intouchg/hooks'
const AccordionContent = ({ id, ...props }) => {
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
				<div {...props} css={{ padding: '1rem' }} />
			</div>
		</animated.div>
	)
}
export { AccordionContent }
