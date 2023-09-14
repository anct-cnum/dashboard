import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import codeRegions from '../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';
import { exportsActions, filtresConseillersActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';

function FiltresEtTrisConseillers() {
  const dispatch = useDispatch();

  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const filtreCoordinateur = useSelector(state => state.filtresConseillers?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresConseillers?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const filterDepartement = useSelector(state => state.filtresConseillers?.departement);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(filtresConseillersActions.changeFiltreRegion(e.target.value));
    dispatch(filtresConseillersActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(filtresConseillersActions.changeFiltreDepartement(e.target?.value));
  };

  const exportDonneesConseiller = () => {
    dispatch(exportsActions.exportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
      filterDepartement, ordreNom, ordre ? 1 : -1));
  };

  const rechercheParNomConseiller = e => {
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresConseillersActions.changeNomConseiller(value));
  };

  const rechercheParNomConseillerToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomConseiller(e);
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
        <div className="fr-col-12 fr-mb-4w">
          <div className="fr-search-bar fr-search-bar" id="search" role="search" >
            <input onKeyDown={rechercheParNomConseillerToucheEnter} className="fr-input"
              defaultValue={filtreParNomConseiller ?? ''}
              placeholder="Rechercher par nom ou par id" type="search" id="search-input" name="search-input" />
            <button className="fr-btn" onClick={rechercheParNomConseiller} title="Rechercher par nom ou par id">
              Rechercher
            </button>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--end">
          <div className="date-picker fr-mb-4w fr-mt-1w fr-grid-row">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} />
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
