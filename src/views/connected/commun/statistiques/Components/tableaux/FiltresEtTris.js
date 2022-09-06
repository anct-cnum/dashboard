import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import download from 'downloadjs';

import { filtresEtTrisActions, statistiquesActions } from '../../../../../../actions';

import Spinner from '../../../../../../components/Spinner';
import Alerte from '../../../../../../components/Alerte';
import BlockDatePickers from '../commun/BlockDatePickers';


function currentPage(pagination, location) {
  return pagination?.resetPage === false && location.currentPage !== undefined ? location.currentPage : 1;
}

function FiltresEtTris({ resetPage }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const territoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const pagination = useSelector(state => state.pagination);

  const exportTerritoireFileBlob = useSelector(state => state.statistiques?.exportTerritoireFileBlob);
  const exportTerritoireFileError = useSelector(state => state.statistiques?.exportTerritoireFileError);
  const downloading = useSelector(state => state.statistiques?.downloading);

  const has = value => value !== null && value !== undefined;

  useEffect(() => {
    if (!has(exportTerritoireFileBlob) || has(exportTerritoireFileError)) {
      return;
    }
    download(exportTerritoireFileBlob, 'export-territoires.csv');
    dispatch(statistiquesActions.resetExportDonneesTerritoire());
  }, [exportTerritoireFileBlob, exportTerritoireFileError]);

  useEffect(() => {
    if (location.pathname === '/statistiques-territoires') {
      const page = currentPage(pagination, location);
      dispatch(statistiquesActions.getDatasTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
      resetPage(page);
    }

  }, [dateDebut, dateFin, territoire]);

  const handleTerritoire = e => {
    dispatch(filtresEtTrisActions.changeTerritoire(e.target.value));
  };

  const exportDonneesTerritoire = () => {
    dispatch(statistiquesActions.exportDonneesTerritoire(territoire, dateDebut, dateFin, ordreNom, ordre ? 1 : -1));
  };

  return (
    <>
      <Spinner loading={downloading}/>
      <Alerte display={exportTerritoireFileError} type="error" titre={exportTerritoireFileError} fluid={'--fluid'}/>
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--end">
          { location.pathname === '/statistiques-territoires' &&
          <>
            <div className="fr-col-3">
              <select className="fr-select" id="select" name="select" defaultValue={territoire} >
                <option value="codeDepartement" onClick={handleTerritoire} >Affichage par d&eacute;partement</option>
                <option value="codeRegion" onClick={handleTerritoire} >Affichage par r&eacute;gion</option>
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

FiltresEtTris.propTypes = {
  resetPage: PropTypes.func,
};

export default FiltresEtTris;
