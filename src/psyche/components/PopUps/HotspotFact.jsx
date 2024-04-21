import * as React from 'react';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Facts from './NotebookMenu';


import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';


function HotspotFact (){
	
	const { currentImage, setCurrentImage, factList} = useContext(GlobalStateContext);
	
	const handleClose = () => setCurrentImage(null);
	
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
				open={currentImage != null}
				onClose={handleClose}
		>
		 <Box sx={modalStyle}>
					{/*<Button onClick={handleClose} sx={{position: 'absolute', top: '1vh', right: '1vh', color:'#ffffff'}}><CloseIcon/></Button>*/}
					Hello World 12345
			</Box>   
		</Modal>
	);
}


export default HotspotFact