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
    case 'VALIDATION_SUPPRESSION_COMPTE_REQUEST':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'VALIDATION_SUPPRESSION_COMPTE_SUCCESS':
      return {
        ...state,
        loading: false,
        deleteSuccess: action.response.deleteSuccess,
        deleteMessageSuccess: action.response.deleteMessageSuccess,
        userDeleted: [...state.users.filter(user => user._id === action.response.idUser)],
        users: [...state.users.filter(user => user._id !== action.response.idUser)]
      };
    case 'VALIDATION_SUPPRESSION_COMPTE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'ADD_USER_TO_LIST':
      return {
        ...state,
        users: state !== null ? [...state.users, action.account] : []
      };
    default:
      return state;
  }
}
