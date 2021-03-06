import { VideoPlayer } from './VideoPlayer'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component uses Video.js \n
https://github.com/videojs/video.js \n
https://docs.videojs.com/tutorial-options.html
`

export default {
	title: 'VideoPlayer',
	component: VideoPlayer,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof VideoPlayer>

export const Story: ComponentStory<typeof VideoPlayer> = (args) => (
	<div css={{ padding: 16, maxWidth: 800 }}>
		<VideoPlayer
			poster="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
			sources={[
				{
					src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
					type: 'video/mp4',
				},
			]}
			{...args}
		/>
	</div>
)

Story.storyName = 'VideoPlayer'

Story.args = {
	controls: true,
	loop: false,
	muted: false,
	preload: 'auto',
	playbackRates: [0.5, 1, 1.5, 2],
}

Story.argTypes = {
	preload: {
		options: ['auto', 'metadata', 'none'],
		defaultValue: 'auto',
		control: { type: 'select' },
	},
}
