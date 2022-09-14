const initialState = {
  verifyingToken: false,
  error: false
};
export default function user(state = initialState, action) {

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
    case 'CHOOSE_PASSWORD_REQUEST':
      return {
        choosingPassword: true,
        user: action.user
      };
    case 'CHOOSE_PASSWORD_SUCCESS':
      return {
        choosingPassword: false,
        passwordChoosen: true,
        resultChoosePassword: action.resultChoosePassword
      };
    case 'CHOOSE_PASSWORD_FAILURE':
      return {
        choosingPassword: false,
        passwordChoosen: false,
        error: action.error
      };
    default:
      return state;
  }
}
