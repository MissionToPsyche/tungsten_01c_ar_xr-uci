import React, { useState } from 'react';
import './ToolBox.css'; 

const images = [
  'public/assets/multiSpec_Imager.png',
  'public/assets/Magnetometer.png',
  'public/assets/gammaRayNeutronSpec.png',
];

const ToolBox = () => {
  
  const [visibleColumns, setVisibleColumns] = useState(images.map(() => true));

  const handleClick = index => {
    setVisibleColumns(visibleColumns.map((isVisible, columnIndex) =>
      columnIndex === index ? false : isVisible
    ));
  };

  return (
    <div className="gallery-container">
      {images.map((image, index) => {
        if (!visibleColumns[index]) return null;
        return (
          <div key={index} className="gallery-column" onClick={() => handleClick(index)}>
            <img src={image} alt={`Column ${index}`} className="gallery-image" />
            
          </div>
        );
      })}
    </div>
  );
};

export default ToolBox;

