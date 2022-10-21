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
    dispatch(filtresStructuresActions.changeFiltreRegion(e.target.value));
    dispatch(filtresStructuresActions.changeFiltreDepartement(undefined));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreDepartement(e.target.value));
  };

  const selectFiltreStatut = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreStatut(e.target.value));
  };

  const selectFiltreType = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreType(e.target.value));
  };

  const selectFiltreCom = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeFiltreType(e.target.value));
  };

  const exportDonneesConseiller = () => {
    // dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
    //   filtreParNomStructure, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresStructuresActions.changeNomStructure(value));
  };

  function getDepartements() {
    return departementsRegionList.filter(region => filtreRegion !== undefined ? region.region_name === codeRegions.find(r => r.code === filtreRegion) : true);
  }

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
  }, [dateDebut, dateFin, currentPage, filtreStatut, filtreType, filterDepartement, ordreNom, ordre, filtreRegion, filtreParNomStructure]);

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>Toute région</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
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
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreDepartement}>
              <option value={'tous'}>Tout département</option>
              {getDepartements().map((region, idx) =>
                <option key={idx} value={region.code}>{region.code} - {region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-ml-auto fr-col-4" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreType}>
              <option value="">Tout type</option>
              <option value="PUBLIC">Publique</option>
              <option value="PRIVATE">Privée</option>
            </select>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreCom}>
              <option value={'tous'}>Toute collectivité d&quot;outre-mer</option>
              {coms.map((com, idx) =>
                <option key={idx} value={com.num_com}>{com.num_com} - {com.com_name}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-ml-auto fr-col-4" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreStatut}>
              <option value="">Tous statut</option>
              <option value="VALIDATION_COSELEC">Validée</option>
              <option value="CREEE">Non traitée</option>
              <option value="ABANDON">Abandonnée</option>
              <option value="ANNULEE">Annulée</option>
            </select>
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

export default FiltresEtTrisStructures;
