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
    case 'GET_CONTRAT_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GET_CONTRAT_SUCCESS':
      return {
        ...state,
        contrat: action.contrat,
        loading: false
      };
    case 'GET_CONTRAT_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    case 'RESET_CONTRAT':
      return {
        ...state,
        items: { ...state.items, data: [], total: 0 },
      };
    default:
      return state;
  }
}
  
