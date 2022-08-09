import React, { useEffect } from 'react';
import { exportsActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

function Exports() {

  const dispatch = useDispatch();
  const exports = useSelector(state => state.exports);
  const error = useSelector(state => state.exports?.error);

  useEffect(() => {
    if (exports?.blob !== null && exports?.blob !== undefined && (error === undefined || error === false)) {
      const url = window.URL.createObjectURL(new Blob(['\ufeff', exports?.blob], { type: 'text/plain' })); //ufeff pour BOM UTF-8
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${exports?.nameFile}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      dispatch(exportsActions.resetFile()); //nécessaire pour ne pas reconstruire le fichier au rechargement de la page
    }

  }, [exports]);

  const getFile = nameFile => {
    dispatch(exportsActions.exportFile(nameFile));
  };

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
            Fichier &laquo;&nbsp;Je recrute&nbsp;&raquo; (candidats validés + embauchés)
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('candidatsValidesStructure')}>
            Liste des candidatures validées par la structure
        </a>
      </p>
      <p>
        <a className="fr-link" href="#" onClick={() => getFile('embauches')}>
            Liste des candidats embauchés
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
    </div>
  );
}

export default Exports;
