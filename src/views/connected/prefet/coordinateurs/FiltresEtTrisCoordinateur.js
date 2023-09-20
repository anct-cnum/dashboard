import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresDemandesCoordinateurActions, paginationActions } from '../../../../actions';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';
import codeRegionsRaw from '../../../../datas/code_region.json';

function FiltresEtTrisCoordinateur() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const codeRegionArray = Array.from(codeRegionsRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const filterDepartement = useSelector(state => state.filtresDemandesCoordinateur?.departement);
  const filtreRegion = useSelector(state => state.filtresDemandesCoordinateur?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresDemandesCoordinateur?.avisPrefet);
  const userAuth = useSelector(state => state.authentication?.user);

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesCoordinateurActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresDemandesCoordinateurActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesCoordinateurActions.changeFiltreDepartement(e.target?.value));
  };

  const rechercheParStructure = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresDemandesCoordinateurActions.changeNom(value));
  };

  const rechercheParStructureToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParStructure(e);
    }
  };

  const getDepartements = () => {
    if (userAuth?.region) {
      return departementsRegionList.filter(departement => departement?.region_name === codeRegionArray.find(r => r.code === userAuth?.region).nom);
    }
    return departementsRegionList.filter(departement => departement.num_dep === userAuth?.departement);
  };

  const getRegions = () => {
    if (userAuth?.departement) {
      return codeRegionArray.filter(
        region => region.nom === departementsRegionList.find(departement =>
          departement.num_dep === userAuth.departement)?.region_name
      );
    }
    return codeRegionArray.filter(region => region.code === userAuth?.region);
  };

  const selectFiltreAvisPrefet = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesCoordinateurActions.changeFiltreAvisPrefet(e.target?.value));
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
            {getRegions().map((region, idx) =>
              <option key={idx} value={region?.code}>{region?.nom}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-12 fr-col-xl-4" id="filtre-departement-rupture">
          <select className="fr-select" value={filterDepartement} onChange={selectFiltreDepartement}>
            {userAuth?.region &&
              <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
            }
            {getDepartements().map((departement, idx) =>
              <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
            )}
          </select>
        </div>
        <div className="fr-select-group fr-col-12" id="filtre-statut">
          <select className="fr-select" value={filtreAvisPrefet} onChange={selectFiltreAvisPrefet}>
            <option value={'tous'}>S&eacute;lectionner l&rsquo;avis</option>
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
