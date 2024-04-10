import * as React from 'react';
import { useRef, useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';




import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';

function TabPanel(props) {
  const { children, value, index} = props;

  return (
      value === index && (
              <Typography>{children}</Typography>
      )
  );
}


  function NotebookPopup({ onClose }) {
    const { showNotebook, setShowNotebook} = useContext(GlobalStateContext);

    //const [open, setOpen] = React.useState(false);
    const handleOpen = () => setShowNotebook(true);
    const handleClose = () => setShowNotebook(false);
    

    
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      
      maxHeight: '80vh',
      maxWidth: '80vw',
      
      height:'65vh',
      
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '3vh',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'top',
      alignItems: 'center'
    };
    
    const [value, setValue] = React.useState(0);
    const [activateTab, setActivateTab] = React.useState(false);

    setTimeout(()=>{
        setActivateTab(true)
    },100)

    const tabsArr=[
        {
            label:"Explored",
            key: `tab-0`,
        },
        {
            label:"Tools",
            key: `tab-1`,
        }
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      height: '6vh',
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    
    
    return (
      <Modal 
          open={showNotebook}
          onClose={handleClose}
      >
       <Box sx={modalStyle}>
            <Button onClick={handleClose} sx={{position: 'absolute', top: '1vh', right: '1vh'}}><CloseIcon/></Button>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 , width:'100%'}}>
                <Tabs value = {value} onChange = {handleChange} variant='fullWidth'>
                    {activateTab && (
                            tabsArr.map((item)=>(
                                <Tab {...item} />
                            ))
                        )
                    }
                </Tabs>
            </Box>
            
            <TabPanel value={value} index={0}>
              <Box sx={{ flexGrow: 1, marginTop: '2vh', width:'70vw'}}>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ overflowY: "scroll", maxHeight: "55vh" }}> 
                  {Array.from(Array(20)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} >
                    <Item>Item {index}</Item>
                  </Grid>
                  ))}
                </Grid>
              </Box>  
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Box sx={{ flexGrow: 1, marginTop: '2vh', width:'70vw'}}>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ overflowY: "auto", maxHeight: "55vh" }}> 
                    {Array.from(Array(4)).map((_, index) => (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                      <Item>Tool {index}</Item>
                    </Grid>
                    ))}
                  </Grid>
              </Box>  
            </TabPanel>
            {/*<Button variant="contained" onClick={handleClose}>Close</Button>*/}

        </Box>
      
      </Modal>
    );
  }
	
	
	export default NotebookPopup;