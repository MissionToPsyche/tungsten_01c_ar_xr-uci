import React from 'react';
import spectrometerImage from '../../assets/pysche_spectrometer.png';
import magnometerImage from '../../assets/physce_magnometer.jpeg';
import multiSpec from '../../assets/psyche-multispectral-imager.jpg';

const Menu = () => {
  return (
    <>
      <style>{`
        .menu {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          border: 1px solid #ccc;
          background-color: white;
        }

        .menu table {
          border-collapse: collapse;
          width: 100%;
          background-color: grey;
        }

        .menu th {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
          background-color: grey; /* Set the header cells to grey */
        }
      `}</style>
      <div className="menu">
        <table>
          <thead>
            <tr>
              <th><img src={spectrometerImage} alt="Spectrometer" style={{width: "100px"}} /></th>
              <th><img src = {magnometerImage} alt = "MagnometerImage"style={{width: "100px"}}/> </th>
              <th><img src = {multiSpec} alt = "multiSpec"style={{width: "100px"}}/></th>
              <th>Fourth Item</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Menu;




