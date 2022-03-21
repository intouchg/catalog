import { useRef, useEffect } from 'react'
import videojs from 'video.js'
import './video-js-7.18.1.min.css'
import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

export const VideoPlayer = ({
	className,
	poster,
	onReady,
	...initialOptions
}: {
	className?: string
	poster?: string
	onReady?: (player: VideoJsPlayer) => void
} & VideoJsPlayerOptions) => {
	const videoRef = useRef(null)
	const playerRef = useRef<VideoJsPlayer | null>(null)

	useEffect(() => {
		if (playerRef.current || !videoRef.current) return
		playerRef.current = videojs(
			videoRef.current,
			initialOptions,
			() => onReady && onReady(playerRef.current as VideoJsPlayer)
		)
	}, [initialOptions, onReady, videoRef, playerRef])

	useEffect(
		() => () => {
			if (playerRef.current) {
				playerRef.current.dispose()
				playerRef.current = null
			}
		},
		[playerRef]
	)

	return (
		<div
			className={className}
			css={{
				position: 'relative',
				height: '0',
				width: 'auto',
				overflow: 'hidden',
				paddingBottom: '56.25%',
				backgroundColor: 'transparent',
			}}
		>
			<div data-vjs-player>
				<video
					ref={videoRef}
					className="video-js vjs-big-play-centered"
					poster={poster}
					controls
					css={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						width: 'unset',
						height: 'unset',
						cursor: 'pointer',
					}}
				/>
			</div>
		</div>
	)
}
