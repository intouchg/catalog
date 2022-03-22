import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { NoisySphere } from './NoisySphere'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component uses ThreeJS via @react-three/fiber and @react-three/drei helpers \n
https://github.com/pmndrs/react-three-fiber \n
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
`

export default {
	title: 'WebGL/NoisySphere',
	component: NoisySphere,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof NoisySphere>

export const Story: ComponentStory<typeof NoisySphere> = (args) => (
	<div
		css={{
			display: 'flex',
			height: '80vh',
			background: 'black',
		}}
	>
		<Canvas dpr={1}>
			<OrbitControls makeDefault />
			<ambientLight />
			<NoisySphere {...args} />
		</Canvas>
	</div>
)

Story.storyName = 'NoisySphere'

Story.args = {
	sphereRadius: 2,
	widthSegments: 128,
	heightSegments: 128,
	noiseSpeed: 1,
	noiseScale: 2.3,
	updateVertices: true,
	updateNormals: true,
}

Story.argTypes = {
	sphereRadius: {
		control: { type: 'range', min: 0, max: 4, step: 0.1 },
	},
	widthSegments: {
		control: { type: 'range', min: 1, max: 256, step: 1 },
	},
	heightSegments: {
		control: { type: 'range', min: 1, max: 256, step: 1 },
	},
	noiseSpeed: {
		control: { type: 'range', min: 0, max: 10, step: 0.1 },
	},
	noiseScale: {
		control: { type: 'range', min: 0, max: 25, step: 0.1 },
	},
}
