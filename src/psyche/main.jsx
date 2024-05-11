import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState } from 'react';
import './style.css';
import { GlobalStateProvider } from './utils/useContext';
import ProgressBarButton from './components/Buttons/ProgressBarButton';
import ControlsPopup from './components/PopUps/ControlsPopup';
import CertificationPopup from './components/PopUps/CompletionCertification';


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

import HotspotFact from './components/PopUps/HotspotFact';
import ControlsButton from './components/Buttons/ControlsButton';
import useDoubleClick from './utils/useDoubleClick';

//into dialogue
import MissionIntroPopup from './components/PopUps/MissionIntroPopup.jsx';


function PsycheApp() {
  const canvasRef = useRef();
  
  // flow state
  const [isOverview, setIsOverview] = useState(false);
  const [isToSpaceCraft, setIsToSpaceCraft] = useState(false);
  const [isToAsteroid, setIsToAsteroid] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [startZooming, setStartZooming] = useState(false);
  
  // button state
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isToSpaceCraftClicked, setIsToSpaceCraftClicked] = useState(false);
  const [isToAsteroidClicked, setIsToAsteroidClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  
  //buttom state appearing dissapearing
  const [showStartButton, setShowStartButton] = useState(false);
  const [showToPsycheButton, setShowToPsycheButton] = useState(false);
  const [showToSpacecraftButton, setShowToSpaceCraftButton] = useState(false);

  //animation state
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  
  // instruction/ user intraction state
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(null);
  
  // object state
  const [showSpacecraft, setShowSpacecraft] = useState(false);
  const [showAsteroid, setShowAsteroid] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isAsteroidSpinning, setIsAsteroidSpinning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  
  const [showDescription, setShowDescription] = useState(false);
  
  const [progressValue, setProgressValue] = useState(0);
 
  //information state

  const [popupIndex, setPopupIndex] = useState(-1);
  const [currentPopupContent, setCurrentPopupContent] = useState([]);

  const popupContentLaunch = [
    { title: "Welcome", message: "My Name is Skyi! I'll be your virtual assistant for the remainder of the experience" },
    { title: "Introduction", message: "What is your name?" },
    { title: "Introduction", message: "Hi [Name] its great to meet you. Today we will be exploring NASA's latest mission to the asteroid Psyche." },
    {title: "Getting Started", message: "This experience will teach you about the Spacecraft technologies, the Asteroid, and more details about the mission!" },
    { title: "Getting Started", message: "Ready to start your journey? Click 'Finish' to begin exploring!" }
  ];
  const popupContentStart = [
    { title: "Tutorial", message: "Lets start with a quick tutorial." },
    { title: "Movement", message: "To traverse through space you can swipe to move and pitch to zoom. Give it a try!" },
    { title: "Mission Goal", message: "The goal of the mission is to collect fun facts and details about NASA's Psyche Mission." },
    { title: "Notebook", message: "You can view the facts you collected by clicking on the notebook button in the top left." },
    { title: "Notebook", message: "Currently you don't have any facts. Go out and collect some by exploring the spacecraft or Pysche Asteroid!" }
];
  
  const handleNextPopup = () => {
    if (popupIndex < currentPopupContent.length - 1) {
      setPopupIndex(popupIndex + 1);
    } else {
      handleClosePopup(); // Close popups when finishing the last one
    }
  };

  const handleClosePopup = () => {
    setPopupIndex(-1); // Reset or close popups
  };  
  
  const [factList, setFactList] = useState([
    {isExplored: true, title: "Overview", text: "Welcome to the notebook, please choose on the left to see facts about the Psyche mission that you have explored."},
		
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
  
  const [toolList, setToolList] = useState([
    { icon: <ArchitectureIcon />, title: "Gamma Ray and Neutron Spectrometer",  text: "Determine the chemical elements constituting Psyche."},
    { icon: <BuildIcon />,title: 'Multispectral Imager', text: "Provide information about the mineral composition and topography of Psyche." },
    { icon: <HardwareIcon />,title: 'Magnetometer', text: "Search for evidence of an ancient magnetic field." },
    { icon: <BrushIcon />,title: 'X-band radio telecommunications system', text: (
      <>
        Used to send commands to and receive data from the spacecraft and to conduct gravity science.
        <br /><br />
        Waves for communication with Psyche, examining how Psyche influences the spacecraft's orbit.
      </>
    ) },
    { icon: <SquareFootIcon />,title: 'Deep Space Optical Communication technology demo', text: (
      <>
        Is not intended to relay Psyche mission data since the technology demonstration is planned for the first two years of the spacecraft’s cruise. 
        <br /><br />
        But if it proves successful, the technology will be used by future human and robotic spacecraft to transmit huge volumes of science data, allowing more innovative space mission concepts to take flight. Ultimately, DSOC may pave the way for broadband communications that will help support humanity’s next giant leap.
      </>
    ) },
  ]);

  const useContextList = {
    factList, setFactList, 
    toolList, setToolList, 
    isLaunched,
    showStartButton, setShowStartButton,
    startZooming, setStartZooming,
    isToSpaceCraftClicked, setIsToSpaceCraftClicked,
    isToAsteroidClicked, setIsToAsteroidClicked,
    isToAsteroid, setIsToAsteroid, 
    isToSpaceCraft,setIsToSpaceCraft, 
    showAsteroid, setShowAsteroid, 
    showSpacecraft, setShowSpacecraft,
    isAsteroidSpinning, setIsAsteroidSpinning,
    isMoving, setIsMoving, 
    currentFactIndex, setCurrentFactIndex, 
    isOverview, setIsOverview, 
    isOverviewClicked, setIsOverviewClicked, 
    isStartClicked, setStartClicked, 
    isCreditsClicked, setCreditsClicked, 
    showNotebook, setShowNotebook, 
    showDescription, setShowDescription,
    isModalOpen, setIsModalOpen,
    progressValue, setProgressValue,
    showControls, setShowControls,
  };

  const handleStartClick = () => {
    //setShowAsteroid(false);
    setIsMoving(false);
    //setShowSingleSpacecraft(true);
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
      setStartClicked(true);
      setCurrentPopupContent(popupContentStart);
      setPopupIndex(0);
    }, 200);
  };

  const handleCreditsClick = () => {
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
      setCreditsClicked(true);
    }, 200);
  };
  
  const handleLaunchClick = () => {
    setCurrentPopupContent(popupContentLaunch);
    setPopupIndex(0);
    setIsLaunched(true);
  }
  
  const handleToSpacecraftClick = () => {
    setIsToSpaceCraftClicked(!isToSpaceCraftClicked);
  }
  
  const handleOverviewClick = () => {
    console.log("isToAsteroid: ", isToAsteroidClicked)
    console.log("isToSpaceCraft: ", isToSpaceCraftClicked)
    setIsOverviewClicked(!isOverviewClicked);
  };

  const handleToAsteroidClick = () =>{
    
    setIsToAsteroidClicked(!isToAsteroidClicked);
    console.log("to asteroid clicked")
  }
  
  //const handleControlsClick = () => {
  //  setShowControls(!showControls);
  //};
  
  const handleDoubleClick = () => {
    console.log('Double click detected!');
    if (isToAsteroid && isToSpaceCraft){ //condition when it is in overview mode
      setIsMoving(!isMoving);
      setIsAsteroidSpinning(!isAsteroidSpinning);
    }
  };

  useDoubleClick(handleDoubleClick);

  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        {!isLaunched && <div className="title-container title-white ">PSYCHE SIMULATION</div>}
        
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
         <MainPsycheContainer/>
        </Canvas>
        
        
        {popupIndex >= 0 && (
          <MissionIntroPopup
            title={currentPopupContent[popupIndex].title}
            message={currentPopupContent[popupIndex].message}
            onNext={() => handleNextPopup()}
            onClose={() => {
              
              handleClosePopup();
              if (currentPopupContent[1].message === popupContentLaunch[1].message) { 
                setShowStartButton(true); 
                setStartZooming(true);
                
              }
              if (currentPopupContent[1].message === popupContentStart[1].message) { 
                setShowToPsycheButton(true);
                setShowToSpaceCraftButton(true);
              }
              
            }}
            isLast={popupIndex === currentPopupContent.length - 1}
          />
        )}
        
        {/* {showStartButton && !isCreditsClicked && <button className={`ombre-button start-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Start</button>} */}
        {/*{!isLaunched && <button onClick={handleLaunchClick}>Launch</button>}*/}
  
        
        
        {showStartButton && isLaunched && !isCreditsClicked && !isStartClicked && <button className={`ombre-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Start</button>}
        {!isLaunched && <button className={`ombre-button start-button`} onClick={handleLaunchClick}>Launch</button>}
        {!isLaunched && !isCreditsClicked && !isStartClicked && <button className={`ombre-button credits-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleCreditsClick}>Credits</button>}
        
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        
        {showToPsycheButton && isToAsteroid && <button className="ombre-button start-button" onClick={handleToAsteroidClick}>To Psyche</button>}
        {showToSpacecraftButton && isToSpaceCraft && <button className={`ombre-button ${isOverview ? 'start-button' : ""}`} onClick={handleToSpacecraftClick}>To Spacecraft</button>}

        
        {currentFactIndex!== null &&  <HotspotFact/>}
        {isLaunched && (<ControlsButton/>)}

          
          
        {isLaunched && (<ProgressBarButton /> )}
        
        <CertificationPopup/>

      </div>
    </GlobalStateProvider>
  );
}


export default PsycheApp;
