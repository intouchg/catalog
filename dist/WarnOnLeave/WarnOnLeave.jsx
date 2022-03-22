import {
	useCallback,
	useRef,
	useState,
	useEffect,
	isValidElement,
	cloneElement,
} from 'react'
import { useOutsideClickListener } from '@intouchg/hooks'
const Modal = ({ open, setOpen, children, ...props }) => {
	const closeModal = useCallback(
		() => void (open && setOpen(false)),
		[open, setOpen]
	)
	const modalElementRef = useOutsideClickListener(closeModal)
	if (!open) return null
	return (
		<div
			{...props}
			css={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(144, 144, 144, 0.85)',
				zIndex: 10,
			}}
		>
			{isValidElement(children)
				? cloneElement(children, { ref: modalElementRef })
				: children}
		</div>
	)
}
export const WarnOnLeave = ({ urlWhitelist = [], hostnameWhitelist = [] }) => {
	const continueButtonRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [href, setHref] = useState('')
	useEffect(() => {
		const handleClick = (event) => {
			const target = event.target.closest('a')
			if (
				target !== null &&
				!open &&
				target.tagName === 'A' &&
				!target.href.includes('mailto:') &&
				![document.location.hostname, ...hostnameWhitelist].includes(
					target.hostname
				) &&
				!urlWhitelist.includes(target.href)
			) {
				event.preventDefault()
				setHref(target.href)
				setOpen(true)
			} else if (target === continueButtonRef.current) {
				setOpen(false)
			}
		}
		window.addEventListener('click', handleClick)
		return () => window.removeEventListener('click', handleClick)
	}, [open])
	return (
		<Modal open={open} setOpen={setOpen}>
			<div
				css={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					maxWidth: 420,
					minHeight: 280,
					padding: 16,
					background: 'white',
					borderRadius: 8,
					'& > *': {
						marginBottom: 16,
					},
				}}
			>
				<span css={{ marginBottom: 24 }}>Warning</span>
				<p>
					You are about to leave this site to visit the following
					link:
				</p>
				<span>{href}</span>
				<div>
					<a
						href={href}
						css={{ marginRight: 16 }}
						ref={continueButtonRef}
					>
						Continue
					</a>
					<button onClick={() => setOpen(false)}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}
