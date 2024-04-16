import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';
import ProgressBarButton from './components/Buttons/ProgressBarButton';
import ControlsPopup from './components/PopUps/ControlsPopup';


//Delete the following imports after having the real icons
import BuildIcon from '@mui/icons-material/Build';
import HardwareIcon from '@mui/icons-material/Hardware';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BrushIcon from '@mui/icons-material/Brush';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
//Delete the above imports after having the real icons

import ScaleImg from '../../public/assets/psyche_scale.svg';
import OrbitTrimImg from '../../public/assets/psyche_orbit_trim.png';
import OrbitImg from '../../public/assets/psyche_orbit.svg';
import FormationTrimImg from '../../public/assets/psyche_formation_trim.png';
import FormationImg from '../../public/assets/psyche_formation.svg';
import PropsImg from '../../public/assets/psyche_props.png';
import MetalImg from '../../public/assets/metal_icon.svg';
import TrajectoryImg from '../../public/assets/psyche_trajectory.svg';

import CombinedFact from './components/PopUps/CombinedFact';

function PsycheApp() {
  const canvasRef = useRef();
  const [isOverview, setIsOverview] = useState(false);
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showDescription, setShowDescription] = useState(false);


  const [currentImg, setCurrentImg] = useState(null);
  
  
  const [factList, setFactList] = useState([
		{ isExplored: false, icon: <img src={MetalImg} alt = "MetalImg" height='40'/>, Img: MetalImg ,title: 'Scientific Interest', text: "What gives asteroid Psyche great scientific interest is that it is likely rich in metal. It may consist largely of metal from the core of a planetesimal, one of the building blocks of the Sun’s planetary system. At Psyche scientists will explore, for the first time ever, a world made not of rock or ice, but rich in metal."},
		{ isExplored: false, icon: <img src={OrbitTrimImg} alt="OrbitImg" height='40'/>,Img:OrbitImg, title: 'The orbit', text: "Psyche follows an orbit in the outer part of the main asteroid belt, at an average distance from the Sun of 3 astronomical units (AU); Earth orbits at 1 AU." },
		{ isExplored: false, icon: <img src={ScaleImg} alt="ScaleImg" height='40'/>,Img:ScaleImg, title: "Size",  text: "If Psyche were a perfect sphere, it would have a diameter of 140 miles (226 kilometers), or about the length of the State of Massachusetts (leaving out Cape Cod). It is estimated to have a surface area of about 64,000 square miles or approximately 165,800 square kilometers."},
		{ isExplored: false, icon: <img src={FormationTrimImg} alt="FormationImg" height='40'/>,Img:FormationImg, title: "Formation",  text: "The asteroid is most likely a survivor of multiple violent hit-and-run collisions, common when the solar system was forming. Thus Psyche may be able to tell us how Earth’s core and the cores of the other terrestrial planets came to be."},
		{ isExplored: false, icon: <img src={PropsImg} alt="FormationImg" height='40'/>,Img:PropsImg, title: "Properties",  text: 
		(
      <CombinedFact/>
    )},
    { isExplored: false, icon: <img src={TrajectoryImg} alt="TrajectoryImg" height='40'/>,Img:TrajectoryImg, title: 'Build', text: 'The spacecraft is being built and tested at JPL, and will be powered by solar-electric propulsion. The Psyche spacecraft includes a gamma ray and neutron spectrometer, multispectral Imgr, magnetometer, and a radio science experiment.' },
	]);
  
  const useContextList = {factList, setFactList, currentImg, setCurrentImg, isOverview, setIsOverview, isOverviewClicked, setIsOverviewClicked, isStartClicked, setStartClicked, isCreditsClicked, setCreditsClicked,  showNotebook, setShowNotebook, showDescription, setShowDescription};

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
        
        {currentImg && (
          <div className="Img-popup">
            <img src={currentImg} alt="Information" />
            <button onClick={() => setCurrentImg(null)}>Close</button>
          </div>
        )}
        {isStartClicked && (<button className="controls-button" onClick={handleControlsClick}>?</button>)}
        {showControls && <ControlsPopup onClose={() => setShowControls(false)} />}
          
          
        {isStartClicked && (      
        <ProgressBarButton /> )}
        
        {/*<Button onClick={handleOpen}>Open modal</Button>*/}


      </div>
    </GlobalStateProvider>
  );
}

export default PsycheApp;
