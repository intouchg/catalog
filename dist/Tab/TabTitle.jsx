import { useTrigger } from '@intouchg/components'
export const TabTitle = ({ id, ...props }) => {
	const { active, toggleActive } = useTrigger(id)
	return (
		<button
			onClick={toggleActive}
			css={{
				marginRight: 16,
				color: 'white',
				background: 'royalblue',
				border: 0,
				transform: `scale3d(${active ? '1.2, 1.2, 1.2' : '1, 1, 1'})`,
				transition: 'all 200ms ease-out',
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
		</button>
	)
}
