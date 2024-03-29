import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresDemandesActions, paginationActions } from '../../../../actions';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';
import codeRegionsRaw from '../../../../datas/code_region.json';

function FiltresEtTrisCoordinateur() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const filterDepartement = useSelector(state => state.filtresDemandes?.departement);
  const filtreRegion = useSelector(state => state.filtresDemandes?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresDemandes?.avisPrefet);

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresDemandesActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesActions.changeFiltreDepartement(e.target?.value));
  };

  const rechercheParStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresDemandesActions.changeNom(value));
  };

  const rechercheParStructureToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParStructure(e);
    }
  };

  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegionsRaw.find(r => r.code === filtreRegion).nom);
    }
    return departementsRegionList;
  };

  const selectFiltreAvisPrefet = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesActions.changeFiltreAvisPrefet(e.target?.value));
  };

  return (
    <>
      <div className="fr-search-bar fr-search-bar fr-col-12 fr-mb-3w" role="search" >
        <input onKeyDown={rechercheParStructureToucheEnter} className="fr-input" defaultValue={''}
          placeholder="Rechercher par nom, par id, par siret de la structure" type="search" id="search-input" name="search-input" />
        <button className="fr-btn" onClick={rechercheParStructure} title="Rechercher par nom, par id, par siret de la structure">
          Rechercher
        </button>
      </div>
      <div className="fr-grid-row fr-col-12">
        <div className="fr-select-group fr-col-12 fr-col-xl-4 fr-mr-xl-2w" id="filtre-region-rupture">
          <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
            <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
            {codeRegionsRaw.map((region, idx) =>
              <option key={idx} value={region.code}>{region.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-12 fr-col-xl-4" id="filtre-departement-rupture">
          <select className="fr-select" value={filterDepartement} onChange={selectFiltreDepartement}>
            <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
            {getDepartements().map((departement, idx) =>
              <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-12" id="filtre-statut">
          <select className="fr-select" value={filtreAvisPrefet} onChange={selectFiltreAvisPrefet}>
            <option value={'tous'}>S&eacute;lectionner l&rsquo;avis pr&eacute;fecture</option>
            <option value={'sans-avis'}>Sans avis</option>
            <option value={'favorable'}>Favorable</option>
            <option value={'défavorable'}>D&eacute;favorable</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisCoordinateur;
