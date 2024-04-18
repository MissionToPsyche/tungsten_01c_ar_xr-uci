import React from 'react';

function MissionIntroPopup({ title, message, onClose, onNext, isLast }) {
  return (
    <div className="mission-intro-popup">
      <h1>{title}</h1>
      <p>{message}</p>
      {isLast ? (
        <button onClick={onClose}>Finish</button>
      ) : (
        <button onClick={onNext}>Next</button>
      )}
    </div>
  );
}

export default MissionIntroPopup;
