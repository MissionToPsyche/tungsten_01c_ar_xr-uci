import React, { useState, useContext } from 'react';
import { GlobalStateContext } from '../utils/useContext';

import './ToolBox.css';
import '../style.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InfoContent from './PopUps/InfoContent';



const images = [
  'public/assets/multiSpec_Imager.png',
  'public/assets/Magnetometer.png',
  'public/assets/gammaRayNeutronSpec.png',
];

const imageTitles = [
  'Multi-Spectral Imager',
  'Magnetometer',
  'Gamma-Ray Spectrometer'
];

const ToolBox = () => {
  const [visibleColumns, setVisibleColumns] = useState(images.map(() => true));

  const { currentFactIndex, setCurrentFactIndex, factList, toolList,currentToolIndex,setCurrentToolIndex, setIsModalOpen } = useContext(GlobalStateContext);

  const handleClick = index => {
    setVisibleColumns(visibleColumns.map((isVisible, columnIndex) =>
      columnIndex === index ? !isVisible : isVisible
    ));
    setCurrentToolIndex(index);
  };
  
  const handleClose = () => {
		setCurrentToolIndex(null);
		//setIsModalOpen(false);
	}
  
  const modalStyle = {
		position: 'fixed',
      top: '50%',
      left: '50%',
      
      maxHeight: '80vh',
      //maxWidth: '65vw',
			width:'70vw',
      //height:'50vh',
      
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      padding: '3vh',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'top',
      alignItems: 'center'
	};

  // Check if all images are invisible
  const allInvisible = visibleColumns.every(isVisible => !isVisible);

  // If all images are invisible, do not render the ToolBox
  if (allInvisible) {
    return null;
  }

  return (
    <>
    <Box className="gallery-container">
      {toolList.map((tool, index) => (
        <>
          <Box key={index} onClick={() => handleClick(index)}
              style={{
                visibility: visibleColumns[index] ? 'visible' : 'hidden',
                opacity: visibleColumns[index] ? 1 : 0,
                transition: 'opacity 0.5s, visibility 0.5s',
                margin:'1vw',
              }}>
                <Box>
                {tool.icon}
                </Box>
                <Box className='text'>
                {tool.title}
                </Box>
          </Box>
         </>
      ))}
        

    </Box>
    {currentToolIndex!== null &&
    <Modal open={currentToolIndex != null}
    onClose={handleClose}>
     <Box sx={modalStyle}>
     <InfoContent index={currentToolIndex} array={toolList} />
     </Box>
    </Modal>}
    </>
  );
};

export default ToolBox;

