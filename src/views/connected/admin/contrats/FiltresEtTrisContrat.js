import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresConventionsActions, paginationActions } from '../../../../actions';
import codeRegions from '../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';

function FiltresEtTrisContrat() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const filterDepartement = useSelector(state => state.filtresConventions?.departement);
  const filtreRegion = useSelector(state => state.filtresConventions?.region);

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresConventionsActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeFiltreDepartement(e.target?.value));
  };

  const rechercheParNomConseiller = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresConventionsActions.changeNom(value));
  };

  const rechercheParNomConseillerToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomConseiller(e);
    }
  };

  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion).nom);
    }
    return departementsRegionList;
  };

  return (
    <>
      <div className="fr-grid-row">
        <div className="fr-search-bar fr-search-bar fr-mr-3w" id="search" role="search" >
          <input onKeyDown={rechercheParNomConseillerToucheEnter} className="fr-input" defaultValue={''}
            placeholder="Rechercher par nom ou par id du candidat" type="search" id="search-input" name="search-input" />
          <button className="fr-btn" onClick={rechercheParNomConseiller} title="Rechercher par nom ou par id du candidat">
            Rechercher
          </button>
        </div>
        <div className="fr-select-group fr-col-3 fr-mr-3w fr-mb-0" id="filtre-region">
          <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
            <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
            {codeRegions.map((region, idx) =>
              <option key={idx} value={region.code}>{region.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-3" id="filtre-departement">
          <select className="fr-select" value={filterDepartement} onChange={selectFiltreDepartement}>
            <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
            {getDepartements().map((departement, idx) =>
              <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
            )}
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisContrat;