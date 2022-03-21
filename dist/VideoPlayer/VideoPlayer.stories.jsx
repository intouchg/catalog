import { VideoPlayer } from './VideoPlayer'
export default {
	title: 'VideoPlayer',
	component: VideoPlayer,
}
export const Story = (args) => (
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
		<a
			href="https://docs.videojs.com/tutorial-options.html"
			target="_blank"
			rel="noreferrer"
			css={{ display: 'block', marginTop: 16 }}
		>
			Video.js documentation
		</a>
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
