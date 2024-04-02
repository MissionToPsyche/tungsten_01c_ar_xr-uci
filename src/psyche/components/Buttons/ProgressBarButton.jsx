import React from 'react';
import './style.css'; // Import CSS for styling

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import MenuBookIcon from '@mui/icons-material/MenuBook';




const ProgressBarButton = () => {
  const [progress, setProgress] = React.useState(60);
  return (
    <div style={{ width: '4vh', height: '4vh' }} className='notebook-button'>
      <CircularProgressbarWithChildren minValue={0} maxValue={100} value={66} strokeWidth={5}>
        <MenuBookIcon fontSize="string"/>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProgressBarButton;

