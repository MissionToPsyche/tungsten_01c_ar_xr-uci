import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';

//Icons and Boxes
import IronIcon from  './components/Buttons/Iron_Button';
import IronBox from '../assets/iron_box.png';

import CalendarIcon from './components/Buttons/Calendar_Button'
import CalendarBox from '../assets/calendar_box.png';

import PlanetCoreIcon from './components/Buttons/Planet_Core_Button';
import PlanetCoreBox from  '../assets/planet_core_box.png';

import SizeIcon from './components/Buttons/Size_Button';
import SizeBox from  '../assets/size_box.png';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  
  const useContextList = { isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked };

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

  // Create on click event for Iron Icon
  const handleIronIconClick = () => {
    const imageToShow = currentImage === IronBox ? null : IronBox;
    setCurrentImage(imageToShow); // Show the iron info box, or hide if already shown
  };

  // Create on click event for Calendar Icon
  const handleCalendarClick = () => {
    const imageToShow = currentImage === CalendarBox ? null : CalendarBox;
    setCurrentImage(imageToShow); // Show the nickel info box, or hide if already shown
  };

  // Create click event for Planet Core Icon
  const handlePlanetCoreClick = () => {
    const imageToShow = currentImage === PlanetCoreBox ? null : PlanetCoreBox;
    setCurrentImage(imageToShow); // Show the nickel info box, or hide if already shown
  };

   // Create click event for Size Icon
   const handleSizeClick = () => {
    const imageToShow = currentImage === SizeBox ? null : SizeBox;
    setCurrentImage(imageToShow); // Show the nickel info box, or hide if already shown
  };

  const handleControlsClick = () => {
    setShowControls(!showControls);
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
  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        {!isStartClicked && <div className="title-container">Psyche Simulation</div>}
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer/>

          <IronIcon position={[0, 1 , 2]} onClick={handleIronIconClick} scale={[0.05, 0.3, 0.3]} /> 
          <CalendarIcon position={[-2.4, -1, -1]} onClick={handleCalendarClick} scale={[0.05, 0.3, 0.3]} />
          <PlanetCoreIcon position={[2.5, -1, -1]} onClick={handlePlanetCoreClick} scale={[0.05, 0.3, 0.3]} />
          <SizeIcon position={[-0.4, 2.1, -1.3]} onClick={handleSizeClick} scale={[0.05, 0.3, 0.3]} />

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
      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
