export default function coordinateur(state = null, action) {
  switch (action.type) {
    case 'GET_COORDINATEUR_REQUEST':
      return {
        ...state,
        error: false
      };
    case 'GET_COORDINATEUR_SUCCESS':
      return {
        ...state,
        coordinateur: action.coordinateur
      };
    case 'GET_COORDINATEUR_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
