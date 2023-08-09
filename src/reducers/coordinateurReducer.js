const initialState = {
  error: false,
};

export default function coordinateur(state = initialState, action) {
  switch (action.type) {
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
