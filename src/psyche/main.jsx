import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';
import NickleIcon from './components/Nickle_Icon';
import IronIcon from './components/Iron_Icon';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  
  const useContextList = { isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked };
  
  const handleOverviewClick = () => {
    setIsOverviewClicked(true);
  };
  
  const handleIconClick = () => {
    alert('Info about physce'); // Example action
    
  };
  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer/>
          <IronIcon position={[3, 0, 0]} onClick={handleIconClick} scale={[0.05, 0.1, 0.1]} />
          <NickleIcon position={[-3.5, 1, 0]} onClick={handleIconClick} scale={[0.05, 0.1, 0.1]} /> 
        </Canvas>
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
