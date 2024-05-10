import React from 'react';
import './style.css'; // Import CSS for styling

import { CircularProgressbarWithChildren , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext } from 'react';

import {GlobalStateContext} from '../../utils/useContext';

import NotebookPopup from '../PopUps/NotebookPopup';
import ControlsPopup from '../PopUps/ControlsPopup';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';



const ControlsButton = () => {
  
  const { showControls, setShowControls} = useContext(GlobalStateContext);
  const handleControlClick = () => {
    setShowControls(!showControls);
		console.log("switching controls")
  };
  
  return (
    <>
      <div className='controls-button' onClick={handleControlClick}>
				<QuestionMarkIcon fontSize="string"/>
      </div>
    
      {showControls && <ControlsPopup onClose={() => setShowControls(false)} />}
    </>
  );
};

export default ControlsButton;

