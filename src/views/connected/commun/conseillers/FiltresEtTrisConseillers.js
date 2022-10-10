import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, exportsActions, filtresEtTrisStatsActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../statistiques/Components/commun/BlockDatePickers';
import codeRegions from '../../../../datas/code_region.json';

function FiltresEtTrisConseillers() {
  const dispatch = useDispatch();

  const conseillerBeforeFilter = useSelector(state => state.conseiller?.conseillersBeforeFilter);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const filtreCoordinateur = useSelector(state => state.filtresEtTris?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresEtTris?.rupture);
  const filtreParNom = useSelector(state => state.filtresEtTris?.nom);
  let searchInput = useSelector(state => state.filtresEtTris?.searchInput);

  const filtreRegion = useSelector(state => state.filtresEtTris?.region);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => dispatch(filtresEtTrisStatsActions.changeFiltreRegion(e.target.value));

  const exportDonneesConseiller = () => {
    dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNom, ordreNom,
      ordre ? 1 : -1));
  };

  const formatNomStructure = nomStructure => nomStructure
  .replaceAll('.', '')
  .replaceAll('-', ' ')
  .replaceAll('à', 'a')
  .replaceAll('ù', 'u')
  .replaceAll('ç', 'c')
  .replaceAll('è', 'e')
  .replaceAll('é', 'e');

  const rechercheParNomOuNomStructure = e => {
    const value = (e.key === 'Enter' ? e.target?.value : e.target.previousSibling?.value) ?? '';
    const conseillerByStructure = conseillerBeforeFilter.find(conseiller =>
      formatNomStructure(conseiller.nomStructure.toLowerCase()) === formatNomStructure(value.toLowerCase()));
    if (conseillerByStructure) {
      dispatch(filtresEtTrisStatsActions.changeStructureId(conseillerByStructure.structureId));
    } else {
      dispatch(filtresEtTrisStatsActions.changeNom(value));
    }
    return dispatch(filtresEtTrisStatsActions.saveSearchInput(value, filtreRegion));
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
    dispatch(conseillerActions.getAll(currentPage, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNom, ordreNom,
      ordre ? 1 : -1));
  }, [dateDebut, dateFin, currentPage, filtreCoordinateur, filtreRupture, filtreParNom, ordreNom, ordre]);

  function handleKeyDown(e) {
    if (e.target.value === '') {
      dispatch(filtresEtTrisStatsActions.changeNom(e.target.value));
    }
    if (e.key === 'Enter' || (e.type === 'click' && searchInput === '')) {
      rechercheParNomOuNomStructure(e);
    }
    return;
  }

  return (
    <>
      <Spinner loading={loading}/>
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <div className="fr-select-group" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>Tous</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.code} - {region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-4 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={searchInput ?? ''} onKeyDown={handleKeyDown}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" onChange={handleKeyDown} />
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
