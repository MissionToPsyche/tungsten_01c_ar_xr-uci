import React from 'react';
import './style.css'; // Import CSS for styling

import { CircularProgressbarWithChildren , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext } from 'react';

import {GlobalStateContext} from '../../utils/useContext';

import NotebookPopup from '../PopUps/NotebookPopup';
import { progressValue } from '../Buttons/ItemHotspot';



const ProgressBarButton = () => {
  
  const { showNotebook, setShowNotebook} = useContext(GlobalStateContext);
  const handleNotebookClick = () => {
    setShowNotebook(!showNotebook);
  };
  
  return (
    <>
      <div className='notebook-button' onClick={handleNotebookClick}>
        <CircularProgressbarWithChildren minValue={0} maxValue={100} value={progressValue} strokeWidth={5} styles={buildStyles({pathColor: '#f9a000'})}>
          <MenuBookIcon fontSize="string"/>
        </CircularProgressbarWithChildren>
      </div>
    
      {showNotebook && <NotebookPopup onClose={() => setShowNotebook(false)} />}
    </>
  );
};

export default ProgressBarButton;

