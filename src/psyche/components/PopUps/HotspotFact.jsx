import * as React from 'react';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Facts from './NotebookMenu';
import Typography from '@mui/material/Typography';


import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';
import InfoContent from './InfoContent';

function HotspotFact (){
	
	const { currentFactIndex, setCurrentFactIndex, factList, setIsModalOpen } = useContext(GlobalStateContext);
	
	const handleClose = () => {
		setCurrentFactIndex(null);
		setIsModalOpen(false);
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
	
	
	return (
		<Modal 
				open={currentFactIndex != null}
				onClose={handleClose}
		>
		 <Box sx={modalStyle}>
		 	<InfoContent index={currentFactIndex} array={factList}/>
			</Box>   
		</Modal>
	);
}


export default HotspotFact