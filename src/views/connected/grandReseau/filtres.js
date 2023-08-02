import { statistiquesActions } from '../../../actions';
import departementsRegions from '../../../datas/departements-region.json';
import codesRegions from '../../../datas/code_region.json';

export const selectFiltreRegion = (dispatch, e) => {
  dispatch(statistiquesActions.changeFiltreRegionStats(e.target?.value));
  dispatch(statistiquesActions.changeFiltreDepartementStats('tous'));
  dispatch(statistiquesActions.changeCodePostalStats('tous'));
  dispatch(statistiquesActions.changeStructureStats(''));
  dispatch(statistiquesActions.changeConseillerStats(''));
};

export const selectFiltreDepartement = (dispatch, e) => {
  const nomRegion = departementsRegions.find(region => String(region.num_dep) === String(e.target?.value))?.region_name;
  const codeRegion = codesRegions.find(region => region.nom === nomRegion)?.code;
  dispatch(statistiquesActions.changeFiltreDepartementStats(e.target?.value));
  dispatch(statistiquesActions.changeFiltreRegionStats(codeRegion || 'tous'));
  dispatch(statistiquesActions.changeCodePostalStats('tous'));
  dispatch(statistiquesActions.changeStructureStats(''));
  dispatch(statistiquesActions.changeConseillerStats(''));
};

export const selectFiltreCodePostal = (dispatch, e) => {
  if (e.target.value === 'tous') {
    dispatch(statistiquesActions.changeCodePostalStats('tous'));
  } else {
    const ville = JSON.parse(e.target.value).ville;
    const codePostal = JSON.parse(e.target.value).cp;
    const codeCommune = JSON.parse(e.target.value).codeCommune;
    dispatch(statistiquesActions.changeCodePostalStats(codePostal, ville, codeCommune));
  }
  dispatch(statistiquesActions.changeStructureStats(''));
  dispatch(statistiquesActions.changeConseillerStats(''));
};

export const selectFiltreStructure = (dispatch, e) => {
  dispatch(statistiquesActions.changeStructureStats(e.target?.value));
  dispatch(statistiquesActions.changeConseillerStats(''));
};
export const selectFiltreConseiller = (dispatch, e) => {
  dispatch(statistiquesActions.changeConseillerStats(e.target?.value));
};

