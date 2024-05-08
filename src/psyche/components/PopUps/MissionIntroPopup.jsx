import React from 'react';
import robotImage from '/assets/psyche_bot.png';

// function MissionIntroPopup({ title, message, onClose, onNext, isLast }) {
//   return (
//     <div className="mission-intro-popup">

//       <div className="character-image">
//         <img src={robotImage} alt="Robot Character" />
//       </div>
//       <div className="text-content">
//         <h1>{title}</h1>
//         <p>{message}</p>
//         {isLast ? (
//           <button onClick={onClose}>Finish</button>
//         ) : (
//           <button onClick={onNext}>Next</button>
//         )}
//       </div>
//     </div>
//   );
// }

function MissionIntroPopup({ title, message, onClose, onNext, isLast }) {
  return (
    <div className="mission-intro-popup">
      <div className="popup-content">
        <div className="character-image">
          <img src={robotImage} alt="Robot Character" />
        </div>
        <div className="text-content">
          <h1>{title}</h1>
          <p>{message}</p>
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