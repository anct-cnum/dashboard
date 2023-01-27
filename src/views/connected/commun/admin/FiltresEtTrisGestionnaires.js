import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, filtresGestionnairesActions, paginationActions, gestionnaireActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';

function FiltresEtTrisGestionnaires() {
  const dispatch = useDispatch();
  const ordreNom = useSelector(state => state.filtresGestionnaires?.ordreNom);
  const filtreParNomGestionnaire = useSelector(state => state.filtresGestionnaires?.nomGestionnaire);
  const filtreRole = useSelector(state => state.filtresGestionnaires?.searchRole);
  let searchInput = useSelector(state => state.filtresGestionnaires?.searchInput);
  const gestionnaires = useSelector(state => state.gestionnaire);
  const ordre = useSelector(state => state.filtresGestionnaires?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);

  const exportGestionnairesFileBlob = useSelector(state => state.exports);
  const exportGestionnairesFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRole = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresGestionnairesActions.changeFiltreRole(e.target?.value));
  };

  const exportDonneesGestionnaires = () => {
    dispatch(exportsActions.exportDonneesGestionnaires(filtreRole, filtreParNomGestionnaire, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomGestionnaire = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresGestionnairesActions.changeNomGestionnaire(value));
  };

  useEffect(() => {
    if (has(exportGestionnairesFileBlob?.blob) && exportGestionnairesFileError === false) {
      downloadFile(exportGestionnairesFileBlob);
      dispatch(exportsActions.resetFile());
    }
  }, [exportGestionnairesFileBlob]);

  useEffect(() => {
    if (exportGestionnairesFileError !== false) {
      scrollTopWindow();
    }
  }, [exportGestionnairesFileError]);

  useEffect(() => {
    if (gestionnaires?.items) {
      dispatch(gestionnaireActions.getAll(currentPage, filtreParNomGestionnaire, filtreRole, ordreNom, ordre ? 1 : -1));
    }
  }, [currentPage, ordreNom, ordre, filtreParNomGestionnaire, filtreRole]);

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h3 className="fr-h3">Liste des gestionnaires</h3>
        </div>
        <div className="fr-grid-row">
          <div className="fr-select-group fr-col-5" id="filtre-role">
            <select className="fr-select" value={filtreRole} onChange={selectFiltreRole}>
              <option value={'tous'}>S&eacute;lectionner un r&ocirc;le</option>
              <option value="ROLE_TOUS">Tous</option>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_GRAND_RESEAU">Grand r&eacute;seau</option>
              <option value="ROLE_PREFET">Pr&eacute;fet</option>
              <option value="ROLE_HUB">Hub</option>
              <option value="ROLE_STRUCTURE">Structure</option>
            </select>
          </div>
          <div className="fr-ml-auto fr-col-12 fr-col-md-5 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={searchInput ?? ''}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomGestionnaire} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-ml-auto">
            <button className="fr-btn fr-btn--secondary" onClick={exportDonneesGestionnaires}>Exporter les donn&eacute;es</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisGestionnaires;
