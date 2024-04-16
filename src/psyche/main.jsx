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
import ObitImg2 from '../../public/assets/psyche_orbit2.svg';
import SpacecraftSizeImg from '../../public/assets/spacecraft_size.svg';
import BusSizeImg from '../../public/assets/bus_size.svg';
import PropulsionImg from '../../public/assets/propulsion_system.svg';

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
		{ isExplored: false, icon: <img src={MetalImg} alt = "MetalImg" height='40'/>, image: MetalImg ,title: 'Scientific Interest', text: "What gives asteroid Psyche great scientific interest is that it is likely rich in metal. It may consist largely of metal from the core of a planetesimal, one of the building blocks of the Sun’s planetary system. At Psyche scientists will explore, for the first time ever, a world made not of rock or ice, but rich in metal."},
		{ isExplored: false, icon: <img src={OrbitTrimImg} alt="OrbitImg" height='40'/>,image:OrbitImg, title: 'The orbit', text: "Psyche follows an orbit in the outer part of the main asteroid belt, at an average distance from the Sun of 3 astronomical units (AU); Earth orbits at 1 AU." },
		{ isExplored: false, icon: <img src={ScaleImg} alt="ScaleImg" height='40'/>,image:ScaleImg, title: "Size",  text: "If Psyche were a perfect sphere, it would have a diameter of 140 miles (226 kilometers), or about the length of the State of Massachusetts (leaving out Cape Cod). It is estimated to have a surface area of about 64,000 square miles or approximately 165,800 square kilometers."},
		{ isExplored: false, icon: <img src={FormationTrimImg} alt="FormationImg" height='40'/>,image:FormationImg, title: "Formation",  text: "The asteroid is most likely a survivor of multiple violent hit-and-run collisions, common when the solar system was forming. Thus Psyche may be able to tell us how Earth’s core and the cores of the other terrestrial planets came to be."},
		{ isExplored: false, icon: <img src={PropsImg} alt="FormationImg" height='40'/>,image:PropsImg, title: "Properties",  text: 
		(
      <CombinedFact/>
    )},
    { isExplored: false, icon: <img src={TrajectoryImg} alt="TrajectoryImg" height='40'/>,image:TrajectoryImg, title: 'Trajectory', text: 'The Psyche spacecraft is targeted to travel to the asteroid using solar-electric (low-thrust) propulsion, following a Mars flyby and gravity-assist. After arrival, the mission plan calls for mapping the asteroid and studying its properties.'},
    { isExplored: false, icon: <img src={ObitImg2} alt="ObitImg2" height='40'/>,image:ObitImg2, title: 'Orbit', text: (
      <>
      Once the spacecraft arrives at the asteroid, plans call for it to perform science operations from four staging orbits, which become successively closer.
      <br /><br />
      The mission will help scientists understand how planets and other bodies separated into their layers – including cores, mantles and crusts – early in their histories.
      <br /><br />
      The mission will seek to aid our understanding of iron cores, which have not yet been explored. It will allow us to explore a world not made of rock or ice, but of metal.
      <br /><br />
      NASA aims to unravel the origins of the solar system through the Psyche mission.
    </>
    )}, 
    { isExplored: false, icon: <img src={SpacecraftSizeImg} alt="SpacecraftSizeImg" height='40'/>,image:SpacecraftSizeImg, title: 'Spacecraft Size', text: 'The Psyche spacecraft (including the solar panels) is about the size of a singles tennis court.'},
    { isExplored: false, icon: <img src={BusSizeImg} alt="BusSizeImg" height='40'/>,image:BusSizeImg, title: 'Bus Size', text: 'The bus or “body” of the spacecraft is slightly bigger than a small van and about as tall as a regulation basketball hoop.'},
    { isExplored: false, icon: <img src={PropulsionImg} alt="PropulsionImg" height='40'/>,image:PropulsionImg, title: 'Propulsion System', text: 'The spacecraft is propelled by solar electric propulsion.'},
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
