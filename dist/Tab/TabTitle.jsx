import { useTrigger } from '@intouchg/components'
const TabTitle = ({ id, ...props }) => {
	const { active, toggleActive } = useTrigger(id)
	return (
		<button
			onClick={toggleActive}
			css={{
				marginRight: '1rem',
				color: 'white',
				background: 'royalblue',
				border: '0',
				transform: `scale3d(${active ? '1.2, 1.2, 1.2' : '1, 1, 1'})`,
				transition: 'all 200ms ease-out',
			}}
		>
			<span
				{...props}
				css={{
					display: 'block',
					padding: '0.5rem 1rem',
					textAlign: 'left',
				}}
			/>
		</button>
	)
}
export { TabTitle }
