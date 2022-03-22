import { useState } from 'react'
import { useCombobox } from 'downshift'
import { animated, useSpring } from 'react-spring'
import { Chevron } from '@intouchg/components'
const AnimatedText = ({ focused, children }) => {
	const [spring] = useSpring(
		{
			transform: `scale3d(${
				focused ? '1.025, 1.025, 1.025' : '1, 1, 1'
			})`,
		},
		[focused]
	)
	return <animated.div style={spring}>{children}</animated.div>
}
const sortAlphabetical = (array, key) =>
	array.slice().sort((a, b) => {
		const valueA = a[key].toLowerCase()
		const valueB = b[key].toLowerCase()
		return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
	})
export const Combobox = ({
	data,
	nameKey,
	placeholder,
	inputId,
	labelId,
	toggleButtonAriaLabel,
	onSelect,
	onInputValueChange,
}) => {
	const [inputItems, setInputItems] = useState(
		sortAlphabetical(data, nameKey)
	)
	const {
		inputValue,
		isOpen,
		openMenu,
		selectItem,
		setInputValue,
		setHighlightedIndex,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		highlightedIndex,
		getItemProps,
	} = useCombobox({
		items: inputItems,
		itemToString: (d) => (d ? d[nameKey] : ''),
		inputId,
		labelId,
		onInputValueChange: ({ inputValue = '', type }) => {
			setInputItems(
				data.filter((item) =>
					item[nameKey]
						.toLowerCase()
						.includes(inputValue.toLowerCase())
				)
			)
			if (type === '__input_change__') {
				if (onInputValueChange) onInputValueChange()
				const matchIndex = inputItems.findIndex(
					(d) => d[nameKey].toLowerCase() === inputValue.toLowerCase()
				)
				if (matchIndex !== -1) {
					setHighlightedIndex(matchIndex)
					selectItem(inputItems[matchIndex])
				} else {
					selectItem(null)
					setInputValue(inputValue)
				}
			}
		},
		onSelectedItemChange: (event) => onSelect(event.selectedItem),
	})
	const [translateSpring] = useSpring(
		{
			config: { mass: 0.5, tension: 80, friction: 20 },
			opacity: isOpen ? 1 : 0,
			y: isOpen ? '0px' : '-8px',
		},
		[isOpen]
	)
	return (
		<div css={{ position: 'relative' }}>
			<div css={{ position: 'relative' }} {...getComboboxProps()}>
				<div css={{ position: 'relative', width: '100%' }}>
					<input
						spellCheck="false"
						placeholder={placeholder}
						css={{
							width: '100%',
							padding: 10,
							border: '2px solid',
							borderRadius: 8,
							fontSize: '1.25rem',
						}}
						onFocus={openMenu}
						{...getInputProps()}
					/>
					<button
						aria-label={toggleButtonAriaLabel(isOpen)}
						css={{
							position: 'absolute',
							right: 0,
							display: 'inline-flex',
							alignItems: 'center',
							height: '100%',
							width: 30,
							padding: '0px 8px',
							background: 'none',
							border: 0,
						}}
						{...getToggleButtonProps()}
					>
						<Chevron css={{ width: 12 }} />
					</button>
				</div>
			</div>
			<animated.div
				style={{
					position: 'relative',
					cursor: 'pointer',
					willChange: 'opacity, transform',
					...translateSpring,
				}}
			>
				<ul
					css={{
						position: 'absolute',
						top: 2,
						width: '100%',
						maxHeight: '30vh',
						color: 'royalblue',
						fontSize: '1.25rem',
						borderRadius: 8,
						overflowX: 'hidden',
						overflowY: 'scroll',
						boxShadow:
							'0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
					}}
					{...getMenuProps()}
				>
					{isOpen &&
						inputItems.map((item, index) => (
							<li
								key={`${item[nameKey]}${index}`}
								css={{
									padding: '4px 32px',
									borderRadius: 8,
									background:
										index === highlightedIndex
											? '#d4dfff'
											: 'none',
									border: '1px solid',
									borderColor:
										index === highlightedIndex
											? 'royalblue'
											: 'transparent',
									textAlign: 'left',
								}}
								{...getItemProps({ item, index })}
							>
								<AnimatedText
									focused={index === highlightedIndex}
								>
									{item[nameKey]}
								</AnimatedText>
							</li>
						))}
				</ul>
			</animated.div>
		</div>
	)
}
