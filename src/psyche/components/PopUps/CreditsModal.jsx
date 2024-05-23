import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const CreditsModal = ({ onClose, isOpen }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    maxHeight: '80vh',
    maxWidth: '100vw',
    width: '70vw',
    height: '65vh',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '3vh',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'center',
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2 style={{ marginBottom: '1rem' }}>Credits</h2>
        <div style={{ textAlign: 'left', maxHeight: '80vh', overflow: 'auto', paddingRight: '20px' }}>
          <h2>
            <strong>Contributors</strong>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
            <li>Jingjing Wang</li>
            <li>Trinh Nhu Khang Le</li>
            <li>Van Anh Trinh</li>
            <li>Trey Miller</li>
            <li>Menachem Mendel Shifrin</li>
            <li>Carl Grini</li>
          </ul>
          <h2>
            <strong>Psyche Bot Image</strong>
          </h2>
          <p style={{ marginBottom: '1rem' }}>NASA/JPL-Caltech/ASU/Sarah Tennant, Psyche Inspired
            Cobalt Class (2019-2020)</p>
            
            
          <h2>
            <strong>Background Music: Ideas</strong>
          </h2>
          <p style={{ marginBottom: '1rem' }}>ASU/Isaac Wisdom, Psyche Inspired
          Titanium Class (2017-2018)</p>
          <h2>
            <strong>Spacecraft Tool Images</strong>
          </h2>
          <p style={{ marginBottom: '1rem' }}>NASA/JPL-Caltech/ASU/Anne Elliott, Psyche Inspired Nickel Class</p>

          <h2>
            <strong>Disclaimer</strong>
          </h2>
          <p>
            This work was created in partial fulfillment of University of California, Irvine Capstone
            Course "CS 180A/B". The work is a result of the Psyche Student Collaborations component
            of NASA's Psyche Mission (https://psyche.asu.edu). "Psyche: A Journey to a Metal World"
            [Contract number NNM16AA09C] is part of the NASA Discovery Program mission to solar
            system targets. Trade names and trademarks of ASU and NASA are used in this work for
            identification only. Their usage does not constitute an official endorsement, either
            expressed or implied, by Arizona State University or National Aeronautics and Space
            Administration. The content is solely the responsibility of the authors and does not
            necessarily represent the official views of ASU or NASA.
          </p>
        </div>
      </Box>
    </Modal>
  );
};
export default CreditsModal;