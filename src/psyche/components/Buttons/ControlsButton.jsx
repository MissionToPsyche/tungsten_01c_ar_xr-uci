import React from 'react';
import 'react-circular-progressbar/dist/styles.css';

import { useContext } from 'react';
import {GlobalStateContext} from '../../utils/useContext';

import ControlsPopup from '../PopUps/ControlsPopup';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import './style.css';


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

