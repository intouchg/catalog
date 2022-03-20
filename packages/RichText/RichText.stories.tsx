import { RichText } from './RichText'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
	title: 'RichText',
	component: RichText,
} as ComponentMeta<typeof RichText>

export const Story: ComponentStory<typeof RichText> = (args) => (
	<div css={{ padding: 16, maxWidth: 800 }}>
		<RichText {...args} />
		<div css={{ marginTop: 32, marginLeft: 16 }}>
			Hint: You can try typing these character shortcuts:
			<ul css={{ marginLeft: 24, listStyleType: 'initial' }}>
				<li>(c) for ©</li>
				<li>(r) for ®</li>
				<li>(t) for ™</li>
				<li>(p) for ¶</li>
				<li>(s) for §</li>
			</ul>
		</div>
	</div>
)

Story.storyName = 'RichText'
