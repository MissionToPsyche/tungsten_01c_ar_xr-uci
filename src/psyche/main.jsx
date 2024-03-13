import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';


//Icons and Boxes
import IronIcon from './components/Buttons/Calendar_Button';
import IronBox from '../assets/iron_box.png';

import CalendarIcon from './components/Buttons/Iron_Button';
import CalendarBox from '../assets/calendar_box.png';

import PlanetCoreIcon from './components/Buttons/Planet_Core_Button';
import PlanetCoreBox from  '../assets/planet_core_box.png';


function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);

  const useContextList = { isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked };
  const [currentImage, setCurrentImage] = useState(null);

  
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

  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer/>

          <IronIcon position={[0, 1 , 2.6]} onClick={handleCalendarClick} scale={[0.05, 0.3, 0.3]} />
          <CalendarIcon position={[-2.6, -1, -1]} onClick={handleIronIconClick} scale={[0.05, 0.3, 0.3]} />
          <PlanetCoreIcon position={[3, -1, -1]} onClick={handlePlanetCoreClick} scale={[0.05, 0.3, 0.3]} />

        </Canvas>
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        
        {currentImage && (
          <div className="image-popup">
            <img src={currentImage} alt="Information" />
            <button onClick={() => setCurrentImage(null)}>Close</button>
          </div>
        )}
      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
