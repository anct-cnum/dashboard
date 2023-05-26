const initialState = {
  error: false,
};
  
export default function contrat(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_CONTRAT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_CONTRAT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.contrats,
      };
    case 'GETALL_CONTRAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GETALL_HISTORIQUE_CONTRAT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_HISTORIQUE_CONTRAT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.contrats,
      };
    case 'GETALL_HISTORIQUE_CONTRAT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
  
