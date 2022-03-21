import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension, textInputRule } from '@tiptap/core'
import styled from 'styled-components'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import type { Editor, PureEditorContent } from '@tiptap/react'

export const RichTextMenuButton = ({
	active,
	...props
}: { active: boolean } & React.ComponentProps<'button'>) => (
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

export const RichTextMenu = ({
	editor,
	onClear,
	...props
}: {
	editor: Editor | null
	onClear?: () => void
} & React.ComponentProps<'div'>) => {
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

const copyright = textInputRule({ find: /\(c\)$/, replace: '©' })
const registered = textInputRule({ find: /\(r\)$/, replace: '®' })
const trademark = textInputRule({ find: /\(t\)$/, replace: '™' })
const pilcrow = textInputRule({ find: /\(p\)$/, replace: '¶' })
const silcrow = textInputRule({ find: /\(s\)$/, replace: '§' })

const CharacterShortcuts = Extension.create({
	name: 'characterShortcuts',
	addInputRules: () => [copyright, registered, trademark, pilcrow, silcrow],
})

const EditorContainer = styled.div<{ truncate?: boolean }>`
	display: flex;
	flex-direction: column;

	& .ProseMirror {
		height: 160px;
		padding: 20px;
		border: 1px solid grey;
		background-color: #f9f9f9;

		${(props) =>
			!props.truncate
				? ''
				: `	
			height: 1.2rem;
			* {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		`}
		ul,
		ol {
			padding-left: 1.25rem;
			margin-left: 1.25rem;
		}
		ul {
			list-style-type: disc;
		}
		ol {
			list-style-type: decimal;
		}
	}
`

const parseContent = (content: string) => {
	try {
		return JSON.parse(content)
	} catch (error) {
		return content
	}
}

export const RichText = ({
	initialValue = '',
	editable = true,
	truncate,
	onChange,
	onClear,
	editorRef,
	...props
}: {
	initialValue?: string
	editable?: boolean
	truncate?: boolean
	onChange?: (value: string) => void
	onClear?: () => void
	editorRef?: React.Ref<PureEditorContent>
} & React.ComponentProps<'div'>) => {
	const editor = useEditor(
		{
			editable,
			content: parseContent(initialValue),
			extensions: [
				StarterKit,
				Underline,
				Subscript,
				Superscript,
				CharacterShortcuts,
			],
			editorProps: {
				attributes: { tabindex: !editable ? '-1' : (undefined as any) },
			},
			onUpdate: ({ editor }) => {
				if (onChange)
					onChange(
						editor.isEmpty ? '' : JSON.stringify(editor.getJSON())
					)
			},
		},
		[editable]
	)

	useEffect(
		() => void editor?.commands.setContent(parseContent(initialValue)),
		[initialValue, editor]
	)

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				overflow: truncate ? 'hidden' : undefined,
			}}
			{...props}
		>
			<EditorContainer truncate={truncate}>
				<EditorContent editor={editor} ref={editorRef} />
			</EditorContainer>
			{editable && <RichTextMenu editor={editor} onClear={onClear} />}
		</div>
	)
}
