import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';


import ProgressBarButton from './components/Buttons/ProgressBarButton';

import ItemHotspots from './components/Buttons/ItemHotspot';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  
  const useContextList = { currentImage, setCurrentImage, isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked };

  const handleStartClick = () => {
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
      setStartClicked(true);
    }, 200);
  };

  const handleCreditsClick = () => {
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
      setCreditsClicked(true);
    }, 200);
  };
  
  const handleOverviewClick = () => {
    setIsOverviewClicked(true);
  };

  const handleControlsClick = () => {
    setShowControls(!showControls);
  };
  
  const handleNotebookClick = () => {
    setShowNotebook(!showNotebook);
  };

  function ControlsPopup({ onClose }) {
    return (
      <div className="controls-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="controls-content">
          <p>Controls:</p>
          <ul>
            <li>Pinch to zoom</li>
            <li>Swipe to move</li>
          </ul>
        </div>
      </div>
    );
  }
  
  function NotebookPopup({ onClose }) {
    return (
      <div className="controls-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="controls-content">
          Notebook Content
        </div>
      </div>
    );
  }
  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        {!isStartClicked && <div className="title-container">Psyche Simulation</div>}
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer/>
          
          <ItemHotspots/>
          
        </Canvas>
        
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button start-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Start</button>}
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button credits-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleCreditsClick}>Credits</button>}
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        
        {currentImage && (
          <div className="image-popup">
            <img src={currentImage} alt="Information" />
            <button onClick={() => setCurrentImage(null)}>Close</button>
          </div>
        )}
        {isStartClicked && (<button className="controls-button" onClick={handleControlsClick}>?</button>)}
        {showControls && <ControlsPopup onClose={() => setShowControls(false)} />}
          
          
        {isStartClicked && (<button onClick={handleNotebookClick}>        
          <ProgressBarButton/> 
        </button>)}
        {showNotebook && <NotebookPopup onClose={() => setShowNotebook(false)} />}


      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
