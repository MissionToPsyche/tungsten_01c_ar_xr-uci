import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';
import Laser from './components/Laser';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [isShootingLaser, setIsShootingLaser] = useState(false);
  const [isShootingLaserClicked, setIsShootingLaserClicked] = useState(false);
  const [lasers, setLasers] = useState([]);
  
  const useContextList = { isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked, isShootingLaser, setIsShootingLaser, isShootingLaserClicked, setIsShootingLaserClicked };

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

  const handleShootLaser = () => {
    const numLasers = 1000;
    const newLasers = [];

    for (let i = 0; i < numLasers; i++) {
      const newLaserPosition = { x: Math.random() * 768, y: Math.random() * 768 };
      const newLaserAngle = Math.random() * 360;
      newLasers.push({ position: newLaserPosition, angle: newLaserAngle });
    }

    setLasers(newLasers);
  };
  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        <div className="title-container">Psyche Simulation</div>
        <div class="controls-instructions">Controls:<br></br>- Pinch to zoom<br></br>- Swipe to move</div>
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
          <MainPsycheContainer />
          {lasers.map((laser, index) => (
            <Laser key={index} position={laser.position} angle={laser.angle} />
          ))}
        </Canvas>
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button start-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Start</button>}
        {!isCreditsClicked && !isStartClicked && <button className={`ombre-button credits-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleCreditsClick}>Credits</button>}
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        {!isOverviewClicked && isShootingLaser && <button className="ombre-button shoot-laser-button" onClick={handleShootLaser}>Shoot Laser</button>}
      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
