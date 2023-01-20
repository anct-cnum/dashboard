const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  departement: 'tous',
  nomStructure: undefined,
  ordre: true,
  ordreNom: undefined,
  searchRole: 'ROLE_TOUS',
  coms: 'tous',
  type: 'tous',
  statut: 'VALIDATION_COSELEC',
};
  
export default function filtresGestionnaires(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NOM_GESTIONNAIRE':
      return {
        ...state,
        nomGestionnaire: action.nomGestionnaire,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    case 'SAVE_SEARCH_INPUT':
      return {
        ...state,
        searchInput: action.searchInput
      };
    case 'CHANGE_SEARCH_ROLE':
      return {
        ...state,
        searchRole: action.role
      };
    case 'RESET_FILTER_AND_SORTS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
  
