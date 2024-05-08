import * as React from 'react';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
//import Facts from './NotebookMenu';
import NotebookMenu from './NotebookMenu';

import CloseIcon from '@mui/icons-material/Close';
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
            {/*<Button onClick={handleClose} sx={{position: 'absolute', top: '1vh', right: '1vh', color:'#ffffff'}}><CloseIcon/></Button>*/}
            {/*<Facts/>*/}
            <NotebookMenu/>
        </Box>   
      </Modal>
    );
  }
	
	
	export default NotebookPopup;