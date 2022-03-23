import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ModelViewer } from './ModelViewer'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component uses ThreeJS via @react-three/fiber and @react-three/drei helpers \n
https://github.com/pmndrs/react-three-fiber \n
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction \n
https://github.com/pmndrs/drei
`

export default {
	title: 'WebGL/ModelViewer',
	component: ModelViewer,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof ModelViewer>

export const Story: ComponentStory<typeof ModelViewer> = (args) => (
	<div
		css={{
			display: 'flex',
			height: '80vh',
			background: 'black',
		}}
	>
		<Canvas dpr={1} shadows>
			<Suspense fallback={null}>
				<ModelViewer />
			</Suspense>
		</Canvas>
	</div>
)

Story.storyName = 'ModelViewer'
