// Most of this code is taken directly from examples on the react-spring and @use-gesture docs
// https://use-gesture.netlify.app/docs/examples/
// https://codesandbox.io/s/weathered-https-zxo3w0
import { useRef } from 'react'
import { useSprings, animated, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const moveByIndex = (array, fromIndex, toIndex) => {
	const newArray = array.slice()
	const movedItem = newArray.splice(fromIndex, 1)[0]
	newArray.splice(toIndex, 0, movedItem)
	return newArray
}
const getSpringStyle =
	(
		rowHeight,
		order,
		active = false,
		originalIndex = 0,
		currentIndex = 0,
		y = 0
	) =>
	(index) =>
		active && index === originalIndex
			? {
					y: currentIndex * rowHeight + y,
					scale: 1.1,
					zIndex: 1,
					shadow: 15,
					cursor: 'grabbing',
					immediate: (key) => key === 'zIndex' || key === 'cursor',
					config: (key) =>
						key === 'y' ? config.stiff : config.default,
			  }
			: {
					y: order.indexOf(index) * rowHeight,
					scale: 1,
					zIndex: 0,
					shadow: 1,
					cursor: 'grab',
					immediate: (key) => key === 'cursor',
			  }
export const DragList = ({
	data,
	nameKey,
	listItemHeight = 80,
	listItemPadding = 16,
	onDragStart,
	onDragEnd,
	...props
}) => {
	const rowHeight = listItemHeight + listItemPadding
	const order = useRef(data.map((item, index) => index))
	const [springs, springsApi] = useSprings(
		data.length,
		getSpringStyle(rowHeight, order.current),
		[data, nameKey, rowHeight]
	)
	const bindDrag = useDrag(
		({ args: [originalIndex], active, movement: [x, y], first }) => {
			const currentIndex = order.current.indexOf(originalIndex)
			const curRow = clamp(
				Math.round((currentIndex * rowHeight + y) / rowHeight),
				0,
				data.length - 1
			)
			const newOrder = moveByIndex(order.current, currentIndex, curRow)
			springsApi.start(
				getSpringStyle(
					rowHeight,
					newOrder,
					active,
					originalIndex,
					currentIndex,
					y
				)
			)
			if (first && onDragStart) onDragStart(data, order.current)
			if (!active) {
				order.current = newOrder
				if (onDragEnd) onDragEnd(data, newOrder)
			}
		}
	)
	return (
		<div
			css={{
				position: 'relative',
				width: '100%',
				maxWidth: 380,
				height: data.length * rowHeight,
			}}
			{...props}
		>
			{springs.map(({ y, scale, zIndex, shadow, cursor }, index) => (
				<animated.div
					{...bindDrag(index)}
					key={index}
					style={{
						y,
						scale,
						zIndex,
						cursor,
						boxShadow: shadow.to(
							(s) =>
								`rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
						),
					}}
					css={{
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						height: listItemHeight,
						padding: 16,
						transformOrigin: '50% 50% 0px',
						touchAction: 'none',
						background: data[index]?.background || 'white',
						borderRadius: 4,
						color: 'white',
						fontSize: '1.25rem',
						fontWeight: 'bold',
					}}
				>
					{data[index][nameKey]}
				</animated.div>
			))}
		</div>
	)
}
