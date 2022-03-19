import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension, textInputRule } from '@tiptap/core'
import styled from 'styled-components'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { RichTextMenu } from './RichTextMenu'
import type { Editor, PureEditorContent } from '@tiptap/react'

const copyright = textInputRule({ find: /\(c\)$/, replace: '©' })
const trademark = textInputRule({ find: /\(r\)$/, replace: '®' })
const pilcrow = textInputRule({ find: /\(p\)$/, replace: '¶' })
const silcrow = textInputRule({ find: /\(s\)$/, replace: '§' })

const CharacterShortcuts = Extension.create({
	name: 'characterShortcuts',
	addInputRules: () => [copyright, trademark, pilcrow, silcrow],
})

const EditorContainer = styled.div<{ truncate?: boolean }>`
	display: flex;
	flex-direction: column;

	& .ProseMirror {
		height: 160px;
		padding: 20px;
		border: 1px solid grey;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
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
	const editor = useEditor({
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
				onChange(editor.isEmpty ? '' : JSON.stringify(editor.getJSON()))
		},
	})

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
