import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile, scrollTopWindow } from '../../../../../../utils/exportsUtils';
import { exportsActions, filtresEtTrisStatsActions, paginationActions } from '../../../../../../actions';

import Spinner from '../../../../../../components/Spinner';
import BlockDatePickers from '../commun/BlockDatePickers';

function FiltresEtTris() {
  const dispatch = useDispatch();

  const territoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);

  const exportTerritoireFileBlob = useSelector(state => state.exports);
  const exportTerritoireFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const handleTerritoire = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresEtTrisStatsActions.changeTerritoire(e.target.value));
  };

  const exportDonneesTerritoire = () => {
    dispatch(exportsActions.exportDonneesTerritoire(territoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
  };

  useEffect(() => {
    if (has(exportTerritoireFileBlob?.blob) && exportTerritoireFileError === false) {
      downloadFile(exportTerritoireFileBlob);
      dispatch(exportsActions.resetFile());
    }
  }, [exportTerritoireFileBlob]);

  useEffect(() => {
    if (exportTerritoireFileError !== false) {
      scrollTopWindow();
    }
  }, [exportTerritoireFileError]);

  return (
    <>
      <Spinner loading={loading}/>
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--end">
          { location.pathname === '/statistiques-territoires' &&
          <>
            <div className="fr-col-3">
              <select className="fr-select" id="select" name="select" defaultValue={territoire} onChange={handleTerritoire} >
                <option value="codeDepartement">Affichage par d&eacute;partement</option>
                <option value="codeRegion">Affichage par r&eacute;gion</option>
              </select>
            </div>
            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4 fr-mb-4w fr-mb-md-0">
              <b>
                <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
              </b>
            </div>
            <div className="fr-ml-auto">
              <button className="fr-btn fr-btn--secondary" onClick={exportDonneesTerritoire}>Exporter les donn&eacute;es</button>
            </div>
          </>
          }
        </div>
      </div>
    </>
  );
}

export default FiltresEtTris;
