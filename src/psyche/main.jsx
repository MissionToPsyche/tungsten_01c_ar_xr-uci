import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  
  const useContextList = { isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked };
  
  const handleOverviewClick = () => {
    setIsOverviewClicked(true);
  };
  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer/>
        </Canvas>
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
