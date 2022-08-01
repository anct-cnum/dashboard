import React, { useEffect } from 'react';
// import Spinner from 'react-loader-spinner';

function Exports() {

  return (
    <div className="exportsPrefet" style={{ position: 'relative' }}>
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
        <a className="fr-link" href="#">Export des structures</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
            Export de la liste des structures
        </span>
      </p>
      <p>
        <a className="fr-link" href="#">Exporter les conseillers</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
            Exporter de la liste des conseillers
        </span>
      </p>
      <p>
        <a className="fr-link" href="#">Export des conseiller embauchés</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
            Liste des candidats embauchés
        </span>
      </p>
    </div>
  );
}

export default Exports;
