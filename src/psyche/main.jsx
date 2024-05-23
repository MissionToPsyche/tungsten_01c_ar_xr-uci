import { Canvas } from '@react-three/fiber';
import MainPsycheContainer from './components/MainPsycheContainer';
import { useRef, useState, useEffect } from 'react';
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
import MultispectralImager from '../../public/assets/multiSpec_Imager.png';
import Magnetometer from '../../public/assets/Magnetometer.png';
import GammaRayNeutronSpec from '../../public/assets/gammaRayNeutronSpec.png';
import PsycheBot from '../../public/assets/Psyche_Bot_Full.png';
import CombinedFact from './components/PopUps/CombinedFact';
import Psyche_Badge from '../../public/assets/Psyche_Badge.svg';
import HotspotFact from './components/PopUps/HotspotFact';
import ControlsButton from './components/Buttons/ControlsButton';
import useDoubleClick from './utils/useDoubleClick';

import CreditsModal from './components/PopUps/CreditsModal';
//into dialogue
import MissionIntroPopup from './components/PopUps/MissionIntroPopup.jsx';

// ToolBox
import ToolBox from './components/ToolBox';
import StarryBackground from './components/TravelStars.jsx';


function PsycheApp(refreshRate) {
  
  
  const BackgroundAudio = new Audio("/assets/music.mp3");
  
  function replayAudio() {
    console.log("replay audio")
    BackgroundAudio.currentTime = 0;
    BackgroundAudio.play();
  }

  BackgroundAudio.addEventListener('ended', replayAudio);
  
  
  const canvasRef = useRef();
  
  // flow state
  const [isOverview, setIsOverview] = useState(false);
  const [isToSpaceCraft, setIsToSpaceCraft] = useState(false);
  const [isToAsteroid, setIsToAsteroid] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [startZooming, setStartZooming] = useState(false);

  const [showToolBox, setShowToolBox] = useState(false); {/*for toolbox*/}
  const [isCountdown, setIsCountdown] = useState(false);
  const [count, setCount] = useState(3);

  
  // button state
  const [isOverviewClicked, setIsOverviewClicked] = useState(false);
  const [isToSpaceCraftClicked, setIsToSpaceCraftClicked] = useState(false);
  const [isToAsteroidClicked, setIsToAsteroidClicked] = useState(false);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isCreditsClicked, setCreditsClicked] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  //buttom state appearing dissapearing
  const [showStartButton, setShowStartButton] = useState(false);
  const [showToPsycheButton, setShowToPsycheButton] = useState(false);
  const [showToSpacecraftButton, setShowToSpaceCraftButton] = useState(false);

  //animation state
  const [isStartAnimating, setIsStartAnimating] = useState(false);
  const [showTravelAnimation, setShowTravelAnimation] = useState(null);
  const [doneStartAnimation, setDoneStartAnimation] = useState(false);
  
  // instruction/ user intraction state
  const [showControls, setShowControls] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(null);
  const [currentToolIndex, setCurrentToolIndex] = useState(null);

  
  // object state
  const [showSpacecraft, setShowSpacecraft] = useState(false);
  const [showAsteroid, setShowAsteroid] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isAsteroidSpinning, setIsAsteroidSpinning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toolPlacementDisable, setToolPlacementDisable] = useState(true);
  
  
  const [showDescription, setShowDescription] = useState(false);
  
  const [progressValue, setProgressValue] = useState(0);
  
  const [numExploredTools, setNumExploredTools] = useState(0);
  
  const [isPlayedMusic, setIsPlayedMusic] = useState(false);
 
  //information state

  const [popupIndex, setPopupIndex] = useState(-1);
  const [currentPopupContent, setCurrentPopupContent] = useState([]);

  const popupContentLaunch = [
    { title: "", message: "Hey... I'm Psyche Bot. I'm lost … I … I miss my home." },
    {title: "", message: "You wanna help me find my way back? That's really nice of you... but I'm not sure if we'll ever make it." },
    { title: "", message: "Psyche is a mysterious asteroid that no one has ever visited before. Psyche orbits the Sun between Mars and Jupiter at a distance about three times farther away from the Sun than is Earth." },
    { title: "", message: "Psyche is different!!! You’ve never seen an asteroid that is as metal-rich as Psyche." },
    { title: "", message: "I guess we can try... but I'm not very good at this space stuff." },
    { title: "Tool Box", message: "Hey, it'd be awesome if humans could recognize my home! Here are some tools we will need for our journey and exploration."},
    { title: "" , message: "Click on them to add them to the spacecraft! When you are done, press \"Finish\"."},
    {title: "Getting Started", message: "Great job adding the tools! Are you ready to start your journey?" },
   
  ];
  const popupContentStart = [
    { title: "Tutorial", message: "We made it! That's my home! Thanks so much for bringing me back! Now let me show you around!" },
    { title: "Movement", message: "To traverse through space you can swipe to move, pitch to zoom and double click to pause. Give it a try!" },
    { title: "Mission Goal", message: "The goal of the mission is to collect fun facts and details about NASA's Psyche Mission." },
    { title: "Notebook", message: "You can view the facts you collected by clicking on the notebook button in the top left." },
    { title: "Notebook", message: "Currently you don't have any facts. Go out and collect some by exploring the spacecraft or Pysche Asteroid!" }
];

  const btnTextLaunch = [
    { 
      text: "Maybe I can help!",
    },
    {
      text: "Why?",
    },
    {
      text: "Why don’t you just stay on Earth?",
    },
    {
      text: "Chill chill, I can help you to go back!",
    },
    {
      text: "You know what our humans usually do? We build spacecraft to explore asteroids!",
    },
    {
      text: "Next",
    },
    {
      text: "Finish",
    },
    {
      text: "Finish",
    },
  ]

  const toolBoxDialogue = [
  { title: "Getting Ready", message: "Before the mission can start, we need to add the tools that will be used for our mission." },
  { title: "Tool Box", message: "Above, you will see a tool box with a Multispectral Imager, a Magnetometer, and a Gamma Ray and Neutron Spectrometer."},
  { title: "Tool Box" , message: "We will need these tools for our journey and exploration. Click on them to add them to the spacecraft!"}


  ];

  
  const handleNextPopup = () => {
    if (popupIndex < currentPopupContent.length - 1) {
      setPopupIndex(popupIndex + 1);
    } else {
      handleClosePopup(); // Close popups when finishing the last one
    }
    
    if (currentPopupContent[1].message === popupContentLaunch[1].message) { 
      if (popupIndex === 5) {
        console.log("Anable tool box click here")
        setToolPlacementDisable(false);
      }
    }
  };

  const handleClosePopup = () => {
    setPopupIndex(-1); // Reset or close popups
  };  
  
  const [factList, setFactList] = useState([
    {isExplored: true, title: "Overview", text: "Welcome to the notebook, please choose on the left to see facts about the Psyche mission that you have explored."},
    { isExplored: false, icon: <img src={MetalImg} alt = "MetalImg" height='40'/>, image: MetalImg ,title: 'Scientific Interest', text: "Psyche is likely rich in metal. The mission will seek to aid our understanding of iron cores, which have not yet been explored. It will allow us to explore a world not made of rock or ice, but of metal."},
		{ isExplored: false, icon: <img src={OrbitTrimImg} alt="OrbitImg" height='40'/>,image:OrbitImg, title: 'The orbit', text: "Psyche follows an orbit in the outer part of the main asteroid belt, at an average distance from the Sun of 3 astronomical units (AU); Earth orbits at 1 AU." },
		{ isExplored: false, icon: <img src={ScaleImg} alt="ScaleImg" height='40'/>,image:ScaleImg, title: "Size",  text: "Psyche is about the length of the State of Massachusetts (leaving out Cape Cod) if it were a perfect sphere. It would have a diameter of 140 miles and a surface area of about 64,000 square miles."},
		{ isExplored: false, icon: <img src={FormationTrimImg} alt="FormationTrimImg" height='40'/>,image:FormationTrimImg, title: "Formation",  text: "The asteroid is most likely a survivor of multiple violent hit-and-run collisions, common when the solar system was forming. Thus Psyche may be able to tell us how Earth’s core and the cores of the other terrestrial planets came to be."},
		{ isExplored: false, icon: <img src={PropsImg} alt="FormationImg" height='40'/>,image:PropsImg, title: "Properties",  text: 
		(
      <CombinedFact/>
    )},
    
    
    { isExplored: false, icon: <img src={TrajectoryImg} alt="TrajectoryImg" height='40'/>,image:TrajectoryImg, title: 'Trajectory', text: 'The Psyche spacecraft is targeted to travel to the asteroid using solar-electric (low-thrust) propulsion, following a Mars flyby and gravity-assist. After arrival, the mission plan calls for mapping the asteroid and studying its properties.'},
    { isExplored: false, icon: <img src={ObitImg2} alt="ObitImg2" height='40'/>,image:ObitImg2, title: 'Orbit', text: (
      <>
      Once the spacecraft arrives at the asteroid, plans call for it to perform science operations from four staging orbits, which become successively closer.
      <br /><br />
      Orbit A: Characterization (56 Days)   Orbit B: Topography (B1: 92 Days, B2: 100 Days)
      <br /><br />
      Orbit C: Gravity Science (100 Days)   Orbit D: Elemental Mapping (100 Days)
      </>
    )}, 
    { isExplored: false, icon: <img src={SpacecraftSizeImg} alt="SpacecraftSizeImg" height='40'/>,image:SpacecraftSizeImg, title: 'Spacecraft Size', text: 'The Psyche spacecraft (including the solar panels) is about the size of a singles tennis court.'},
    { isExplored: false, icon: <img src={BusSizeImg} alt="BusSizeImg" height='40'/>,image:BusSizeImg, title: 'Bus Size', text: 'The bus or “body” of the spacecraft is slightly bigger than a small van and about as tall as a regulation basketball hoop.'},
    { isExplored: false, icon: <img src={PropulsionImg} alt="PropulsionImg" height='40'/>,image:PropulsionImg, title: 'Propulsion System', text: 'The spacecraft is propelled by solar electric propulsion.'},
	]);
  
  const [toolList, setToolList] = useState([
    { isExplored: false, icon: <img src={GammaRayNeutronSpec} className="gallery-image"/>, image:GammaRayNeutronSpec, title: "Gamma Ray and Neutron Spectrometer",  text: "Determine the chemical elements constituting Psyche."},
    { isExplored: false, icon: <img src={MultispectralImager} className="gallery-image"/>, image:MultispectralImager ,title: 'Multispectral Imager', text: "Provide information about the mineral composition and topography of Psyche." },
    { isExplored: false, icon: <img src={Magnetometer} className="gallery-image"/>, image:Magnetometer,title: 'Magnetometer', text: "Search for evidence of an ancient magnetic field." },
    //{ isExplored: false, icon: <BrushIcon />,title: 'X-band radio telecommunications system', text: (
    //  <>
    //    Used to send commands to and receive data from the spacecraft and to conduct gravity science.
    //    <br /><br />
    //    Waves for communication with Psyche, examining how Psyche influences the spacecraft's orbit.
    //  </>
    //) },
    //{ icon: <SquareFootIcon />,title: 'Deep Space Optical Communication technology demo', text: (
    //  <>
    //    Is not intended to relay Psyche mission data since the technology demonstration is planned for the first two years of the spacecraft’s cruise. 
    //    <br /><br />
    //    But if it proves successful, the technology will be used by future human and robotic spacecraft to transmit huge volumes of science data, allowing more innovative space mission concepts to take flight. Ultimately, DSOC may pave the way for broadband communications that will help support humanity’s next giant leap.
    //  </>
    //) },
  ]);

  const useContextList = {
    refreshRate,
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
    currentToolIndex, setCurrentToolIndex,
    isOverview, setIsOverview, 
    isOverviewClicked, setIsOverviewClicked, 
    isStartClicked, setStartClicked, 
    isCreditsClicked, setCreditsClicked, 
    showNotebook, setShowNotebook, 
    showDescription, setShowDescription,
    isModalOpen, setIsModalOpen,
    progressValue, setProgressValue,
    showControls, setShowControls,
    numExploredTools, setNumExploredTools,
    showToolBox, setShowToolBox, 
    toolPlacementDisable, setToolPlacementDisable,
    isStartAnimating, setIsStartAnimating,
    showTravelAnimation, setShowTravelAnimation,
    doneStartAnimation, setDoneStartAnimation,
  };

  const handleStartClick = () => {
    setIsCountdown(true);

  };

  const handleCreditsClick = () => {
    if (!isPlayedMusic){
      BackgroundAudio.play();
      setIsPlayedMusic(true);
    }

    setShowCreditsModal(true);
  };
  
  const handleLaunchClick = () => {
    if (!isPlayedMusic){
      BackgroundAudio.play();
      setIsPlayedMusic(true);
    }
    setCurrentPopupContent(popupContentLaunch);
    setPopupIndex(0);
    setIsLaunched(true);
    
 //   setShowToolBox(true);  // Set the flag to show the ToolBox
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

  // Tool Box will render alongside its associated dialogue  
  useEffect(() => {
    if (popupIndex >= 0 && currentPopupContent[popupIndex].title === "Tool Box") // Render when dialogue title in popupContentLaunch is "Tool Box"
    {
      setStartZooming(true);
      //setShowToolBox(true);
      
    }
  }, [popupIndex, currentPopupContent]);

    useEffect(() => {
      const timerId = setInterval(() => {
        if (isCountdown){
          if (count > 0) {
            setCount(count - 1);
          } else if (count === 0) {
            console.log("countdown finished")
  
            setShowTravelAnimation(true);
            setCount(count - 1);
            
            
            //setShowAsteroid(false);
            setIsMoving(false);
            //setShowSingleSpacecraft(true);
            setIsStartAnimating(true);
            setTimeout(() => {
              setIsStartAnimating(false);
              setStartClicked(true);
              
              
            }, 200);
            
          }

          else if (count <= -4 && doneStartAnimation){
            setIsCountdown(false);
            setShowTravelAnimation(false);
            
            setCurrentPopupContent(popupContentStart);
            setPopupIndex(0);

          }
          else if (count < 0){
            setCount(count - 1);
          }
        }
      }, 1000);
      return () => clearInterval(timerId); // Cleanup function
    }, [isCountdown, count]);
    



  
  return (
    <GlobalStateProvider value={useContextList}>
      <div className="app-container">
        {isCountdown && count > 0 && <div className="countdown">{count}</div>}
        
        <div className={isLaunched? "psyche-small-logo" : "psyche-logo"}><img src = {Psyche_Badge} alt="Psyche Badge"></img></div>
      {!isLaunched && <div >
          <div className="title-container title-white" style={{textAlign: "center"}}>
            <div style={{fontSize: "5.5rem", textAlign: "left"}}>Psyche</div>
            <div style={{fontSize: "3.5rem", textAlign: "center"}}>Journey</div>
            <div style={{fontSize: "1.5rem", textAlign: "left"}}>to the</div>
            <div style={{fontSize: "2.5rem", textAlign: "right"}}>Metal World</div>
          </div>
          <div className="psyche-bot">
            <img src={PsycheBot} alt="Psyche Bot" style={{ width: "100%" }} />
          </div>
        </div>}
        <Canvas ref={canvasRef} camera={{ fov: 45, position: [0, 0, 75] }}>
         <MainPsycheContainer/>
        </Canvas>
        
        
        
        {showTravelAnimation && <StarryBackground/>}
        
        
       
        
        {popupIndex >= 0 && (
          <MissionIntroPopup
            btnTextLaunch={btnTextLaunch[popupIndex].text}
            title={currentPopupContent[popupIndex].title}
            message={currentPopupContent[popupIndex].message}
            onNext={() => handleNextPopup()}
            onClose={() => {
              
              handleClosePopup();
              if (currentPopupContent[1].message === popupContentLaunch[1].message) { 

               
                //setShowStartButton(true);
                //setStartZooming(true);
                
                setIsCountdown(true);
               

                
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
        
        
        
        {/*{showStartButton && isLaunched && !isCreditsClicked && !isStartClicked && <button className={`ombre-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleStartClick}>Lift off</button>}*/}
        {!isLaunched && <button className={`ombre-button start-button`} onClick={handleLaunchClick}>Start</button>}
        {!isLaunched && !isCreditsClicked && !isStartClicked && <button className={`ombre-button credits-button ${isStartAnimating ? 'clicked' : ''}`} onClick={handleCreditsClick}>Credits</button>}

        {showCreditsModal && (
          <CreditsModal
            isOpen={showCreditsModal}
            onClose={() => setShowCreditsModal(false)}
          />
        )}
        
        {isOverview && <button className="ombre-button" onClick={handleOverviewClick}>Overview</button>}
        
        {showToPsycheButton && isToAsteroid && <button className="ombre-button start-button" onClick={handleToAsteroidClick}>To Psyche</button>}
        {showToSpacecraftButton && isToSpaceCraft && <button className={`ombre-button ${isOverview ? 'start-button' : ""}`} onClick={handleToSpacecraftClick}>To Spacecraft</button>}
        
        {showToolBox && <ToolBox />} {/* For rendering ToolBox  */ }   
        
        {currentFactIndex!== null &&  <HotspotFact/>}
        {currentToolIndex!== null &&  <ToolBox/>}
        
        
        {isStartClicked && isLaunched && (<ControlsButton/>)}
        {isStartClicked && isLaunched && (<ProgressBarButton /> )}
        
        <CertificationPopup/>

      </div>
    </GlobalStateProvider>
  );
}


export default PsycheApp;
