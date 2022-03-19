import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'
export const SDFShader = ({
	steps = 64,
	surface = 0.5,
	sphereRadius = 1,
	distance = 2,
	timeScale = 12,
	noiseSpeed = 10,
	sinBase = 0.85,
	sinScale = 10,
	sinOffset = 15,
	noiseScale = 3,
	brightness = 0.7,
	contrast = 1,
	redOffset = 0.2,
	greenOffset = 0,
	blueOffset = 0,
	redMultiplier = 1,
	greenMultiplier = 0.95,
	blueMultiplier = 0.45,
}) => {
	const uniformsRef = useRef({
		uTime: { value: 0 },
		uResolution: { value: [0, 0] },
		uSteps: { value: steps },
		uSurface: { value: surface },
		uSphereRadius: { value: sphereRadius },
		uDistance: { value: distance },
		uTimeScale: { value: timeScale },
		uNoiseSpeed: { value: noiseSpeed },
		uSinBase: { value: sinBase },
		uSinScale: { value: sinScale },
		uSinOffset: { value: sinOffset },
		uNoiseScale: { value: noiseScale },
		uBrightness: { value: brightness },
		uContrast: { value: contrast },
		uRedOffset: { value: redOffset },
		uGreenOffset: { value: greenOffset },
		uBlueOffset: { value: blueOffset },
		uRedMultiplier: { value: redMultiplier },
		uGreenMultiplier: { value: greenMultiplier },
		uBlueMultiplier: { value: blueMultiplier },
	})
	useFrame(({ clock, size }) => {
		uniformsRef.current.uTime.value = clock.getElapsedTime()
		uniformsRef.current.uResolution.value = [size.width, size.height]
		uniformsRef.current.uSteps.value = steps
		uniformsRef.current.uSurface.value = surface
		uniformsRef.current.uSphereRadius.value = sphereRadius
		uniformsRef.current.uDistance.value = distance
		uniformsRef.current.uTimeScale.value = timeScale
		uniformsRef.current.uNoiseSpeed.value = noiseSpeed
		uniformsRef.current.uSinBase.value = sinBase
		uniformsRef.current.uSinScale.value = sinScale
		uniformsRef.current.uSinOffset.value = sinOffset
		uniformsRef.current.uNoiseScale.value = noiseScale
		uniformsRef.current.uBrightness.value = brightness
		uniformsRef.current.uContrast.value = contrast
		uniformsRef.current.uRedOffset.value = redOffset
		uniformsRef.current.uGreenOffset.value = greenOffset
		uniformsRef.current.uBlueOffset.value = blueOffset
		uniformsRef.current.uRedMultiplier.value = redMultiplier
		uniformsRef.current.uGreenMultiplier.value = greenMultiplier
		uniformsRef.current.uBlueMultiplier.value = blueMultiplier
	})
	return (
		<mesh>
			<planeBufferGeometry args={[2, 2]} />
			<shaderMaterial
				uniforms={uniformsRef.current}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</mesh>
	)
}
