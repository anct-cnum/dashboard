import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

function Exports() {
  return (
    <div className="exportsCoordinateur" style={{ position: 'relative' }}>
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
        <a className="fr-link" href="#">Export des candidats</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Export des emails, noms, prénoms de la liste des candidats
        </span>
      </p>
    </div>
  );
}

export default Exports;
