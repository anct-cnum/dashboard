import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import codeRegions from '../../../datas/code_region.json';
import departementsRegionRaw from '../../../datas/departements-region.json';
import { selectFiltreRegion, selectFiltreDepartement, selectFiltreCodePostal, selectFiltreStructure, selectFiltreConseiller } from './filtres';
import SelectOptions from '../../../components/SelectOptions';

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
          <select className="fr-select" onChange={e => selectFiltreRegion(dispatch, e)}>
            <SelectOptions options={codeRegions} valueName="code" labelName="nom" title="Toutes les régions"/>
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-departement">
          <select className="fr-select" onChange={e => selectFiltreDepartement(dispatch, e)}>
            <SelectOptions options={getDepartements()} valueName="num_dep" labelName="dep_name" title="Tous les d&eacute;partements"/>
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-codePostal">
          <select className="fr-select code-postal-select" onChange={e => selectFiltreCodePostal(dispatch, e)}
            value={JSON.stringify({ cp: codePostal, ville: ville })}>
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
          <select className="fr-select" onChange={e => selectFiltreStructure(dispatch, e)} value={structure}>
            <SelectOptions options={listeStructures} valueName="_id" labelName="nom" title="Toutes les structures"/>
          </select>
        </div>
        <div className="fr-select-group fr-col-2  fr-mr-1w" id="filtre-conseiller">
          <select className="fr-select" onChange={e => selectFiltreConseiller(dispatch, e)} value={conseiller}>
            <SelectOptions options={listeConseillers} valueName={'_id'} labelName={'email'} title ="S&eacute;lection CnFS" />
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisGrandReseau;
