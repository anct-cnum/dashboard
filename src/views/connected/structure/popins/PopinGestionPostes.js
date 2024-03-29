import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopinGestionPostesRecap from './PopinGestionPostesRecap';
import PopinGestionPostesMotif from './PopinGestionPostesMotif';
import PopinGestionPostesNombre from './PopinGestionPostesNombre';

const PopinGestionPostes = ({ step, actionType, setStep, setDernierAvenantValide }) => {
  const [nombreDePostes, setNombreDePostes] = useState(1);
  const [motif, setMotif] = useState('');
  const [autreMotif, setAutreMotif] = useState('');

  switch (step) {
    case 1:
      return <PopinGestionPostesNombre setNombreDePostes={setNombreDePostes} setStep={setStep}
        nombreDePostes={nombreDePostes} actionType={actionType}
      />;
    case 2:
      return <PopinGestionPostesMotif setStep={setStep}
        setMotif={setMotif} motif={motif} actionType={actionType} autreMotif={autreMotif}
        setAutreMotif={setAutreMotif} setNombreDePostes={setNombreDePostes}
      />;
    case 3:
      return <PopinGestionPostesRecap setStep={setStep} actionType={actionType}
        motif={motif} autreMotif={autreMotif} setMotif={setMotif}
        nombreDePostes={nombreDePostes}
        setAutreMotif={setAutreMotif} setNombreDePostes={setNombreDePostes}
        setDernierAvenantValide={setDernierAvenantValide}
      />;
    default:
      return null;
  }
};

PopinGestionPostes.propTypes = {
  actionType: PropTypes.string,
  setDernierAvenantValide: PropTypes.number,
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default PopinGestionPostes;
