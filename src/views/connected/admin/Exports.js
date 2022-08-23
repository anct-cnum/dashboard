import React, { useEffect } from 'react';
import { exportsActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { downloadFile } from '../../../utils/exportsUtils';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [error]);

  return (
    <div className="exportsAdmin" style={{ position: 'relative' }}>
      <div className="spinnerCustom">
        <Oval
          height={100}
          width={100}
          color="#060091"
          secondaryColor="white"
          visible={exports?.loading === true}
        />
      </div>
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
        <a className="fr-link" href="#" onClick={() => getFile('cnfs-without-cra')}>
            Export CnFS 0 CRA M+2
        </a>
      </p>
      { (error !== undefined && error !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm">
          <p>Une erreur est survenue : {error?.toString()}</p>
        </div>
      }
    </div>
  );
}

export default Exports;
