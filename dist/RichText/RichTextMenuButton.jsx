export const RichTextMenuButton = ({ active, ...props }) => (
	<button
		css={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 32,
			height: 32,
			padding: 8,
			marginRight: 12,
			background: active ? 'orange' : 'transparent',
			border: '1px solid grey',
		}}
		{...props}
	/>
)
