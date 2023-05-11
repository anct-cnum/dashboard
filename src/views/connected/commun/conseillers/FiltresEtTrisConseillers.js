import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, filtresConseillersActions, paginationActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import BlockDatePickers from '../statistiques/Components/commun/BlockDatePickers';
import codeRegions from '../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';

function FiltresEtTrisConseillers() {
  const dispatch = useDispatch();

  const departementsRegionList = Array.from(departementsRegionRaw);
  const dateDebut = useSelector(state => state.filtresConseillers?.dateDebut);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const filtreCoordinateur = useSelector(state => state.filtresConseillers?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresConseillers?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresConseillers?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const filterDepartement = useSelector(state => state.filtresConseillers?.departement);
  const dateFin = useSelector(state => state.filtresConseillers?.dateFin);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);
  const [searchByStructure, setSearchByStructure] = useState(!!filtreParNomStructure);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeFiltreRegion(e.target.value));
    dispatch(filtresConseillersActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeFiltreDepartement(e.target?.value));
  };

  const exportDonneesConseiller = () => {
    dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
      filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomOuNomStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    if (searchByStructure === true) {
      dispatch(filtresConseillersActions.changeNomStructure(value));
    } else {
      dispatch(filtresConseillersActions.changeNomConseiller(value));
    }
  };

  const rechercheParNomOuNomStructureToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomOuNomStructure(e);
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

  const handleChangeToggle = e => {
    setSearchByStructure(e.target?.checked);
  };

  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion).nom);
    }
    return departementsRegionList;
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h1 className="fr-h1 title">Liste des conseillers</h1>
        </div>
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-6 fr-col-xl-8 fr-mb-4w fr-mb-md-0">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input onKeyDown={rechercheParNomOuNomStructureToucheEnter} className="fr-input"
                defaultValue={(filtreParNomConseiller || filtreParNomStructure) ?? ''}
                placeholder="Rechercher par nom ou par id" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomOuNomStructure} title="Rechercher par nom ou par id">
                Rechercher
              </button>
            </div>
          </div>
          <div className="fr-ml-md-auto fr-mt-n1w">
            <div className="fr-toggle fr-toggle--label-left">
              <input
                checked={searchByStructure}
                type="checkbox"
                onChange={handleChangeToggle}
                className="fr-toggle__input"
                aria-describedby="toggle-698-hint-text"
                id="toggle-698"
              />
              <label className="fr-toggle__label" htmlFor="toggle-698" data-fr-checked-label="Structure" data-fr-unchecked-label="Conseiller">
              S&eacute;lectionner le type de recherche
              </label>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="date-picker fr-mb-4w fr-mt-1w fr-grid-row">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-select-group fr-col-12 fr-col-md-4 fr-col-xl-3 fr-mr-4w" id="filtre-region">
            <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
              <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-12 fr-col-md-4 fr-col-xl-3" id="filtre-departement">
            <select className="fr-select" value={filterDepartement} onChange={selectFiltreDepartement}>
              <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
              {getDepartements().map((departement, idx) =>
                <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
              )}
            </select>
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
