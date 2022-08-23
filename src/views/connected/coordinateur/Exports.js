import React from 'react';
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
        <a className="fr-link" href="#">Export de vos conseillers</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
          Export des emails, noms, pr&eacute;noms de la liste de vos conseillers
        </span>
      </p>
    </div>
  );
}

export default Exports;
