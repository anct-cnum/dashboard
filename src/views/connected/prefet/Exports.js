import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { exportsActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div className="exportsPrefet" style={{ position: 'relative' }}>
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
        <a className="fr-link" href="#" onClick={() => getFile('structures')}>Export des structures</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Export de la liste des structures
        </span>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('embauches')}>Export des conseillers embauchés</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Liste des conseillers embauchés
        </span>
      </p>
      {(error !== undefined && error !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm">
          <p>Une erreur est survenue : {error?.toString()}</p>
        </div>
      }
    </div>
  );
}

export default Exports;
