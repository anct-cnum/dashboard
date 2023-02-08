import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import codeRegions from '../../../datas/code_region.json';
import codeRegionTom from '../../../datas/code_region_tom.json';
import departementsRegionRaw from '../../../datas/departements-region.json';
import departementsRegionRawTom from '../../../datas/departements-region-tom.json';
import { selectFiltreRegion, selectFiltreDepartement, selectFiltreCodePostal, selectFiltreStructure, selectFiltreConseiller } from './filtres';
import SelectOptions from '../../../components/SelectOptions';

function FiltresEtTrisGrandReseau() {
  const dispatch = useDispatch();
  const departementsRegionList = Array.from([...departementsRegionRaw, ...departementsRegionRawTom]);
  const filtreRegion = useSelector(state => state.statistiques?.codeRegionStats);
  const filtreDepartement = useSelector(state => state.statistiques?.numeroDepartementStats);
  const listeCodesPostaux = useSelector(state => state.statistiques?.statsData?.codesPostaux);
  const listeStructures = useSelector(state => state.statistiques?.statsData?.structures[0]?.structures);
  const listeConseillers = useSelector(state => state.statistiques?.statsData?.conseillers[0]?.conseillers);
  const conseillerIds = useSelector(state => state.statistiques?.conseillerStats);
  const ville = useSelector(state => state.statistiques?.villeStats);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const structureIds = useSelector(state => state.statistiques?.structureStats);
  const [value, setValue] = useState(JSON.stringify({ cp: codePostal, ville }));
  const loading = useSelector(state => state.exports?.loading);
  
  const getDepartements = () => {
    if (filtreRegion !== 'tous' && filtreRegion !== '') {
      return departementsRegionList.filter(region => region.region_name === codeRegions.find(r => r.code === filtreRegion)?.nom);
    }
    return departementsRegionList;
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="fr-grid-row fr-mb-6w" >
        <div className="fr-select-group fr-col-xs-12 fr-col-sm-4 fr-col-lg-2 fr-mr-1w" style={{ width: '100%' }} id="filtre-region">
          <select style={{ fontSize: '12px' }} className="fr-select" onChange={e => {
            selectFiltreRegion(dispatch, e);
            setValue('');
          }} value={filtreRegion}>
            <SelectOptions options={[...codeRegions, ...codeRegionTom]} valueName="code"
              labelName="nom" title="Toutes les r&eacute;gions" defaultValue={'tous'}/>
          </select>
        </div>
        <div className="fr-select-group fr-col-xs-12 fr-col-sm-4 fr-col-lg-2  fr-mr-1w" style={{ width: '100%' }} id="filtre-departement">
          <select style={{ fontSize: '12px' }} className="fr-select" onChange={e => selectFiltreDepartement(dispatch, e)} value={filtreDepartement}>
            <SelectOptions options={getDepartements()} valueName="num_dep"
              labelName="dep_name" subLabelName="num_dep" title="Tous les d&eacute;partements" defaultValue={'tous'}/>
          </select>
        </div>
        <div className="fr-select-group fr-col-xs-12 fr-col-sm-4 fr-col-lg-2  fr-mr-1w" style={{ width: '100%' }} id="filtre-codePostal">
          <select style={{ fontSize: '12px' }} className="fr-select code-postal-select" onChange={e => {
            selectFiltreCodePostal(dispatch, e);
            setValue(e.target.value);
          }}
          value={value}>
            <option value={'tous'}>Tous codes postaux</option>
            {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
              return (<optgroup key={idx} label={`${codePostal.codePostal} - TOUTES COMMUNES`}>
                {codePostal?.villes?.map((ville, idxbis) => {
                  return (<option key={idxbis} value={JSON.stringify({ cp: codePostal.codePostal, ville })}>{ville.toUpperCase()}</option>);
                })}
              </optgroup>);
            })}
          </select>
        </div>
        <div className="fr-select-group fr-col-xs-12 fr-col-sm-4 fr-col-lg-2  fr-mr-1w" style={{ width: '100%' }} id="filtre-structure">
          <select style={{ fontSize: '12px' }} className="fr-select" onChange={e => selectFiltreStructure(dispatch, e)} value={structureIds[0]}>
            <SelectOptions options={listeStructures} valueName="_id" labelName="nom" subLabelName="codePostal" title="Toutes les structures" defaultValue={''}/>
          </select>
        </div>
        <div className="fr-select-group fr-col-xs-12 fr-col-sm-4 fr-col-lg-2  fr-mr-1w" style={{ width: '100%' }} id="filtre-conseiller">
          <select style={{ fontSize: '12px' }} className="fr-select" onChange={e => selectFiltreConseiller(dispatch, e)} value={conseillerIds[0]}>
            <SelectOptions options={listeConseillers} valueName="_id" labelName="emailCN" title ="S&eacute;lection CnFS" defaultValue={''}/>
          </select>
        </div>
      </div>
    </>
  );
}

export default FiltresEtTrisGrandReseau;
