const initialState = {
  error: false,
};

export default function coordinateur(state = initialState, action) {
  switch (action.type) {
    case 'GETALL_DEMANDES_COORDINATEUR_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'GETALL_DEMANDES_COORDINATEUR_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.demandesCoordinateur,
      };
    case 'GETALL_DEMANDES_COORDINATEUR_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'GET_DEMANDE_COORDINATEUR_REQUEST':
      return {
        ...initialState,
        loading: true,
        error: false
      };
    case 'GET_DEMANDE_COORDINATEUR_SUCCESS':
      return {
        ...state,
        coordinateur: action.coordinateur,
        loading: false
      };
    case 'GET_DEMANDE_COORDINATEUR_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
