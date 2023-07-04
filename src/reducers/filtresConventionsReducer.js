const initialState = {
  nom: undefined,
  ordre: true,
  ordreNom: undefined,
  region: 'tous',
  departement: 'tous',
};

export default function filtresConventions(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NOM':
      return {
        ...state,
        nom: action.nom,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'RESET_FILTER_AND_SORTS':
      return initialState;
    default:
      return state;
  }
}

