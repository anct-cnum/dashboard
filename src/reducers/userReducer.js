export default function user(state = null, action) {

  switch (action.type) {
    case 'VERIFY_TOKEN_REQUEST':
      return {
        verifyingToken: true,
        user: action.user,
        error: false
      };
    case 'VERIFY_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        verifyingToken: false,
        resultVerifyToken: action.resultVerifyToken
      };
    case 'VERIFY_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        verifyingToken: false,
        error: action.error
      };
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
