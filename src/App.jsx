import PsycheApp from './psyche/main';
import { useRef } from 'react';
import { getRefreshRate } from './psyche/utils/useCameraZoom';

function App() {
  const canvasRef = useRef();
  getRefreshRate(function(refreshRate) {
    console.log("Refresh rate:", refreshRate, "Hz");
});
  return (
    <PsycheApp/>
  )
}

export default App
