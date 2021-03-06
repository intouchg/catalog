import { Canvas } from '@react-three/fiber'
import { SDFShader } from './SDFShader'
import { OrthographicCamera } from '@react-three/drei'
const description = `
This component uses ThreeJS via @react-three/fiber and @react-three/drei helpers and WebGL shaders with signed distance functions / raymarching algorithms \n
https://github.com/pmndrs/react-three-fiber \n
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction \n
https://github.com/pmndrs/drei \n
https://www.shadertoy.com/view/flcGDs#
`
const OrthoCamera = OrthographicCamera
export default {
	title: 'WebGL/SDFShader',
	component: SDFShader,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
}
export const Story = (args) => (
	<div
		css={{
			display: 'flex',
			height: '80vh',
			background: 'black',
		}}
	>
		<Canvas dpr={1}>
			<OrthoCamera makeDefault args={[-1, 1, 1, -1, 0, 1]} />
			<SDFShader {...args} />
		</Canvas>
	</div>
)
Story.storyName = 'SDFShader'
Story.args = {
	steps: 64,
	surface: 0.5,
	sphereRadius: 1,
	distance: 2,
	timeScale: 12,
	noiseSpeed: 10,
	sinBase: 0.85,
	sinScale: 10,
	sinOffset: 15,
	noiseScale: 3,
	brightness: 0.7,
	contrast: 1,
	redOffset: 0.2,
	greenOffset: 0,
	blueOffset: 0,
	redMultiplier: 1,
	greenMultiplier: 0.95,
	blueMultiplier: 0.45,
}
Story.argTypes = {
	steps: {
		control: { type: 'range', min: 0, max: 64, step: 1 },
	},
	surface: {
		control: { type: 'range', min: -1, max: 3, step: 0.1 },
	},
	sphereRadius: {
		control: { type: 'range', min: 0, max: 3, step: 0.1 },
	},
	distance: {
		control: { type: 'range', min: 0, max: 6, step: 0.1 },
	},
	timeScale: {
		control: { type: 'range', min: 0, max: 15, step: 0.1 },
	},
	noiseSpeed: {
		control: { type: 'range', min: 0, max: 10, step: 0.1 },
	},
	sinBase: {
		control: { type: 'range', min: 0, max: 2.5, step: 0.05 },
	},
	sinScale: {
		control: { type: 'range', min: 0, max: 100, step: 1 },
	},
	sinOffset: {
		control: { type: 'range', min: 0, max: 100, step: 1 },
	},
	noiseScale: {
		control: { type: 'range', min: 1, max: 25, step: 1 },
	},
	brightness: {
		control: { type: 'range', min: 0, max: 5, step: 0.1 },
	},
	contrast: {
		control: { type: 'range', min: 0, max: 5, step: 0.1 },
	},
	redOffset: {
		control: { type: 'range', min: 0, max: 1, step: 0.05 },
	},
	greenOffset: {
		control: { type: 'range', min: 0, max: 1, step: 0.05 },
	},
	blueOffset: {
		control: { type: 'range', min: 0, max: 1, step: 0.05 },
	},
	redMultiplier: {
		control: { type: 'range', min: 0, max: 20, step: 0.05 },
	},
	greenMultiplier: {
		control: { type: 'range', min: 0, max: 20, step: 0.05 },
	},
	blueMultiplier: {
		control: { type: 'range', min: 0, max: 20, step: 0.05 },
	},
}
