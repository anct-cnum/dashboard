import React, { useEffect } from 'react';
// import Spinner from 'react-loader-spinner';

function Exports() {

  return (
    <div className="exportsCoselec" style={{ position: 'relative' }}>
      {/* <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={exports?.loading === true}
        />
      </div> */}
      <p>
        <a className="fr-link" href="#">
            Fichier &laquo;&nbsp;Je recrute&nbsp;&raquo; (candidats validés + embauchés)
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Liste des candidatures validées par la structure
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Liste des candidats embauchés
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Fichier &laquo;&nbsp;structures&nbsp;&raquo;
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Fichier des demandes de rupture
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Export CnFS 0 CRA M+2
        </a>
      </p>
      <p>
        <a className="fr-link" href="#">
            Exporter les conseillers
        </a>
      </p>
    </div>
  );
}

export default Exports;
