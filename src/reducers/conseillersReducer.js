export default function conseillers(state = [], action) {
  switch (action.type) {
    case 'GETALL_REQUEST':
      return {
        loading: true
      };
    case 'GETALL_SUCCESS':
      return {
        items: action.conseillers
      };
    case 'GETALL_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
