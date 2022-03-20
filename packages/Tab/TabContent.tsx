import { useTrigger } from '@intouchg/components'

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
