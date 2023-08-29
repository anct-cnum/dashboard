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

  const getFile = (nameFile, collection) => {
    dispatch(exportsActions.exportFile(nameFile, collection));
  };

  useEffect(() => {
    if (error !== undefined && error !== false) {
      scrollTopWindow();
    }
  }, [error]);

  return (
    <div className="exportsAdmin" style={{ position: 'relative' }}>
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
        <a className="fr-link" href="#" onClick={() => getFile('candidats')}>
          Fichier &laquo;&nbsp;Je recrute&nbsp;&raquo; (candidats valid&eacute;s + embauch&eacute;s)
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('candidatsValidesStructure')}>
          Liste des candidatures valid&eacute;es par la structure
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('embauches')}>
          Liste des candidats embauch&eacute;s
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('structures')}>
          Fichier &laquo;&nbsp;structures&nbsp;&raquo;
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('ruptures')}>
          Fichier des demandes de rupture
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('historique-ruptures', 'conseillersRuptures')}>
          Historique des ruptures de contrat
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('cnfs-without-cra')}>
          Export CnFS 0 CRA M+2
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('structure-non-interesser-reconventionnement')}>
          Structures non int&eacute;ress&eacute;es par le reconventionnement
        </a>
      </p>
    </div>
  );
}

export default Exports;
