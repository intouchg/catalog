import { useTrigger } from '@intouchg/components'
export const TabContent = ({ id, ...props }) => {
	const { active } = useTrigger(id)
	if (!active) return null
	return (
		<div css={{ position: 'absolute' }}>
			<div {...props} />
		</div>
	)
}
