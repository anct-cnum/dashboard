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
        <a className="fr-link" href="#">Export des candidats</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Export des emails, noms, prénoms de la liste des candidats
        </span>
      </p>
    </div>
  );
}

export default Exports;
