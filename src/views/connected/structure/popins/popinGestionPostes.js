import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopinGestionPostesRecap from './popinGestionPostesRecap';
import PopinGestionPostesMotif from './popinGestionPostesMotif';
import PopinGestionPostesNombre from './popinGestionPostesNombre';

const popinGestionPostes = ({ step, actionType, setStep, setDernierAvenantValide }) => {
  const [nombreDePostes, setNombreDePostes] = useState(null);
  const [motif, setMotif] = useState(null);
  const [autreMotif, setAutreMotif] = useState(null);

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
        motif={motif} setMotif={setMotif}
        nombreDePostes={nombreDePostes}
        setAutreMotif={setAutreMotif} setNombreDePostes={setNombreDePostes}
        setDernierAvenantValide={setDernierAvenantValide}
      />;
    default:
      return null;
  }
};

popinGestionPostes.propTypes = {
  actionType: PropTypes.string,
  setActionType: PropTypes.func,
  nombreDePostes: PropTypes.number,
  setNombreDePostes: PropTypes.func,
  autreMotif: PropTypes.string,
  setAutreMotif: PropTypes.func,
  motif: PropTypes.string,
  setMotif: PropTypes.func,
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default popinGestionPostes;
