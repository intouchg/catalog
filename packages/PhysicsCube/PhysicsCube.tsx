import { createRef, useEffect, useCallback } from 'react'
import {
	usePointToPointConstraint,
	useBox,
	useSphere,
} from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import type { Object3D } from 'three'

const cursor = createRef<Object3D>()

const useDragConstraint = (child: RefObject<Object3D>) => {
	const [, , api] = usePointToPointConstraint(cursor, child, {
		pivotA: [0, 0, 0],
		pivotB: [0.3, 0.3, 0.3],
		maxForce: 1,
	})
	useEffect(() => void api.disable(), [api])
	const onPointerUp = useCallback(
		(e) => {
			e.target.releasePointerCapture(e.pointerId)
			api.disable()
		},
		[api]
	)
	const onPointerDown = useCallback(
		(e) => {
			e.stopPropagation()
			e.target.setPointerCapture(e.pointerId)
			api.enable()
		},
		[api]
	)
	return { onPointerDown, onPointerUp }
}

export const Cursor = () => {
	const [ref, api] = useSphere(
		() => ({ args: [0.3], position: [0, 0, 10000], type: 'Kinematic' }),
		cursor
	)

	useFrame(({ mouse, viewport: { height, width } }) => {
		const x = mouse.x * width
		const y = (mouse.y * height) / 1.9 + -x / 4.7
		api.position.set(x / 1.4, y, 0)
	})

	return (
		<mesh ref={ref}>
			<sphereBufferGeometry args={[0.3, 16, 16]} />
			<meshBasicMaterial
				depthTest={false}
				fog={false}
				transparent
				opacity={0.75}
			/>
		</mesh>
	)
}

export const PhysicsCube = ({
	mass = 1,
	position = [
		Math.random() * 3 - 1,
		Math.random() * 3 + 4,
		Math.random() * 3 - 1,
	],
}: {
	mass?: number
	position?: [number, number, number]
}) => {
	const [ref] = useBox(() => ({ mass, position }), undefined, [mass])
	const bindGrab = useDragConstraint(ref)
	return (
		<mesh {...bindGrab} ref={ref} receiveShadow castShadow>
			<boxGeometry />
			<meshNormalMaterial />
		</mesh>
	)
}
