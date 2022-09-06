export default function user(state = null, action) {

  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
        flashMessage: true
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
        patchError: action.error,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        tokenVerified: true,
        loading: false,
        userConnected: action.user,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        patchError: action.error,
        tokenVerified: false,
        loading: false,
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
        loading: true,
        verifyingToken: true,
        user: action.user
      };
    case 'VERIFY_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        loading: false,
        resultVerifyToken: action.resultVerifyToken
      };
    case 'VERIFY_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
