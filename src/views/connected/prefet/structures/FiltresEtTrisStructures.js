import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, filtresStructuresActions, paginationActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';
import codeRegionsRaw from '../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';

function FiltresEtTrisStructures() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const codeRegionArray = Array.from(codeRegionsRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const ordreNom = useSelector(state => state.filtresStructures?.ordreNom);
  const filterDepartement = useSelector(state => state.filtresStructures?.departement);
  const filtreStatut = useSelector(state => state.filtresStructures?.statut);
  const filtreType = useSelector(state => state.filtresStructures?.type);
  const filtreParNomStructure = useSelector(state => state.filtresStructures?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresStructures?.region);
  let searchInput = useSelector(state => state.filtresStructures?.searchInput);
  const structures = useSelector(state => state.structure);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresStructures?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const userAuth = useSelector(state => state.authentication?.user);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresStructuresActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreDepartement(e.target?.value));
  };

  const selectFiltreType = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreType(e.target?.value));
  };

  const selectFiltreStatut = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreStatut(e.target?.value));
  };

  const exportDonneesStructures = () => {
    dispatch(exportsActions.exportDonneesStructure(dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreType, filtreRegion,
      filtreStatut, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresStructuresActions.changeNomStructure(value));
  };

  const rechercheParNomStructureToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomStructure(e);
    }
  };

  const getDepartements = () => {
    if (userAuth?.region) {
      return departementsRegionList.filter(departement => departement.region_name === codeRegionArray.find(r => r.code === userAuth?.region)?.nom);
    }
    return departementsRegionList.filter(departement => departement.num_dep === userAuth?.departement);
  };

  const getRegions = () => {
    if (userAuth?.departement) {
      return codeRegionArray.filter(
        region => region.nom === departementsRegionList.find(departement =>
          departement.num_dep === userAuth.departement).region_name
      );
    }
    return codeRegionArray.filter(region => region.code === userAuth?.region);
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
    if (structures?.items) {
      dispatch(structureActions.getAll(currentPage, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreType, filtreRegion,
        filtreStatut, ordreNom, ordre ? 1 : -1));
    }
  }, [dateDebut, dateFin, currentPage, filtreType, filterDepartement, ordreNom, ordre, filtreRegion, filtreParNomStructure, filtreStatut]);

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h1 className="fr-h1 title">Liste des structures</h1>
        </div>
        <div className="fr-grid-row">
          <div className="fr-select-group fr-col-12 fr-col-md-4 fr-col-xl-4 display-desktop" id="filtre-region">
            <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
              {getRegions().map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-col-12 fr-col-xl-8 fr-mb-4w fr-ml-auto">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input onKeyDown={rechercheParNomStructureToucheEnter} className="fr-input" defaultValue={searchInput ?? ''}
                placeholder="Rechercher par nom, par id, par siret ou par email" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomStructure} title="Rechercher par nom, par id, par siret ou par email">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-select-group fr-col-12 fr-col-md-6 display-mobile" id="filtre-region">
            <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
              {getRegions().map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-12 fr-col-md-5 fr-col-xl-4" id="filtre-departement">
            <select className="fr-select" value={filterDepartement} onChange={selectFiltreDepartement}>
              {userAuth?.region &&
                <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
              }
              {getDepartements().map((departement, idx) =>
                <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-xl-4 fr-col-12 fr-col-md-6" id="filtre-type">
            <select className="fr-select" value={filtreType} onChange={selectFiltreType}>
              <option value={'tous'}>S&eacute;lectionner un type de structure</option>
              <option value="PUBLIC">Publique</option>
              <option value="PRIVATE">Priv&eacute;e</option>
            </select>
          </div>
          <div className="fr-select-group fr-ml-auto fr-col-xl-4 fr-col-12 fr-col-md-5" id="filtre-statut">
            <select className="fr-select" value={filtreStatut} onChange={selectFiltreStatut}>
              <option value={'tous'}>S&eacute;lectionner le statut de la structure</option>
              <option value="VALIDATION_COSELEC">Valid&eacute;e</option>
              <option value="EXAMEN_COMPLEMENTAIRE_COSELEC">Examen complémentaire</option>
              <option value="REFUS_COSELEC">Refus</option>
              <option value="REFUS_COORDINATEUR">Refus coordinateur</option>
              <option value="CREEE">Non trait&eacute;e</option>
              <option value="ABANDON">Abandonn&eacute;e</option>
              <option value="ANNULEE">Annul&eacute;e</option>
              <option value="DOUBLON">Doublon</option>
            </select>
          </div>
        </div>
        <div className="fr-grid-row">
          <div className="date-picker fr-mb-4w fr-mt-3w fr-mt-md-1w fr-grid-row">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} />
          </div>
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesStructures}>Exporter les donn&eacute;es</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisStructures;
