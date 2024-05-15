import PsycheApp from './psyche/main';
import { useRef, useState } from 'react';
import { getRefreshRate } from './psyche/utils/useCameraZoom';

function App() {
  const canvasRef = useRef();
  const [refreshRate, setRefreshRate] = useState(null);
  
  if (refreshRate === null) {
    getRefreshRate(function(refreshRate) {
      console.log("Refresh rate:", refreshRate, "Hz");
      setRefreshRate(refreshRate);
    });
  }
  return (
    <PsycheApp refreshRate={refreshRate}/>
  )
}

export default App
