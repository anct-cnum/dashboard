import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import codeRegions from '../../../datas/code_region.json';
import departementsRegionRaw from '../../../datas/departements-region.json';

function FiltresEtTrisGrandReseau() {
  const dispatch = useDispatch();
  const departementsRegionList = Array.from(departementsRegionRaw);
  const filtreRegion = useSelector(state => state.statistiques?.codeRegionStats);
  const listeCodesPostaux = useSelector(state => state.statistiques.statsData?.codesPostaux);
  const listeStructures = useSelector(state => state.statistiques.statsData?.structures);
  const listeConseillers = useSelector(state => state.statistiques.statsData?.conseillers);
  const conseiller = useSelector(state => state.statistiques.conseillerStats);
  const ville = useSelector(state => state.statistiques.villeStats);
  const codePostal = useSelector(state => state.statistiques.codePostalStats);
  const structure = useSelector(state => state.statistiques.structureStats);

  const loading = useSelector(state => state.exports?.loading);

  const selectFiltreRegion = e => {
    dispatch(statistiquesActions.changeFiltreRegionStats(e.target?.value));
    dispatch(statistiquesActions.changeFiltreDepartementStats('tous'));
    dispatch(statistiquesActions.changeCodePostalStats('tous'));
    dispatch(statistiquesActions.changeStructureStats('tous'));
    dispatch(statistiquesActions.changeConseillerStats('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(statistiquesActions.changeFiltreDepartementStats(e.target?.value));
    dispatch(statistiquesActions.changeCodePostalStats('tous'));
    dispatch(statistiquesActions.changeStructureStats('tous'));
    dispatch(statistiquesActions.changeConseillerStats('tous'));
  };
  const selectFiltreCodePostal = e => {
    if (e.target.value === 'tous') {
      dispatch(statistiquesActions.changeCodePostalStats('tous'));
    } else {
      const ville = JSON.parse(e.target.value).ville;
      const codePostal = JSON.parse(e.target.value).cp;
      dispatch(statistiquesActions.changeCodePostalStats(ville, codePostal));
    }
    dispatch(statistiquesActions.changeStructureStats('tous'));
    dispatch(statistiquesActions.changeConseillerStats('tous'));
  };
  const selectFiltreStructure = e => {
    dispatch(statistiquesActions.changeStructureStats(e.target?.value));
    dispatch(statistiquesActions.changeConseillerStats('tous'));
  };
  const selectFiltreConseiller = e => {
    dispatch(statistiquesActions.changeConseillerStats(e.target?.value));
  };
  
  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion)?.nom);
    }
    return departementsRegionList;
  };
 
  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-grid-row fr-mb-6w" >
        <div className="fr-select-group fr-col-2 fr-mr-1w" id="filtre-region">
          <select className="fr-select" onChange={selectFiltreRegion}>
            <option value={'tous'}>Toutes les régions</option>
            {codeRegions.map((region, idx) =>
              <option key={idx} value={region.code}>{region.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-departement">
          <select className="fr-select" onChange={selectFiltreDepartement}>
            <option value={'tous'}>Tous les d&eacute;partements</option>
            {getDepartements().map((departement, idx) =>
              <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-codePostal">
          <select className="fr-select code-postal-select" onChange={selectFiltreCodePostal} value={JSON.stringify({ cp: codePostal, ville: ville })}>
            <option value={'tous'}>Tous codes postaux</option>
            {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
              return (<optgroup key={idx} label={codePostal.codePostal}>
                {codePostal?.villes?.map((ville, idxbis) => {
                  return (<option key={idxbis} value={JSON.stringify({ cp: codePostal.codePostal, ville })}>{ville.toUpperCase()}</option>);
                })}
              </optgroup>);
            })}
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-structure">
          <select className="fr-select" onChange={selectFiltreStructure} value={structure}>
            <option value="tous">Toutes les structures</option>
            {listeStructures?.map((structure, idx) =>
              <option key={idx} value={structure._id}>{structure.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-conseiller">
          <select className="fr-select" onChange={selectFiltreConseiller} value={conseiller}>
            <option value="tous">S&eacute;lection CnFS</option>
            {listeConseillers?.map((conseiller, idx) =>
              <option key={idx} value={conseiller._id}>{conseiller.email}</option>
            )}
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisGrandReseau;
