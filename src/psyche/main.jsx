import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';
import ProgressBarButton from './components/Buttons/ProgressBarButton';
import ControlsPopup from './components/PopUps/ControlsPopup';
import NotebookPopup from './components/PopUps/NotebookPopup';


function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isToSpaceCraft, setIsToSpaceCraft] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isToSpaceCraftClicked, setIsToSpaceCraftClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showSpacecraft, setShowSpacecraft] = useState(true);
  const [showAsteroid, setShowAsteroid] = useState(true);
  const [isMoving, setIsMoving] = useState(true);
  
  const [showSingleSpacecraft, setShowSingleSpacecraft] = useState(false);
  
  
  const useContextList = {isToSpaceCraftClicked, isToSpaceCraft,setIsToSpaceCraft, showAsteroid, setShowAsteroid, showCountdown, setShowCountdown, countdown, setCountdown,showSpacecraft, setShowSpacecraft,isMoving, setIsMoving, currentImage, setCurrentImage, isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked };

  const handleStartClick = () => {
    //setShowAsteroid(false);
    setIsMoving(false);
    //setShowSingleSpacecraft(true);
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
  
  const handleToSpacecraftClick = () => {
    setIsToSpaceCraftClicked(true);
  }
  
  const handleOverviewClick = () => {
    setIsOverviewClicked(true);
  };

  const handleControlsClick = () => {
    setShowControls(!showControls);
  };
  
  const handleNotebookClick = () => {
    setShowNotebook(!showNotebook);
  };


  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        {!isStartClicked && <div className="title-container">Psyche Simulation</div>}
        
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
         <MainPsycheContainer/>
        </Canvas>
        
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button start-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Start</button>}
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button credits-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleCreditsClick}>Credits</button>}
        
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        {isToSpaceCraft && <button className="ombre-button" onClick={handleToSpacecraftClick}>Next</button>}
        
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
