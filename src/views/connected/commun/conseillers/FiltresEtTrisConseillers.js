import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, exportsActions, filtresEtTrisStatsActions, paginationActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../statistiques/Components/commun/BlockDatePickers';
import codeRegions from '../../../../datas/code_region.json';

function FiltresEtTrisConseillers() {
  const dispatch = useDispatch();

  const [searchByStructure, setSearchByStructure] = useState(false);
  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const filtreCoordinateur = useSelector(state => state.filtresEtTris?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresEtTris?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresEtTris?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresEtTris?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresEtTris?.region);
  let searchInput = useSelector(state => state.filtresEtTris?.searchInput);
  const conseillers = useSelector(state => state.conseiller);

  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresEtTrisStatsActions.changeFiltreRegion(e.target.value));
  };

  const exportDonneesConseiller = () => {
    dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
      filtreParNomStructure, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomOuNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    if (searchByStructure === true) {
      dispatch(filtresEtTrisStatsActions.changeNomStructure(value));
    } else {
      dispatch(filtresEtTrisStatsActions.changeNomConseiller(value));
    }
  };

  useEffect(() => {
    if (has(exportConseillerFileBlob?.blob) && exportConseillerFileError === false) {
      downloadFile(exportConseillerFileBlob);
      dispatch(exportsActions.resetFile());
    }
  }, [exportConseillerFileBlob]);

  useEffect(() => {
    if (exportConseillerFileError !== false) {
      scrollTopWindow();
    }
  }, [exportConseillerFileError]);

  useEffect(() => {
    if (conseillers?.items) {
      dispatch(conseillerActions.getAllRecruter(currentPage, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNomConseiller, filtreRegion,
        filtreParNomStructure, ordreNom, ordre ? 1 : -1));
    }
  }, [dateDebut, dateFin, currentPage, filtreCoordinateur, filtreRupture, filtreParNomConseiller, ordreNom, ordre, filtreRegion, filtreParNomStructure]);

  const handleChangeToggle = e => {
    setSearchByStructure(e.target?.checked);
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <div className="fr-toggle fr-ml-md-auto fr-toggle--label-left">
            <input type="checkbox" onChange={handleChangeToggle} className="fr-toggle__input" aria-describedby="toggle-698-hint-text" id="toggle-698" />
            <label className="fr-toggle__label" htmlFor="toggle-698" data-fr-checked-label="Structure" data-fr-unchecked-label="Conseiller">
              S&eacute;lectionner le type de recherche
            </label>
          </div>
        </div>
        <div className="fr-grid-row">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>Tous</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={searchInput ?? ''}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomOuNomStructure} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-col-12 fr-col-md-8 fr-mb-4w fr-mb-md-0 fr-grid-row">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesConseiller}>Exporter les donn&eacute;es</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisConseillers;
