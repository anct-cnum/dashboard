import React, { useEffect } from 'react';
import { exportsActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { downloadFile } from '../../../utils/exportsUtils';

function Exports() {

  const dispatch = useDispatch();
  const exports = useSelector(state => state.exports);
  const error = useSelector(state => state.exports?.error);
  const user = useSelector(state => state.authentication?.user?.user);
  
  useEffect(() => {
    if (exports?.blob !== null && exports?.blob !== undefined && (error === undefined || error === false)) {
      downloadFile(exports);
      dispatch(exportsActions.resetFile());
    }
  }, [exports]);

  const getFile = (nameFile, hubName) => {
    dispatch(exportsActions.exportFile(nameFile, hubName));
  };

  return (
    <div className="exportsHub" style={{ position: 'relative' }}>
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
        <a className="fr-link" href="#" onClick={() => getFile('cnfs-hub', user?.hub)}>Exporter les conseillers</a>
        <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
            Export de la liste des conseillers de votre hub
        </span>
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
