import * as React from 'react';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NotebookMenu from './NotebookMenu';

import {GlobalStateContext} from '../../utils/useContext';

  function NotebookPopup({ onClose }) {
    const { showNotebook, setShowNotebook} = useContext(GlobalStateContext);
    const handleClose = () => setShowNotebook(false);
    
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      
      maxHeight: '80vh',
      maxWidth: '80vw',
      height:'65vh',
      
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

    return (
      <Modal 
          open={showNotebook}
          onClose={handleClose}
      >
       <Box sx={modalStyle}>
            <NotebookMenu/>
        </Box>   
      </Modal>
    );
  }
	
	
	export default NotebookPopup;