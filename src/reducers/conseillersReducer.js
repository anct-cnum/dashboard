export default function conseillers(state = [], action) {
  switch (action.type) {
    case 'GETALL_REQUEST':
      return {
        loading: true,
        error: false
      };
    case 'GETALL_SUCCESS':
      return {
        items: action.conseillers,
        loading: false
      };
    case 'GETALL_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
