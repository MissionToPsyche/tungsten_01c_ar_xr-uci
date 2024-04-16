import React from 'react';
import './style.css'; // Import CSS for styling

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useRef, useState, useContext } from 'react';

import {GlobalStateContext} from '../../utils/useContext';

//Choose one only
import NotebookPopup from '../PopUps/NotebookPopup';



const ProgressBarButton = () => {
  
  const { showNotebook, setShowNotebook} = useContext(GlobalStateContext);

  //const [progress, setProgress] = React.useState(60);

  const handleNotebookClick = () => {
    setShowNotebook(!showNotebook);
  };
  
  const progressValue = 66
  
  return (
    <>
      <button onClick={handleNotebookClick}>        
        <div style={{ width: '4vh', height: '4vh' }} className='notebook-button'>
          <CircularProgressbarWithChildren minValue={0} maxValue={100} value={progressValue} strokeWidth={5}>
            <MenuBookIcon fontSize="string"/>
          </CircularProgressbarWithChildren>
        </div>
      </button>
    
    {/* Popover popup */}
    {showNotebook && <NotebookPopup onClose={() => setShowNotebook(false)} />}
    

    </>
    
    


  );
};

export default ProgressBarButton;

