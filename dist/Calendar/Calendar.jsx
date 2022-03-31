import { useState, useCallback, useMemo } from 'react'
const generateCalendar = (seedDate) => {
	const firstOfMonth = new Date(
		seedDate.getFullYear(),
		seedDate.getMonth(),
		1
	)
	const firstOfCalendar = new Date(
		firstOfMonth.getFullYear(),
		firstOfMonth.getMonth(),
		1 - firstOfMonth.getDay()
	)
	const daysInMonth = new Date(
		firstOfMonth.getFullYear(),
		firstOfMonth.getMonth() + 1,
		0
	).getDate()
	const daysFromNextMonth = 7 - ((daysInMonth + firstOfMonth.getDay()) % 7)
	const weeks = []
	let week = []
	for (let i = 0; i < firstOfMonth.getDay(); i++) {
		week.push(
			new Date(
				firstOfCalendar.getFullYear(),
				firstOfCalendar.getMonth(),
				firstOfCalendar.getDate() + i
			)
		)
	}
	for (let i = 1; i <= daysInMonth; i++) {
		week.push(
			new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), i)
		)
		if ((i + firstOfMonth.getDay()) % 7 === 0) {
			weeks.push(week)
			week = []
		}
	}
	if (daysFromNextMonth !== 7) {
		for (let i = 1; i <= daysFromNextMonth; i++) {
			week.push(
				new Date(
					firstOfMonth.getFullYear(),
					firstOfMonth.getMonth() + 1,
					i
				)
			)
		}
		weeks.push(week)
	}
	return weeks
}
const Day = ({
	day,
	dayOfWeekIndex,
	weekOfMonthIndex,
	active,
	inActiveMonth,
	updateActiveIndexes,
	onClickDay,
}) => {
	const handleClick = () => {
		updateActiveIndexes(dayOfWeekIndex, weekOfMonthIndex)
		if (onClickDay) onClickDay(day)
	}
	return (
		<div
			css={{
				width: 'calc(100% / 7)',
				height: 0,
				paddingBottom: '12.25%',
				border: '1px solid #bbbbbb',
				background: active
					? 'rgb(168, 211, 251)'
					: inActiveMonth
					? '#eeeeee'
					: '#dddddd',
			}}
			onClick={handleClick}
		>
			<span
				css={{
					display: 'inline-flex',
					justifyContent: 'center',
					width: 24,
					height: 24,
					padding: 6,
					borderRadius: '9999px',
				}}
			>
				{day.getDate()}
			</span>
		</div>
	)
}
const Week = ({
	days,
	weekOfMonthIndex,
	active,
	activeMonth,
	activeDayIndex,
	updateActiveIndexes,
	onClickDay,
}) => (
	<div
		css={{
			display: 'flex',
			width: '100%',
			border: '2px solid',
			borderColor: active ? 'rgb(141, 197, 249)' : '#bbbbbb',
			zIndex: active ? 2 : 1,
			'&:not(:first-of-type)': {
				marginTop: -4,
			},
		}}
	>
		{days.map((day, index) => (
			<Day
				key={index}
				day={day}
				dayOfWeekIndex={index}
				weekOfMonthIndex={weekOfMonthIndex}
				active={active && index === activeDayIndex}
				inActiveMonth={day.getMonth() === activeMonth}
				updateActiveIndexes={updateActiveIndexes}
				onClickDay={onClickDay}
			/>
		))}
	</div>
)
const Month = ({
	seedDate,
	activeDayIndex,
	activeWeekIndex,
	updateActiveIndexes,
	onClickDay,
}) => {
	const weeks = useMemo(() => generateCalendar(seedDate), [seedDate])
	return (
		<div
			css={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{weeks.map((days, index) => (
				<Week
					key={index}
					days={days}
					weekOfMonthIndex={index}
					active={index === activeWeekIndex}
					activeMonth={seedDate.getMonth()}
					activeDayIndex={activeDayIndex}
					updateActiveIndexes={updateActiveIndexes}
					onClickDay={onClickDay}
				/>
			))}
		</div>
	)
}
const CalendarHeader = ({ seedDate, updateMonth }) => (
	<div
		css={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 12,
			'& > button': {
				padding: '2px 6px',
			},
		}}
	>
		<button onClick={() => updateMonth(-1)}>&larr;</button>
		<span>
			{seedDate.toLocaleDateString('en-us', {
				month: 'long',
				year: 'numeric',
			})}
		</span>
		<button onClick={() => updateMonth(+1)}>&rarr;</button>
	</div>
)
export const Calendar = ({ initialDate = new Date(), onClickDay }) => {
	const [seedDate, setSeedDate] = useState(initialDate)
	const [activeDayIndex, setActiveDayIndex] = useState(-1)
	const [activeWeekIndex, setActiveWeekIndex] = useState(-1)
	const updateActiveIndexes = useCallback((dayIndex, weekIndex) => {
		setActiveDayIndex(dayIndex)
		setActiveWeekIndex(weekIndex)
	}, [])
	const updateMonth = useCallback(
		(offset) => {
			setSeedDate(
				(date) =>
					new Date(date.getFullYear(), date.getMonth() + offset, 1)
			)
			updateActiveIndexes(-1, -1)
		},
		[updateActiveIndexes]
	)
	return (
		<div css={{ display: 'flex', flexDirection: 'column' }}>
			<CalendarHeader seedDate={seedDate} updateMonth={updateMonth} />
			<Month
				seedDate={seedDate}
				activeDayIndex={activeDayIndex}
				activeWeekIndex={activeWeekIndex}
				updateActiveIndexes={updateActiveIndexes}
				onClickDay={onClickDay}
			/>
		</div>
	)
}
