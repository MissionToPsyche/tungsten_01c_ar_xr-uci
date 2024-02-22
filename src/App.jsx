import { Canvas } from '@react-three/fiber'
import MainPsycheContainer from './psyche/main'

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 75] }}>
      <MainPsycheContainer />
    </Canvas>
  )
}

export default App
