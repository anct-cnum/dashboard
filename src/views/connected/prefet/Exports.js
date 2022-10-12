import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { exportsActions } from '../../../actions';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';

import Spinner from '../../../components/Spinner';

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

  const getFile = nameFile => {
    dispatch(exportsActions.exportFile(nameFile));
  };

  useEffect(() => {
    if (error !== undefined && error !== false) {
      scrollTopWindow();
    }
  }, [error]);

  return (
    <div className="exportsPrefet" style={{ position: 'relative' }}>
      {(error !== undefined && error !== false && error?.statut !== 404) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Une erreur est survenue : {error.message.toString()}</p>
        </div>
      }
      {(error !== undefined && error !== false && error?.statut === 404) &&
        <div className="fr-alert fr-alert--info fr-alert--sm fr-mb-4w">
          <p>Information : {error.message.toString()}</p>
        </div>
      }
      <Spinner loading={exports?.loading} />
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('structures')}>Export des structures</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Export de la liste des structures
        </span>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('embauches')}>Export des conseillers embauch&eacute;s</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Liste des conseillers embauch&eacute;s
        </span>
      </p>
    </div>
  );
}

export default Exports;
