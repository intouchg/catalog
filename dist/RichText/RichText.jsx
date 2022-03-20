import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension, textInputRule } from '@tiptap/core'
import styled from 'styled-components'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { RichTextMenu } from './RichTextMenu'
const copyright = textInputRule({ find: /\(c\)$/, replace: '©' })
const registered = textInputRule({ find: /\(r\)$/, replace: '®' })
const trademark = textInputRule({ find: /\(t\)$/, replace: '™' })
const pilcrow = textInputRule({ find: /\(p\)$/, replace: '¶' })
const silcrow = textInputRule({ find: /\(s\)$/, replace: '§' })
const CharacterShortcuts = Extension.create({
	name: 'characterShortcuts',
	addInputRules: () => [copyright, registered, trademark, pilcrow, silcrow],
})
const EditorContainer = styled.div`
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
const parseContent = (content) => {
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
}) => {
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
				attributes: { tabindex: !editable ? '-1' : undefined },
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
export default RichText
