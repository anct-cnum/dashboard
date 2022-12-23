import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exportsActions, structureActions, statistiquesActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import { downloadFile, scrollTopWindow } from '../../../utils/exportsUtils';
import codeRegions from '../../../datas/code_region.json';
import departementsRegionRaw from '../../../datas/departements-region.json';

function FiltresEtTrisGrandReseau() {
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
  const structures = useSelector(state => state.structure);
  const dateFin = useSelector(state => state.filtresStructures?.dateFin);
  const ordre = useSelector(state => state.filtresStructures?.ordre);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const listeCodesPostaux = useSelector(state => state.statistiques.statsData?.codesPostaux);

  const exportConseillerFileBlob = useSelector(state => state.exports);
  const exportConseillerFileError = useSelector(state => state.exports?.error);
  const loading = useSelector(state => state.exports?.loading);

  const has = value => value !== null && value !== undefined;

  const selectFiltreRegion = e => {
    dispatch(statistiquesActions.changeRegionStats(e.target?.value));
    // dispatch(statistiquesActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(statistiquesActions.changeFiltreDepartement(e.target?.value));
  };
  const selectFiltreCodePostal = e => {
    dispatch(statistiquesActions.changeCodePostalStats(e.target?.value));
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
       
        <div className="fr-select-group fr-col-5" id="filtre-region">
          <select className="fr-select" onChange={selectFiltreRegion}>
            <option value={'tous'}>S&eacute;lectionner une région</option>
            {codeRegions.map((region, idx) =>
              <option key={idx} value={region.nom}>{region.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-5" id="filtre-departement">
          <select className="fr-select" onChange={selectFiltreDepartement}>
            <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
            {getDepartements().map((departement, idx) =>
              <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-5" id="filtre-codePostal">
          <select className="fr-select code-postal-select" onChange={selectFiltreCodePostal}>
            <option value="">Tous codes postaux</option>
            {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
              return (<optgroup key={idx} label={codePostal.codePostal}>
                {codePostal?.length > 1 &&
            <option value={codePostal}>{codePostal} - TOUTES COMMUNES </option>
                }
                {codePostal?.villes?.map((ligne, idxbis) => {
                  return (<option key={idxbis} value={ligne}>{ligne.toUpperCase()}</option>);
                })}
              </optgroup>);
            })}
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisGrandReseau;
