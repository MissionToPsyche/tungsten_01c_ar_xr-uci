import * as React from 'react';
import { useRef, useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { tooltipClasses } from '@mui/material/Tooltip';

//Delete the following imports after having the real icons
import BuildIcon from '@mui/icons-material/Build';
import HardwareIcon from '@mui/icons-material/Hardware';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BrushIcon from '@mui/icons-material/Brush';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
//Delete the above imports after having the real icons


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Facts from './NotebookMenu';


import CloseIcon from '@mui/icons-material/Close';
import {GlobalStateContext} from '../../utils/useContext';

function TabPanel(props) {
  const { children, value, index} = props;

  return (
      value === index && (
              <Typography component={'span'}>{children}</Typography>
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
      display: 'flex',
      
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const toolList = [
      { icon: <ArchitectureIcon />, title: "Gamma Ray and Neutron Spectrometer",  text: "Determine the chemical elements constituting Psyche."},
      { icon: <BuildIcon />,title: 'Multispectral Imager', text: "Provide information about the mineral composition and topography of Psyche." },
      { icon: <HardwareIcon />,title: 'Magnetometer', text: "Tool 3 Description" },
      { icon: <BrushIcon />,title: 'X-band radio telecommunications system', text: "Tool 4 Description" },
      { icon: <SquareFootIcon />,title: 'Deep Space Optical Communication technology demo', text: "Tool 5 Description" },

      // Add more items as needed
    ];
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openIndex, setOpenIndex] = React.useState(null);
    

    const handleTooltipClose = () => {
      setOpenIndex(null);
    };
  
    const handleTooltipOpen = (index) => {
      console.log('index',index);
      setOpenIndex(index);
      console.log('openIndex',openIndex);


    };

    const handleClick = (event, index) => {
      setOpenIndex(index);
      setAnchorEl(event.currentTarget);
    };
    
    const CustomWidthTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))({
      [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 205,
        fontSize: 14,
        padding: '2vh'
      },
    });

    return (
      <Modal 
          open={showNotebook}
          onClose={handleClose}
      >
       <Box sx={modalStyle}>
            <Button onClick={handleClose} sx={{position: 'absolute', top: '1vh', right: '1vh', color:'#ffffff'}}><CloseIcon/></Button>
            <Facts/>
                 

        </Box>
      
      </Modal>
    );
  }
	
	
	export default NotebookPopup;
  
  //{Array.from(Array(20)).map((_, index) => (  
  //  <Grid item xs={2} sm={4} md={4} key={index} >
  //    {/*<Item>Item {index}</Item>*/}
  //  </Grid>
  //))}
  
  
  //<Box sx={{ flexGrow: 1, marginTop: '2vh', width: '70vw' }}>
  //              <Grid container sx={{ overflowY: 'auto', maxHeight: '55vh' }}>
  //                {toolList.map((tool, index) => (
  //                  <Grid item key={index} sx={{ width: '100%' }}>
  //                  {/*<ClickAwayListener onClickAway={handleTooltipClose}>*/}
  //                    <div>
  //                      <CustomWidthTooltip
  //                        arrow
  //                        PopperProps={{
  //                          disablePortal: true,
  //                        }}
                          
  //                        //onClose={handleTooltipClose}
  //                        open={openIndex === index}
  //                        disableFocusListener
  //                        disableHoverListener
  //                        disableTouchListener
  //                        title={tool.text}
  //                      >
  //                        <Button onClick={() => { handleTooltipOpen(index)}} sx={{width: '100%', padding: 0, textTransform: 'none' }}>
  //                          <Item   sx={{ width: '100%', marginBottom:'1vh', justifyContent:'flex-start'}} >
  //                            <Grid item padding={1}>
  //                              {tool.icon}
  //                            </Grid> 
  //                            <Grid item padding={1} sx={{ textAlign: 'left' }}>
  //                                {tool.title}
  //                            </Grid> 
  //                          </Item> 
                            
  //                        </Button>
  //                      </CustomWidthTooltip>
  //                    </div>
  //                  {/*</ClickAwayListener>*/}
                  
  //                </Grid>
  //              ))}
  //              </Grid>
  //            </Box>