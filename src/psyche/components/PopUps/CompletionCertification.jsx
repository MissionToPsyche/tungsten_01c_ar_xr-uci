import * as React from 'react';
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Facts from './NotebookMenu';

import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';
import { Typography } from '@mui/material';
import Logo from '/assets/psyche_badge.png';

import '../../style.css'



  function CertificationPopup() {
    const {progressValue, showCertification, setShowCertification }= useContext(GlobalStateContext);
    const handleClose = () => {
			setShowCertification(false);
		}

		
    
    //const modalStyle = {
    //  position: 'fixed',
    //  top: '50%',
    //  left: '50%',
      
    //  maxHeight: '80vh',
    //  maxWidth: '80vw',
    //  height:'120vw',
      
    //  transform: 'translate(-50%, -50%)',
    //  backgroundColor: 'rgba(255, 255, 255, 1)',
    //  padding: '3vh',
    //  borderRadius: '15px',
    //  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //  zIndex: 1000,
    //  display: 'flex',
    //  flexDirection: 'column',
    //  justifyContent: 'top',
    //  alignItems: 'center'
      
    //};

    return (
      <Modal 
  open={progressValue === 100 && showCertification} 
  onClose={handleClose}
>
  <Box sx={{ display: 'flex',  alignItems: 'center', justifyContent:'center'}} className="modal-container">
    <Box sx={{ overflowY: 'scroll', width: '80vw', textAlign: 'center', padding:'2vw' }}>
      <img src={Logo} alt="Psyche Badge" className="logo" />
      <Typography variant='h6' paragraph > 
        <Box sx={{ fontWeight: 'bold', paddingTop: '20px' }}>Congratulations!</Box>
      </Typography>
      <Typography paragraph >
        <Box sx={{paddingBottom:'20px'}}>You're an official Psyche explorer!</Box>
      </Typography>
      <Button style={{ color: 'white', borderRadius:'15px' }} fullWidth sx={{marginY:'5px', padding:'10px', background: 'linear-gradient(to right, #a53f5b, #592651)', textTransform: 'none', fontSize: '100%'}} onClick={handleClose}>Continue Exploring</Button>
      <Button style={{ color: 'white', borderRadius:'15px' }} fullWidth sx={{marginY:'5px', padding:'10px', background: 'linear-gradient(to right, #a53f5b, #592651)', textTransform: 'none', fontSize: '100%'}} onClick={() => window.location.href = 'https://www.nasa.gov/psyche'}>Learn More About Psyche</Button>
      <Button style={{ color: 'white', borderRadius:'15px' }} fullWidth sx={{marginY:'5px', padding:'10px', background: 'linear-gradient(to right, #a53f5b, #592651)', textTransform: 'none', fontSize: '100%'}} onClick={() => window.location.reload()}>
        Start Over
      </Button>
    </Box>
  </Box>   
</Modal>
    );
  }
	
	
	export default CertificationPopup;