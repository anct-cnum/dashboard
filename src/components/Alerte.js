import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alerteEtSpinnerActions } from '../actions';
import codeAlertes from '../datas/code_alertes.json';

export default function Alerte() {

  const dispatch = useDispatch();

  const alerte = useSelector(state => state.alerteEtSpinner?.alerte);

  const messageType = codeAlertes.find(alert => alert.code === alerte?.type)?.correspondance;

  useEffect(() => {
    if (alerte?.type) {
      setTimeout(() => {
        dispatch(alerteEtSpinnerActions.resetMessageAlerte());
      }, alerte?.delay);
    }
  }, [alerte]);

  return (
    <>
      { alerte?.type &&
        <div className={'fr-my-6w fr-container'} >
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <div className={'fr-alert fr-alert--' + alerte?.type}>
                <p className="fr-alert__title">{messageType} : {alerte?.message}</p>
                <p>{alerte?.description}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
