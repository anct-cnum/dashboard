import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile, scrollTopWindow } from '../../../../../../utils/exportsUtils';
import { exportsActions, filtresEtTrisStatsActions, paginationActions } from '../../../../../../actions';
import { datePickerActions } from '../../../../../../actions/datePickerActions';

import Spinner from '../../../../../../components/Spinner';
import BlockDatePickers from '../../../../../../components/datePicker/BlockDatePickers';

function FiltresEtTrisTerritoires() {
  const dispatch = useDispatch();

  const territoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const dateFinMax = useSelector(state => state.datePicker?.dateFinMax);

  const exportTerritoireFileBlob = useSelector(state => state.exports);
  const exportTerritoireFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const handleTerritoire = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresEtTrisStatsActions.changeTerritoire(e.target.value));
  };

  useEffect(() => {
    dispatch(datePickerActions.changeDateFin(dateFinMax));
  }, []);

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
      <Spinner loading={loading} />
      <div className="fr-col-4">
        <select className="fr-select" id="select" name="select" defaultValue={territoire} onChange={handleTerritoire} >
          <option value="codeDepartement">Affichage par d&eacute;partement</option>
          <option value="codeRegion">Affichage par r&eacute;gion</option>
        </select>
      </div>
      <div className="fr-col-12 fr-col-offset-md-1 fr-mt-1w fr-col-md-4 fr-mb-4w fr-mb-md-0">
        <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} dateFinMax={dateFinMax} />
      </div>
    </>
  );
}

export default FiltresEtTrisTerritoires;
