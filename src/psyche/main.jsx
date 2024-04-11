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
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  
  const useContextList = { currentImage, setCurrentImage, isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked,  userName, setUserName, showGreeting, setShowGreeting};

  const handleStartClick = () => {
    setShowNameInput(true);
  };

  const handleNameSubmit = () => {
    setShowNameInput(false);
    setShowGreeting(true);
    setStartClicked(true);
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
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

        {showNameInput && (
          <div className="name-input">
            <label htmlFor="name">What is your name?</label>
            <input
              type="text"
              id="name"
              placeholder=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleNameSubmit}>Submit</button>
          </div>
        )}

        {showGreeting && (
          <div className="text-box">
            <p>Hello, {userName}!</p>
            <button className="close-button" onClick={() => setShowGreeting(false)}>X</button>
          </div>
        )}
        
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
