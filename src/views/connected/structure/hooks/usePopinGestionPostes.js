import { useState } from 'react';

const usePopinGestionPostes = () => {
  const [actionType, setActionType] = useState('');
  const [step, setStep] = useState(0);

  const handlePopin = (action, step) => {
    setActionType(action);
    setStep(step);
  };

  return {
    actionType,
    step,
    handlePopin,
    setStep,
  };
};

export default usePopinGestionPostes;
