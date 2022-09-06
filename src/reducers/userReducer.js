export default function user(state = null, action) {

  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        flashMessage: false,
        error: false
      };
    case 'UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
        flashMessage: true
      };
    case 'UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        error: action.error,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        ...state,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        patchError: action.error,
      };
    case 'GET_USERS_REQUEST':
      return {
        loading: true
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
    case 'VERIFY_TOKEN_REQUEST':
      return {
        verifyingToken: true,
        user: action.user
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
    default:
      return state;
  }
}
