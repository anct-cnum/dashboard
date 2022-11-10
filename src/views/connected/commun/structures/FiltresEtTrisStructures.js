import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, filtresStructuresActions, paginationActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../statistiques/Components/commun/BlockDatePickers';
import codeRegions from '../../../../datas/code_region.json';
import coms from '../../../../datas/coms.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';

function FiltresEtTrisStructures() {
  const dispatch = useDispatch();
  const departementsRegionList = Array.from(departementsRegionRaw);
  const dateDebut = useSelector(state => state.filtresStructures?.dateDebut);
  const ordreNom = useSelector(state => state.filtresStructures?.ordreNom);
  const filterDepartement = useSelector(state => state.filtresStructures?.departement);
  const filtreStatut = useSelector(state => state.filtresStructures?.statut);
  const filtreType = useSelector(state => state.filtresStructures?.type);
  const filtreParNomStructure = useSelector(state => state.filtresStructures?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresStructures?.region);
  const filtreComs = useSelector(state => state.filtresStructures?.coms);
  let searchInput = useSelector(state => state.filtresStructures?.searchInput);
  const structures = useSelector(state => state.structure);
  const dateFin = useSelector(state => state.filtresStructures?.dateFin);
  const ordre = useSelector(state => state.filtresStructures?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);

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
  const selectFiltreComs = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreComs(e.target?.value));
  };

  const selectFiltreStatut = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreStatut(e.target?.value));
  };

  const selectFiltreType = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreType(e.target?.value));
  };

  const exportDonneesStructures = () => {
    dispatch(exportsActions.exportDonneesStructure(dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreType, filtreRegion,
      filtreStatut, filtreComs, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresStructuresActions.changeNomStructure(value));
  };

  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion).nom);
    }
    return departementsRegionList;
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
        filtreStatut, filtreComs, ordreNom, ordre ? 1 : -1));
    }
  }, [dateDebut, dateFin, currentPage, filtreStatut, filtreType, filterDepartement, ordreNom, ordre, filtreRegion, filtreParNomStructure, filtreComs]);

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h3 className="fr-h3">Liste des structures</h3>
        </div>
        <div className="fr-grid-row">
          <div className="fr-select-group fr-col-5" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>S&eacute;lectionner une région</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-5 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={searchInput ?? ''}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomStructure} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-select-group fr-col-5" id="filtre-departement">
            <select className="fr-select" onChange={selectFiltreDepartement}>
              <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
              {getDepartements().map((departement, idx) =>
                <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-ml-auto fr-col-5" id="filtre-type">
            <select className="fr-select" onChange={selectFiltreType}>
              <option value={'tous'}>S&eacute;lectionner un type de structure</option>
              <option value="PUBLIC">Publique</option>
              <option value="PRIVATE">Priv&eacute;e</option>
            </select>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-select-group fr-col-5" id="filtre-com">
            <select className="fr-select" onChange={selectFiltreComs}>
              <option value={'tous'}>S&eacute;lectionner une collectivit&eacute; d&rsquo;outre-mer</option>
              {coms.map((com, idx) =>
                <option key={idx} value={com.num_com}>{com.num_com} - {com.com_name}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-ml-auto fr-col-5" id="filtre-statut">
            <select className="fr-select" onChange={selectFiltreStatut}>
              <option value={'tous'}>S&eacute;lectionner le statut de la structure</option>
              <option value="VALIDATION_COSELEC">Valid&eacute;e</option>
              <option value="EXAMEN_COMPLEMENTAIRE_COSELEC">Examen complémentaire</option>
              <option value="REFUS_COSELEC">Refus</option>
              <option value="CREEE">Non trait&eacute;e</option>
              <option value="ABANDON">Abandonn&eacute;e</option>
              <option value="ANNULEE">Annul&eacute;e</option>
              <option value="DOUBLON">Doublon</option>
            </select>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-col-12 fr-col-md-8 fr-mb-4w fr-mb-md-0 fr-grid-row">
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
