import React, { useState } from 'react';
import './ToolBox.css';

const images = [
  'public/assets/multiSpec_Imager.png',
  'public/assets/Magnetometer.png',
  'public/assets/gammaRayNeutronSpec.png',
];

const imageTitles = [
  'Multi-Spectral Imager',
  'Magnetometer',
  'Gamma-Ray Spectrometer'
];

const ToolBox = () => {
  const [visibleColumns, setVisibleColumns] = useState(images.map(() => true));

  const handleClick = index => {
    setVisibleColumns(visibleColumns.map((isVisible, columnIndex) =>
      columnIndex === index ? !isVisible : isVisible
    ));
  };

  // Check if all images are invisible
  const allInvisible = visibleColumns.every(isVisible => !isVisible);

  // If all images are invisible, do not render the ToolBox
  if (allInvisible) {
    return null;
  }

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <div key={index} className="gallery-column" onClick={() => handleClick(index)}
             style={{
               visibility: visibleColumns[index] ? 'visible' : 'hidden',
               opacity: visibleColumns[index] ? 1 : 0,
               transition: 'opacity 0.5s, visibility 0.5s'
             }}>
          <img src={image} alt={imageTitles[index]} className="gallery-image" />
          <div className="image-title">{imageTitles[index]}</div>
        </div>
      ))}
    </div>
  );
};

export default ToolBox;

