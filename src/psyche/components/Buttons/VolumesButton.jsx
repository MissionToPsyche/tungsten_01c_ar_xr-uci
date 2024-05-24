import React from 'react';
import 'react-circular-progressbar/dist/styles.css';

import { useContext } from 'react';
import {GlobalStateContext} from '../../utils/useContext';

import ControlsPopup from '../PopUps/ControlsPopup';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import './style.css';


const VolumesButton = () => {
  
  const {volumeOn, setVolumeOn} = useContext(GlobalStateContext);
	
	
  const handleVolumeClick = () => {
    setVolumeOn(!volumeOn);
  };
  
  return (

		<div className='volumes-button' onClick={handleVolumeClick}>
			{volumeOn && <VolumeUpIcon fontSize="string"/>}
			{!volumeOn && <VolumeOffIcon fontSize="string"/>}
			
		</div>

  );
};

export default VolumesButton;