import * as React from 'react';
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Facts from './NotebookMenu';

import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';
import { Typography } from '@mui/material';

  function CertificationPopup() {
    const {progressValue }= useContext(GlobalStateContext);
    const handleClose = () => {
			setShowCertification(false);
		}
		const [showCertification, setShowCertification] = useState(true);
    
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
          open={progressValue === 100 && showCertification} 
          onClose={handleClose}
      >
       <Box sx={modalStyle}>
            {/*<Button onClick={handleClose} sx={{position: 'absolute', top: '1vh', right: '1vh', color:'#ffffff'}}><CloseIcon/></Button>*/}
            <Typography variant='h6' paragraph> 
							<Box sx={{ fontWeight: 'bold' }}>Hello World This is certification</Box>
						</Typography>
						<Typography paragraph>
							You have successfully completed the Psyche Mission. You have unlocked the Psyche Certification.
						</Typography>
						
						<Button onClick={handleClose}>Continue Exploring</Button>
						<Button onClick={() =>{
							window.location.reload();
						}}>Start Over</Button>
        </Box>   
      </Modal>
    );
  }
	
	
	export default CertificationPopup;