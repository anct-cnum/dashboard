export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...state,
        error: false
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
