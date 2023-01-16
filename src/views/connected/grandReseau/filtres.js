import { statistiquesActions } from '../../../actions';

export const selectFiltreRegion = (dispatch, e) => {
  dispatch(statistiquesActions.changeFiltreRegionStats(e.target?.value));
  dispatch(statistiquesActions.changeFiltreDepartementStats('tous'));
  dispatch(statistiquesActions.changeCodePostalStats('tous'));
  dispatch(statistiquesActions.changeStructureStats('tous'));
  dispatch(statistiquesActions.changeConseillerStats('tous'));
};

export const selectFiltreDepartement = (dispatch, e) => {
  dispatch(statistiquesActions.changeFiltreDepartementStats(e.target?.value));
  dispatch(statistiquesActions.changeCodePostalStats('tous'));
  dispatch(statistiquesActions.changeStructureStats('tous'));
  dispatch(statistiquesActions.changeConseillerStats('tous'));
};

export const selectFiltreCodePostal = (dispatch, e) => {
  if (e.target.value === 'tous') {
    dispatch(statistiquesActions.changeCodePostalStats('tous'));
  } else {
    const ville = JSON.parse(e.target.value).ville;
    const codePostal = JSON.parse(e.target.value).cp;
    dispatch(statistiquesActions.changeCodePostalStats(ville, codePostal));
  }
  dispatch(statistiquesActions.changeStructureStats('tous'));
  dispatch(statistiquesActions.changeConseillerStats('tous'));
};

export const selectFiltreStructure = (dispatch, e) => {
  dispatch(statistiquesActions.changeStructureStats(e.target?.value));
  dispatch(statistiquesActions.changeConseillerStats('tous'));
};
export const selectFiltreConseiller = (dispatch, e) => {
  dispatch(statistiquesActions.changeConseillerStats(e.target?.value));
};

