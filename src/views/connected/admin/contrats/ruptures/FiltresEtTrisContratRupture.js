import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresConventionsActions, paginationActions } from '../../../../../actions';
import codeRegions from '../../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../../datas/departements-region-tom.json';

function FiltresEtTrisContratRupture() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const filterDepartement = useSelector(state => state.filtresConventions?.departement);
  const filtreRegion = useSelector(state => state.filtresConventions?.region);
  const filtreStatut = useSelector(state => state.filtresConventions?.statut);

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

  const selectFiltreStatut = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeFiltreStatut(e.target?.value));
  };

  return (
    <>
      <div className="fr-search-bar fr-search-bar fr-col-12 fr-mb-3w" role="search" >
        <input onKeyDown={rechercheParNomConseillerToucheEnter} className="fr-input" defaultValue={''}
          placeholder="Rechercher par nom ou par id du candidat" type="search" id="search-input" name="search-input" />
        <button className="fr-btn" onClick={rechercheParNomConseiller} title="Rechercher par nom ou par id du candidat">
          Rechercher
        </button>
      </div>
      <div className="fr-grid-row fr-col-12">
        <div className="fr-select-group fr-col-12 fr-col-xl-4 fr-mr-xl-2w" id="filtre-region-rupture">
          <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
            <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
            {codeRegions.map((region, idx) =>
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
          <select className="fr-select" value={filtreStatut} onChange={selectFiltreStatut}>
            <option value={'tous'}>S&eacute;lectionner le statut du dossier</option>
            <option value={'false'}>Nouvelle demande</option>
            <option value={'true'}>En attente de pi&egrave;ces</option>
            <option value={'null'}>Complet</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisContratRupture;
