import { Canvas } from '@react-three/fiber'
import MainPsycheContainer from './psyche/main'
import { useRef } from 'react';

function App() {
  const cameraRef = useRef();
  const canvasRef = useRef();
  return (
    <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
      <MainPsycheContainer />
    </Canvas>
  )
}

export default App
