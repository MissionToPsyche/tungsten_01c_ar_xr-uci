import { useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



//Delete the following imports after having the real icons
import BuildIcon from '@mui/icons-material/Build';
import HardwareIcon from '@mui/icons-material/Hardware';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BrushIcon from '@mui/icons-material/Brush';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
//Delete the above imports after having the real icons

import ScaleImage from '../../../../public/assets/psyche_scale.svg';

import OrbitTrimImage from '../../../../public/assets/psyche_orbit_trim.png';
import OrbitImage from '../../../../public/assets/psyche_orbit.svg';

import FormationTrimImage from '../../../../public/assets/psyche_formation_trim.png';
import FormationImage from '../../../../public/assets/psyche_formation.svg';

import BlurOnIcon from '@mui/icons-material/BlurOn';
import CombinedFact from './CombinedFact';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function NotebookMenu() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
	
	const handleTooltipOpen = (index, array) => {
		console.log('index',index);
		//setOpenIndex(index);
		//console.log('openIndex',openIndex);
		setSelectedItem(index);
    setSelectedArray(array);

	};
		
	const factList = [
		{ icon: <BuildIcon />,title: 'Scientific Interest', text: "What gives asteroid Psyche great scientific interest is that it is likely rich in metal. It may consist largely of metal from the core of a planetesimal, one of the building blocks of the Sun’s planetary system. At Psyche scientists will explore, for the first time ever, a world made not of rock or ice, but rich in metal."},
		{ icon: <img src={OrbitTrimImage} alt="OrbitImage" height='40'/>,image:OrbitImage, title: 'The orbit', text: "Psyche follows an orbit in the outer part of the main asteroid belt, at an average distance from the Sun of 3 astronomical units (AU); Earth orbits at 1 AU." },
		{ icon: <img src={ScaleImage} alt="ScaleImage" height='40'/>,image:ScaleImage, title: "Size",  text: "If Psyche were a perfect sphere, it would have a diameter of 140 miles (226 kilometers), or about the length of the State of Massachusetts (leaving out Cape Cod). It is estimated to have a surface area of about 64,000 square miles or approximately 165,800 square kilometers."},
		{ icon: <img src={FormationTrimImage} alt="FormationImage" height='40'/>,image:FormationImage, title: "Formation",  text: "The asteroid is most likely a survivor of multiple violent hit-and-run collisions, common when the solar system was forming. Thus Psyche may be able to tell us how Earth’s core and the cores of the other terrestrial planets came to be."},
		{ icon: <BlurOnIcon/>,image:'', title: "Properties",  text: 
		(
    <>
			<CombinedFact/>
    </>
  )},
	];
	
	const toolList = [
		{ icon: <ArchitectureIcon />, title: "Gamma Ray and Neutron Spectrometer",  text: "Determine the chemical elements constituting Psyche."},
		{ icon: <BuildIcon />,title: 'Multispectral Imager', text: "Provide information about the mineral composition and topography of Psyche." },
		{ icon: <HardwareIcon />,title: 'Magnetometer', text: "Tool 3 Description" },
		{ icon: <BrushIcon />,title: 'X-band radio telecommunications system', text: "Tool 4 Description" },
		{ icon: <SquareFootIcon />,title: 'Deep Space Optical Communication technology demo', text: "Tool 5 Description" },
	];
	
	const [selectedItem, setSelectedItem] = useState(0);
  const [selectedArray, setSelectedArray] =  useState(factList);

	
	const handleSelectedItem = (index, array) => {
		return (
			<>
			<Typography paragraph>
				{array[index].text}
			</Typography>
			{index!==4 && (
      <img 
        src={array[index].image} 
        width='200vw' 
        style={{ display: 'block', margin: 'auto', padding: '2vh' }} 
        alt={array[index].image} 
      />
    )}
			</>
		)
	}
  
  const handleSelectedTool = (index) => {
		return (
			<>
			<Typography paragraph>
				{toolList[index].text}
			</Typography>
			{index!==4 && (
      <img 
        src={toolList[index].image} 
        width='200vw' 
        style={{ display: 'block', margin: 'auto', padding: '2vh' }} 
        alt={toolList[index].image} 
      />
    )}
			</>
		)
	}

  return (
    <Box sx={{ display: 'flex', overflowY:'scroll', width:'80vw'}}>
      <AppBar open={open} sx={{backgroundColor: 'rgb(11, 61, 145)'}}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
							color: 'rgb(255,255,255)'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Summary
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* Facts */}
        <Divider />
        <List >
          {factList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
								selected={selectedItem === index}
								onClick={() => handleTooltipOpen(index, factList)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* Tools */}
        <Divider />
        <List >
          {toolList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
								selected={selectedItem === index}
								onClick={() => handleTooltipOpen(index, toolList)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
			<Box component="main" sx={{ flexGrow: 1}}>
        <DrawerHeader />
        {handleSelectedItem(selectedItem, selectedArray)}
        {/*{handleSelectedTool(selectedItem)}*/}
      </Box>
    </Box>
  );
}

export default NotebookMenu;