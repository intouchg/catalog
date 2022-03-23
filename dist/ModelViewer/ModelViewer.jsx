import { Suspense } from 'react'
import { useGLTF, Loader, Html, OrbitControls } from '@react-three/drei'
export const Model = () => {
	const gltf = useGLTF('/angel.gltf')
	return (
		<group
			scale={1.8}
			position={[-0.2, 0.6, -0.5]}
			rotation={[0, Math.PI / 2, 0]}
		>
			<primitive object={gltf.scene} transparent={false} />
		</group>
	)
}
export const ModelViewer = () => {
	return (
		<Suspense
			fallback={
				<Html>
					<Loader />
				</Html>
			}
		>
			<OrbitControls makeDefault />
			<Model />
		</Suspense>
	)
}
