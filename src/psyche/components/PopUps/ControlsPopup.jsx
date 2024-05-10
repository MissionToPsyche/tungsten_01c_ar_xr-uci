import * as React from 'react';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
//import Facts from './NotebookMenu';
import NotebookMenu from './NotebookMenu';

import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../../style.css'
import PinchIcon from '@mui/icons-material/Pinch';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';


  function ControlsPopup({ onClose }) {
    const { showControls, setShowControls} = useContext(GlobalStateContext);
    const handleClose = () => setShowControls(false);
    
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
			width: '70%',
      
      maxHeight: '80vh',
      
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
          open={showControls}
          onClose={handleClose}
      >
       <Box sx={modalStyle}>
				<Typography variant="h5">
					<Box className="title-color">
					CONTROLS
					</Box>
				</Typography>
				<List>
					<ListItem>
						<ListItemIcon>
							<PinchIcon />
						</ListItemIcon>
						<ListItemText
							primary="Pinch to zoom"
						/>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<SwipeRightIcon />
						</ListItemIcon>
						<ListItemText
							primary="Swipe to move"
						/>
					</ListItem>
					</List>
        </Box>   
      </Modal>
    );
  }
	
	
	export default ControlsPopup;



//function ControlsPopup({ onClose }) {
//	return (
//		<div className="controls-popup">
//			<button className="close-button" onClick={onClose}>X</button>
//			<div className="controls-content">
//				<p>Controls:</p>
//				<ul>
//					<li>Pinch to zoom</li>
//					<li>Swipe to move</li>
//				</ul>
//			</div>
//		</div>
//	);
//}


//export default ControlsPopup;