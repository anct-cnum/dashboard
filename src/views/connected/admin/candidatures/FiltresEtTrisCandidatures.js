import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresCandidaturesActions, paginationActions } from '../../../../actions';
import codeRegions from '../../../../datas/code_region.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';
import departementsRegionTomRaw from '../../../../datas/departements-region-tom.json';

function FiltresEtTrisCandidatures() {
  const dispatch = useDispatch();
  const departementsRegionArray = Array.from(departementsRegionRaw);
  const departementsRegionTomArray = Array.from(departementsRegionTomRaw);
  const departementsRegionList = departementsRegionArray.concat(departementsRegionTomArray);
  const filtreParNomCandidat = useSelector(state => state.filtresCandidatures?.nomCandidat);
  const filtreRegion = useSelector(state => state.filtresCandidatures?.region);
  const filtreDepartement = useSelector(state => state.filtresCandidatures?.departement);

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresCandidaturesActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresCandidaturesActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresCandidaturesActions.changeFiltreDepartement(e.target?.value));
  };

  const getDepartements = () => {
    if (filtreRegion !== 'tous') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion).nom);
    }
    return departementsRegionList;
  };

  const rechercheParNomCandidat = e => {
    dispatch(paginationActions.setPage(1));
    const value = (e.key === 'Enter' ? e.target?.value : e.target?.previousSibling?.value) ?? '';
    dispatch(filtresCandidaturesActions.changeNomCandidat(value));
  };
  const rechercheParNomCandidatToucheEnter = e => {
    if (e.key === 'Enter') {
      rechercheParNomCandidat(e);
    }
  };

  return (
    <>
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h1 className="fr-h1 title fr-col-12">Liste des candidatures</h1>
          <div className="fr-col-12 fr-col-xl-10 fr-mb-4w">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" onKeyDown={rechercheParNomCandidatToucheEnter} defaultValue={filtreParNomCandidat ?? ''}
                placeholder="Rechercher par nom, par email de candidature ou par id" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomCandidat} title="Rechercher par nom, par email de candidature ou par id">
                Rechercher
              </button>
            </div>
          </div>
          <div className="fr-select-group fr-col-12 fr-col-xl-10" id="filtre-region">
            <select className="fr-select" value={filtreRegion} onChange={selectFiltreRegion}>
              <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-12 fr-col-xl-10" id="filtre-departement">
            <select className="fr-select" value={filtreDepartement} onChange={selectFiltreDepartement}>
              <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
              {getDepartements().map((departement, idx) =>
                <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisCandidatures;
