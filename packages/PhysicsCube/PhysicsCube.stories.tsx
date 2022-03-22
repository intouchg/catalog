import { Canvas } from '@react-three/fiber'
import { Physics, useBox } from '@react-three/cannon'
import { PhysicsCube, Cursor } from './PhysicsCube'
import type { ComponentStory, ComponentMeta } from '@storybook/react'

const description = `
This component uses ThreeJS via @react-three/fiber and @react-three/drei helpers and physics via @react-three/cannon \n
https://github.com/pmndrs/react-three-fiber \n
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction \n
https://github.com/pmndrs/use-cannon/tree/master/packages/react-three-cannon
`

export default {
	title: 'WebGL/PhysicsCube',
	component: PhysicsCube,
	parameters: {
		docs: {
			description: {
				component: description,
			},
		},
	},
} as ComponentMeta<typeof PhysicsCube>

const Floor = ({ position }: { position?: [number, number, number] }) => {
	const [ref] = useBox(() => ({
		args: [30, 30, 3],
		position,
		rotation: [Math.PI / 2, 0, 0],
	}))
	return (
		<mesh ref={ref} castShadow receiveShadow>
			<boxGeometry args={[30, 30, 3]} />
			<meshStandardMaterial color="grey" />
		</mesh>
	)
}

export const Story: ComponentStory<typeof PhysicsCube> = (args) => (
	<div
		css={{
			display: 'flex',
			height: '80vh',
			background: 'black',
		}}
	>
		<Canvas
			dpr={1}
			camera={{ far: 100, near: 1, position: [-25, 15, 25], zoom: 30 }}
			orthographic
			shadows
			css={{ cursor: 'none' }}
		>
			<ambientLight intensity={0.5} />
			<pointLight
				castShadow
				intensity={0.6}
				position={[0, 25, 25]}
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<Physics>
				<Cursor />
				{new Array(50).fill(0).map((value, index) => (
					<PhysicsCube key={index} {...args} />
				))}
				<Floor position={[0, -1, 0]} />
			</Physics>
		</Canvas>
	</div>
)

Story.storyName = 'PhysicsCube'

Story.args = {
	mass: 1,
}

Story.argTypes = {
	mass: {
		control: { type: 'range', min: 1, max: 10001, step: 10 },
	},
}
