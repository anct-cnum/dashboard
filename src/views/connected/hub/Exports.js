import React, { useEffect } from 'react';
import { exportsActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';

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

  useEffect(() => {
    if (error !== undefined && error !== false) {
      scrollTopWindow();
    }
  }, [error]);

  return (
    <div className="exportsHub" style={{ position: 'relative' }}>
      {(error !== undefined && error !== false && error?.statut !== 404) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Une erreur est survenue : {error.message.toString()}</p>
        </div>
      }
      {(error !== undefined && error !== false && error?.statut === 404) &&
        <div className="fr-alert fr-alert--info fr-alert--sm fr-mb-4w">
          <p>Information : {error.message.toString()}</p>
        </div>
      }
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
    </div>
  );
}

export default Exports;
