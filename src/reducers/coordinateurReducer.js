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
    default:
      return state;
  }
}

