import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { perlin3 } from './noise'
export const NoisySphere = ({
	sphereRadius = 2,
	widthSegments = 128,
	heightSegments = 128,
	noiseSpeed = 1,
	noiseScale = 2.3,
	updateVertices = true,
	updateNormals = true,
}) => {
	const geometryRef = useRef()
	useFrame(({ clock }) => {
		const sphereGeometry = geometryRef.current
		if (!sphereGeometry) return
		const { vertices } = sphereGeometry
		const time = clock.getElapsedTime() * noiseSpeed
		for (let i = 0; i < vertices.length; i++) {
			const p = vertices[i]
			p.normalize().multiplyScalar(
				sphereRadius +
					0.3 *
						perlin3(
							p.x * noiseScale + time,
							p.y * noiseScale - time,
							p.z * noiseScale
						)
			)
		}
		if (updateVertices) sphereGeometry.verticesNeedUpdate = true
		if (updateNormals) sphereGeometry.computeVertexNormals()
	})
	return (
		<mesh position={[0, 0, 0]}>
			<sphereGeometry
				args={[sphereRadius, widthSegments, heightSegments]}
				ref={geometryRef}
			/>
			<meshNormalMaterial />
		</mesh>
	)
}
