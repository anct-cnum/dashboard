const initialState = {
  departement: 'tous',
  nomStructure: undefined,
  ordre: true,
  ordreNom: undefined,
  region: 'tous',
  type: 'tous',
  statut: 'VALIDATION_COSELEC',
};
  
export default function filtresStructures(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NOM_STRUCTURE':
      return {
        ...state,
        nomStructure: action.nomStructure,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'CHANGE_STATUT':
      return {
        ...state,
        statut: action.statut
      };
    case 'CHANGE_TYPE':
      return {
        ...state,
        type: action.typeStructure
      };
    case 'CHANGE_DEPARTEMENT':
      return {
        ...state,
        departement: action.departement
      };
    case 'SAVE_SEARCH_INPUT':
      return {
        ...state,
        region: action.region,
        searchInput: action.searchInput
      };
    case 'CHANGE_REGION':
      return {
        ...state,
        region: action.region
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
  
