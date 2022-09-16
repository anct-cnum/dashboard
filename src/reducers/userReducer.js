export default function user(state = null, action) {

  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        error: false,
        loading: true
      };
    case 'UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case 'UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        ...state,
        error: false
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        error: action.error,
      };
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
    default:
      return state;
  }
}
