import { useTrigger } from '@intouchg/components'
export const AccordionTitle = ({ id, ...props }) => {
	const { active, toggleActive } = useTrigger(id)
	return (
		<button onClick={toggleActive} css={{ border: 0, background: 'pink' }}>
			<span
				{...props}
				css={{
					display: 'block',
					padding: 16,
					transform: `translateX(${active ? 0 : 20}px)`,
					transition: 'all 200ms ease-out',
					textAlign: 'left',
				}}
			/>
		</button>
	)
}
