import { WarnOnLeave } from './WarnOnLeave'
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
}
export const Story = (args) => (
	<div css={{ display: 'grid', rowGap: 8, maxWidth: 600 }}>
		<p>
			Clicking a link to leave this site will show a &quot;Warn on
			Leave&quot; modal unless the URL or hostname has been whitelisted.
			For this example google.com is whitelisted.
		</p>
		<a href="https://facebook.com">Go to facebook.com</a>
		<a href="https://google.com" css={{ marginRight: 16 }}>
			Go to google.com
		</a>
		<WarnOnLeave {...args} />
	</div>
)
Story.storyName = 'WarnOnLeave'
Story.args = {
	hostnameWhitelist: ['google.com'],
	urlWhitelist: [],
}
