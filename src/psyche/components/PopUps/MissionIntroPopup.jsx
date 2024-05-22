import React from 'react';
import robotImage from '/assets/psyche_bot.png';
 import useTypingText from '../../utils/useTypingEffect';
import { useContext } from 'react';
import { GlobalStateContext } from '../../utils/useContext';
import { Box, Typography } from '@mui/material';
import '../../../psyche/style.css'

function MissionIntroPopup({ btnTextLaunch,title, message, onClose, onNext, isLast }) {
  const typedMessage = useTypingText(message, 23); //speed

  const {numExploredTools, setNumExploredTools} = useContext(GlobalStateContext);

  return (
    <Box className="mission-intro-popup">
      <Box className="popup-content">
        <Box className="character-image">
          <img src={robotImage} alt="Robot Character" />
        </Box>
        <Box className="text-content">
          {/*<Typography>
            <Box sx={{fontWeight:'bold'}}>
            {title}
            </Box>
          </Typography>*/}
          <Typography>{typedMessage}</Typography>
          {isLast ? (
            <button onClick={onClose}>I'm ready!</button>
          ) : (
            <button onClick={onNext} disabled={btnTextLaunch === "Finish" && numExploredTools<3}>{btnTextLaunch}</button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MissionIntroPopup;