import { RichTextMenuButton } from './RichTextMenuButton'
export const RichTextMenu = ({ editor, onClear, ...props }) => {
	if (!editor) return null
	return (
		<div
			css={{
				display: 'flex',
				padding: '8px 20px',
				overflow: 'hidden',
				background: '#ededed',
				border: '1px solid grey',
				borderTop: 0,
				borderBottomLeftRadius: 8,
				borderBottomRightRadius: 8,
			}}
			{...props}
		>
			<RichTextMenuButton
				css={{ fontWeight: 'bold' }}
				active={editor.isActive('bold')}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				B
			</RichTextMenuButton>
			<RichTextMenuButton
				css={{ fontSize: 20, fontStyle: 'italic', fontFamily: 'serif' }}
				active={editor.isActive('italic')}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				I
			</RichTextMenuButton>
			<RichTextMenuButton
				css={{ textDecoration: 'underline' }}
				active={editor.isActive('underline')}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			>
				U
			</RichTextMenuButton>
			<RichTextMenuButton
				active={editor.isActive('subscript')}
				onClick={() =>
					editor
						.chain()
						.focus()
						.unsetSuperscript()
						.toggleSubscript()
						.run()
				}
			>
				X<sub css={{ marginTop: 6 }}>2</sub>
			</RichTextMenuButton>
			<RichTextMenuButton
				active={editor.isActive('superscript')}
				onClick={() =>
					editor
						.chain()
						.focus()
						.unsetSubscript()
						.toggleSuperscript()
						.run()
				}
			>
				X<sup css={{ marginBottom: 6 }}>2</sup>
			</RichTextMenuButton>
			<RichTextMenuButton
				css={{ fontSize: 22, fontWeight: 'bold' }}
				active={editor.isActive('bulletList')}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				⋮
			</RichTextMenuButton>
			<RichTextMenuButton
				css={{ width: 'auto', marginLeft: 'auto', marginRight: 0 }}
				active={false}
				onClick={() => {
					editor.chain().clearContent().run()
					if (onClear) onClear()
				}}
			>
				Reset
			</RichTextMenuButton>
		</div>
	)
}
