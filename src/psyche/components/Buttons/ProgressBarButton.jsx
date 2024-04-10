import React from 'react';
import './style.css'; // Import CSS for styling

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useRef, useState, useContext } from 'react';
import NotebookPopup from '../PopUps/NotebookPopup';
import {GlobalStateContext} from '../../utils/useContext';


const ProgressBarButton = () => {
  
  const { showNotebook, setShowNotebook} = useContext(GlobalStateContext);

  //const [progress, setProgress] = React.useState(60);

  const handleNotebookClick = () => {
    setShowNotebook(!showNotebook);
  };
  
  return (
    <>
      <button onClick={handleNotebookClick}>        
    <div style={{ width: '4vh', height: '4vh' }} className='notebook-button'>
      <CircularProgressbarWithChildren minValue={0} maxValue={100} value={66} strokeWidth={5}>
        <MenuBookIcon fontSize="string"/>
      </CircularProgressbarWithChildren>
    </div>
    </button>
    
    
    {showNotebook && <NotebookPopup onClose={() => setShowNotebook(false)} />}
    </>

  );
};

export default ProgressBarButton;

