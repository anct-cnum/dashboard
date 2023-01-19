import { statistiquesActions } from '../../../actions';
import departementsRegions from '../../../datas/departements-region.json';
import codesRegions from '../../../datas/code_region.json';

export const selectFiltreRegion = (dispatch, e) => {
  dispatch(statistiquesActions.changeFiltreRegionStats(e.target?.value));
  dispatch(statistiquesActions.changeFiltreDepartementStats(''));
  dispatch(statistiquesActions.changeCodePostalStats(''));
  dispatch(statistiquesActions.changeStructureStats(''));
  dispatch(statistiquesActions.changeConseillerStats(''));
};

export const selectFiltreDepartement = (dispatch, e) => {
  // eslint-disable-next-line eqeqeq
  const nomRegion = departementsRegions.find(region => region.num_dep == e.target?.value)?.region_name;
  const codeRegion = codesRegions.find(region => region.nom === nomRegion)?.code;
  dispatch(statistiquesActions.changeFiltreDepartementStats(e.target?.value));
  dispatch(statistiquesActions.changeFiltreRegionStats(codeRegion || ''));
  dispatch(statistiquesActions.changeCodePostalStats(''));
  dispatch(statistiquesActions.changeStructureStats(''));
  dispatch(statistiquesActions.changeConseillerStats(''));
};

export const selectFiltreCodePostal = (dispatch, e) => {
  if (e.target.value === '') {
    dispatch(statistiquesActions.changeCodePostalStats(''));
  } else {
    const ville = JSON.parse(e.target.value).ville;
    const codePostal = JSON.parse(e.target.value).cp;
    dispatch(statistiquesActions.changeCodePostalStats(ville, codePostal));
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

