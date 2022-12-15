import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtresCandidaturesActions, paginationActions } from '../../../../actions';
import codeRegions from '../../../../datas/code_region.json';
import coms from '../../../../datas/coms.json';
import departementsRegionRaw from '../../../../datas/departements-region.json';

function FiltresEtTrisCandidatures() {
  const dispatch = useDispatch();
  const departementsRegionList = Array.from(departementsRegionRaw);
  const filtreParNomCandidat = useSelector(state => state.filtresCandidatures?.nomCandidat);
  const filtreRegion = useSelector(state => state.filtresCandidatures?.region);

  const selectFiltreRegion = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresCandidaturesActions.changeFiltreRegion(e.target?.value));
    dispatch(filtresCandidaturesActions.changeFiltreDepartement('tous'));
  };

  const selectFiltreDepartement = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresCandidaturesActions.changeFiltreDepartement(e.target?.value));
  };
  const selectFiltreComs = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresCandidaturesActions.changeFiltreComs(e.target?.value));
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

  return (
    <>
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <h3 className="fr-h3 fr-col-12">Liste des candidatures</h3>
          <div className="fr-col-12 fr-col-md-10 fr-mb-4w">
            <div className="fr-search-bar fr-search-bar" id="search" role="search" >
              <input className="fr-input" defaultValue={filtreParNomCandidat ?? ''}
                placeholder="Rechercher par nom" type="search" id="search-input" name="search-input" />
              <button className="fr-btn" onClick={rechercheParNomCandidat} title="Rechercher par nom">
                Rechercher
              </button>
            </div>
          </div>
          <div className="fr-select-group fr-col-10" id="filtre-region">
            <select className="fr-select" onChange={selectFiltreRegion}>
              <option value={'tous'}>S&eacute;lectionner une r&eacute;gion</option>
              {codeRegions.map((region, idx) =>
                <option key={idx} value={region.code}>{region.nom}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-10" id="filtre-departement">
            <select className="fr-select" onChange={selectFiltreDepartement}>
              <option value={'tous'}>S&eacute;lectionner un d&eacute;partement</option>
              {getDepartements().map((departement, idx) =>
                <option key={idx} value={departement.num_dep}>{departement.num_dep} - {departement.dep_name}</option>
              )}
            </select>
          </div>
          <div className="fr-select-group fr-col-10" id="filtre-com">
            <select className="fr-select" onChange={selectFiltreComs}>
              <option value={'tous'}>S&eacute;lectionner une collectivit&eacute; d&rsquo;outre-mer</option>
              {coms.map((com, idx) =>
                <option key={idx} value={com.num_com}>{com.num_com} - {com.com_name}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisCandidatures;
