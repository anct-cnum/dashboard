export default function user(state = null, action) {

  switch (action.type) {
    case 'INPUT_EMAIL_NOT_VALID':
      return {
        ...state,
        error: action.error
      };
    case 'GET_USERS_REQUEST':
      return {
        ...state,
        userError: false
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.users
      };
    case 'GET_USERS_FAILURE':
      return {
        ...state,
        userError: action.error
      };
    default:
      return state;
  }
}
