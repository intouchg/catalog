import { useState, useRef } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from '@use-gesture/react'
const DRAG_STATUS = {
	NONE: 'none',
	CLICKED: 'clicked',
	DOUBLE_CLICKED: 'double clicked',
	DRAG_STARTED: 'drag started',
	DRAG_ENDED: 'drag ended',
}
const getGestureStatusColor = (gestureStatus) => {
	switch (gestureStatus) {
		case DRAG_STATUS.CLICKED:
			return 'forestgreen'
		case DRAG_STATUS.DOUBLE_CLICKED:
			return 'royalblue'
		case DRAG_STATUS.DRAG_STARTED:
		case DRAG_STATUS.DRAG_ENDED:
			return 'salmon'
		case DRAG_STATUS.NONE:
		default:
			return 'grey'
	}
}
export const DoubleClickDrag = ({
	doubleClickLimitInMs = 250,
	onClick,
	onDrag,
	onDoubleClick,
}) => {
	const [clickCount, setClickCount] = useState(0)
	const [doubleClickCount, setDoubleClickCount] = useState(0)
	const [gestureStatus, setGestureStatus] = useState(DRAG_STATUS.NONE)
	const isDragging = useRef(false)
	const isDoubleClicked = useRef(false)
	const previousClickTimestamp = useRef(performance.now())
	const [props, setSpring] = useSpring(() => ({
		x: 0,
		y: 0,
		scale: 1,
		cursor: 'pointer',
		config: config.stiff,
	}))
	const bindDrag = useDrag(
		({ down, movement: [mx, my], first, last, active }) => {
			if (first) {
				isDragging.current = true
				setGestureStatus(DRAG_STATUS.DRAG_STARTED)
			} else if (last) {
				requestAnimationFrame(() => (isDragging.current = false))
				setGestureStatus(DRAG_STATUS.DRAG_ENDED)
			}
			if (active && onDrag) onDrag()
			setSpring({
				x: down ? mx : 0,
				y: down ? my : 0,
				scale: down ? 1.4 : 1,
				cursor: down ? 'grabbing' : 'pointer',
				immediate: (key) => key === 'cursor',
			})
		},
		{ delay: 500 }
	)
	const handleClick = (event) => {
		if (isDragging.current) return
		event.stopPropagation()
		const now = performance.now()
		const clickDeltaTime = now - previousClickTimestamp.current
		if (isDoubleClicked.current || clickDeltaTime >= doubleClickLimitInMs) {
			isDoubleClicked.current = false
			setGestureStatus(DRAG_STATUS.CLICKED)
		} else {
			isDoubleClicked.current = true
			setDoubleClickCount((c) => c + 1)
			setGestureStatus(DRAG_STATUS.DOUBLE_CLICKED)
			if (onDoubleClick) onDoubleClick()
		}
		previousClickTimestamp.current = now
		setClickCount((c) => c + 1)
		if (onClick) onClick(isDoubleClicked.current)
	}
	return (
		<>
			<animated.div
				{...bindDrag()}
				onClick={handleClick}
				style={{
					backgroundColor: getGestureStatusColor(gestureStatus),
					...props,
				}}
				css={{
					width: 80,
					height: 80,
					borderRadius: 16,
				}}
			/>
			<aside css={{ position: 'absolute', top: 0, left: 0 }}>
				<div style={{ color: getGestureStatusColor(gestureStatus) }}>
					Drag status: {gestureStatus}
				</div>
				<div>Click count: {clickCount}</div>
				<div>Double click count: {doubleClickCount}</div>
			</aside>
		</>
	)
}
