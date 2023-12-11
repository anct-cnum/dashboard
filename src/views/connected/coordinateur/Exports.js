import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { exportsActions } from '../../../actions';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';

function Exports() {
  const dispatch = useDispatch();
  const exports = useSelector(state => state.exports);
  const error = useSelector(state => state.exports?.error);

  useEffect(() => {
    if (exports?.blob !== null && exports?.blob !== undefined && (error === undefined || error === false)) {
      downloadFile(exports);
      dispatch(exportsActions.resetFile());
    }
  }, [exports]);

  useEffect(() => {
    if (error !== undefined && error !== false) {
      scrollTopWindow();
    }
  }, [error]);

  return (
    <div className="exportsCoordinateur" style={{ position: 'relative' }}>
      {(error !== undefined && error !== false && error?.statut !== 404) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Une erreur est survenue : {error}</p>
        </div>
      }
      {(error !== undefined && error !== false && error?.statut === 404) &&
        <div className="fr-alert fr-alert--info fr-alert--sm fr-mb-4w">
          <p>Information : {error}</p>
        </div>
      }
      <div className="fr-notice fr-notice--info">
        <div className="fr-container">
          <div className="fr-notice__body">
            <p className="fr-notice__title">
              Vous ne poss&eacute;dez aucun export pour le moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exports;
