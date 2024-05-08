import React from 'react';
import robotImage from '/assets/psyche_bot.png';
 import useTypingText from '../../utils/useTypingEffect';

function MissionIntroPopup({ title, message, onClose, onNext, isLast }) {
  const typedMessage = useTypingText(message, 23); //speed


  return (
    <div className="mission-intro-popup">
      <div className="popup-content">
        <div className="character-image">
          <img src={robotImage} alt="Robot Character" />
        </div>
        <div className="text-content">
          <h1>{title}</h1>
          <p>{typedMessage}</p>
          {isLast ? (
            <button onClick={onClose} >Finish</button>
          ) : (
            <button onClick={onNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MissionIntroPopup;