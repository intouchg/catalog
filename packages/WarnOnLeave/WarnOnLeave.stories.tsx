import { WarnOnLeave } from './WarnOnLeave'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component shows a "Warn on Leave" modal any time a link redirects to another host, unless that host or URL is whitelisted.
`

export default {
	title: 'WarnOnLeave',
	component: WarnOnLeave,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof WarnOnLeave>

export const Story: ComponentStory<typeof WarnOnLeave> = (args) => (
	<div css={{ display: 'grid', rowGap: 8, maxWidth: 600 }}>
		<p>
			Attempting to navigate away from this site will present a &quot;Warn
			on Leave&quot; modal.
		</p>
		<p>For this example google.com is whitelisted.</p>
		<br />
		<a href="https://facebook.com">Visit facebook.com</a>
		<a href="https://google.com" css={{ marginRight: 16 }}>
			Visit google.com
		</a>
		<WarnOnLeave {...args} />
	</div>
)

Story.storyName = 'WarnOnLeave'

Story.args = {
	hostnameWhitelist: ['google.com'],
	urlWhitelist: [],
}
