import PsycheApp from './psyche/main';
import { useRef } from 'react';

function App() {
  const canvasRef = useRef();
  return (
    <PsycheApp/>
  )
}

export default App
