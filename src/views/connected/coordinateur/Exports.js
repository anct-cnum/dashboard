import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

function Exports() {
  return (
    <div className="exportsPrefet" style={{ position: 'relative' }}>
      <div className="spinnerCustom">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={false}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}

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
